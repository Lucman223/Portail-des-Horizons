# Guía de Despliegue (Puesta en Línea)

¡Tu plataforma está lista para el mundo! Sigue estos pasos para subirla gratis a Vercel (el mejor hosting para Next.js).

## 1. Subir el Código a GitHub
(Si ya sabes usar Git, puedes saltarte esto y hacer push a tu repositorio).

Si no tienes el código en GitHub aún:
1.  Crea un repositorio en [GitHub.com](https://github.com/new).
2.  Ejecuta estos comandos en la terminal de VS Code:
    ```bash
    git init
    git add .
    git commit -m "Primera versión lista"
    git branch -M main
    git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
    git push -u origin main
    ```

## 2. Publicar en Vercel
1.  Ve a [Vercel.com](https://vercel.com) y crea una cuenta (puedes usar la de GitHub).
2.  Haz clic en **"Add New..."** > **"Project"**.
3.  Importa tu repositorio de GitHub.
4.  En la pantalla de configuración ("Configure Project"):
    *   **Framework Preset:** Next.js (se detecta automático).
    *   **Root Directory:** `app` (IMPORTANTE: selecciona la carpeta `app` porque ahí está el código).
    *   **Environment Variables:**
        *   Abre la sección "Environment Variables".
        *   Añade las mismas claves que pusiste en tu `.env` local:
            *   `NEXT_PUBLIC_SUPABASE_URL`: (Tu URL de Supabase)
            *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Tu Clave Pública de Supabase)
5.  Haz clic en **"Deploy"**.

## 3. ¡Listo!
Vercel te dará un enlace (ej: `portail-des-horizons.vercel.app`). ¡Esa es tu página web en vivo!

---
**Nota sobre dominios:**
Si quieres un dominio propio (ej: `portail-des-horizons.com`), puedes comprarlo en Vercel o en Namecheap y conectarlo en la sección "Domains" del proyecto en Vercel.
