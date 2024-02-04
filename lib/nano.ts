import { customAlphabet, nanoid } from 'nanoid'

export const nano = (alphabet?: string, size: number = 10) => {
  if (alphabet) {
    const newid = customAlphabet(alphabet, size)
    return newid()
  }

  return nanoid()
}
