import axios from 'axios'
import { useEffect } from 'react'
import { useAuth } from 'src/hooks/useAuth'

const AxiosInterceptor = ({ children }) => {
  const auth = useAuth()

  useEffect(() => {
    const resInterceptor = response => {
      return response
    }

    const errInterceptor = error => {
      if (error.response.status === 401) {
        console.log('Finally errInterceptor', auth)

        // auth.setUser(null)
        // auth.setLoading(false)

        auth.logout()

        // navigate('/login')
      }

      return Promise.reject(error)
    }

    const interceptor = axios.interceptors.response.use(resInterceptor, errInterceptor)

    return () => axios.interceptors.response.eject(interceptor)
  }, [])

  return children
}

export { AxiosInterceptor }
