declare module '@metaplex-foundation/js' {
  import { PublicKey, Connection, Transaction } from '@solana/web3.js'
  import { WalletAdapter as BaseWalletAdapter } from '@solana/wallet-adapter-base'
  import { IdentityDriver } from '@metaplex-foundation/js/src/plugins/identityModule/IdentityDriver'

  export function bundlrStorage(config: {
    address: string
    providerUrl: string
    timeout: number
  }): StorageDriver

  export function keypairIdentity(keypair: Keypair): IdentityDriver
  export function walletAdapterIdentity(wallet: WalletAdapter): IdentityDriver

  export class Metaplex {
    static make(connection: Connection): Metaplex
    use(plugin: Plugin): Metaplex
    storage(): StorageDriver
    nfts(): NftClient
  }

  export function toMetaplexFile(buffer: Buffer, fileName: string): MetaplexFile

  export interface NftWithToken {
    address: PublicKey
    mint: {
      address: PublicKey
    }
  }

  export interface WalletAdapter extends BaseWalletAdapter {
    publicKey: PublicKey
    signTransaction(transaction: Transaction): Promise<Transaction>
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>
  }

  export interface StorageDriver {
    upload(file: MetaplexFile): Promise<string>
  }

  export interface NftClient {
    uploadMetadata(metadata: Metadata): Promise<{ uri: string }>
    create(
      config: CreateNftConfig,
      options: { commitment: string },
    ): Promise<{ nft: NftWithToken }>
    verifyCollection(config: VerifyCollectionConfig): Promise<void>
    findByMint(config: { mintAddress: PublicKey }): Promise<Nft>
    update(
      config: UpdateNftConfig,
      options: { commitment: string },
    ): Promise<{ response: { signature: string } }>
  }

  export interface Metadata {
    name: string
    symbol: string
    description: string
    image: string
    [key: string]: unknown
  }

  export interface CreateNftConfig {
    uri: string
    name: string
    sellerFeeBasisPoints: number
    symbol: string
    isCollection?: boolean
    collection?: PublicKey
    creators?: Creator[]
  }

  export interface VerifyCollectionConfig {
    mintAddress: PublicKey
    collectionMintAddress: PublicKey
    isSizedCollection: boolean
  }

  export interface UpdateNftConfig {
    nftOrSft: Nft
    uri: string
    name: string
    symbol: string
  }

  export interface Creator {
    address: PublicKey
    share: number
  }

  export interface MetaplexFile {
    buffer: Buffer
    fileName: string
  }

  export interface Nft {
    address: PublicKey
    mint: {
      address: PublicKey
    }
    [key: string]: unknown
  }

  export interface Keypair {
    publicKey: PublicKey
    secretKey: Uint8Array
  }

  export interface Plugin {
    // Define any necessary properties for plugins if needed
  }
}
