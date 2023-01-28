import { useState } from 'react'
import { useRouter } from 'next/router'
import { Block, Flex, Tab, TabList, Title, ColGrid } from '@tremor/react'

import Chart from './components/Chart'
import KpiCardGrid from './components/Cards'
import GithubChart from './components/GithubChart'
import GithubEvents from './components/GithubEvents'
import GithubUserPicker from './components/GithubUserPicker'
import GithubTopRepoStats from './components/GithubTopRepoStats'
import GithubEventTypeStats from './components/GithubEventTypeStats'

// TODO: input from user
const GITHUB_USERS = ['duyet', 'duyetbot']

export default function Page() {
  const router = useRouter()
  const username = router.query.username as string

  const [selectedView, setSelectedView] = useState(1)

  return (
    <>
      <Title>Dashboard</Title>
      <TabList
        defaultValue={1}
        onValueChange={(value) => setSelectedView(value)}
        marginTop='mt-6'
      >
        <Tab value={1} text='Github Events' />
        <Tab value={2} text='Overview' />
      </TabList>

      {selectedView == 1 && (
        <Block marginTop='mt-6'>
          <Flex>
            <GithubUserPicker
              list={GITHUB_USERS}
              selectedUser={username}
              setSelectedUser={(user) => router.push(`/${user}`)}
            />
          </Flex>
          <GithubChart username={username} />
          <ColGrid numColsSm={2} gapX='gap-x-6' gapY='gap-y-6'>
            <GithubTopRepoStats username={username} />
            <GithubEventTypeStats username={username} />
          </ColGrid>
          <GithubEvents username={username} />
        </Block>
      )}

      {selectedView === 2 && (
        <>
          <KpiCardGrid />

          <Block marginTop='mt-6'>
            <Chart />
          </Block>
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
