"use client"
import { useRouter } from 'next/navigation'

export default function Logout() {
    const router = useRouter()
    const logUserOut = async () => {
        try {
            await fetch('/api/users/logout', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            router.push('/login')
        } catch (e) {
            console.log(e)
        }
      }

      return (
        <button onClick={() => logUserOut()}>logout</button>
      )
}