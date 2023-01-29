import { ColGrid, Text, Card } from '@tremor/react'
import { Metric, Footer, ButtonInline } from '@tremor/react'
import { ArrowNarrowRightIcon } from '@heroicons/react/solid'
import type { ColGridProps } from '@tremor/react/dist/esm/types/components/layout-elements/ColGrid/ColGrid'

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
        <Footer>
          <a href={`https://github.com/${username}/?tab=repositories`}>
            <ButtonInline
              size='sm'
              text='View details'
              icon={ArrowNarrowRightIcon}
              iconPosition='right'
            />
          </a>
        </Footer>
      </Card>

      <Card>
        <Text>Public Gists</Text>
        <Metric>{user?.public_gists}</Metric>

        <Footer>
          <a href={`https://gist.github.com/${username}`}>
            <ButtonInline
              size='sm'
              text='View details'
              icon={ArrowNarrowRightIcon}
              iconPosition='right'
            />
          </a>
        </Footer>
      </Card>

      <Card>
        <Text>Followers</Text>
        <Metric>{user?.followers}</Metric>

        <Footer>
          <a href={`https://github.com/${username}/?tab=followers`}>
            <ButtonInline
              size='sm'
              text='View details'
              icon={ArrowNarrowRightIcon}
              iconPosition='right'
            />
          </a>
        </Footer>
      </Card>
      <Card>
        <Text>Following</Text>
        <Metric>{user?.following}</Metric>
        <Footer>
          <a href={`https://github.com/${username}/?tab=following`}>
            <ButtonInline
              size='sm'
              text='View details'
              icon={ArrowNarrowRightIcon}
              iconPosition='right'
            />
          </a>
        </Footer>
      </Card>
    </ColGrid>
  )
}
