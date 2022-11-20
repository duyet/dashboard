import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()

  // Redirect to /duyet if no username is provided
  useEffect(() => {
    router.push('/duyet')
  }, [router])

  return null
}
