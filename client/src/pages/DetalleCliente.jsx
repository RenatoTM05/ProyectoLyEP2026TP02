import '../css/detallecliente.css'
import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import FormCliente from "../components/FormCliente";
import clientesService from "../services/clientesService";

const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [cliente, setCliente] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [eliminando, setEliminando] = useState(false);
  const [editando, setEditando] = useState(false);
  const formularioRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [clienteInexistente, setClienteInexistente] = useState(false);

  const cargarCliente = useCallback(async () => {
    setLoading(true);
    setError("");
    setClienteInexistente(false);
    setCliente(null);

    try {
      const data = await clientesService.obtenerClientePorId(id);
      if (!data || (!data.id && !data._id)) {
        setClienteInexistente(true);
        return;
      }
      setCliente(data);
    } catch (err) {
      if (err.response?.status === 404) {
        setClienteInexistente(true);
      } else {
        setError(err.response?.data?.mensaje || err.message || "Ocurrió un error inesperado.");
      }
      
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    cargarCliente();
  }, [cargarCliente]);

  const eliminarCliente = async () => {
    const confirmar = window.confirm(
      "¿Está seguro de que desea eliminar este cliente?"
    );

    if (!confirmar) return;

    setEliminando(true);
    setMensaje("");

    try {
      await clientesService.eliminarCliente(id);
      setMensaje("Cliente eliminado correctamente");

      setTimeout(() => {
        navigate("/clientes", { state: { clienteEliminado: id } });
        setEliminando(false);
      }, 1000);
    } catch (err) {
      setMensaje(err.response?.data?.mensaje || "Error al eliminar cliente");
      setEliminando(false);
    }
  };

  if (loading) {
    return (
      <section className="estado-detalle" role="status" aria-live="polite">
        <h2>Cargando cliente...</h2>
        <p>Estamos obteniendo la ficha solicitada.</p>
      </section>
    );
  }

  if (clienteInexistente) {
    return (
      <section className="estado-detalle" role="alert">
        <h2>Cliente inexistente</h2>
        <p>No existe un cliente con el identificador solicitado.</p>
        <Link className="btn-volver-clientes" to="/clientes">Volver a clientes</Link>
      </section>
    );
  }

  if (error) {
    return (
      <section className="estado-detalle estado-detalle-error" role="alert">
        <h2>No se pudo cargar la ficha</h2>
        <p>{error}</p>
        <button type="button" onClick={cargarCliente}>Reintentar</button>
        <Link className="btn-volver-clientes" to="/clientes">Volver a clientes</Link>
      </section>
    );
  }

  return (
    <div className="detalle-cliente">
      <h1>Ficha del Cliente</h1>
      <p>Rol actual: {role}</p>

      {mensaje && <p className='mensaje-eliminado'>{mensaje}</p>}
      {editando && (
        <div ref={formularioRef}>
          <FormCliente cliente={cliente} />
        </div>
      )}

      <p>
        <strong>ID:</strong> {cliente.id || cliente._id}
      </p>

      <p>
        <strong>Nombre:</strong>{" "}
        {cliente.nombre
          ? `${cliente.nombre} ${cliente.apellido || ''}`.trim()
          : `${cliente.name?.firstname || ''} ${cliente.name?.lastname || ''}`.trim()}
      </p>

      <p>
        <strong>Email:</strong> {cliente.email}
      </p>

      <p>
        <strong>Teléfono:</strong> {cliente.telefono || cliente.phone || 'No especificado'}
      </p>

      <h2>Dirección</h2>

      <p>
        <strong>Dirección:</strong> {cliente.direccion || cliente.address?.street || 'No especificada'}
      </p>

      <p>
        <strong>Ciudad:</strong> {cliente.ciudad || cliente.address?.city || 'No especificada'}
      </p>

      <h2>Credenciales</h2>

      <p>
        <strong>Usuario:</strong> {cliente.username}
      </p>



      {role?.trim() === "Gerencia" && (
        <>
          <button
            className="btn-eliminar"
            onClick={eliminarCliente}
            disabled={eliminando}
            title={eliminando ? "Eliminando cliente" : "Eliminar cliente"}
          >
            {eliminando ? "Eliminando..." : "Eliminar Cliente"}
          </button>

          <button
            className="btn-eliminar"
            onClick={() => {
              setEditando(true);

              setTimeout(() => {
                formularioRef.current?.scrollIntoView({ behavior: "smooth" });
              });
            }}
          >
            Editar Cliente
          </button>
        </>
      )}
    </div>
  );
};

export default DetalleCliente;
