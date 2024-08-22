import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    transition: all 0.5s ease-in-out;
  }

  img:hover {
    transform: rotate(360deg);
  }

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;

      transition: all 0.2s ease-in-out;

      color: ${(props) => props.theme['gray-100']};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['grenn-500']};
      }

      &.active {
        color: ${(props) => props.theme['grenn-500']};
      }
    }
  }
`
