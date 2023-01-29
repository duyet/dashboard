import { ColGrid, Text, Card } from '@tremor/react'
import { Metric, Footer, Button } from '@tremor/react'
import { ArrowNarrowRightIcon } from '@heroicons/react/solid'
import type { ColGridProps } from '@tremor/react/dist/esm/types/components/layout-elements/ColGrid/ColGrid'

import { useGithubUser } from '../../hooks/github'

type GithubUserOverviewStatsProps = {
  username: string
}

type GithubUserOverviewStatsPropsAndColGridProps = Omit<
  GithubUserOverviewStatsProps & ColGridProps,
  'children'
>

export default function GithubUserOverviewStats({
  username,
  ...props
}: GithubUserOverviewStatsPropsAndColGridProps) {
  const { user, isLoading, error } = useGithubUser(username)

  if (!user || isLoading) return null
  if (error) {
    console.error(error)
    return null
  }

  return (
    <ColGrid
      numColsMd={4}
      numColsSm={2}
      gapX="gap-x-3"
      gapY="gap-y-3"
      {...props}
    >
      <Card>
        <Text>Public Repos</Text>
        <Metric>{user?.public_repos}</Metric>
        <Footer>
          <a href={`https://github.com/${username}/?tab=repositories`}>
            <Button
              size="sm"
              variant="light"
              text="View details"
              icon={ArrowNarrowRightIcon}
              iconPosition="right"
            />
          </a>
        </Footer>
      </Card>

      <Card>
        <Text>Public Gists</Text>
        <Metric>{user?.public_gists}</Metric>

        <Footer>
          <a href={`https://gist.github.com/${username}`}>
            <Button
              size="sm"
              variant="light"
              text="View details"
              icon={ArrowNarrowRightIcon}
              iconPosition="right"
            />
          </a>
        </Footer>
      </Card>

      <Card>
        <Text>Followers</Text>
        <Metric>{user?.followers}</Metric>

        <Footer>
          <a href={`https://github.com/${username}/?tab=followers`}>
            <Button
              size="sm"
              variant="light"
              text="View details"
              icon={ArrowNarrowRightIcon}
              iconPosition="right"
            />
          </a>
        </Footer>
      </Card>
      <Card>
        <Text>Following</Text>
        <Metric>{user?.following}</Metric>
        <Footer>
          <a href={`https://github.com/${username}/?tab=following`}>
            <Button
              size="sm"
              variant="light"
              text="View details"
              icon={ArrowNarrowRightIcon}
              iconPosition="right"
            />
          </a>
        </Footer>
      </Card>
    </ColGrid>
  )
}
