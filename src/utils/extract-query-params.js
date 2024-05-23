export function extractQueryParams(query) {
  return query.substr(1).split('&').reduce((queryParams, param) => {
    const [key, value] = param.split('=')

    queryParams[key] = decodeURIComponent(value)
    queryParams[key] = queryParams[key] === 'undefined' ? null : queryParams[key]

    return queryParams
  }, {})
}
