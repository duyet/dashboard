import useSWR from 'swr'

import { GithubEvents } from '../types/githubEvents'
import fetcher from '../libs/fetch'

export const useGithubEvents = (user: string) => {
  const { data, error } = useSWR<GithubEvents>(
    `https://api.github.com/users/${user}/events?per_page=100`,
    fetcher
  )

  if (!data) return { isLoading: true, isError: false }

  const repos = data
    .map((item) => item.repo.name)
    .filter((elem, index, self) => index === self.indexOf(elem))

  const eventTypes = data
    .map((item) => item.type)
    .filter((elem, index, self) => index === self.indexOf(elem))

  const actions = data
    .map((item) => item.payload.action)
    .filter((elem, index, self) => index === self.indexOf(elem))

  return {
    events: data,
    repos,
    eventTypes,
    actions,
    isLoading: !error && !data,
    isError: error,
  }
}
