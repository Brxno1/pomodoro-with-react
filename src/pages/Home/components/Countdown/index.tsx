import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'

import { useCycleContext } from '../../../../contexts/hook/useCycleContext'
import * as S from './styles'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    updateElapsedSeconds,
  } = useCycleContext()

  // Calcula o total de segundos do ciclo ativo
  // Se não houver um ciclo ativo, o total de segundos é 0
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  // Calcula a quantidade de segundos restantes no ciclo ativo
  // Se não houver um ciclo ativo, a quantidade de segundos restantes é 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  // Calcula a quantidade de minutos e segundos restantes
  // Divide o número de segundos restantes por 60 para obter os minutos
  // E usa o operador módulo (%) para obter os segundos restantes
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  // Converte os valores de minutos e segundos para strings
  // E usa o método 'padStart' para garantir que eles tenham sempre 2 dígitos
  // (adicionando um '0' à esquerda, se necessário)
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${activeCycle.task} - ${minutes}:${seconds}`
    } else {
      document.title = 'ignite-timer'
    }
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: number | undefined

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startedAt),
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          updateElapsedSeconds(totalSeconds)
          clearInterval(interval)
        } else {
          updateElapsedSeconds(secondsDifference)
        }
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    updateElapsedSeconds,
  ])

  return (
    <S.CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <S.Separator>:</S.Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </S.CountdownContainer>
  )
}
