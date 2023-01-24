import React, { useState } from 'react'
import UserContext from './UserContext'

export type UserContextType = {
  user: {
    token: string
    name: string
    email?: string
    gravatar: string
    score: number
  }
  settings: {
    category: string
    difficulty: string
    type: string
  }
  setUser: React.Dispatch<React.SetStateAction<UserContextType['user']>>
  setSettings: React.Dispatch<React.SetStateAction<UserContextType['settings']>>
}

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserContextType['user']>({
    token: '',
    name: '',
    email: '',
    gravatar: '',
    score: 0,
  })
  const [settings, setSettings] = useState<UserContextType['settings']>({
    category: '',
    difficulty: '',
    type: '',
  })

  return (
    <UserContext.Provider value={{ user, setUser, settings, setSettings }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
