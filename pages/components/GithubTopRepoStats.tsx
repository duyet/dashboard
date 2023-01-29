import { useEffect, useState } from 'react'
import { BarList, DonutChart } from '@tremor/react'
import { Flex, Title, Text, Card, Bold } from '@tremor/react'

import { useGithubEvents } from '../../hooks/github'
import { GithubEvent } from '../../types/githubEvents'

type GithubTopRepoStatsProps = {
  username: string
}

type Data = {
  name: string
  value: number
}

export default function GithubTopRepoStats({
  username,
}: GithubTopRepoStatsProps) {
  const { repos, events, isLoading, isError } = useGithubEvents(username)
  const [data, setData] = useState<Data[]>([])

  useEffect(() => {
    if (!repos || !events || isLoading || isError) return

    const sortData = (data: any[]) =>
      data.sort((a, b) => {
        if (a.value < b.value) return 1
        if (a.value > b.value) return -1
        return 0
      })

    // Group by repo name, count event
    const eventCountByRepo: Data[] = repos.map((repo: string) => {
      const filteredEvents = events.filter(
        (item: GithubEvent) => item.repo.name === repo
      )

      return {
        name: repo,
        value: filteredEvents.length,
      }
    })

    setData(sortData(eventCountByRepo).slice(0, 10))
  }, [events, repos, isLoading, isError])

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (!events || isError) {
    return null
  }

  return (
    <Card marginTop="mt-5">
      <Title>Top 5 Repos</Title>

      <DonutChart data={data} variant="pie" marginTop="mt-6" height="h-32" />

      <Flex marginTop="mt-6">
        <Text>
          <Bold>Repository</Bold>
        </Text>
        <Text>
          <Bold>#</Bold>
        </Text>
      </Flex>

      <BarList data={data} marginTop="mt-4" />
    </Card>
  )
}
