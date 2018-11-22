// Globals
export const BROWSER = typeof window === 'object'
export const SERVER = typeof process === 'object'

export const ENV = (SERVER && process.env) || {}

export const LOCAL = (SERVER && ENV.NODE_ENV === 'local') || (BROWSER && process.env.NODE_ENV === 'local')
export const DEVELOPMENT = (BROWSER && process.env.NODE_ENV === 'staging') || (BROWSER && process.env.NODE_ENV === 'development')
export const STAGING = (SERVER && ENV.NODE_ENV === 'staging') || (SERVER && ENV.NODE_ENV === 'development')

export const DEV = STAGING || DEVELOPMENT
export const PROD = (SERVER && ENV.NODE_ENV === 'production') || (BROWSER && process.env.NODE_ENV === 'production')

export const FETCHAPI = (SERVER && ENV.FETCHAPI)
|| (BROWSER && sessionStorage.getItem('TMAPIFETCH'))
|| 'http://localhost:3001'

export const DEV_API_ENDPOINT = 'https://showstubs-tm-staging/api'
export const PROD_API_ENDPOINT = 'https://showstubs-tm-prod/api'

export const API = DEV ? BROWSER && DEV_API_ENDPOINT
  : PROD ? BROWSER && PROD_API_ENDPOINT : FETCHAPI

// Async States
export const FULFILLED = 'FULFILLED'
export const PENDING = 'PENDING'
export const REJECTED = 'REJECTED'

// HTTP Methods
export const GET = 'GET'
export const POST = 'POST'
export const PUT = 'PUT'
export const PATCH = 'PACTH'
export const DELETE = 'DELETE'

// Style
export const BLUE = 'rgba(47,47,204,1)'
export const LIGHT_BLUE = 'rgba(0,144,255,1)'
export const DARK_BLUE = 'rgba(0,11,51,1)'
export const BOX_SHADOW = '0px 3px 6px 0px rgba(0,0,0,.1)'
export const GREY = '#444444'
export const DARK_GREY = '#141414'

export const CARD_TITLE_PRIMARY = { fontSize: 32, fontWeight: 200 }
export const CARD_TITLE_SECONDARY = { fontSize: 14 }
