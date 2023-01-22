import { Md5 } from 'ts-md5'

export const fetchToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request')
  const data = await response.json()
  return data
}

export const fetchQuestions = async (
  token: string,
  category?: string,
  difficulty?: string,
  type?: string,
) => {
  let url = 'https://opentdb.com/api.php?amount=5'
  if (category) url += `&category=${category}`
  if (difficulty) url += `&difficulty=${difficulty}`
  if (type) url += `&type=${type}`

  const response = await fetch(`${url}&token=${token}`)
  const data = await response.json()
  return data
}

export const fetchGravatar = async (email: string) => {
  const hash = Md5.hashStr(email)
  const response = await fetch(`https://www.gravatar.com/avatar/${hash}`)
  return response.url
}
