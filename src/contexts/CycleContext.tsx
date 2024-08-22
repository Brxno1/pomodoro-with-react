import { useReducer, useState } from 'react'
import { toast } from 'react-toastify'

import {
  CreateNewCycleAction,
  createNewCycleAction,
  InterruptCurrentCycleAction,
  interruptCurrentCycleAction,
  MarkCurrentCycleAsFinishedAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { Cycle, CyclesReducer, initialState } from '../reducers/cycles/reducer'
import { CycleContext } from './hook/useCycleContext'

interface CreateCycleData {
  task: string
  minutesAmount: number
}
export interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  updateElapsedSeconds: (elapsedSeconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  InterruptCurrentCycle: () => void
}

interface CycleProviderProps {
  children: React.ReactElement
}

export function CycleContextProvider({ children }: CycleProviderProps) {
  const [cyclesState, dispatchCycles] = useReducer(CyclesReducer, initialState)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  /**
   * Atualiza a quantidade de segundos passados desde o início do ciclo ativo.
   * @param {number} elapsedSeconds - A diferença em segundos desde o último update.
   */
  function updateElapsedSeconds(elapsedSeconds: number) {
    setAmountSecondsPassed(elapsedSeconds)
  }

  /**
   * Cria um novo ciclo e o adiciona à lista de ciclos.
   * @param {CreateCycleData} data - Objeto contendo os dados do novo ciclo.
   * @param {string} data.task - A tarefa associada ao novo ciclo.
   * @param {number} data.minutesAmount - A quantidade de minutos do novo ciclo.
   */
  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    }

    dispatchCycles(createNewCycleAction(newCycle) as CreateNewCycleAction)
    toast.success(`Novo ciclo "${data.task}" criado!`)
    setAmountSecondsPassed(0)
  }

  /**
   * Marca o ciclo ativo como concluído.
   */
  function markCurrentCycleAsFinished() {
    dispatchCycles(markCurrentCycleAsFinishedAction() as MarkCurrentCycleAsFinishedAction)
    toast.success(`Ciclo "${activeCycle?.task}" concluído!`)
  }

  /**
   * Interrompe o ciclo ativo.
   */
  function InterruptCurrentCycle() {
    dispatchCycles(interruptCurrentCycleAction() as InterruptCurrentCycleAction)
    toast.warn(
      `Ciclo "${cycles.find((cycle) => cycle.id === activeCycleId)?.task}" interrompido!`,
    )
  }

  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        cycles,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        updateElapsedSeconds,
        createNewCycle,
        InterruptCurrentCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
