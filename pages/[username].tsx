import { useState } from 'react'
import { useRouter } from 'next/router'
import { Block, Flex, Tab, TabList, Title, ColGrid, Icon } from '@tremor/react'
import { ChartPieIcon } from '@heroicons/react/solid'

import GithubEvents from './components/GithubEvents'
import GithubUserPicker from './components/GithubUserPicker'
import GithubTopRepoStats from './components/GithubTopRepoStats'
import GithubOverviewCharts from './components/GithubOverviewCharts'
import GithubEventTypeStats from './components/GithubEventTypeStats'

// TODO: input from user
const GITHUB_USERS = ['duyet', 'duyetbot']

export default function Page() {
  const router = useRouter()
  const username = router.query.username as string

  const [selectedView, setSelectedView] = useState(1)

  return (
    <>
      <Flex justifyContent='justify-between' alignItems='items-center'>
        <Flex justifyContent='justify-start'>
          <Icon icon={ChartPieIcon} />
          <Title>Dashboard</Title>
        </Flex>
        <GithubUserPicker
          list={GITHUB_USERS}
          selectedUser={username}
          setSelectedUser={(user) => router.push(`/${user}`)}
        />
      </Flex>

      <TabList
        defaultValue={1}
        onValueChange={(value) => setSelectedView(value)}
        marginTop='mt-6'
      >
        <Tab value={1} text='Overview' />
        <Tab value={2} text='Events' />
      </TabList>

      {selectedView == 1 && (
        <Block marginTop='mt-6'>
          <GithubOverviewCharts username={username} />

          <ColGrid numColsSm={2} gapX='gap-x-6' gapY='gap-y-6'>
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

export async function getStaticPaths() {
  return {
    paths: GITHUB_USERS.map((username) => ({ params: { username } })),
    fallback: false, // can also be true or 'blocking'
  }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps() {
  return {
    props: {},
  }
}
