import { StorageBucket, supabase } from './supabase'

export const prepareFile = async (blob: Blob) => {
  const arrayBuffer = await new Response(blob).arrayBuffer()
  const fileBody = new Uint8Array(arrayBuffer)

  const typeArray = blob.type.split('/')
  const fileType = typeArray[typeArray.length - 1]

  return {
    fileBody,
    fileType,
  }
}

export const uploadBucketImage = async (
  file: Uint8Array,
  fileName: string,
  path: string,
  bucket: StorageBucket,
) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(encodeURI(`${path}/${fileName}`), file, {
      cacheControl: '15552000', // six months,
      upsert: false,
    })

  if (error) {
    throw new Error(error.message)
  }

  return getPublicUrlFromBucket(bucket, data.path)
}

export const getPublicUrlFromBucket = (bucket: StorageBucket, path: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export const deleteFromBucket = async (
  bucket: StorageBucket,
  folderPath: string,
) => {
  const { data, error } = await supabase.storage.from(bucket).list(folderPath)

  if (data) {
    const filesToRemove = data.map(file => `${folderPath}/${file.name}`)
    await supabase.storage.from(bucket).remove(filesToRemove)
  }

  if (error) {
    throw new Error(error.message)
  }
}
