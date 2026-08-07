# tustareas.py

Sitio institucional de asesoría académica construido con Next.js, React, TypeScript y Framer Motion.

## Requisitos

- Node.js 22 o superior
- npm 10 o superior

## Desarrollo local

```bash
npm install
npm run dev
```

Abrí `http://localhost:3000`.

## Variables de entorno

Copiá `.env.example` como `.env.local` y configurá la URL pública final:

```env
NEXT_PUBLIC_SITE_URL=https://tustareas-py.vercel.app
```

En Vercel, `VERCEL_PROJECT_PRODUCTION_URL` se utiliza automáticamente si `NEXT_PUBLIC_SITE_URL` no está definida. Para un dominio propio, definí siempre `NEXT_PUBLIC_SITE_URL` con la URL canónica.

## Verificación

```bash
npm run lint
npm run typecheck
npm test
```

`npm test` genera la compilación de producción, levanta el servidor y comprueba la página principal, metadatos SEO, datos estructurados, archivos para buscadores, cabeceras de seguridad y caché del video.

## Despliegue en Vercel

1. Subí este repositorio a GitHub.
2. En Vercel elegí **Add New → Project** e importá el repositorio.
3. Usá el framework **Next.js** y dejá los comandos detectados automáticamente.
4. Elegí como nombre de proyecto `tustareas-py` para intentar obtener `tustareas-py.vercel.app`.
5. Añadí `NEXT_PUBLIC_SITE_URL` con la dirección definitiva y desplegá nuevamente.

Los contactos públicos del sitio son:

- Correo: `tustareas.py.edu@gmail.com`
- WhatsApp: `+595 993 372593`

