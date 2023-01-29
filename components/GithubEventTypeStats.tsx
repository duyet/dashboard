import { useEffect, useState } from 'react'
import { Title, Text, Bold } from '@tremor/react'
import { Flex, Card, Dropdown, DropdownItem } from '@tremor/react'
import { DonutChart, BarList } from '@tremor/react'

import { LoadingList } from './Loading'
import { useGithubEvents } from '../hooks/github'
import { GithubEvent } from '../types/githubEvents'

type GithubEventTypeStatsProps = {
  username: string
}

type Data = {
  repo: string
  name: string
  value: number
}

const filterByRepoName = (repo: string, data: Data[]) =>
  data.filter((item) => item.repo === repo)

export default function GithubEventTypeStats({
  username,
}: GithubEventTypeStatsProps) {
  const { repos, events, isLoading, isError } = useGithubEvents(username)
  const [data, setData] = useState<Data[]>([])
  const [filteredData, setFilteredData] = useState<Data[]>([])
  const [selectedRepo, setSelectedRepo] = useState('all')

  useEffect(() => {
    if (!repos || !events) {
      return
    }

    const eventTypes = events
      .map((item: GithubEvent) => item.type)
      .filter((elem, index, self) => index === self.indexOf(elem))

    const eventCountByRepo: Data[] = repos.flatMap((repo: string) => {
      const filteredEvents = events.filter(
        (item: GithubEvent) => item.repo.name === repo
      )

      return eventTypes.map((type) => ({
        repo: repo,
        name: type,
        value: filteredEvents.filter((item: GithubEvent) => item.type === type)
          .length,
      }))
    })

    const eventCountAllRepo: Data[] = eventTypes.map((type) => ({
      repo: 'all',
      name: type,
      value: events.filter((item: GithubEvent) => item.type === type).length,
    }))

    setData(eventCountByRepo.concat(eventCountAllRepo))
  }, [repos, events])

  useEffect(() => {
    const sortData = (data: any[]) =>
      data.sort((a, b) => {
        if (a.value < b.value) return 1
        if (a.value > b.value) return -1
        return 0
      })

    const filtered = filterByRepoName(selectedRepo, data)
    setFilteredData(sortData(filtered))
  }, [data, selectedRepo])

  if (isLoading) return <LoadingList />

  if (!repos || !events || isError) {
    return null
  }

  return (
    <Card marginTop="mt-5">
      <Flex spaceX="space-x-8">
        <Title>Repo Stats</Title>
        <Dropdown
          onValueChange={(value: string) => setSelectedRepo(value)}
          placeholder="Repo Selection"
          maxWidth="max-w-0"
        >
          {repos.map((repo) => (
            <DropdownItem key={repo} value={repo} text={repo} />
          ))}
        </Dropdown>
      </Flex>

      <DonutChart
        data={filteredData}
        variant="pie"
        marginTop="mt-6"
        height="h-32"
      />

      <Flex marginTop="mt-6">
        <Text>
          <Bold>Event Type</Bold>
        </Text>
        <Text>
          <Bold>#</Bold>
        </Text>
      </Flex>

      <BarList data={filteredData} marginTop="mt-4" />
    </Card>
  )
}
