import fetch from 'isomorphic-fetch'

export const fetchHelper = async (endpoint, options) => {
  const response = await fetch(endpoint, options)
  const payload = await response.json()

  return payload
}

export const formatUrlString = string => string.replace(/\W+/g, '-').toLowerCase()
