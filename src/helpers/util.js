import fetch from 'isomorphic-fetch'

export const fetchHelper = async (endpoint, options) => {
  const response = await fetch(endpoint, options)
  let payload

  if (!response.ok) {
    payload = await response.json()
    throw new Error(payload.error)
  }

  payload = await response.json()

  return payload
}

export const formatUrlString = string => string.replace(/\W+/g, '-').toLowerCase()
