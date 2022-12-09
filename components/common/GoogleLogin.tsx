import { Button } from "@mantine/core"
import { useSession, signIn, signOut } from "next-auth/react"

export default function GoogleLogin() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div>
        Signed in as {session.user?.email} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    )
  }
  return (
      <div>
      Not signed in <br />
      <Button onClick={() => signIn()}>Sign in</Button>
      </div>
  )
}