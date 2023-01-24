import { createContext } from 'react'

const UserContext = createContext({
  user: {
    name: '',
    gravatar: '',
    score: 0,
    token: '',
  },
})

export default UserContext
