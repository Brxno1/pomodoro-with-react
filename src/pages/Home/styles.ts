import { darken } from 'polished'
import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  border-radius: 8px;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1rem;
  font-weight: bold;

  cursor: pointer;

  background-color: ${(props) => props.theme['grenn-500']};
  color: ${(props) => props.theme['gray-100']};
  transition: background-color 100ms ease;

  &[disabled] {
    background-color: ${(props) => darken(0.1, props.theme['grenn-500'])};
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme['grenn-500']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['grenn-700']};
  }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme['red-500']};

  &:hover {
    background-color: ${(props) => props.theme['red-700']};
  }
`
