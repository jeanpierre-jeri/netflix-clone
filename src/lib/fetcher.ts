import axios from 'redaxios'

export const fetcher = (url: string) => axios.get(url).then((res) => res.data)
