import React, { useState } from 'react'
import UserContext from './UserContext'

export type UserContextType = {
  user: {
    token: string
    name: string
    email: string
    gravatar: string
    score: number
  }
  setUser: React.Dispatch<React.SetStateAction<{}>>
}

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({
    token: '',
    name: '',
    email: '',
    gravatar: '',
    score: 0,
  })

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export default UserProvider
