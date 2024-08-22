import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import * as S from './styles'

export function Page404() {
  const [time, setTime] = useState(5)
  const interval = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const navigate = useNavigate()

  useEffect(() => {
    interval.current = setTimeout(() => {
      setTime(time - 1)
    }, 1000)

    if (time === 0) {
      navigate('/')
    }

    return () => {
      if (interval.current !== undefined) {
        clearTimeout(interval.current)
      }
    }
  }, [time, navigate])

  useEffect(() => {
    document.title = '404'
  }, [])

  return (
    <S.Page404Container>
      <h1>Page not found</h1>
      <p>Redirect in {time} seconds</p>
    </S.Page404Container>
  )
}
