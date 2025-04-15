---
title: "Developing a Minimalist Portfolio with Astro"
description: "How I designed and built my personal portfolio using Astro, focusing on a minimalist yet elegant design"
author: "Jemmdev"
pubDate: 2024-04-15
tags: ["portfolio", "astro", "design", "web development"]
---

# Creating a Minimalist Portfolio with Astro: Behind the Code

This document explores the technical aspects behind the creation of our minimalist portfolio, highlighting key code snippets that make its functionality and design possible.

## Base Structure

The project uses Astro as the main framework, allowing for a clear component structure:

```astro
---
import { getCollection } from 'astro:content';

// Get the first entry from the portfolio collection
const portfolioEntries = await getCollection('portfolio');
const portfolioEntry = portfolioEntries[0]; // Get the first entry
const { name, title, github } = portfolioEntry.data;
const { Content } = await portfolioEntry.render();
---

<div class="page-container">
  <!-- Navigation and content elements -->
  <div class="outer-container">
    <div class="quote-container">
      <blockquote id="quote-text" class="quote"></blockquote>
      <p id="quote-author" class="quote-author"></p>
    </div>
    
    <div class="portfolio-container">
      <div class="portfolio-content">
        <Content />
      </div>
    </div>
  </div>
  
  <!-- Contact modal -->
  <div id="contact-modal" class="contact-modal">
    <!-- Contact form -->
  </div>
</div>
```

## Adaptive Styling System

The CSS uses custom variables to manage themes and visual consistency:

```css
<style>
  /* Main container with flexbox for centering */
  .page-container {
    display: flex;
    width: 100%;
    min-height: 100vh;
    align-items: flex-start;
    justify-content: center;
  }

  /* Theme variables */
  :root {
    --accent-color: #4a6fa5;
  }

  .dark {
    --accent-color: #6d9feb;
  }

  /* Smooth transitions between themes */
  .theme-transition {
    transition: background-color 0.5s ease, color 0.5s ease, 
               border-color 0.5s ease, box-shadow 0.5s ease;
  }

  /* Responsive styles with media queries */
  @media (max-width: 768px) {
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    
    /* Mobile-specific adjustments */
    .portfolio-container {
      padding: 0.8rem 1.2rem;
      margin: 0.5rem auto;
      width: 100%;
      max-width: 520px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      border: 1px solid var(--border-color);
      font-size: 0.85rem;
      box-sizing: border-box;
    }
  }
</style>
```

## Interactivity with JavaScript

The portfolio incorporates various interactive elements through JavaScript:

```javascript
<script>
  document.addEventListener('DOMContentLoaded', async () => {
    // Load EmailJS for the contact form
    await loadEmailJS();

    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sideButtons = document.querySelector('.side-buttons');
    
    if (mobileMenuToggle && sideButtons) {
      mobileMenuToggle.addEventListener('click', () => {
        sideButtons.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        const target = e.target as Node;
        if (!sideButtons.contains(target) && 
            target !== mobileMenuToggle && 
            !mobileMenuToggle.contains(target) &&
            sideButtons.classList.contains('active')) {
          sideButtons.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
        }
      });
    }

    // Initialize parallax effect and quotes
    initParallax();
    initRandomQuote();
  });
</script>
```

## Parallax Effect

The starry background implements a parallax effect that responds to mouse movement:

```javascript
// Parallax effect initialization
function initParallax() {
  const starsContainer = document.querySelector('.parallax-stars');
  
  if (!starsContainer) return;
  
  // Create random stars
  const numStars = 50;
  
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'parallax-star';
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    
    // Random size
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Add to DOM
    starsContainer.appendChild(star);
  }
  
  // Add parallax effect on mouse move
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const stars = document.querySelectorAll('.parallax-star');
    stars.forEach((star, index) => {
      const speed = (index % 10) / 30 + 0.03;
      const offsetX = (mouseX - 0.5) * speed * 100;
      const offsetY = (mouseY - 0.5) * speed * 100;
      
      const starElement = star as HTMLElement;
      starElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  });
}
```

## Contact Form with EmailJS

The contact form uses EmailJS to send emails without needing a backend:

```javascript
// Send form with EmailJS
if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const nameInput = contactForm.querySelector('#name') as HTMLInputElement;
    const emailInput = contactForm.querySelector('#email') as HTMLInputElement;
    const messageInput = contactForm.querySelector('#message') as HTMLTextAreaElement;
    const submitBtn = contactForm.querySelector('.submit-button') as HTMLButtonElement;
    
    // Update UI to show sending status
    formStatus.textContent = '';
    formStatus.classList.remove('error-message', 'success-message', 'active');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
      // Send email with EmailJS
      await window.emailjs.send(
        'service_j5q6azh', // Service ID
        'template_gkt7fwu', // Template ID
        {
          from_name: nameInput.value,
          reply_to: emailInput.value,
          message: messageInput.value
        }
      );
      
      // Show success confirmation with animation
      const successIcon = document.createElement('span');
      successIcon.innerHTML = '<svg>...</svg>';
      successIcon.className = 'status-icon';
      
      formStatus.classList.add('success-message', 'active');
      
      // Reset form and close modal with animation
    } catch (error) {
      // Error handling
    }
  });
}
```

## Styled Components

The components have specific styles that contribute to the overall aesthetic:

```css
/* Styles for the portfolio container */
.portfolio-container {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  padding: 1.2rem 1.8rem;
  font-family: 'Courier New', Courier, monospace;
  line-height: 1.3;
  background-color: var(--bg-paper);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0;
  font-size: 0.9rem;
  color: var(--text-color);
  box-sizing: border-box;
}

/* Styles for the quote container */
.quote-container {
  width: 100%;
  max-width: 640px;
  margin: 0 auto 1.5rem;
  text-align: center;
  padding: 0.8rem 1.5rem;
  background-color: var(--bg-paper);
  border-left: 3px solid var(--accent-color);
  border-right: 3px solid var(--accent-color);
  box-shadow: 0 3px 5px var(--shadow-color);
  font-style: italic;
  opacity: 0.9;
  transform: translateY(0);
  transition: transform 0.3s ease;
  box-sizing: border-box;
}

.quote-container:hover {
  transform: translateY(-5px);
  opacity: 1;
}
```

## Mobile Navigation

The hamburger menu for mobile devices has an elegant design:

```html
<button id="mobile-menu-toggle" class="mobile-menu-toggle">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
</button>

<div class="side-buttons">
  <a href="https://jemmdevs.vercel.app/" target="_blank" rel="noopener noreferrer" class="side-button">
    <svg><!-- SVG icon --></svg>
    <span>My Blog</span>
  </a>
  <!-- Other navigation buttons -->
</div>
```

```css
.mobile-menu-toggle {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 100;
  background-color: transparent;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 0;
  transition: transform 0.3s ease;
  color: var(--text-color);
}

.mobile-menu-toggle svg {
  stroke: var(--text-color);
}

.dark .mobile-menu-toggle svg {
  stroke: #fff;
}

.light .mobile-menu-toggle svg {
  stroke: #000;
}
```

## Random Quote System

The programming quotes are shown randomly when loading the page:

```javascript
// Programming quotes
const programmingQuotes = [
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler"
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson"
  },
  // More quotes...
];

// Random quote initialization
function initRandomQuote() {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  
  if (!quoteText || !quoteAuthor) return;
  
  // Get a random quote
  const randomIndex = Math.floor(Math.random() * programmingQuotes.length);
  const quote = programmingQuotes[randomIndex];
  
  // Display the quote
  quoteText.textContent = quote.text;
  quoteAuthor.textContent = quote.author;
}
```

## Conclusion

This portfolio combines modern web development techniques to create an engaging user experience. From the use of CSS variables for visual consistency to the implementation of subtle animations and interactive effects, every aspect of the code is designed with user experience and development efficiency in mind.

The project demonstrates how a minimalist approach can be enhanced with small touches of interactivity that significantly elevate the user experience without sacrificing simplicity or performance. 