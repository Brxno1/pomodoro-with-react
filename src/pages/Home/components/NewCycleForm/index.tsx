import { useFormContext } from 'react-hook-form'

import { useCycleContext } from '../../../../contexts/hook/useCycleContext'
import * as S from './styles'

export function NewCycleForm() {
  const { activeCycle } = useCycleContext()

  const { register } = useFormContext()

  return (
    <S.FormContainer>
      <label>Vou trabalhar em </label>
      <S.TaskInput
        type="text"
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        maxLength={16}
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="React" />
        <option value="Next.js" />
        <option value="Gatsby" />
        <option value="Svelte" />
        <option value="Vue" />
      </datalist>

      <label>durante </label>
      <S.MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', {
          valueAsNumber: true,
        })}
      />
      <span>minutos.</span>
    </S.FormContainer>
  )
}
