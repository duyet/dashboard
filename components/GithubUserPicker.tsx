import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { TextInput } from '@tremor/react'

type Props = {
  username: string
}

export default function GithubUserPicker({ username }: Props) {
  const router = useRouter()
  const [input, setInput] = useState<string>(username)

  useEffect(() => {
    if (router.query.user) {
      setInput(router.query.user as string)
    }
  }, [router])

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        const path = router.pathname
        const user = input.replace('@', '')
        window.location.href = `${path}?user=${user}`
      }
    }

    const textInput = document.getElementById('github-user-picker')

    if (textInput) {
      textInput.addEventListener('keydown', keyDownHandler)

      return () => {
        textInput.removeEventListener('keydown', keyDownHandler)
      }
    }
  }, [router, input, username])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <TextInput
      id="github-user-picker"
      value={input}
      defaultValue={input}
      onChange={handleChange}
      maxWidth="max-w-0"
      placeholder="@username"
    />
  )
}
