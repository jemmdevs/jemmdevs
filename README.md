# Jemmdev's Blog

Un blog personal moderno desarrollado con Astro, Tailwind CSS y JavaScript.

## 🚀 Características

- **Diseño Responsive**: Experiencia de usuario optimizada en dispositivos móviles, tablets y escritorio
- **Modo Claro/Oscuro**: Cambia entre temas claros y oscuros con una transición suave
- **Formulario de Contacto**: Integración con EmailJS para recibir mensajes directamente en tu correo
- **Animaciones Suaves**: Transiciones y animaciones para una experiencia interactiva
- **SEO Optimizado**: Estructura optimizada para motores de búsqueda
- **Minimalista y Elegante**: Diseño limpio con enfoque en la experiencia de lectura

## 🧰 Tecnologías

- [Astro](https://astro.build/) - Framework web ultrarrápido
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitario
- [EmailJS](https://www.emailjs.com/) - Servicio para enviar correos desde JavaScript
- JavaScript Vanilla para la interactividad

## 📦 Estructura del Proyecto

```
jemmdev/
├── public/                # Archivos estáticos
├── src/
│   ├── components/        # Componentes reutilizables
│   │   └── common/        # Componentes comunes (ThemeToggle, etc.)
│   ├── content/           # Contenido del blog (posts en Markdown)
│   ├── layouts/           # Plantillas de estructura
│   ├── pages/             # Páginas de la aplicación
│   └── styles/            # Estilos globales
├── astro.config.mjs       # Configuración de Astro
└── tailwind.config.js     # Configuración de Tailwind CSS
```

## 🚀 Instalación y Uso

### Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/jemmdevs/jemmdev.git
   cd jemmdev
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. Abre tu navegador en `http://localhost:4321`

### Compilación para Producción

```bash
npm run build
# o
yarn build
```

## 📝 Creación de Contenido

Los artículos del blog se escriben en Markdown y se guardan en la carpeta `src/content/blog/`. Cada artículo debe contener un frontmatter con:

```md
---
title: "Título del Artículo"
description: "Breve descripción del artículo"
pubDate: "Jul 22 2023"
updatedDate: "Jul 23 2023"
heroImage: "/ruta/a/la/imagen.jpg"
---

Contenido del artículo en Markdown...
```

## 📬 Formulario de Contacto

El blog incluye un formulario de contacto configurado con EmailJS. Para personalizarlo:

1. Crea una cuenta en [EmailJS](https://www.emailjs.com/)
2. Configura un servicio de correo electrónico
3. Crea una plantilla de correo
4. Actualiza las credenciales en `src/layouts/Layout.astro`

## 🌗 Personalización del Tema

El cambio de tema (claro/oscuro) utiliza Tailwind CSS y localStorage para guardar las preferencias del usuario. La lógica se encuentra en:

- `src/components/common/ThemeToggle.astro`
- El script en `src/layouts/Layout.astro`

## 📱 Responsive Design

El diseño se adapta a diferentes tamaños de pantalla:
- **Móvil**: Optimizado para pantallas pequeñas
- **Tablet**: Diseño ajustado para pantallas medianas
- **Escritorio**: Experiencia completa para pantallas grandes

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si encuentras un error o tienes una sugerencia, no dudes en abrir un issue o enviar un pull request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
