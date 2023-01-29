export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)

  const json = await res.json()

  return json
}

export async function fetcherMultiple<JSON = any>(
  urls: string[]
): Promise<JSON> {
  const f = (url: string) => fetcher(url)
  return Promise.all(urls.map((url) => f(url))) as Promise<JSON>
}
