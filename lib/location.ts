export const getLocationId = (params: {
  name: string
  countryCode: string
  admin1?: string
}) => {
  return `${params.name}_${params.countryCode}_${params.admin1}`
}
