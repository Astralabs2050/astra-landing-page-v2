import { map } from 'nanostores'

export const $jobApplication = map({
  charge: 0,
  openToNegotiations: false,
  submitting: false,
})
