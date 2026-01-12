# Configuración de Administradores (Supabase Auth)

Hemos actualizado el sistema para usar **Supabase Auth**, lo que permite tener múltiples administradores con correos y contraseñas independientes.

## Pasos para crear un nuevo Administrador

1.  **Accede a tu Proyecto en Supabase**:
    - Ve a [https://supabase.com/dashboard](https://supabase.com/dashboard) y selecciona tu proyecto.

2.  **Habilitar Acesso por Correo (Solo la primera vez)**:
    - Ve a **Authentication > Providers**.
    - Asegúrate de que **Email** esté habilitado (`Enabled`).
    - Desactiva "Confirm email" si quieres poder entrar inmediatamente sin verificar el correo (útil para pruebas), o déjalo activo si prefieres mayor seguridad (requerirá confirmar el email real).

3.  **Crear el Usuario**:
    - Ve a **Authentication > Users**.
    - Haz clic en el botón **"Add User"** (arriba a la derecha).
    - Selecciona "Create New User".
    - Ingresa el **Email** del administrador (ej: `admin1@portail.com`).
    - Ingresa una **Contraseña** segura.
    - Haz clic en "Create User".
    - (Opcional) Si la confirmación de email estaba activa, haz clic en los tres puntos del usuario creado y selecciona "Confirm User" para activarlo manualmente si no tienes acceso al buzón de correo.

## Acceso al Panel

Una vez creado el usuario, puede iniciar sesión en la plataforma:
- **URL**: `/admin` (o `/admin/login`).
- **Credenciales**: El email y contraseña que acabas de crear.

¡Listo! Ahora puedes agregar tantos administradores como necesites.
