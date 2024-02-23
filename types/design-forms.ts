import { JobTarget } from '@prisma/client'
import { Design } from './models'

export type Params = {
  searchParams: {
    id?: string | undefined
    step?: number | undefined
    target: JobTarget
  }
}

export type FormPageProps = {
  design?: Design
  target: Params['searchParams']['target']
}
