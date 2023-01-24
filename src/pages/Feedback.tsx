import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import UserContext from '../context/UserContext'
import { UserContextType } from '../context/UserProvider'

const Feedback = () => {
  const [ranking, setRanking] = useState([
    {
      name: '',
      gravatar: '',
      score: 0,
      token: '',
    },
  ])
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext) as UserContextType
  const { name, gravatar, score, token } = user

  useEffect(() => {
    if (!token) {
      navigate('/')
      return
    }

    if (localStorage.ranking) {
      const ranking = JSON.parse(localStorage.ranking)
      const newRanking = [...ranking, { name, score, gravatar }]
      newRanking.sort((a, b) => b.score - a.score)
      localStorage.ranking = JSON.stringify(newRanking)
      setRanking(newRanking)
    } else if (!localStorage.ranking) {
      localStorage.ranking = JSON.stringify([{ name, score, gravatar }])
      setRanking([{ name, score, gravatar, token }])
    }
  }, [])

  const handleBg = (index: number) => {
    if (index === 0) {
      return 'text-yellow-500 '
    } else if (index === 1) {
      return 'text-gray-500 '
    } else if (index === 2) {
      return 'text-orange-500 '
    } else {
      return 'text-white '
    }
  }

  const resetGamePlayAgain = () => {
    setUser({
      name: '',
      gravatar: '',
      score: 0,
      token: '',
    })
    navigate('/')
    return
  }

  return (
    <section className="w-8/12 space-y-2">
      <Header />
      <section className="my-4 text-center">
        <p>
          Sua pontuação foi: <span className="font-bold text-cyan-500">{score}</span>
        </p>
      </section>
      <section className="flex flex-col overflow-x-auto justify-center">
        <table className="table mx-auto w-1/2">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map(({ score, name, gravatar }, index) => (
              <tr key={index}>
                <td className={`${handleBg(index)}font-bold text-2xl`}>{index + 1}</td>
                <td className="flex justify-center items-center gap-8">
                  <img src={gravatar} alt={name} />
                  <div className="text-md opacity-50">{name}</div>
                </td>
                <td>{score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <section className="flex justify-center items-center mt-8">
          <button
            className="btn btn-info opacity-80 duration-100 hover:opacity-100 w-1/2"
            onClick={resetGamePlayAgain}
          >
            Jogar novamente
          </button>
        </section>
      </section>
    </section>
  )
}

export default Feedback
