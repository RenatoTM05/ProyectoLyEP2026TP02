# TRABAJO INTEGRADOR FINAL - PROGRAMACION VISUAL

## Descripción TP Integrador - 2026

Este proyecto consiste en la construcción de un Panel de Control de Clientes utilizando React y Vite. Esta aplicación permite la gestión y visualización de información de clientes a través del consumo de datos de la API pública FakeStoreAPI, además de la navegación entre distintas vistas de forma dinámica. El proyecto ahora cuenta con un backend propio desarrollado en Node.js, Express y MongoDB.

## Instalación y Configuración

Para iniciar el proyecto correctamente, sigue los siguientes pasos:

### 1. Variables de Entorno (.env)
El backend requiere ciertas variables de entorno para funcionar (como la cadena de conexión a MongoDB y los secretos de JWT).
*   **Enlace al archivo `.env` real**: https://drive.google.com/file/d/17fekwzdGcimxr3McurJA19CE5yhD2sma/view?usp=sharing
*   **Instrucciones**: Descarga el archivo `.env` desde el enlace proporcionado y colócalo en la carpeta `server/` de este proyecto. (También puedes guiarte con el archivo `server/.env.example`).

### 2. Levantar el Backend (Servidor)
Abre una terminal en la raíz del proyecto y ejecuta:
```bash
cd server
npm install
npm run dev
```

### 3. Levantar el Frontend (Cliente)
Abre otra terminal en la raíz del proyecto y ejecuta:
```bash
cd client
npm install
npm run dev
```

## Credenciales de Acceso por Defecto
Para probar el sistema, puedes iniciar sesión con las siguientes credenciales preconfiguradas:
*   **Usuario:** tu_email@gmail.com
*   **Contraseña:** TuPassword123

## Licencia de Uso
El código fuente está bajo licencia MIT.
La documentación y material pedagógico están bajo Creative Commons Attribution 4.0.
© 2026 — Cátedra Legislación y Ejercicio Profesional - Carrera Analista Programador Universitario - FI UNJu