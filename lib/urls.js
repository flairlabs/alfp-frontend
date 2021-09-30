const env_url = process.env.ENV_URL

export function SiteURL({path}) {
    return(`${env_url}${path}`)
}
