import { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimeScroll = () => {
  const animationRef = useRef(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Elements to animate based on scroll
  const setupScrollAnimations = () => {
    // Set up element targets for animations
    const sections = document.querySelectorAll('section');
    const headings = document.querySelectorAll('h2, h3');
    const cards = document.querySelectorAll('.MuiPaper-root');
    const images = document.querySelectorAll('img');
    const skillItems = document.querySelectorAll('[role="tabpanel"] .MuiBox-root');
    
    // Add animation classes to elements
    sections.forEach(section => section.classList.add('anime-section'));
    headings.forEach(heading => heading.classList.add('anime-heading'));
    cards.forEach(card => card.classList.add('anime-card'));
    images.forEach(image => image.classList.add('anime-image'));
    skillItems.forEach(item => item.classList.add('anime-skill-item'));
    
    // Initial animation setup
    anime.set('.anime-heading', {
      opacity: 0,
      translateY: 50
    });
    
    anime.set('.anime-card', {
      opacity: 0,
      translateY: 30,
      scale: 0.95
    });
    
    anime.set('.anime-skill-item', {
      opacity: 0,
      translateX: -20
    });
    
    anime.set('.anime-image', {
      opacity: 0,
      scale: 0.9
    });
  };

  // Handle scroll event
  const handleScroll = () => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const direction = scrollY > lastScrollY.current ? 'down' : 'up';
        lastScrollY.current = scrollY;
        
        // Animate elements in viewport
        animateElementsInViewport(scrollY, direction);
        
        // Create parallax effect on backgrounds
        animateParallax(scrollY);
        
        ticking.current = false;
      });
      
      ticking.current = true;
    }
  };

  // Animate elements currently in the viewport
  const animateElementsInViewport = (scrollY, direction) => {
    // Animate headings when they enter viewport
    document.querySelectorAll('.anime-heading:not(.animated)').forEach(el => {
      if (isElementInViewport(el)) {
        anime({
          targets: el,
          opacity: [0, 1],
          translateY: [50, 0],
          easing: 'easeOutExpo',
          duration: 800,
          delay: 100
        });
        el.classList.add('animated');
      }
    });
    
    // Animate cards when they enter viewport
    document.querySelectorAll('.anime-card:not(.animated)').forEach(el => {
      if (isElementInViewport(el)) {
        anime({
          targets: el,
          opacity: [0, 1],
          translateY: [30, 0],
          scale: [0.95, 1],
          easing: 'easeOutExpo',
          duration: 800,
          delay: anime.stagger(100, {start: 200})
        });
        el.classList.add('animated');
      }
    });
    
    // Animate skill items when they enter viewport
    document.querySelectorAll('.anime-skill-item:not(.animated)').forEach((el, index) => {
      if (isElementInViewport(el)) {
        anime({
          targets: el,
          opacity: [0, 1],
          translateX: [-20, 0],
          easing: 'easeOutQuad',
          duration: 600,
          delay: index * 80  // Staggered delay
        });
        el.classList.add('animated');
      }
    });
    
    // Animate images when they enter viewport
    document.querySelectorAll('.anime-image:not(.animated)').forEach(el => {
      if (isElementInViewport(el)) {
        anime({
          targets: el,
          opacity: [0, 1],
          scale: [0.9, 1],
          easing: 'easeOutCubic',
          duration: 800
        });
        el.classList.add('animated');
      }
    });
  };
  
  // Create parallax effect based on scroll position
  const animateParallax = (scrollY) => {
    // Subtle parallax effect on section backgrounds
    document.querySelectorAll('.anime-section').forEach(section => {
      const rect = section.getBoundingClientRect();
      const centerPosition = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distanceFromCenter = centerPosition - viewportCenter;
      
      // Subtle rotation and translation based on scroll position
      anime({
        targets: section,
        translateY: distanceFromCenter * 0.05,
        rotateX: distanceFromCenter * 0.005,
        easing: 'linear',
        duration: 100
      });
    });
  };
  
  // Helper function to check if element is in viewport
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 && 
      rect.bottom >= 0
    );
  };
  
  // Initialize animations
  useEffect(() => {
    // Wait for DOM to be ready
    setTimeout(() => {
      setupScrollAnimations();
      
      // Initial animation for visible elements
      animateElementsInViewport(window.scrollY, 'down');
      
      // Add scroll event listener
      window.addEventListener('scroll', handleScroll);
    }, 500);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Invisible component (just hooks functionality)
  return null;
};

export default AnimeScroll; 