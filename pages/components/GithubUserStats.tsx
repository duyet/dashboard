import { Flex, Metric, Text, Card } from '@tremor/react'
import { FlexProps } from '@tremor/react/dist/esm/types/components/layout-elements/Flex/Flex'

import { useGithubUser } from '../../hooks/github'

type GithubUserStatsProps = {
  username: string
}

type GithubUserStatsPropsAndFlexProps = Omit<
  GithubUserStatsProps & FlexProps,
  'children'
>

export default function GithubUserStats({
  username,
  ...flexProps
}: GithubUserStatsPropsAndFlexProps) {
  const { user } = useGithubUser(username)

  if (!user) return <></>

  return (
    <Flex spaceX="space-x-5" {...flexProps}>
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
    </Flex>
  )
}
