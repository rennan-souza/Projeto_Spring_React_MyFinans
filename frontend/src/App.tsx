import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Public from "./views/public"
import Login from "./views/public/login"
import Private from "./views/private"
import Home from "./views/private/dashboard"
import { useEffect, useState } from "react"
import type { AuthContextDataType } from "./types/AuthContextDataType"
import { isAuthenticated } from "./services/AuthService"
import { AuthContext } from "./contexts/AuthContext"
import PrivateRoute from "./components/PrivateRoute"
import CriarConta from "./views/public/criar-conta"
import CadastrarLancamento from "./views/private/lancamento/cadastrar-lancamento"
import BuscarLancamentos from "./views/private/lancamento/buscar-lancamentos"

function App() {

  const [authContextData, setAuthContextData] = useState<AuthContextDataType>({
    authenticated: false,
  });

  useEffect(() => {
    if (isAuthenticated() === true) {
      setAuthContextData({ authenticated: true })
    } else {
      setAuthContextData({ authenticated: false })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Public />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="login" element={<Login />} />
            <Route path="criar-conta" element={<CriarConta />} />
          </Route>


          <Route path="/" element={<Private />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/dashboard" element={<PrivateRoute perfis={['ROLE_USER']}><Home /></PrivateRoute>} />
            <Route path="/cadastrar-lancamento" element={<PrivateRoute perfis={['ROLE_USER']}><CadastrarLancamento /></PrivateRoute>} />
            <Route path="/buscar-lancamentos" element={<PrivateRoute perfis={['ROLE_USER']}><BuscarLancamentos /></PrivateRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
