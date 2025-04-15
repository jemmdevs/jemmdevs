---
title: "How This Blog Was Created: An Astro Journey"
description: "A step-by-step tutorial on how I built this minimalist blog using Astro, Tailwind CSS, and other modern web technologies"
author: "Jemmdev"
pubDate: 2024-04-14
tags: ["tutorial", "astro", "tailwind", "web development"]
---

# How This Blog Was Created: An Astro Journey

This tutorial explains how I built this minimalist, feature-rich blog using modern web technologies, particularly focusing on Astro.

## What is Astro?

[Astro](https://astro.build) is a modern static site generator that allows you to build faster websites with less client-side JavaScript. It lets you write components in your favorite UI framework (React, Vue, Svelte, etc.) but renders them to HTML at build time for optimal performance.

## Setting Up the Project

I started by creating a new Astro project with the following command:

```bash
# Create a new project with npm
npm create astro@latest
```

During the setup, I selected a minimal template and added the following integrations:

- **Tailwind CSS**: For styling
- **MDX**: For enhanced Markdown capabilities

```bash
npx astro add tailwind
npx astro add mdx
```

## Project Structure

The blog follows a clean structure:

```
blog/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components
│   ├── content/     # Blog posts as Markdown files
│   ├── layouts/     # Page layouts
│   └── pages/       # Routes and pages
├── astro.config.mjs # Astro configuration
└── package.json     # Dependencies
```

## Key Features Implemented

### 1. Content Collections

I used Astro's content collections to manage blog posts:

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date().default(() => new Date()),
    tags: z.array(z.string()).default([]),
    // other fields...
  }),
});

export const collections = {
  'blog': blogCollection,
};
```

### 2. Dark/Light Theme Toggle

The theme toggle was implemented using local storage to remember user preferences:

```javascript
// Toggle theme function
function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('blog-theme-preference', isDark ? 'light' : 'dark');
}
```

### 3. Real-Time Search

The client-side search functionality allows users to find posts instantly:

```javascript
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  
  // Filter posts based on search term
  postItems.forEach((item) => {
    const slug = item.getAttribute('data-slug');
    const post = searchablePosts.find(p => p.slug === slug);
    
    // Match against title, description, and tags
    const isMatch = post.title.toLowerCase().includes(searchTerm) || 
                   post.description.toLowerCase().includes(searchTerm) ||
                   post.tags.some(tag => tag.toLowerCase().includes(searchTerm));
                   
    item.classList.toggle('hidden', !isMatch);
  });
});
```

### 4. View Counter

The view counter uses local storage to track which posts have been viewed:

```javascript
function incrementViewCount(slug) {
  if (typeof localStorage === 'undefined') return 0;
  
  const viewData = localStorage.getItem('blog-post-views');
  const counts = viewData ? JSON.parse(viewData) : {};
  
  const newCount = (counts[slug] || 0) + 1;
  counts[slug] = newCount;
  
  localStorage.setItem('blog-post-views', JSON.stringify(counts));
  return newCount;
}
```

### 5. Pagination

To keep the blog performant with many posts, pagination was implemented:

```javascript
// Pagination setup
const postsPerPage = 5;
const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
const paginatedPosts = sortedPosts.slice(start, end);
```

## Styling with Tailwind CSS

Tailwind CSS provided utility classes for a clean, responsive design:

```html
<article class="py-6 border-b border-gray-200 dark:border-gray-700">
  <h2 class="text-2xl font-bold text-black dark:text-white group-hover:text-primary">
    Post Title
  </h2>
  <!-- More styled elements -->
</article>
```

## Deployment

For deployment, I used Vercel, which integrates seamlessly with Astro projects:

1. Push the code to a GitHub repository
2. Connect the repository to Vercel
3. Vercel automatically deploys when changes are pushed to the repository

## Lessons Learned

During development, I learned several important lessons:

1. **Content-first approach**: Focusing on content first makes design decisions easier
2. **Incremental enhancement**: Start with core functionality, then add features progressively
3. **Performance matters**: Static site generation provides excellent performance
4. **Responsive design**: Always test across various device sizes during development

## Conclusion

Building this blog with Astro has been a rewarding experience. The framework's focus on performance and flexibility made it possible to create a fast, feature-rich blog with minimal JavaScript.

If you're looking to create your own blog, I highly recommend Astro for its excellent developer experience and performance benefits. 