import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()
  const username = router.query.username as string

  useEffect(() => {
    if (username) {
      router.push(`/github?user=${username}`)
    }
  }, [router, username])

  return null
}
