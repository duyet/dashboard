import { ColGrid, Metric, Text, Card } from '@tremor/react'
import { ColGridProps } from '@tremor/react/dist/esm/types/components/layout-elements/ColGrid/ColGrid'

import { useGithubUser } from '../../hooks/github'

type GithubUserStatsProps = {
  username: string
}

type GithubUserStatsPropsAndColGridProps = Omit<
  GithubUserStatsProps & ColGridProps,
  'children'
>

export default function GithubUserStats({
  username,
  ...props
}: GithubUserStatsPropsAndColGridProps) {
  const { user } = useGithubUser(username)

  if (!user) return <></>

  return (
    <ColGrid
      numColsMd={4}
      numColsSm={2}
      gapX='gap-x-3'
      gapY='gap-y-3'
      {...props}
    >
      <Card>
        <Text>Public Repos</Text>
        <Metric>{user?.public_repos}</Metric>
      </Card>
      <Card>
        <Text>Public Gists</Text>
        <Metric>{user?.public_gists}</Metric>
      </Card>
      <Card>
        <Text>Followers</Text>
        <Metric>{user?.followers}</Metric>
      </Card>
      <Card>
        <Text>Following</Text>
        <Metric>{user?.following}</Metric>
      </Card>
    </ColGrid>
  )
}
