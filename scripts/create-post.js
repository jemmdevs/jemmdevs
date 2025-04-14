#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Crear interfaz para leer input del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ruta de la plantilla y directorio de posts
const templatePath = path.join(__dirname, '../src/templates/post-template.md');
const postsDir = path.join(__dirname, '../src/content/blog');

// Función para generar un slug desde un título
function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD') // Normalizar acentos
    .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos
    .replace(/[^a-z0-9\s]/g, '') // Eliminar caracteres especiales
    .trim()
    .replace(/\s+/g, '-'); // Reemplazar espacios con guiones
}

// Función principal
async function createPost() {
  try {
    // Leer la plantilla
    const template = fs.readFileSync(templatePath, 'utf8');
    
    // Solicitar información al usuario
    const title = await askQuestion('Título del post: ');
    const description = await askQuestion('Descripción breve: ');
    const author = await askQuestion('Autor (deja en blanco para "Usuario"): ') || 'Usuario';
    const tagsInput = await askQuestion('Etiquetas (separadas por comas): ');
    
    // Procesar etiquetas
    const tags = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    // Generar slug basado en el título
    const slug = generateSlug(title);
    
    // Construir el nuevo contenido
    let newContent = template
      .replace('title: "Título del post"', `title: "${title}"`)
      .replace('description: "Descripción breve del post que aparecerá en la lista de artículos"', `description: "${description}"`)
      .replace('author: "Tu nombre"', `author: "${author}"`)
      .replace('tags: ["etiqueta1", "etiqueta2"]', `tags: ${JSON.stringify(tags)}`);
    
    // También reemplazar el título dentro del contenido Markdown
    newContent = newContent.replace('# Título del post', `# ${title}`);
    
    // Ruta del nuevo archivo
    const filePath = path.join(postsDir, `${slug}.md`);
    
    // Verificar si el archivo ya existe
    if (fs.existsSync(filePath)) {
      const overwrite = await askQuestion(`Ya existe un archivo con el nombre "${slug}.md". ¿Deseas sobrescribirlo? (s/n): `);
      if (overwrite.toLowerCase() !== 's') {
        console.log('Operación cancelada.');
        rl.close();
        return;
      }
    }
    
    // Escribir el nuevo archivo
    fs.writeFileSync(filePath, newContent);
    
    console.log(`\n✅ Post creado con éxito: ${filePath}`);
    console.log(`🌐 URL: /blog/${slug}`);
    console.log('📝 Fecha y hora: se usará automáticamente la fecha y hora actual\n');
    
  } catch (error) {
    console.error('Error al crear el post:', error);
  } finally {
    rl.close();
  }
}

// Función auxiliar para hacer preguntas
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Ejecutar función principal
createPost(); 