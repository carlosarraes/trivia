import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { UserContextType } from '../context/UserProvider'

const Settings = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    difficulty: '',
    type: '',
  })

  const { setSettings } = useContext(UserContext) as UserContextType
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://opentdb.com/api_category.php')
      const { trivia_categories: triviaCategories } = await response.json()
      setData((data) => ({ ...data, categories: triviaCategories }))
    }
    fetchCategories()
  }, [])

  const { categories, category, difficulty, type } = data

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setData((data) => ({ ...data, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSettings({ category, difficulty, type })
    navigate('/')
    return
  }

  return (
    <section>
      <h1 className="text-center text-4xl font-bold mb-10 text-cyan-500">Configurações</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="category">
          <select
            name="category"
            id="category"
            value={category}
            onChange={handleChange}
            className="select select-info w-full max-w-xs text-center"
          >
            <option value="" disabled>
              Escolha uma categoria
            </option>
            {categories.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <div className="divider"></div>
        <label htmlFor="difficulty">
          <select
            name="difficulty"
            id="difficulty"
            value={difficulty}
            onChange={handleChange}
            className="select select-info w-full max-w-xs text-center"
          >
            <option value="" disabled>
              Escolha a dificuldade
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <div className="divider"></div>
        <label htmlFor="type">
          <select
            name="type"
            id="type"
            value={type}
            onChange={handleChange}
            className="select select-info w-full max-w-xs text-center"
          >
            <option value="" disabled>
              Escolha o tipo
            </option>
            <option value="multiple">Multiple</option>
            <option value="boolean">Boolean</option>
          </select>
        </label>
        <div>
          <button
            type="submit"
            className="btn btn-info mt-10 opacity-80 duration-100 hover:opacity-100 w-full"
          >
            Salvar
          </button>
        </div>
      </form>
    </section>
  )
}

export default Settings
