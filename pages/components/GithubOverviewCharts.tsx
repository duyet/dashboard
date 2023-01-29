import { AreaChart, Block, Card } from '@tremor/react'

import { useGithubEvents } from '../../hooks/github'
import { GithubEvent } from '../../types/githubEvents'
import Loading from './Loading'
import Error from './Error'
import GithubUserStats from './GithubUserStats'

type ChartData = {
  [key: string]: string | number
}

// Data will be an array of { date, <EventType>: <Count> }
// Date formatted YYYY-MM-DD sorted in ascending order
const prepareData: (events: GithubEvent[]) => ChartData[] = (events) => {
  const data: { [date: string]: ChartData } = {}

  // All event type
  const allEventTypes = events
    .map((event) => event.type)
    .filter((v, i, a) => a.indexOf(v) === i)

  events.forEach((event) => {
    const date = event.created_at.split('T')[0]

    if (data[date]) {
      data[date][event.type] = (data[date][event.type] as number) + 1 || 1
    } else {
      data[date] = {
        date,
        [event.type]: 1,
      } as ChartData
    }

    // Add other event type with 0 count
    allEventTypes.forEach((type) => {
      if (!data[date][type]) {
        data[date][type] = 0
      }
    })
  })

  let chartData = Object.values(data)

  // Sort by date
  chartData = chartData.sort((a: ChartData, b: ChartData): number => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    return (dateA.getTime() - dateB.getTime()) as number
  })

  console.log(chartData)

  return chartData as ChartData[]
}

const getCategories: (data: GithubEvent[]) => string[] = (data) => {
  const categories = new Set()

  data.forEach((event) => {
    categories.add(event.type)
  })

  return Array.from(categories) as string[]
}

// TableView props type
type TableViewProps = {
  username: string
}

export default function GithubOverviewCharts({ username }: TableViewProps) {
  const { events, isLoading, isError } = useGithubEvents(username)

  if (isError) return <Error />
  if (isLoading) return <Loading />
  if (!events) return <p>No events</p>

  let chartdata = prepareData(events)
  let categories = getCategories(events)

  return (
    <Block>
      <GithubUserStats username={username} marginTop="mt-10" />

      <Card marginTop="mt-5">
        <AreaChart
          data={chartdata}
          categories={categories}
          stack={true}
          autoMinValue={true}
          showGridLines={true}
          showGradient={true}
          dataKey="date"
          marginTop="mt-4"
        />
      </Card>
    </Block>
  )
}
