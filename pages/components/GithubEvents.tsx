import { useState } from 'react'
import {
  Badge,
  Card,
  Flex,
  MultiSelectBox,
  MultiSelectBoxItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from '@tremor/react'

import Loading from './Loading'
import Error from './Error'
import { useGithubEvents } from '../../hooks/github'

// TableView props type
type TableViewProps = {
  username: string
}

export default function GithubEvents({ username }: TableViewProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedRepos, setSelectedRepos] = useState<string[]>([])

  const { events, repos, eventTypes, isLoading, isError, errorMessage } =
    useGithubEvents(username)

  if (isError && errorMessage) return <Error message={errorMessage} />
  if (isLoading) return <Loading />
  if (!events) return <p>No events</p>

  const isRepoSelected = (item: any) =>
    (selectedRepos.includes(item.repo.name) || selectedRepos.length === 0) &&
    (selectedTypes.includes(item.type) || selectedTypes.length === 0)

  const badgeEventTypeColor = (type: string) => {
    switch (type) {
      case 'PushEvent':
        return 'green'
      case 'PullRequestEvent':
        return 'blue'
      case 'DeleteEvent':
        return 'red'
      default:
        return 'gray'
    }
  }

  return (
    <Card marginTop='mt-5'>
      <Flex justifyContent='justify-end' spaceX='space-x-2'>
        <MultiSelectBox
          onValueChange={(value: string[]) => setSelectedTypes(value)}
          placeholder='Event Type(s)'
          maxWidth='max-w-0'
        >
          {eventTypes.map((type) => (
            <MultiSelectBoxItem key={type} value={type} text={type} />
          ))}
        </MultiSelectBox>
        <MultiSelectBox
          onValueChange={(value: string[]) => setSelectedRepos(value)}
          placeholder='Repo(s)'
          maxWidth='max-w-0'
        >
          {repos.map((name) => (
            <MultiSelectBoxItem key={name} value={name} text={name} />
          ))}
        </MultiSelectBox>
      </Flex>
      <Table marginTop='mt-6'>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Event Time</TableHeaderCell>
            <TableHeaderCell>Event</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Payload</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {events
            .filter((item) => isRepoSelected(item))
            .map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Text color='gray' truncate={true}>
                    {item.created_at}
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge
                    color={badgeEventTypeColor(item.type)}
                    text={item.type}
                  />
                </TableCell>
                <TableCell>
                  <a
                    href={'https://github.com/' + item.repo.name}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {item.repo.name}
                  </a>
                </TableCell>
                <TableCell>
                  <Text truncate={true}>{JSON.stringify(item.payload)}</Text>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  )
}
