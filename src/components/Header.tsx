import { useContext } from 'react'
import UserContext from '../context/UserContext'
import { UserContextType } from '../context/UserProvider'

const Header = () => {
  const { user } = useContext(UserContext) as UserContextType
  const { name, gravatar } = user

  return (
    <header className="flex justify-around text-center w-8/10">
      <h1 className="text-3xl self-center text-cyan-400">Trivia</h1>
      <section className="flex flex-col self-center">
        <img
          src={gravatar}
          alt={name}
          className="w-12 rounded-full ring ring-cyan-500 ring-offset-2 ring-offset-gray-700"
        />
        <p className="pt-1">{name}</p>
      </section>
    </header>
  )
}

export default Header
