import axios from "axios";

const API_URL = "http://localhost:3001/api/clientes";

// Helper para adjuntar el token JWT almacenado en el login
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const obtenerClientes = async () => {
    const respuesta = await axios.get(API_URL, {
        headers: getAuthHeaders()
    });
    return respuesta.data;
};

const obtenerClientePorId = async (id) => {
    const respuesta = await axios.get(`${API_URL}/${id}`, {
        headers: getAuthHeaders()
    });
    return respuesta.data;
};

const crearCliente = async (cliente) => {
    const respuesta = await axios.post(API_URL, cliente, {
        headers: getAuthHeaders()
    });
    return respuesta.data;
};

const actualizarCliente = async (id, cliente) => {
    const respuesta = await axios.put(`${API_URL}/${id}`, cliente, {
        headers: getAuthHeaders()
    });
    return respuesta.data;
};

const eliminarCliente = async (id) => {
    const respuesta = await axios.delete(`${API_URL}/${id}`, {
        headers: getAuthHeaders()
    });
    return respuesta.data;
};

export default {
    obtenerClientes,
    obtenerClientePorId,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};