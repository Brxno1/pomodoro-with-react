import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useEffect } from 'react'

import { useCycleContext } from '../../contexts/hook/useCycleContext'
import * as S from './styles'

export function History() {
  const { cycles } = useCycleContext()

  useEffect(() => {
    document.title = 'Histórico'
  }, [])

  return (
    <S.HistoryContainer>
      <h1>Meu histórico</h1>
      <S.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>início</th>
              <th>status</th>
            </tr>
          </thead>

          <tbody>
            {!!cycles.length &&
              cycles.map((cycle) => (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {cycle.startedAt &&
                      formatDistanceToNow(cycle.startedAt, {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                  </td>
                  <td>
                    {cycle.finishedAt && <S.Status $statusColor="green">Concluido</S.Status>}

                    {cycle.interruptedAt && (
                      <S.Status $statusColor="red">Interrompido</S.Status>
                    )}

                    {!cycle.finishedAt && !cycle.interruptedAt && (
                      <S.Status $statusColor="yellow">Em andamento</S.Status>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {!cycles.length && (
          <div>
            <h1>Nenhum ciclo encontrado</h1>
          </div>
        )}
      </S.HistoryList>
    </S.HistoryContainer>
  )
}
