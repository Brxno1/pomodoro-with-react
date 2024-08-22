import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'

import { CycleContextProvider } from './contexts/CycleContext'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </BrowserRouter>
      <GlobalStyle />
      <ToastContainer limit={1} position="top-center" autoClose={2000} theme="dark" />
    </ThemeProvider>
  )
}
