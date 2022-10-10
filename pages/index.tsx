import { useState } from 'react'
import { Block, Flex, Tab, TabList, Title, Card } from '@tremor/react'

import KpiCardGrid from './components/Cards'
import Chart from './components/Chart'

import GithubUserPicker from './components/GithubUserPicker'
import GithubEvents from './components/GithubEvents'
import GithubChart from './components/GithubChart'

// TODO: input from user
const GITHUB_USERS = ['duyet', 'duyetbot']

export default function Page() {
  const [selectedView, setSelectedView] = useState(1)
  const [selectedUser, setSelectedUser] = useState(GITHUB_USERS[0])

  return (
    <main className="bg-slate-50 p-12">
      <Title>Dashboard</Title>
      <TabList
        defaultValue={1}
        handleSelect={(value) => setSelectedView(value)}
        marginTop="mt-6"
      >
        <Tab value={1} text="Github Events" />
        <Tab value={2} text="Overview" />
      </TabList>

      {selectedView == 1 && (
        <Block marginTop="mt-6">
          <Card>
            <Flex>
              <Block> </Block>
              <GithubUserPicker
                list={GITHUB_USERS}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            </Flex>
            <GithubChart username={selectedUser} />
            <GithubEvents username={selectedUser} />
          </Card>
        </Block>
      )}

      {selectedView === 2 && (
        <>
          <KpiCardGrid />

          <Block marginTop="mt-6">
            <Chart />
          </Block>
        </>
      )}
    </main>
  )
}
