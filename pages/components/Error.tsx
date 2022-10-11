import { Text } from '@tremor/react'

export type ErrorProps = {
  message?: string
}

export default function Error({
  message = 'Something went wrong',
}: ErrorProps) {
  return (
    <Text marginTop="mt-5" color="red">
      {message}
    </Text>
  )
}
