import { createContext } from 'react'
import { UserContextType } from './UserProvider'

const UserContext = createContext<UserContextType>({
  user: {
    token: '',
    name: '',
    email: '',
    gravatar: '',
    score: 0,
  },
  settings: {
    category: '',
    difficulty: '',
    type: '',
  },
  setUser: () => {},
  setSettings: () => {},
})

export default UserContext
