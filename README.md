# Proyecto Final para curso Fullstack de Rolling Code

###RollingVet es el nombre del proyecto y consta de una página web de una Veterinaria. Esta planteada para ser usada desde el perfil de un cliente que va a tener mascotas registradas en la veterinaria, veterinarios que van a llevar el registro de sus pacientes y de un administrador que va a gestionar toda la aplicacióm.


# Manual de Usuario - RollingVet

## 1. Introducción

La aplicación permite la gestión de roles (Administrador, Cliente, y Veterinario), lo que otorga diferentes permisos dentro de la página. Los usuarios invitados pueden navegar la estructura de la página y ver los servicios que brinda la veterinaria, pero no tienen acceso a los servicios, solo pueden visualizarlos.

---

## 2. Roles y Permisos

### Administrador
- Tiene acceso completo a todas las funciones del sistema.
- Puede gestionar usuarios, cambiar roles, eliminar usuarios, y administrar la información de las mascotas y sus consultas.

### Cliente
- Puede acceder a su perfil personal, visualizar y gestionar sus mascotas, ver próximas consultas y citas.
- Puede reservar turnos, filtrar turnos por día y administrar el perfil de sus mascotas.

### Veterinario
- Accede a la gestión de las consultas y visitas de las mascotas.
- Puede agregar vacunas, consultas, y procedimientos para las mascotas registradas.

---

## 3. Secciones Principales de la Aplicación

### 3.1 Inicio
- Presenta algunos servicios ofrecidos por la veterinaria.
- Sección de planes disponibles con opción de abrir un formulario de consulta que envía un correo electrónico.

### 3.2 Servicios
- Muestra los servicios que ofrece la veterinaria.
- Cada servicio tiene una tarjeta desde donde se pueden reservar turnos específicos para ese servicio.

### 3.3 Turnos
- Página principal para la gestión de turnos.
- Permite reservar turnos y filtrarlos por día.

### 3.4 Especialistas
- Muestra a los veterinarios que trabajan en la veterinaria.

### 3.5 Contacto
- Muestra las sucursales de la veterinaria.
- Incluye un formulario para enviar un correo electrónico de contacto.

### 3.6 Sobre Nosotros
- Una breve explicación sobre la veterinaria y su historia.

---

## 4. Funcionalidades del Cliente

### 4.1 Mi Perfil
- Visualiza los datos del usuario logueado.
- Muestra el próximo turno pendiente, las mascotas registradas a nombre del cliente, y la opción de agregar una nueva mascota.
- Se listan todas las consultas realizadas a las mascotas.
- Se puede acceder al perfil de cada mascota para ver:
  - Detalles de la mascota.
  - Historial de vacunas.
  - Historial de visitas y consultas.
  - Visitas pendientes.

### 4.2 Perfil de la Mascota
- Editar foto de perfil.
- Registrar nuevas consultas o visitas.
- Cargar visitas pendientes o agregar una vacuna.
- Marcar a la mascota como castrada.
- Asignar un plan a la mascota o eliminarla.
- Gestionar vacunas, consultas o procedimientos futuros.

---
## 5. Funcionalidades del Administrador

### 5.1 Gestión de Usuarios
- Acceso a un panel para gestionar usuarios.
- Cambiar roles de los usuarios, eliminarlos, y gestionar la información de las mascotas.

### 5.2 Gestión de Mascotas
- Desde el perfil de un cliente, se puede acceder al perfil de sus mascotas.
- Registrar consultas o visitas.
- Cargar visitas pendientes o agregar vacunas.
- Marcar mascotas como castradas, asignar planes o eliminar datos de mascotas, vacunas o consultas.

### 5.3 ABM (Alta, Baja y Modificación) de Servicios y Sucursales
- El administrador tiene control total sobre los **servicios** que ofrece la veterinaria, pudiendo crear, editar o eliminar servicios según sea necesario.
- Además, puede gestionar las **sucursales**, agregando nuevas ubicaciones, actualizando detalles de las existentes o eliminando las que ya no están en funcionamiento.

### 5.4 Creación de Turnos
- El administrador tiene la capacidad de crear turnos **genéricos** que se gestionan de manera semanal.
- Estos turnos cubren el horario de **lunes a viernes, de 9 a 18**.
- Los turnos creados pueden ser utilizados por los clientes para reservar sus citas a través de la página.

