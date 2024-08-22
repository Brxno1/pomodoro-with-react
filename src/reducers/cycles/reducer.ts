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
    case ActionTypes.CREATE_NEW_CYCLE:
      // Quando a ação é do tipo 'CREATE_NEW_CYCLE', o reducer:
      // 1. Cria uma cópia do estado atual usando o spread operator (...state)
      // 2. Adiciona o novo ciclo à lista de ciclos, usando o spread operator ([...state.cycles])
      // 3. Atualiza o ID do ciclo ativo com o ID do novo ciclo criado
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      // Quando a ação é do tipo 'MARK_CURRENT_CYCLE_AS_FINISHED', o reducer:
      // 1. Cria uma cópia do estado atual usando o spread operator (...state)
      // 2. Atualiza o ciclo ativo, definindo a propriedade 'finishedAt' com a data atual
      // 3. Define o ID do ciclo ativo como null, indicando que não há mais um ciclo ativo
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              finishedAt: new Date(),
            }
          }
          return cycle
        }),
        activeCycleId: null,
      }

    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      // Quando a ação é do tipo 'INTERRUPT_CURRENT_CYCLE', o reducer:
      // 1. Cria uma cópia do estado atual usando o spread operator (...state)
      // 2. Atualiza o ciclo ativo, definindo a propriedade 'interruptedAt' com a data atual
      // 3. Define o ID do ciclo ativo como null, indicando que não há mais um ciclo ativo
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              interruptedAt: new Date(),
            }
          }
          return cycle
        }),
        activeCycleId: null,
      }

    default:
      // Caso a ação não seja reconhecida, o reducer retorna o estado atual inalterado
      return state
  }
}
