import styled from 'styled-components'

export const Page404Container = styled.main`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 15% auto;

  p {
    color: ${({ theme }) => theme['gray-400']};
    margin-top: 1rem;
  }
`
