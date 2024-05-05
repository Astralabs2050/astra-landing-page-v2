import * as fs from 'fs'
import * as os from 'os'
import * as web3 from '@solana/web3.js'
import { Connection, clusterApiUrl } from '@solana/web3.js'
import { initializeKeypair } from '@/lib/initializeKeypair'
import {
  createTRPCRouter,
  authenticatedProcedure,
} from '@/services/trpc-server'
import {
  Metaplex,
  bundlrStorage,
  keypairIdentity,
} from '@metaplex-foundation/js'
import {
  createCollectionNft,
  createNft,
  uploadMetadata,
} from '@/services/metaplex'
import { env } from '@/env.mjs'
import { z } from 'zod'

const getCollectionData = async () => {
  const privateKey = env.PRIVATE_KEY
  const collectionAddress = env.COLLECTION_ADDRESS

  if (collectionAddress && privateKey) {
    const secret = JSON.parse(privateKey) as number[]
    const secretKey = Uint8Array.from(secret)

    const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey)
    const publicKey = keypairFromSecretKey.publicKey

    return {
      collectionAddress,
      adminAddress: publicKey.toString(),
    }
  }

  const connection = new Connection(clusterApiUrl('devnet'))
  const admin = await initializeKeypair(connection)

  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(admin))
    .use(
      bundlrStorage({
        address: 'https://devnet.bundlr.network',
        providerUrl: 'https://api.devnet.solana.com',
        timeout: 60000,
      }),
    )

  const collectionData = {
    symbol: 'AST',
    name: 'Astra Fashion NFT ',
    description: 'Test Description Collection',
    collectionAuthority: admin,
    sellerFeeBasisPoints: 100,
    isCollection: true,
    imageFile:
      'https://humgswhkgxacucnrzpam.supabase.co/storage/v1/object/public/images/astra-logomark-bg.png',
  }

  const collectionUri = await uploadMetadata(metaplex, collectionData)

  const collectionNft = await createCollectionNft(
    metaplex,
    collectionUri,
    collectionData,
  )

  fs.appendFileSync(
    '.env',
    os.EOL + `COLLECTION_ADDRESS="${collectionNft.address}"`,
  )

  return {
    collectionAddress: collectionNft.address.toString(),
    adminAddress: admin.publicKey.toString(),
  }
}

export const nftRouter = createTRPCRouter({
  getCollectionData: authenticatedProcedure.query(async () => {
    return await getCollectionData()
  }),

  mintNFT: authenticatedProcedure
    .input(z.object({ imageUrl: z.string(), userAddress: z.string() }))
    .mutation(async ({ input }) => {
      const collectionData = await getCollectionData()

      const connection = new Connection(clusterApiUrl('devnet'))
      const admin = await initializeKeypair(connection)

      const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(admin))
        .use(
          bundlrStorage({
            address: 'https://devnet.bundlr.network',
            providerUrl: 'https://api.devnet.solana.com',
            timeout: 60000,
          }),
        )

      const nftData = {
        symbol: 'AST',
        name: 'Astra Fashion NFT',
        description: 'Astra fashion nft',
        sellerFeeBasisPoints: 50,
        imageFile: input.imageUrl,
      }

      const uri = await uploadMetadata(metaplex, nftData)
      const nft = await createNft(
        metaplex,
        uri,
        nftData,
        collectionData.collectionAddress,
        input.userAddress,
        admin.publicKey,
      )

      return nft
    }),
})
