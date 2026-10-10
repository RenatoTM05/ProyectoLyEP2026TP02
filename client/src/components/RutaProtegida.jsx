import { Navigate } from 'react-router-dom'
import useAutorizaciones from '../hooks/useAutorizaciones'

const RutaProtegida = ({ children, sectorRequerido }) => {
  const { admin } = useAutorizaciones()

  if (!admin) {
    return <Navigate to="/login" replace />
  }

  if (sectorRequerido && admin.sector !== sectorRequerido) {
    return <Navigate to="/" replace />
  }

  return children
  
}

export default RutaProtegida