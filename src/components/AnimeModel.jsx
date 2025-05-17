import { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimeModel = () => {
  const particlesRef = useRef(null);
  
  // Create particle effect around the 3D model
  const createParticleEffect = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Configure canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '4'; // Below the model but above background
    canvas.style.opacity = '0.7';
    canvas.id = 'particle-canvas';
    
    document.body.appendChild(canvas);
    particlesRef.current = canvas;
    
    // Create particles
    const particleCount = 70;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    // Main particle animation
    const animateParticles = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(p => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around screen edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 200, 255, ${p.opacity})`;
        ctx.fill();
      });
      
      // Draw connections between nearby particles
      ctx.strokeStyle = 'rgba(200, 200, 255, 0.1)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Draw line if particles are close
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Continue animation
      requestAnimationFrame(animateParticles);
    };
    
    // Start animation
    animateParticles();
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };
  
  // Add highlight effect to 3D model
  const addModelHighlight = () => {
    // Create highlight glow container
    const glowContainer = document.createElement('div');
    glowContainer.classList.add('model-glow');
    glowContainer.style.position = 'fixed';
    glowContainer.style.top = '0';
    glowContainer.style.left = '0';
    glowContainer.style.width = '100%';
    glowContainer.style.height = '100%';
    glowContainer.style.pointerEvents = 'none';
    glowContainer.style.zIndex = '3'; // Below the model
    
    document.body.appendChild(glowContainer);
    
    // Create glow effect
    const glow = document.createElement('div');
    glow.classList.add('glow');
    glow.style.position = 'absolute';
    glow.style.borderRadius = '50%';
    glow.style.width = '350px';
    glow.style.height = '350px';
    glow.style.filter = 'blur(80px)';
    glow.style.background = 'radial-gradient(circle, rgba(100,120,255,0.15) 0%, rgba(70,90,200,0.05) 70%, rgba(0,0,0,0) 100%)';
    glow.style.top = '50%';
    glow.style.left = '50%';
    glow.style.transform = 'translate(-50%, -50%)';
    
    glowContainer.appendChild(glow);
    
    // Animate glow based on scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll percentage
      const scrollPercentage = scrollPosition / (scrollHeight - windowHeight);
      
      // Use anime.js to animate glow
      anime({
        targets: glow,
        opacity: [0.7 - scrollPercentage * 0.3, 0.9 - scrollPercentage * 0.3],
        scale: [1 - scrollPercentage * 0.2, 1.1 - scrollPercentage * 0.2],
        duration: 800,
        easing: 'easeOutQuad'
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (document.body.contains(glowContainer)) {
        document.body.removeChild(glowContainer);
      }
    };
  };
  
  // Add mouse move effect for 3D model interactivity
  const addMouseMoveEffect = () => {
    // Get model container
    const modelContainer = document.querySelector('.model-animation-container');
    if (!modelContainer) return () => {};
    
    // Add mouse move event listener
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate distance from center
      const deltaX = (clientX - centerX) / centerX;
      const deltaY = (clientY - centerY) / centerY;
      
      // Apply subtle rotation effect
      anime({
        targets: '.model-canvas',
        rotateY: deltaX * 3,
        rotateX: -deltaY * 3,
        translateX: deltaX * 10,
        translateY: deltaY * 10,
        duration: 800,
        easing: 'easeOutQuad'
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Return cleanup function
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  };
  
  // Initialize all model enhancement effects
  useEffect(() => {
    // Create all effects
    const cleanupParticles = createParticleEffect();
    const cleanupGlow = addModelHighlight();
    const cleanupMouseMove = addMouseMoveEffect();
    
    // Return cleanup function
    return () => {
      cleanupParticles();
      cleanupGlow();
      cleanupMouseMove();
      
      // Clean up canvas
      if (particlesRef.current && document.body.contains(particlesRef.current)) {
        document.body.removeChild(particlesRef.current);
      }
    };
  }, []);
  
  return null;
};

export default AnimeModel; 