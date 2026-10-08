const API_URL = 'http://localhost:3001/api/usuarios'

const login = async (email, password, sector) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, sector })
    })
    const data = await response.json()
    if (!response.ok) return { ok: false, error: data.mensaje || 'CREDENCIALES' }
    return { ok: true, usuario: data.usuario, token: data.token }
  } catch (error) {
    return { ok: false, error: 'SERVIDOR' }
  }
}

const createUser = async (datosUser, token) => {
  try {
    const response = await fetch(`${API_URL}/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(datosUser)
    })
    const data = await response.json()
    if (!response.ok) return { ok: false, error: data.mensaje || 'ERROR' }
    return { ok: true, usuario: data }
  } catch (error) {
    return { ok: false, error: 'SERVIDOR' }
  }
}

export default { login, createUser }