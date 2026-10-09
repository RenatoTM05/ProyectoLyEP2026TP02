import '../css/formcliente.css'
import { useState, useEffect } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import clientesService from "../services/clientesService";

const FormCliente = ({ cliente }) => {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [telefono, setTelefono] = useState("");
    const [ciudad, setCiudad] = useState("");

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (cliente) {
            setNombre(cliente.nombre || cliente.name?.firstname || "");
            setEmail(cliente.email || "");
            setTelefono(cliente.telefono || cliente.phone || "");
            setCiudad(cliente.ciudad || cliente.address?.city || "");
        }
    }, [cliente]);

    const manejarSubmit = async (e) => {

        e.preventDefault();

        setMensaje("");
        setError("");

        if (
            nombre.trim() === "" ||
            email.trim() === "" ||
            telefono.trim() === "" ||
            ciudad.trim() === ""
        ) {
            setError("Complete todos los campos.");
            return;
        }

        const emailNormalizado = email.trim();
        const telefonoNormalizado = telefono.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const telefonoRegex = /^\d{10}$/;

        if (!emailRegex.test(emailNormalizado) || !telefonoRegex.test(telefonoNormalizado)) {
            setError("Debe ingresar un formato de email o teléfono válido (10 dígitos).");
            return;
        }

        if (!cliente && (contraseña.length < 8 || !/[A-Z]/.test(contraseña) || !/[0-9]/.test(contraseña))) {
            setError(
                "Parámetros de contraseña incorrectos. La contraseña debe tener: " +
                "mínimo 8 caracteres, una mayúscula y un número."
            );
            return;
        }

        // Estructura adaptada al esquema de MongoDB
        const nuevoCliente = {
            nombre: nombre.trim(),
            apellido: cliente?.apellido || "-",
            email: emailNormalizado,
            username: cliente?.username || (nombre.toLowerCase().replace(/\s/g, "") + Math.floor(Math.random() * 100)),
            password: contraseña || "Password123",
            telefono: telefonoNormalizado,
            ciudad: ciudad.trim(),
            direccion: cliente?.direccion || "-"
        };

        try {
            setLoading(true);
            let respuesta;
            if (cliente) {
                respuesta = await clientesService.actualizarCliente(cliente.id || cliente._id, nuevoCliente);
                setMensaje(`Cliente actualizado correctamente. ID: ${cliente.id || cliente._id}`);
            } else {
                respuesta = await clientesService.crearCliente(nuevoCliente);
                setMensaje(`Cliente creado correctamente. ID: ${respuesta.id || respuesta._id}`);
            }

            setNombre("");
            setEmail("");
            setContraseña("");
            setTelefono("");
            setCiudad("");

            setTimeout(() => {
                navigate("/clientes");
            }, 1500);
        } catch (err) {
            setError(
                err.response?.data?.mensaje ||
                (cliente ? "Ocurrió un error al actualizar el cliente." : "Ocurrió un error al crear el cliente.")
            );
        } finally {
            setLoading(false);
        }

    };

    return (

        <div className='formulario-cliente'>

            <h3>{cliente ? "Editar Cliente" : "Nuevo Cliente"}</h3>

            <Form onSubmit={manejarSubmit}>

                <Form.Group className="mb-3">

                    <Form.Label>Nombre</Form.Label>

                    <Form.Control
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Contraseña</Form.Label>

                    <Form.Control
                        type="password"
                        value={contraseña}
                        placeholder={cliente ? "Dejar en blanco para conservar o ingresar nueva" : ""}
                        onChange={(e) => setContraseña(e.target.value)}
                    />
                    <Form.Text muted>
                        Debe tener mínimo 8 caracteres, una mayúscula y un número.
                    </Form.Text>

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Email</Form.Label>

                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Teléfono</Form.Label>

                    <Form.Control
                        type="text"
                        placeholder="Ej. 1234567890"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Ciudad</Form.Label>

                    <Form.Control
                        type="text"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                    />

                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? <Spinner size="sm" /> : cliente ? "Editar Cliente" : "Crear Cliente"}
                </Button>

            </Form>

            {mensaje && <Alert className="mt-3" variant="success">{mensaje}</Alert>}
            {error && <Alert className="mt-3" variant="danger">{error}</Alert>}
        </div>
        
    );
};

export default FormCliente;