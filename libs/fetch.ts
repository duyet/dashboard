export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)
  return res.json()
}

export async function fetcherMultiple<JSON = any>(
  urls: string[]
): Promise<JSON> {
  const f = (url: string) => fetch(url).then((r) => r.json())
  return Promise.all(urls.map((url) => f(url))) as Promise<JSON>
}
