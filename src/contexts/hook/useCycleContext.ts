import { createContext, useContext } from 'react'

import { CycleContextType } from '../CycleContext'

export const CycleContext = createContext<CycleContextType>({} as CycleContextType)

export function useCycleContext() {
  const context = useContext(CycleContext)

  if (!context) {
    throw new Error('useCycleContext must be used within a <CycleContextProvider />')
  }

  return context
}
