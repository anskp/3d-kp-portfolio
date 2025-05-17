import { useEffect, useRef, useState } from 'react';

function ModelAnimation() {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const imagesRef = useRef([]);
  const frameCountRef = useRef(300); // Changed from 301 to 300 to remove male0301.png
  const animationInitializedRef = useRef(false);
  const containerRef = useRef(null);
  const imageSeqRef = useRef({ frame: 0 });
  const lastScrollPositionRef = useRef(0);
  const scrollSensitivityRef = useRef(15); // How many pixels to scroll for one frame
  
  const startFrame = 1; // Start from frame 1 (male0001.png)
  const endFrame = 300; // Changed from 301 to 300 to exclude male0301.png

  // Preload a specific image and return a promise
  const preloadImage = (index) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const frame = index + startFrame;
      const num = frame.toString().padStart(4, '0');
      const src = `/images/male${num}.png`;
      
      img.onload = () => {
        resolve(img);
      };
      img.onerror = (error) => {
        console.error(`Failed to load image: ${src}`, error);
        reject(new Error(`Failed to load image: ${src}`));
      };
      img.src = src;
      imagesRef.current[index] = img;
    });
  };

  // Handle keyboard navigation - frame by frame
  const handleKeyDown = (e) => {
    if (!isLoading) {
      // Handle arrow keys for frame-by-frame navigation
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        // Next frame and scroll down
        setCurrentFrame(prev => Math.min(prev + 1, frameCountRef.current - 1));
        window.scrollBy(0, scrollSensitivityRef.current);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        // Previous frame and scroll up
        setCurrentFrame(prev => Math.max(prev - 1, 0));
        window.scrollBy(0, -scrollSensitivityRef.current);
      } else if (e.key === 'Home') {
        // First frame
        setCurrentFrame(0);
        window.scrollTo(0, 0);
      } else if (e.key === 'End') {
        // Last frame
        setCurrentFrame(frameCountRef.current - 1);
        window.scrollTo(0, document.body.scrollHeight);
      }
    }
  };

  useEffect(() => {
    let canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderCurrentFrame();
    };

    window.addEventListener('resize', handleResize);

    // Add keyboard event listener
    window.addEventListener('keydown', handleKeyDown);

    // Function to render current frame
    function renderCurrentFrame() {
      const img = imagesRef.current[currentFrame];
      
      if (!img || !img.complete) {
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Scale image to fit canvas while maintaining aspect ratio
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.min(hRatio, vRatio);
      const centerX = (canvas.width - img.width * ratio) / 2;
      const centerY = (canvas.height - img.height * ratio) / 2;
      
      ctx.drawImage(img, 0, 0, img.width, img.height, centerX, centerY, img.width * ratio, img.height * ratio);
    }

    // Load first image and display it immediately
    preloadImage(0)
      .then(img => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // Start preloading all other images
        preloadAllImages();
      })
      .catch(error => {
        console.error("Error loading first image:", error);
      });

    // Preload all images with progress tracking
    function preloadAllImages() {
      // Frame count includes the final frame
      const totalImages = frameCountRef.current;
      let loadedCount = 1; // Start at 1 since we already loaded the first image
      
      // Create an array of promises for loading all images
      const loadPromises = [];
      
      for (let i = 1; i < totalImages; i++) {
        const promise = preloadImage(i)
          .then(() => {
            loadedCount++;
            const percent = Math.floor((loadedCount / totalImages) * 100);
            setLoadingProgress(percent);
          })
          .catch(error => {
            console.error(error);
            loadedCount++; // Still increment to avoid stuck loading
          });
        
        loadPromises.push(promise);
      }
      
      // When all images are loaded, initialize the scroll animation
      Promise.allSettled(loadPromises)
        .then(() => {
          setIsLoading(false);
          initScrollAnimation();
        });
    }

    // Initialize scroll animation that syncs with page scrolling
    function initScrollAnimation() {
      if (animationInitializedRef.current) {
        return;
      }

      try {
        // Function to ensure animation covers the entire page content
        const ensureFullPageCoverage = () => {
          // Wait for all content to be fully rendered
          setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              // Calculate how much visible space we need to ensure the contact section is fully visible
              const totalRequiredHeight = contactSection.offsetTop + contactSection.offsetHeight + 400;
              const currentPageHeight = document.documentElement.scrollHeight;
              
              if (currentPageHeight < totalRequiredHeight) {
                // Add a spacer div to extend the page if needed
                const spacer = document.createElement('div');
                spacer.style.height = `${totalRequiredHeight - currentPageHeight}px`;
                spacer.id = 'animation-spacer';
                document.body.appendChild(spacer);
              }
            }
          }, 1000); // Allow time for other content to render first
        };
        
        // Call this function to ensure the page has enough scroll height
        ensureFullPageCoverage();
        
        // Retry after a longer delay to ensure everything is properly measured
        setTimeout(ensureFullPageCoverage, 3000);
        
        // Extra check after a longer delay for any dynamic content that might have loaded
        setTimeout(ensureFullPageCoverage, 5000);
        
        // Connect scroll position to frame number with more gradual progression
        const handleScroll = () => {
          const scrollPosition = window.scrollY;
          const scrollHeight = document.documentElement.scrollHeight;
          const viewportHeight = window.innerHeight;
          const totalScrollHeight = scrollHeight - viewportHeight;
          
          // Ensure we don't divide by zero
          if (totalScrollHeight <= 0) {
            return;
          }
          
          // Even more gradual progression - use 85% of the page height
          // to spread the animation frames across, reserving 15% for viewing
          // the final content with the final frame
          let scrollFraction;
          
          if (scrollPosition >= totalScrollHeight * 0.85) {
            // If we're in the last 15% of the page, use the last frame
            scrollFraction = 1;
          } else {
            // Otherwise distribute frames across the first 85% of scrolling
            scrollFraction = Math.min(scrollPosition / (totalScrollHeight * 0.85), 1);
          }
          
          // Calculate frame index with smoother transitions
          let frameIndex = Math.floor(scrollFraction * (frameCountRef.current - 1));
          
          // Ensure we don't exceed the frame count
          frameIndex = Math.min(frameIndex, frameCountRef.current - 1);
          
          // Check if the frame is different before updating to avoid unnecessary renders
          if (currentFrame !== frameIndex) {
            // Update frame if changed
            setCurrentFrame(frameIndex);
          }
          
          // Store last scroll position
          lastScrollPositionRef.current = scrollPosition;
        };
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        
        // Store cleanup function
        const cleanup = () => {
          window.removeEventListener('scroll', handleScroll);
          // Remove any spacer we might have added
          const spacer = document.getElementById('animation-spacer');
          if (spacer) {
            spacer.remove();
          }
        };
        
        // Store cleanup in ref
        animationInitializedRef.current = cleanup;
        
        // Force initial render
        renderCurrentFrame();
      } catch (error) {
        console.error("Error initializing animation:", error);
      }
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      
      // Call cleanup function if it exists
      if (typeof animationInitializedRef.current === 'function') {
        animationInitializedRef.current();
      }
      
      // Remove any spacer we might have added
      const spacer = document.getElementById('animation-spacer');
      if (spacer) {
        spacer.remove();
      }
    };
  }, []);

  // Add an effect to render the current frame whenever it changes
  useEffect(() => {
    if (!isLoading && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const img = imagesRef.current[currentFrame];
      if (img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Scale image to fit canvas while maintaining aspect ratio
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);
        const centerX = (canvas.width - img.width * ratio) / 2;
        const centerY = (canvas.height - img.height * ratio) / 2;
        
        ctx.drawImage(img, 0, 0, img.width, img.height, centerX, centerY, img.width * ratio, img.height * ratio);
      }
    }
  }, [currentFrame, isLoading]);

  return (
    <div className="model-animation-container" ref={containerRef}>
      {isLoading && (
        <div className="loading-overlay">
          <h2>Loading 3D Model...</h2>
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{width: `${loadingProgress}%`}}
            ></div>
          </div>
          <p>{loadingProgress}% Loaded</p>
        </div>
      )}

      <canvas 
        ref={canvasRef} 
        className="model-canvas"
      />
      
      <style jsx>{`
        .model-animation-container {
          position: relative;
          width: 100%;
          height: 100vh;
        }
        
        .model-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 9;
        }
        
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 10;
          color: white;
        }
        
        .progress-bar-container {
          width: 80%;
          max-width: 500px;
          height: 20px;
          background: #333;
          border-radius: 10px;
          overflow: hidden;
          margin: 10px 0;
        }
        
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #00d2ff, #3a7bd5);
          transition: width 0.3s;
        }
      `}</style>
    </div>
  );
}

export default ModelAnimation; 