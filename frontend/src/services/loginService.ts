import axios from '../util/apiClient'

const baseUrl = '/login'

export const login = async (email: string, password: string) => {
  const response = await axios.post(
    `${baseUrl}`,
    { email, password },
    {
      withCredentials: true,
    },
  )
  return response.data
}

export default { login }
