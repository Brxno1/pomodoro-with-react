import { produce } from 'immer'

import {
  ActionTypes,
  CreateNewCycleAction,
  InterruptCurrentCycleAction,
  MarkCurrentCycleAsFinishedAction,
} from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startedAt: Date
  interruptedAt?: Date
  finishedAt?: Date
}
interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export const initialState: CyclesState = {
  cycles: [],
  activeCycleId: null,
}

export type CyclesAction =
  | CreateNewCycleAction
  | InterruptCurrentCycleAction
  | MarkCurrentCycleAsFinishedAction

export function CyclesReducer(state: CyclesState, action: CyclesAction): CyclesState {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE: {
      // Essa ação é responsável por criar um novo ciclo e adicioná-lo à lista de ciclos do estado.
      // Ela também define o novo ciclo como o ciclo ativo.
      return produce(state, (draftState) => {
        draftState.cycles.push(action.payload.newCycle) // Adiciona o novo ciclo à lista de ciclos
        draftState.activeCycleId = action.payload.newCycle.id // Define o novo ciclo como o ciclo ativo
      })
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      // Essa ação é responsável por marcar o ciclo ativo como concluído.
      // Ela define o ciclo ativo como nulo e define a data de conclusão do ciclo ativo.
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      }) // Encontra o índice do ciclo ativo na lista de ciclos

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draftState) => {
        draftState.activeCycleId = null // Define o ciclo ativo como nulo
        draftState.cycles[currentCycleIndex].finishedAt = new Date() // Define a data de conclusão do ciclo ativo
      })
    }

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      // Essa ação é responsável por interromper o ciclo ativo.
      // Ela define o ciclo ativo como nulo e define a data de interrupção do ciclo ativo.
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      }) // Encontra o índice do ciclo ativo na lista de ciclos

      if (currentCycleIndex < 0) {
        return state
      }
      return produce(state, (draftState) => {
        draftState.activeCycleId = null // Define o ciclo ativo como nulo
        draftState.cycles[currentCycleIndex].interruptedAt = new Date() // Define a data de interrupção do ciclo ativo
      })
    }

    default: {
      return state
    }
  }
}
