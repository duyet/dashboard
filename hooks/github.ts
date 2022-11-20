import useSWR from 'swr'

import { GithubEvent } from '../types/githubEvents'
import { GithubUser } from '../types/githubUser'
import { GithubError } from '../types/githubError'

import { fetcher, fetcherMultiple } from '../libs/fetch'

export const useGithubEvents = (
  user: string,
  total_page: number = 3,
  per_page: number = 50
) => {
  const urls = Array.from(Array(total_page).keys()).map(
    (i) =>
      `https://api.github.com/users/${user}/events?per_page=${per_page}&page=${
        i + 1
      }`
  )

  const { data, error } = useSWR<Array<GithubEvent[] | GithubError>>(
    urls,
    fetcherMultiple
  )

  if (!data) return { isLoading: true, isError: false }
  if (error) return { isLoading: false, isError: true }

  // Data is array of array
  let allData: GithubEvent[] = (data as Array<GithubEvent[]>)
    .filter((item) => !!item)
    .filter(Array.isArray)
    .flat()

  // Error capturing on each data: { message: 'API rate limit ...' }
  const isError = (data as GithubError[]).some(
    (item: GithubError) => !!item.message
  )
  const errorMessage = (data as GithubError[])
    .filter((item: GithubError) => !!item.message)
    .map((item: GithubError) => item.message)
    .filter((v, i, a) => a.indexOf(v) === i)
    .join(', ')

  if (isError && errorMessage) {
    return {
      isLoading: false,
      isError: true,
      errorMessage,
    }
  }

  const repos = allData
    .map((item: GithubEvent) => item.repo.name)
    .filter((elem, index, self) => index === self.indexOf(elem))

  const eventTypes = allData
    .map((item: GithubEvent) => item.type)
    .filter((elem, index, self) => index === self.indexOf(elem))

  const actions = allData
    .map((item: GithubEvent) => item.payload.action)
    .filter((elem, index, self) => index === self.indexOf(elem))

  return {
    events: allData,
    repos,
    eventTypes,
    actions,
    isLoading: !error && !data,
    isError,
  }
}

export const useGithubUser = (user: string) => {
  const { data, error } = useSWR<GithubUser>(
    `https://api.github.com/users/${user}`,
    fetcher
  )

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}
