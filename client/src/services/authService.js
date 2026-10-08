const API_URL = 'http://localhost:3001/api/usuarios' // ajusta el puerto/ruta según tu server

const login = async (email, password, sector) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, sector })
    })

    const data = await response.json()

    if (!response.ok) {
      return { ok: false, error: data.mensaje || 'CREDENCIALES' }
    }

    // Tu backend devuelve { token, usuario }
    return { ok: true, usuario: data.usuario, token: data.token }
  } catch (error) {
    return { ok: false, error: 'SERVIDOR' }
  }
}

export default { login }