export const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
export const ACCOUNT_ID = import.meta.env.VITE_TMDB_ACCOUNT_ID;
export const HEADER = {
    headers: {
        "Authorization": "Bearer " + TOKEN
    }
}
