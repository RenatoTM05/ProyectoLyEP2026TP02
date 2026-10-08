import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = 'http://localhost:3001/api/usuarios'

const RegistroUsuario = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: '',
    nombre: '',
    sector: 'Soporte'
  })
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setExito('')

    try {
      const response = await fetch(`${API_URL}/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.mensaje || 'Error al registrar usuario')
        return
      }

      setExito('Usuario creado correctamente. Ya podés iniciar sesión.')
      setForm({ email: '', password: '', nombre: '', sector: 'Soporte' })

      // Opcional: redirigir al login después de 2 segundos
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setError('Error de conexión con el servidor')
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Crear Usuario</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {exito && <div className="alert alert-success">{exito}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            minLength={6}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Sector</label>
          <select
            name="sector"
            className="form-select"
            value={form.sector}
            onChange={handleChange}
            required
          >
            <option value="Soporte">Soporte</option>
            <option value="Gerencia">Gerencia</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Crear Usuario
        </button>
      </form>
    </div>
  )
}

export default RegistroUsuario