function filterCities(query, cities) {
  const results = []

  for (const city of cities) {
    const matches = city.name.toLowerCase().startsWith(query.toLowerCase())

    if (matches) {
      results.push({
        label: city.name,
        value: `${city.country}.${city.admin1}`,
      })
    }
  }

  return results
}

self.addEventListener('message', event => {
  const { query, cities } = event.data
  const result = filterCities(query, cities)

  self.postMessage(result)
})
