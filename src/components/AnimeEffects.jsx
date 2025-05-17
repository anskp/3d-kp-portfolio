import { useEffect } from 'react';
import anime from 'animejs';

const AnimeEffects = () => {
  // Advanced button hover animations
  const setupButtonAnimations = () => {
    // Find all buttons
    const buttons = document.querySelectorAll('.MuiButton-root');
    
    // Add hover class for targeting
    buttons.forEach(button => {
      button.classList.add('anime-button');
      
      // Create ripple element for each button
      const ripple = document.createElement('span');
      ripple.classList.add('btn-ripple');
      button.appendChild(ripple);
      
      // Add event listeners
      button.addEventListener('mouseenter', (e) => {
        const target = e.currentTarget;
        
        // Pulse animation
        anime({
          targets: target,
          scale: 1.05,
          duration: 300,
          easing: 'easeOutQuad'
        });
        
        // Ripple effect
        const rippleEl = target.querySelector('.btn-ripple');
        const rect = target.getBoundingClientRect();
        
        rippleEl.style.width = `${rect.width * 2}px`;
        rippleEl.style.height = `${rect.height * 2}px`;
        
        anime.remove(rippleEl);
        anime({
          targets: rippleEl,
          opacity: [0.5, 0],
          scale: [0, 1],
          easing: 'easeOutQuad',
          duration: 700
        });
      });
      
      button.addEventListener('mouseleave', (e) => {
        anime({
          targets: e.currentTarget,
          scale: 1,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    });
  };
  
  // Text animations for hero text
  const setupTextAnimations = () => {
    // Split text into spans for character-by-character animation
    const headings = document.querySelectorAll('h2');
    
    headings.forEach(heading => {
      if (heading.classList.contains('text-animated')) return;
      
      // Get the text content
      const text = heading.textContent;
      heading.textContent = '';
      heading.classList.add('text-animated');
      
      // Create spans for each letter
      [...text].forEach(char => {
        const span = document.createElement('span');
        span.classList.add('animated-letter');
        span.textContent = char === ' ' ? '\u00A0' : char;
        heading.appendChild(span);
      });
      
      // Setup initial state
      anime.set(heading.querySelectorAll('.animated-letter'), {
        opacity: 0,
        translateY: 20
      });
      
      // Set up the animation to play when the heading is in view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: heading.querySelectorAll('.animated-letter'),
              opacity: [0, 1],
              translateY: [20, 0],
              rotateX: [90, 0],
              duration: 1200,
              delay: anime.stagger(30),
              easing: 'easeOutExpo'
            });
            
            // Unobserve after animation is triggered
            observer.unobserve(heading);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(heading);
    });
  };
  
  // Paper/card hover effects
  const setupCardEffects = () => {
    const cards = document.querySelectorAll('.MuiPaper-root');
    
    cards.forEach(card => {
      if (card.classList.contains('card-animated')) return;
      card.classList.add('card-animated');
      
      // Tilt effect on hover
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top; // y position within the element
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        const tiltX = deltaY * 8; // Max 8deg tilt
        const tiltY = -deltaX * 8;
        
        anime({
          targets: card,
          rotateX: tiltX,
          rotateY: tiltY,
          boxShadow: `
            ${-tiltY}px ${-tiltX}px 20px rgba(0,0,0,0.1),
            0px 10px 15px rgba(0,0,0,0.05)
          `,
          duration: 100,
          easing: 'linear'
        });
      });
      
      // Reset on mouse leave
      card.addEventListener('mouseleave', () => {
        anime({
          targets: card,
          rotateX: 0,
          rotateY: 0,
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    });
  };
  
  // Add scroll-triggered wave effect
  const setupWaveEffect = () => {
    // Create wave path for section dividers
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
      if (index === 0 || section.classList.contains('wave-added')) return;
      
      section.classList.add('wave-added');
      
      // Create SVG wave
      const wave = document.createElement('div');
      wave.classList.add('section-wave');
      wave.innerHTML = `
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <path class="wave-path" d="M0,64 C320,120 480,20 720,80 C960,140 1120,40 1440,96 L1440,0 L0,0 Z"></path>
        </svg>
      `;
      
      // Insert wave before section
      section.parentNode.insertBefore(wave, section);
      
      // Animate wave on scroll
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: wave.querySelector('.wave-path'),
              d: [
                'M0,64 C320,120 480,20 720,80 C960,140 1120,40 1440,96 L1440,0 L0,0 Z',
                'M0,64 C320,60 480,100 720,60 C960,20 1120,80 1440,64 L1440,0 L0,0 Z'
              ],
              easing: 'easeInOutSine',
              duration: 3000,
              loop: true,
              direction: 'alternate'
            });
          }
        });
      }, { threshold: 0.2 });
      
      observer.observe(section);
    });
  };
  
  // Initialize all animation effects
  useEffect(() => {
    // CSS for wave and button effects
    const style = document.createElement('style');
    style.textContent = `
      .btn-ripple {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        pointer-events: none;
      }
      
      .animated-letter {
        display: inline-block;
        transform-origin: bottom center;
      }
      
      .section-wave {
        position: relative;
        height: 120px;
        margin-top: -120px;
        z-index: 1;
        pointer-events: none;
      }
      
      .section-wave svg {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      
      .wave-path {
        fill: var(--wave-color, rgba(255, 255, 255, 0.1));
      }
      
      .MuiPaper-root {
        transform-style: preserve-3d;
        perspective: 1000px;
      }
    `;
    
    document.head.appendChild(style);
    
    // Set wave color based on theme
    const isDarkMode = document.documentElement.classList.contains('dark') || 
                      document.body.classList.contains('dark') ||
                      getComputedStyle(document.body).backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)/)?.[1] < 128;
    
    document.documentElement.style.setProperty(
      '--wave-color', 
      isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'
    );
    
    // Wait for DOM to fully load
    setTimeout(() => {
      setupButtonAnimations();
      setupTextAnimations();
      setupCardEffects();
      setupWaveEffect();
    }, 800);
    
    // Cleanup
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
};

export default AnimeEffects; 