// Importa o tipo 'Cycle' do arquivo 'reducer'
import { Cycle } from './reducer'

// Define um enum para os tipos de ações
export enum ActionTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

// Define a interface para o payload da ação 'CREATE_NEW_CYCLE'
interface CreateNewCycleActionPayload {
  newCycle: Cycle
}

// Define a interface para a ação 'CREATE_NEW_CYCLE'
export interface CreateNewCycleAction {
  type: ActionTypes.CREATE_NEW_CYCLE
  payload: CreateNewCycleActionPayload
}

// Cria a função de ação 'createNewCycleAction'
// Recebe um objeto 'Cycle' e retorna uma ação do tipo 'CreateNewCycleAction'
export function createNewCycleAction(newCycle: Cycle): CreateNewCycleAction {
  return {
    type: ActionTypes.CREATE_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

// Define a interface para o payload da ação 'MARK_CURRENT_CYCLE_AS_FINISHED'
interface MarkCurrentCycleAsFinishedActionPayload {
  finishedAt: Date
}

// Define a interface para a ação 'MARK_CURRENT_CYCLE_AS_FINISHED'
export interface MarkCurrentCycleAsFinishedAction {
  type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED
  payload: MarkCurrentCycleAsFinishedActionPayload
}

// Cria a função de ação 'markCurrentCycleAsFinishedAction'
// Retorna uma ação do tipo 'MarkCurrentCycleAsFinishedAction'
export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
  }
}

// Define a interface para o payload da ação 'INTERRUPT_CURRENT_CYCLE'
interface InterruptCurrentCycleActionPayload {
  interruptedAt: Date
}

// Define a interface para a ação 'INTERRUPT_CURRENT_CYCLE'
export interface InterruptCurrentCycleAction {
  type: ActionTypes.INTERRUPT_CURRENT_CYCLE
  payload: InterruptCurrentCycleActionPayload
}

// Cria a função de ação 'interruptCurrentCycleAction'
// Retorna uma ação do tipo 'InterruptCurrentCycleAction'
export function interruptCurrentCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}
