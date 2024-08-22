import { zodResolver } from '@hookform/resolvers/zod'
import { Pause, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'

import { useCycleContext } from '../../contexts/hook/useCycleContext'
import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'
import * as S from './styles'

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, 'Informe o nome da tarefa'),
  minutesAmount: z
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

export type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, InterruptCurrentCycle } = useCycleContext()

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {!activeCycle && (
          <S.StartCountdownButton type="submit" disabled={!!isSubmitDisabled}>
            <Play size={24} />
            Começar
          </S.StartCountdownButton>
        )}
        {activeCycle && (
          <S.StopCountdownButton onClick={InterruptCurrentCycle} type="button">
            <Pause size={24} />
            Interromper
          </S.StopCountdownButton>
        )}
      </form>
    </S.HomeContainer>
  )
}
