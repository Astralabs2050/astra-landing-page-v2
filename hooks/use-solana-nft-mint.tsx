import { api } from '@/services/trpc-client'
import { useAuth } from '@/providers/auth-provider'
import { useState } from 'react'

export const useSolanaNFTMint = () => {
  const [minting, setMinting] = useState(false)

  const { solanaWallet } = useAuth()
  const { mutateAsync } = api.nft.mintNFT.useMutation()

  const mintNFT = async (imageUrl: string) => {
    if (!solanaWallet) {
      throw new Error('Wallet not found')
    }

    setMinting(true)

    const accounts = await solanaWallet.requestAccounts()
    const userAddress = accounts[0]
    const nft = await mutateAsync({ imageUrl, userAddress })

    setMinting(false)
    return nft
  }

  return {
    minting,
    mintNFT,
  }
}

/*** 
const mintNFT = async (imageUrl: string) => {
  if (!solanaWallet || !data) {
    throw new Error('Wallet not found')
  }

  const nftData = {
    symbol: 'AST',
    name: 'Astra Fashion NFT',
    description: 'Astra fashion nft',
    sellerFeeBasisPoints: 100,
    imageFile: imageUrl,
  }

  const accounts = await solanaWallet.requestAccounts()
  const address = accounts[0]

  const publicKey = new PublicKey(address)

  const init = createConnection({
    publicKey,
    signMessage: solanaWallet.signMessage,
    signAllTransactions: solanaWallet.signAllTransactions,
    signTransaction: async transaction => {
      const signedTransaction = await solanaWallet.provider.request({
        method: 'signTransaction',
        params: {
          message: transaction,
        },
      })

      return signedTransaction as Promise<typeof transaction>
    },
  })

  const uri = await uploadMetadata(init.metaplex, nftData)

  const nft = await createNft(
    init.metaplex,
    uri,
    nftData,
    data.collectionAddress,
    address,
  )

  console.log(nft)
  return nft
}
****/
