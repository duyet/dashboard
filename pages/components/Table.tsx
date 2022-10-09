import { useState } from 'react';
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
} from '@tremor/react';

import { useGithubEvents } from '../../hooks/github';

// TableView props type
type TableViewProps = {
  username: string;
};

export default function TableView({ username }: TableViewProps) {
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);

  const { events, repos, eventTypes, isLoading, isError } =
    useGithubEvents(username);

  if (isError) return <p>Error...</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!events) return <p>No events</p>;

  const isRepoSelected = (item: any) =>
    (selectedRepos.includes(item.repo.name) || selectedRepos.length === 0) &&
    (selectedType.includes(item.type) || selectedType.length === 0);

  const badgeEventTypeColor = (type: string) => {
    switch (type) {
      case 'PushEvent':
        return 'green';
      case 'PullRequestEvent':
        return 'blue';
      case 'DeleteEvent':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Card>
      <Flex justifyContent="justify-start" spaceX="space-x-2">
        <MultiSelectBox
          handleSelect={(value) => setSelectedType(value)}
          placeholder="Event Type(s)"
          maxWidth="max-w-xs"
        >
          {eventTypes.map((type) => (
            <MultiSelectBoxItem key={type} value={type} text={type} />
          ))}
        </MultiSelectBox>
        <MultiSelectBox
          handleSelect={(value) => setSelectedRepos(value)}
          placeholder="Repo(s)"
          maxWidth="max-w-xs"
        >
          {repos.map((name) => (
            <MultiSelectBoxItem key={name} value={name} text={name} />
          ))}
        </MultiSelectBox>
      </Flex>
      <Table marginTop="mt-6">
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
                  <Text color="gray" truncate={true}>
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
                    target="_blank"
                    rel="noreferrer"
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
  );
}
