import { CollectionNftData, NftData } from '@/types/metaplex'
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js'

import {
  Metaplex,
  bundlrStorage,
  toMetaplexFile,
  NftWithToken,
  walletAdapterIdentity,
  WalletAdapter,
} from '@metaplex-foundation/js'

export const createConnection = (wallet: WalletAdapter) => {
  const connection = new Connection(clusterApiUrl('devnet'))

  const metaplex = Metaplex.make(connection)
    .use(walletAdapterIdentity(wallet))
    .use(
      bundlrStorage({
        address: 'https://devnet.bundlr.network',
        providerUrl: 'https://api.devnet.solana.com',
        timeout: 60000,
      }),
    )

  return {
    metaplex,
    connection,
  }
}

export async function uploadMetadata(
  metaplex: Metaplex,
  nftData: NftData | CollectionNftData,
): Promise<string> {
  const blob = await fetch(nftData.imageFile).then(res => res.blob())
  const arrayBuffer = await new Response(blob).arrayBuffer()

  const buffer = Buffer.from(arrayBuffer)
  const file = toMetaplexFile(buffer, nftData.imageFile)
  const imageUri = await metaplex.storage().upload(file)

  const { uri } = await metaplex.nfts().uploadMetadata({
    name: nftData.name,
    symbol: nftData.symbol,
    description: nftData.description,
    image: imageUri,
  })

  console.log('metadata uri:', uri)

  return uri
}

export async function createCollectionNft(
  metaplex: Metaplex,
  uri: string,
  data: CollectionNftData,
): Promise<NftWithToken> {
  const { nft } = await metaplex.nfts().create(
    {
      uri: uri,
      name: data.name,
      sellerFeeBasisPoints: data.sellerFeeBasisPoints,
      symbol: data.symbol,
      isCollection: true,
    },
    { commitment: 'finalized' },
  )

  const url = `https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`
  console.log(`Collection Mint: ${url}`)

  return nft
}

export async function createNft(
  metaplex: Metaplex,
  uri: string,
  nftData: NftData,
  collectionAddress: string,
  userAddress: string,
  admin: PublicKey,
): Promise<NftWithToken> {
  const collection = new PublicKey(collectionAddress)
  const user = new PublicKey(userAddress)

  const { nft } = await metaplex.nfts().create(
    {
      uri: uri,
      name: nftData.name,
      sellerFeeBasisPoints: nftData.sellerFeeBasisPoints,
      symbol: nftData.symbol,
      collection: collection,
      creators: [
        {
          address: admin,
          share: 50,
        },
        {
          address: user,
          share: 50,
        },
      ],
    },
    { commitment: 'finalized' },
  )

  const url = `https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`
  console.log(`Token Mint: ${url}`)

  await metaplex.nfts().verifyCollection({
    mintAddress: nft.mint.address,
    collectionMintAddress: collection,
    isSizedCollection: true,
  })

  return nft
}

export async function updateNftUri(
  metaplex: Metaplex,
  uri: string,
  mintAddress: PublicKey,
  nftData: NftData,
) {
  const nft = await metaplex.nfts().findByMint({ mintAddress })

  const { response } = await metaplex.nfts().update(
    {
      nftOrSft: nft,
      uri: uri,
      name: nftData.name,
      symbol: nftData.symbol,
    },
    { commitment: 'finalized' },
  )

  const addressUrl = `https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`
  const signatureUrl = `https://explorer.solana.com/tx/${response.signature}?cluster=devnet`

  console.log(addressUrl, signatureUrl)
}
