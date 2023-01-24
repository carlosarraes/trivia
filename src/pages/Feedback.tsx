import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'

const Feedback = () => {
  const [ranking, setRanking] = useState([
    {
      name: '',
      gravatar: '',
      score: 0,
      token: '',
    },
  ])
  const [savedRanking, setSavedRanking] = useState(false)

  const navigate = useNavigate()
  const { user } = useContext(UserContext)
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
    } else if (!localStorage.ranking && !savedRanking) {
      localStorage.ranking = JSON.stringify([{ name, score, gravatar }])
      setRanking([{ name, score, gravatar, token }])
      setSavedRanking(true)
    }
  }, [])

  return (
    <section className="w-10/12">
      <section className="flex justify-between items-center">
        <h2 className="text-cyan-500 text-4xl font-bold">Trivia</h2>
        <div className="flex justify-end items-center">
          <div>
            <p>{name}</p>
          </div>
          <img src={gravatar} alt={name} />
        </div>
      </section>
      <section className="text-center">
        <h3 className="text-2xl">Feedback</h3>
        <p>Sua pontuação foi: {score}</p>
      </section>
      <section className="flex justify-center">
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
                <td className="font-bold text-2xl">{index + 1}</td>
                <td className="flex justify-center items-center gap-8">
                  <img src={gravatar} alt={name} />
                  <div className="text-md opacity-50">{name}</div>
                </td>
                <td>{score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  )
}

export default Feedback
