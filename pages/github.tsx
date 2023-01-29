import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ChartPieIcon } from '@heroicons/react/solid'
import { Block, Flex, Tab, TabList, Title, ColGrid, Icon } from '@tremor/react'

import GithubEvents from './components/GithubEvents'
import GithubUserPicker from './components/GithubUserPicker'
import GithubTopRepoStats from './components/GithubTopRepoStats'
import GithubEventTypeStats from './components/GithubEventTypeStats'
import GithubEventsLineCharts from './components/GithubEventsLineCharts'
import GithubUserOverviewStats from './components/GithubUserOverviewStats'

export default function Page() {
  const router = useRouter()
  const [selectedView, setSelectedView] = useState(1)
  const [username, setUserName] = useState<string>(router.query.user as string)

  useEffect(() => {
    if (router.query.user) {
      setUserName(router.query.user as string)
    }
  }, [router])

  return (
    <>
      <Flex justifyContent="justify-between" alignItems="items-center">
        <Flex justifyContent="justify-start">
          <Icon icon={ChartPieIcon} />
          <Title>Dashboard</Title>
        </Flex>

        <GithubUserPicker username={username} />
      </Flex>

      <TabList
        defaultValue={1}
        onValueChange={(value) => setSelectedView(value)}
        marginTop="mt-6"
      >
        <Tab value={1} text="Overview" />
        <Tab value={2} text="Events" />
      </TabList>

      {selectedView == 1 && (
        <Block marginTop="mt-6">
          <GithubUserOverviewStats username={username} />
          <GithubEventsLineCharts username={username} />

          <ColGrid numColsSm={2} gapX="gap-x-6" gapY="gap-y-6">
            <GithubTopRepoStats username={username} />
            <GithubEventTypeStats username={username} />
          </ColGrid>
        </Block>
      )}

      {selectedView === 2 && (
        <>
          <GithubEvents username={username} />
        </>
      )}
    </>
  )
}
