import { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { fetchQuestions } from '../utils/fetchServices'
import UserContext from '../context/UserContext'
import { UserContextType } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'
import Badges from '../components/Badges'

interface DifficultyInterface {
  hard: number
  medium: number
  easy: number
}

interface QuestionInterface {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
}

const MAXTIMER = 30
const MAXQUESTIONS = 4
const DIFFICULTY: DifficultyInterface = {
  hard: 3,
  medium: 2,
  easy: 1,
}

const Game = () => {
  const [time, setTime] = useState(30)
  const [isActive, setIsActive] = useState(false)
  const [questions, setQuestions] = useState([])
  const [question, setQuestion] = useState<QuestionInterface>({
    category: '',
    correct_answer: '',
    difficulty: '',
    incorrect_answers: [],
    question: '',
  })
  const [answers, setAnswers] = useState([''])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [nextQuestion, setNextQuestion] = useState(false)
  const [score, setScore] = useState(0)
  const [badges, setBadges] = useState(['n', 'n', 'n', 'n', 'n'])

  const { user, settings, setUser } = useContext(UserContext) as UserContextType
  const navigate = useNavigate()

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (time && isActive) {
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    } else if (!time) {
      stopTimer()
      setNextQuestion(true)
    }
    return () => clearInterval(interval)
  }, [time, isActive])

  const stopTimer = () => {
    setIsActive(false)
    setNextQuestion(true)
  }

  const startTimer = () => {
    setIsActive(true)
  }

  // Questions
  const randomizeAnswers = () => {
    const { correct_answer, incorrect_answers } = question
    const answers = [...incorrect_answers, correct_answer]
    return answers.sort(() => Math.random() - 0.5)
  }

  useEffect(() => {
    const getQuestions = async () => {
      const { token } = user
      const { category, difficulty, type } = settings
      const { results } = await fetchQuestions(token, category, difficulty, type)
      setQuestions(results)
      setQuestion(results[questionIndex])
      startTimer()
    }

    getQuestions()
  }, [])

  useEffect(() => {
    if (questions.length) {
      setAnswers(randomizeAnswers())
    }
  }, [question])

  const decodeHtml = (html: string): string => {
    const txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { textContent } = e.currentTarget
    const { correct_answer: correctAnswer, difficulty } = question
    if (textContent === correctAnswer && isActive) {
      const scoreToAdd = time * DIFFICULTY[difficulty as keyof DifficultyInterface]
      setScore(score + scoreToAdd)
      setUser({ ...user, score: user.score + scoreToAdd })
      setBadges(badges.map((badge, index) => (index === questionIndex ? 'y' : badge)))
    } else {
      setBadges(badges.map((badge, index) => (index === questionIndex ? 'e' : badge)))
    }

    stopTimer()
  }

  const handleNextQuestion = () => {
    if (questionIndex === MAXQUESTIONS) {
      navigate('/feedback')
      return
    }
    setQuestionIndex(questionIndex + 1)
    setQuestion(questions[questionIndex + 1])
    setNextQuestion(false)
    setTime(MAXTIMER)
    startTimer()
  }

  const handleBg = (answer: string) => {
    const { correct_answer: correctAnswer } = question
    if (nextQuestion) {
      if (answer === correctAnswer) {
        return 'bg-green-500'
      } else if (answer !== correctAnswer) {
        return 'bg-red-500'
      }
    }
    return 'bg-cyan-500'
  }

  const { question: questionText } = question

  return (
    <main className="w-10/12">
      <Header />
      <Badges badgeState={badges} index={questionIndex} />
      <section className="flex w-full gap-2">
        <section className="flex flex-col w-full">
          <p className="text-center text-lg p-2">
            Pontuação: <span className="text-cyan-500 font-bold">{score}</span>{' '}
          </p>
          <h2 className="text-xl font-bold text-center">{decodeHtml(questionText)}</h2>
          <section className="flex w-8/12 mx-auto gap-4">
            <section className="mt-4 w-1/2 flex flex-col justify-center items-center">
              <CircularProgressbar
                value={time}
                maxValue={MAXTIMER}
                text={time.toString()}
                className="self-center"
              />
            </section>
            <section className="flex flex-col items-center justify-center mx-auto gap-2 mt-4 w-full">
              {answers.map((answer) => (
                <button
                  className={`bg-cyan-500 ${
                    nextQuestion && handleBg(answer)
                  } text-white p-2 rounded-md w-full opacity-90 duration-100 hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed`}
                  key={answer}
                  onClick={handleClick}
                  disabled={nextQuestion}
                >
                  {decodeHtml(answer)}
                </button>
              ))}
            </section>
          </section>
        </section>
      </section>
      <div className="w-full mt-8  flex justify-center items-center">
        <button
          className="bg-cyan-500 text-white p-2 rounded-md w-1/2 opacity-90 hover:opacity-100 duration-100 disabled:opacity-50 disabled:bg-gray-500 disabled:text-gray-200 disabled:cursor-not-allowed"
          disabled={!nextQuestion}
          onClick={handleNextQuestion}
        >
          Próxima pergunta
        </button>
      </div>
    </main>
  )
}

export default Game
