// App-wide configuration. Production values are the defaults.

const PROD_BASE_URL = 'https://carhive.co.in/api'

// Local/staging API for development builds, e.g. 'http://10.0.2.2:8000/api'.
// Only used when __DEV__ is true AND this is non-empty, so release builds
// always talk to production.
const DEV_BASE_URL = ''

export const BASE_URL = (__DEV__ && DEV_BASE_URL !== '') ? DEV_BASE_URL : PROD_BASE_URL

export const WEBSITE_URL = 'https://carhive.co.in'
export const TERMS_URL = `${WEBSITE_URL}/terms_conditions`
export const PRIVACY_URL = `${WEBSITE_URL}/privacy_policy`

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.carhive.user&pcampaignid=web_share'
export const APP_STORE_URL = 'https://apps.apple.com/in/app/carhive-rentals/id6748205300'
