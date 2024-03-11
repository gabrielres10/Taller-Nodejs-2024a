## API de eventos NODE.JS

**Descripción:**

Esta API te permite interactuar con un sistema de gestión de eventos. Puedes crear, editar, eliminar y obtener información sobre usuarios, eventos y suscripciones.

## **Ejecución (Local):**

1. **Clonar/descargar** el proyecto desde [https://github.com/gabrielres10/Taller-Nodejs-2024a](https://github.com/gabrielres10/Taller-Nodejs-2024a).
2. **Tener la última versión de Node.js** instalada en tu equipo.
3. **Abrir la consola** en el directorio base del proyecto.
4. **Ejecutar** el comando `npm install`. Esto instalará todas las dependencias necesarias para que funcione el proyecto.
5. **Ejecutar** el comando `npm run dev`. Para que el proyecto empiece a correr.

## **Contexto:**

* **Usuarios:** Se pueden registrar, iniciar sesión y tener diferentes roles (superadmin, organizer, assistant).
* **Eventos:** Se pueden crear, editar, eliminar y obtener información sobre ellos.
* **Suscripciones:** Los usuarios pueden suscribirse a eventos.

## **Endpoints:**

### GET:

* **Usuarios autenticados:**
    * *Perfil del usuario:* `https://taller-nodejs-2024a.onrender.com/users/profile`
    * *Eventos filtrados:* `https://taller-nodejs-2024a.onrender.com/events/filter?title=nombre_evento&date=2024-03-15&location=ubicacion_evento`
    * *Todos los eventos:* `https://taller-nodejs-2024a.onrender.com/events`
    * *Evento por ID:* `https://taller-nodejs-2024a.onrender.com/events/65ee6dab4641418a090100bc`
* **Usuarios con rol "superadmin":**
    * *Todos los usuarios:* `https://taller-nodejs-2024a.onrender.com/users`
    * *Usuario por ID:* `https://taller-nodejs-2024a.onrender.com/users/65ee57d0627b0fa608c625a7`
* **Usuarios con rol "organizer":**
    * *Asistentes del evento:* `https://taller-nodejs-2024a.onrender.com/events/assistants`
* **Usuarios con rol "assistant":**
    * *Todas las suscripciones:* `https://taller-nodejs-2024a.onrender.com/subscriptions`

### POST:

* **Login (Pública - No auth):**
    * *Permite el login del usuario si este ya existe:* `https://taller-nodejs-2024a.onrender.com/login`
    * *Ejemplo de JSON:*
        ```json
        {
            "email": "administrator@email.com",
            "password":"12345678"
        }
        ```
* **Usuarios con rol "superadmin":**
    * *Crear usuario:* `https://taller-nodejs-2024a.onrender.com/users`
    * *Ejemplo de JSON:*
        ```json
        {
            "name": "organizer",
            "email": "organizer@email.com",
            "password":"12345678",
            "role": "organizer"
        }
        ```
* **Usuarios con rol "organizer":**
    * *Crear evento:* `https://taller-nodejs-2024a.onrender.com/events`
    * *Ejemplo de JSON:*
        ```json
        {
            "title": "Carullita",
            "description": "Nada que explicar",
            "date":"2024-03-15",
            "time": "14:00",
            "location": "Carulla"
        }
        ```
* **Usuarios con rol "assistant":**
    * *Crear suscripción:* `https://taller-nodejs-2024a.onrender.com/subscriptions`
    * *Ejemplo de JSON:*
        ```json
        {
            "eventId": "65ee6dab4641418a090100bc"
        }
        ```

### PUT:

* **Usuarios con rol "superadmin":**
    * *Editar usuario:* `https://taller-nodejs-2024a.onrender.com/users/65ee57d0627b0fa608c625a7`
    * *Ejemplo de JSON:*
        ```json
        {
            "name": "organizer",
            "email": "organizer2@email.com",
            "password":"87654321",
            "role": "organizer"
        }
        ```
* **Usuarios con rol "organizer":**
    * *Editar evento:* `https://taller-nodejs-2024a.onrender.com/events/65ee6dab4641418a090100bc`
    * *Ejemplo de JSON:*
        ```json
        {
            "title": "Carullita boosted",
            "description": "Llevar un amigo",
            "date":"2024-03-15",
            "time": "14:00",
            "location": "Carulla"
        }
        ```
* **Usuarios con rol "assistant":**
    * *Editar suscripción:* `https://taller-nodejs-2024a.onrender.com/subscriptions/65eaa98s9d8a1jky23f10d34`
    * *Ejemplo de JSON:*
        ```json
        {
            "eventId": "65eaa98s9d8a1jky23f10d34"
        }
        ```

### DELETE:

* **Usuarios con rol "superadmin":**
    * *Eliminar usuario:* `https://taller-nodejs-2024a.onrender.com/users/65ee57d0627b0fa608c625a7`
* **Usuarios con rol "organizer":**
    * *Eliminar evento:* `https://taller-nodejs-2024a.onrender.com/events/65ee6dab4641418a090100bc`
* **Usuarios con rol "assistant":**
    * *Eliminar suscripción:* `https://taller-nodejs-2024a.onrender.com/events/65eaa98s9d8a1jky23f10d34`


## **Autenticación:**

Las peticiones a los endpoints que requieren autenticación deben incluir un token de acceso en la cabecera `Authorization`. El token de acceso se puede obtener mediante el endpoint de login.
