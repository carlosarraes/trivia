import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
  })

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate('/game')
  }

  const handleClick = () => {
    navigate('/settings')
  }

  const validateButton = () => {
    const { email, name } = userInfo
    const minCharName = 3
    const verifyEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(email)
    const verifyName = name.length >= minCharName
    return verifyEmail && verifyName
  }

  const { email, name } = userInfo

  return (
    <main className="flex flex-col justify-center max-w-xs">
      <h1 className="text-6xl text-center text-cyan-500">Trivia</h1>
      <form className="mt-8 space-y-2 text-center w-full" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          value={email}
          onChange={handleChange}
          className="input input-bordered input-info w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Nome"
          name="name"
          value={name}
          onChange={handleChange}
          className="input input-bordered input-info w-full max-w-xs"
        />
        <section className="flex justify-between">
          <button type="submit" className="btn btn-success" disabled={!validateButton()}>
            Entrar
          </button>
          <button type="button" className="btn btn-info" onClick={handleClick}>
            Configuracoes
          </button>
        </section>
      </form>
    </main>
  )
}

export default Login
