import { Dropdown, DropdownItem } from '@tremor/react'

// TableView props type
type GithubUserProps = {
  list: string[]
  selectedUser: string
  setSelectedUser: (username: string) => void
}

export default function GithubUser({
  list,
  selectedUser,
  setSelectedUser,
}: GithubUserProps) {
  if (!list) return <></>

  return (
    <Dropdown
      placeholder='User'
      defaultValue={selectedUser}
      handleSelect={(value) => setSelectedUser(value)}
      maxWidth='max-w-none'
      marginTop='mt-0'
    >
      {list.map((user) => (
        <DropdownItem key={user} text={user} value={user} />
      ))}
    </Dropdown>
  )
}
