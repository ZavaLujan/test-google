# Documentación del Proyecto NestJS: testwind

## Endpoints Disponibles

### Autenticación (`/auth`)

- **POST `/auth/register`**
  - Registra un nuevo usuario.
  - Body: `{ "email": string, "password": string }`
  - Respuesta: Usuario creado.

- **POST `/auth/login`**
  - Inicia sesión con email y contraseña.
  - Body: `{ "email": string, "password": string }`
  - Respuesta: `{ access_token: string }` o `{ error: 'Invalid credentials' }`

- **GET `/auth/profile`**
  - Devuelve el perfil del usuario autenticado (requiere JWT en el header `Authorization: Bearer <token>`).
  - Respuesta: Datos del usuario autenticado.

- **GET `/auth/google`**
  - Inicia el flujo de autenticación con Google (OAuth2).

- **GET `/auth/google/redirect`**
  - Endpoint de redirección de Google OAuth2. Devuelve JWT y datos del usuario autenticado por Google.

## Cómo correr el proyecto

1. **Clona el repositorio y entra a la carpeta:**
   ```sh
   git clone <repo_url>
   cd testwind
   ```

2. **Instala las dependencias:**
   ```sh
   npm install
   ```

3. **Configura las variables de entorno:**
   - Copia `.env.example` a `.env` y completa los valores necesarios (especialmente los de Google OAuth si usarás Google Login).

4. **Levanta la base de datos (PostgreSQL) con Docker:**
   ```sh
   docker-compose up -d
   ```
   - Esto crea una base de datos en `localhost:5440` (puerto externo).

5. **Inicia la aplicación en modo desarrollo:**
   ```sh
   npm run start:dev
   ```
   - El servidor estará en `http://localhost:3000`

6. **Corre los tests:**
   ```sh
   npm run test
   ```

## Flujo típico de la aplicación

1. **Inicio**
   - Levanta la base de datos con Docker: `docker-compose up -d`.
   - Inicia la aplicación: `npm run start:dev`.
   - El servidor estará disponible en `http://localhost:3000`.

2. **Registro de usuario**
   - Envía una petición `POST` a `/auth/register` con email y contraseña para crear un usuario.

3. **Login**
   - Envía una petición `POST` a `/auth/login` con las credenciales.
   - Recibe un `access_token` (JWT) si las credenciales son correctas.

4. **Acceso a recursos protegidos**
   - Usa el token JWT recibido en el header `Authorization: Bearer <token>` para acceder a rutas protegidas, como `/auth/profile`.

5. **Login con Google (opcional)**
   - Accede a `/auth/google` para iniciar el flujo OAuth2 de Google.
   - Google redirige a `/auth/google/redirect` y la app devuelve el JWT y los datos del usuario autenticado por Google.

6. **Finalización**
   - Puedes detener la app con `Ctrl+C` en la terminal.
   - Para detener la base de datos: `docker-compose down`.

---
Este flujo cubre desde el arranque hasta el cierre de la aplicación, incluyendo autenticación tradicional y con Google.

## Notas
- El proyecto usa TypeORM y PostgreSQL.
- El registro y login usan JWT.
- El login con Google requiere configurar credenciales de Google.
- Puedes modificar la configuración de la base de datos en `.env` o en `ormconfig.ts`.

---

Generado automáticamente a partir del código fuente.
