// This script handles the scroll-based animation and pinning functionality
console.log("External script.js loaded");

// Make locomotive function globally accessible
window.locomotive = function() {
  console.log("Locomotive function initialized");
  
  if (!window.gsap || !window.ScrollTrigger) {
    console.error("GSAP or ScrollTrigger not loaded yet");
    return;
  }

  const locoScroll = new window.LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });

  locoScroll.on("scroll", window.ScrollTrigger.update);

  window.ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },

    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });
  
  window.ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  window.ScrollTrigger.refresh();
  
  return locoScroll;
};

// Function to set up the page pinning
function pinning() {
  console.log("Setting up page pinning");
  
  if (!window.ScrollTrigger) {
    console.error("ScrollTrigger not loaded yet");
    return;
  }
  
  // Page pinning
  window.ScrollTrigger.create({
    trigger: "#page",
    pin: true,
    scroller: "#main",
    start: "top top",
    end: "600% top"
  });

  window.ScrollTrigger.create({
    trigger: "#page1",
    pin: true,
    scroller: "#main",
    start: "top top",
    end: "bottom top"
  });

  window.ScrollTrigger.create({
    trigger: "#page2",
    pin: true,
    scroller: "#main",
    start: "top top",
    end: "bottom top"
  });

  window.ScrollTrigger.create({
    trigger: "#page3",
    pin: true,
    scroller: "#main",
    start: "top top",
    end: "bottom top"
  });
}

// Function to set up GitHub button click
function setupGithubButton() {
  const gitHubButton = document.getElementById('github');
  if (gitHubButton) {
    gitHubButton.onclick = function() {
      window.open("https://github.com/", "_blank");
    }
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded, initializing external scripts");
  
  // Wait for GSAP and ScrollTrigger to be loaded
  const waitForDependencies = setInterval(() => {
    if (window.gsap && window.ScrollTrigger) {
      clearInterval(waitForDependencies);
      console.log("Dependencies loaded, initializing features");
      
      // Initialize features
      window.locomotive();
      pinning();
      setupGithubButton();
    }
  }, 200);
});

// Expose this function globally to help debug canvas issues
window.checkCanvasStatus = function() {
  const canvas = document.querySelector("canvas");
  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }
  
  console.log({
    canvas: canvas,
    width: canvas.width,
    height: canvas.height,
    style: {
      position: canvas.style.position,
      top: canvas.style.top,
      left: canvas.style.left,
      zIndex: canvas.style.zIndex,
      display: canvas.style.display,
      visibility: canvas.style.visibility
    },
    context: canvas.getContext('2d') ? "available" : "not available"
  });
};

// Add this function at the top level of the script
function setupDebugOverlay() {
  // Create debug overlay
  const debugOverlay = document.createElement('div');
  debugOverlay.style.position = 'fixed';
  debugOverlay.style.top = '10px';
  debugOverlay.style.right = '10px';
  debugOverlay.style.background = 'rgba(0,0,0,0.7)';
  debugOverlay.style.color = 'white';
  debugOverlay.style.padding = '10px';
  debugOverlay.style.borderRadius = '5px';
  debugOverlay.style.fontFamily = 'monospace';
  debugOverlay.style.zIndex = '10000';
  debugOverlay.id = 'debug-overlay';
  document.body.appendChild(debugOverlay);
  
  // Create controls info overlay
  const controlsOverlay = document.createElement('div');
  controlsOverlay.style.position = 'fixed';
  controlsOverlay.style.bottom = '10px';
  controlsOverlay.style.right = '10px';
  controlsOverlay.style.background = 'rgba(0,0,0,0.7)';
  controlsOverlay.style.color = 'white';
  controlsOverlay.style.padding = '10px';
  controlsOverlay.style.borderRadius = '5px';
  controlsOverlay.style.fontFamily = 'monospace';
  controlsOverlay.style.zIndex = '10000';
  controlsOverlay.style.fontSize = '12px';
  controlsOverlay.innerHTML = `
    <div style="margin-bottom:5px;font-weight:bold;text-align:center;">Keyboard Controls</div>
    <div>← → : Previous/Next Frame</div>
    <div>↑ ↓ : Jump 10 Frames</div>
    <div>Home/End : First/Last Frame</div>
    <div>P : Toggle Play/Pause</div>
    <div>D : Toggle Debug Info</div>
  `;
  controlsOverlay.id = 'controls-overlay';
  document.body.appendChild(controlsOverlay);
  
  // Add a close button
  const closeButton = document.createElement('button');
  closeButton.textContent = '×';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '2px';
  closeButton.style.right = '5px';
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.color = 'white';
  closeButton.style.fontSize = '16px';
  closeButton.style.cursor = 'pointer';
  closeButton.onclick = function() {
    controlsOverlay.style.display = 'none';
  };
  controlsOverlay.appendChild(closeButton);
  
  // Update function
  window.updateDebug = function(frame, progress) {
    const debugElement = document.getElementById('debug-overlay');
    if (debugElement) {
      debugElement.textContent = `Frame: ${frame} | Scroll: ${(progress * 100).toFixed(1)}%`;
    }
  };
  
  // Add toggle functionality
  window.addEventListener('keydown', function(e) {
    if (e.key === 'd' || e.key === 'D') {
      debugOverlay.style.display = debugOverlay.style.display === 'none' ? 'block' : 'none';
    }
  });
}

// Add this function to the script to enable keyboard controls
function setupKeyboardControls() {
  console.log("Setting up keyboard controls for animation");
  
  // Add event listener for keyboard controls
  document.addEventListener('keydown', function(e) {
    const frame = window.currentFrame || 0;
    
    switch(e.key) {
      case 'ArrowRight':
        // Move forward one frame
        if (window.setAnimationFrame) {
          window.setAnimationFrame(Math.min(frame + 1, 299));
        }
        break;
      case 'ArrowLeft':
        // Move backward one frame
        if (window.setAnimationFrame) {
          window.setAnimationFrame(Math.max(frame - 1, 0));
        }
        break;
      case 'ArrowUp':
        // Jump forward 10 frames
        if (window.setAnimationFrame) {
          window.setAnimationFrame(Math.min(frame + 10, 299));
        }
        break;
      case 'ArrowDown':
        // Jump backward 10 frames
        if (window.setAnimationFrame) {
          window.setAnimationFrame(Math.max(frame - 10, 0));
        }
        break;
      case 'Home':
        // Go to first frame
        if (window.setAnimationFrame) {
          window.setAnimationFrame(0);
        }
        break;
      case 'End':
        // Go to last frame
        if (window.setAnimationFrame) {
          window.setAnimationFrame(299);
        }
        break;
      case 'p':
      case 'P':
        // Toggle animation play/pause
        if (window.toggleAnimationPlay) {
          window.toggleAnimationPlay();
        }
        break;
    }
  });
}

// Add a global function to force render, can be called from React
window.forceRender = function() {
  console.log("Force rendering requested");
  if (window.forceRenderCanvas) {
    window.forceRenderCanvas();
  }
}

function init() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

function canvas() {
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

  console.log("Canvas initialized with dimensions:", window.innerWidth, "x", window.innerHeight);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function files(index) {
    var num = (index + 1).toString().padStart(4, '0');
    var path = `/images/male${num}.png`;
    return path;
}

const frameCount = 300;
  const images = [];
  const imageSeq = {
    frame: 0,
  };
  
  // Track current frame and animation state
  let isPaused = false;
  let animation = null;

  // Create a loading indicator
  const loadingDiv = document.createElement('div');
  loadingDiv.style.position = 'fixed';
  loadingDiv.style.top = '50%';
  loadingDiv.style.left = '50%';
  loadingDiv.style.transform = 'translate(-50%, -50%)';
  loadingDiv.style.color = 'white';
  loadingDiv.style.background = 'rgba(0,0,0,0.7)';
  loadingDiv.style.padding = '20px';
  loadingDiv.style.borderRadius = '10px';
  loadingDiv.style.zIndex = '1000';
  loadingDiv.textContent = 'Loading 3D Model...';
  document.body.appendChild(loadingDiv);

  // Use a more efficient image sequence loading and animation pattern
  function imageSequence() {
    const urls = new Array(frameCount).fill().map((o, i) => files(i));
    
    // Load first image immediately for instant feedback
    const firstImage = new Image();
    firstImage.onload = function() {
      console.log("First image loaded successfully");
      context.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
      
      // Now load all other images in background
      preloadImages(urls);
    };
    
    firstImage.onerror = function() {
      console.error("Failed to load first image");
      loadingDiv.textContent = 'Error loading image. Check console for details.';
    };
    
    firstImage.src = urls[0];
    images[0] = firstImage;
    
    // Set up the GSAP animation
    animation = gsap.to(imageSeq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        scrub: 0.15,
        trigger: "#page",
        start: "top top",
        end: "600% top",
        scroller: "#main",
        onUpdate: function(self) {
          window.currentFrame = Math.round(imageSeq.frame);
          if (window.updateDebug) {
            window.updateDebug(window.currentFrame, self.progress);
          }
        }
      },
      onUpdate: render
    });
    
    return animation;
  }
  
  function preloadImages(urls) {
    console.log("Preloading remaining images...");
    let loaded = 1; // First one already loaded
    
    for (let i = 1; i < urls.length; i++) {
      const img = new Image();
      
      img.onload = function() {
        loaded++;
        if (loaded % 30 === 0 || loaded === frameCount) {
          console.log(`Loaded ${loaded}/${frameCount} images`);
          loadingDiv.textContent = `Loading: ${Math.floor((loaded/frameCount) * 100)}%`;
        }
        
        if (loaded === frameCount) {
          console.log("All images loaded!");
          document.body.removeChild(loadingDiv);
        }
      };
      
      img.onerror = function() {
        console.error(`Failed to load image: ${this.src}`);
      };
      
      img.src = urls[i];
      images[i] = img;
    }
  }

  function render() {
    if (images[imageSeq.frame] && images[imageSeq.frame].complete) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[imageSeq.frame], 0, 0, canvas.width, canvas.height);
    } else {
      console.warn(`Image at frame ${imageSeq.frame} not loaded yet`);
    }
  }

  // Start the animation
  imageSequence();

  // Expose functions globally for external control
  window.renderCurrentFrame = function() {
    console.log("Manual render triggered for frame:", imageSeq.frame);
    render();
  };
  
  // Function to set a specific frame
  window.setAnimationFrame = function(frameNum) {
    if (frameNum >= 0 && frameNum < frameCount) {
      imageSeq.frame = frameNum;
      window.currentFrame = frameNum;
      render();
      if (window.updateDebug) {
        window.updateDebug(frameNum, frameNum / frameCount);
      }
    }
  };
  
  // Function to toggle animation play/pause
  window.toggleAnimationPlay = function() {
    isPaused = !isPaused;
    if (isPaused) {
      console.log("Animation paused");
      animation.pause();
    } else {
      console.log("Animation resumed");
      animation.resume();
    }
    
    if (window.updateDebug) {
      const debugElement = document.getElementById('debug-overlay');
      if (debugElement) {
        debugElement.style.backgroundColor = isPaused ? 'rgba(255,0,0,0.7)' : 'rgba(0,0,0,0.7)';
      }
    }
  };
  
  return animation;
}

function initCanvas() {
  console.log("InitCanvas called");
  const canvas = document.querySelector("canvas");
  if (!canvas) {
    console.error("Canvas element not found - will retry in 1 second");
    setTimeout(initCanvas, 1000); // Try again in 1 second
    return;
  }
  
  console.log("Canvas found, size:", canvas.width, "x", canvas.height);
  const context = canvas.getContext("2d");
  if (!context) {
    console.error("Could not get canvas context");
    return;
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  const frameCount = 300;
const images = [];
const imageSeq = {
  frame: 1,
};

  // Preload all images using the files function
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
    const imgSrc = files(i);
    console.log(`Loading image ${i+1}: ${imgSrc}`);
    img.src = imgSrc;
  images.push(img);
}

  // Set up the GSAP animation with scroll trigger
gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
    ease: "none",
  scrollTrigger: {
    scrub: 0.15,
      trigger: "#page",
      start: "top top",
      end: "600% top",
      scroller: "#main",
  },
  onUpdate: render,
});

  // Expose global function for forcing render
  window.forceRenderCanvas = function() {
    console.log("Force rendering canvas with frame:", imageSeq.frame);
    render();
  };
  
  // Initialize with first frame
  images[0].onload = function() {
    console.log("First image loaded, rendering initial frame");
    render();
  };

function render() {
    // Use exact same approach as cyberfiction-frontend
    context.clearRect(0, 0, canvas.width, canvas.height);
    let img = images[imageSeq.frame];
    if (img && img.complete) {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }

  // Set up pin for canvas section
  ScrollTrigger.create({
    trigger: "#page>canvas",
    pin: true,
    scroller: "#main",
    start: "top top",
    end: "600% top",
  });

  // Setup pinning for other pages
  gsap.to("#page1", {
    scrollTrigger: {
      trigger: "#page1",
      start: "top top",
      end: "bottom top",
      pin: true,
      scroller: "#main"
  }
  });
  
  gsap.to("#page2", {
    scrollTrigger: {
      trigger: "#page2",
      start: "top top",
      end: "bottom top",
      pin: true,
      scroller: "#main"
  }
  });
  
  gsap.to("#page3", {
    scrollTrigger: {
      trigger: "#page3",
      start: "top top",
      end: "bottom top",
      pin: true,
      scroller: "#main"
  }
  });

  // GitHub button functionality
const gitHubButton = document.getElementById('github');
  if (gitHubButton) {
    gitHubButton.onclick = function() {
      window.open("https://github.com/", "_blank");
    }
  }
}

function scaleImage(img, ctx) {
  if (!img || !ctx) {
    console.error("Invalid image or context for scaling");
    return;
  }

  // Simple direct drawing without scaling manipulation
  var canvas = ctx.canvas;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

// Immediately display the first image
(function() {
  console.log("🔄 Immediate execution to display first image");
  
  function displayFirstImage() {
    const canvas = document.querySelector("canvas");
    if (!canvas) {
      console.warn("Canvas not found yet, waiting...");
      setTimeout(displayFirstImage, 100);
      return;
    }
    
    console.log("✅ Canvas found, displaying first image immediately");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Could not get canvas context");
      return;
    }
    
    const img = new Image();
    img.onload = function() {
      console.log("✅ First image loaded, drawing to canvas");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    
    img.onerror = function() {
      console.error("❌ Failed to load first image", img.src);
    };
    
    img.src = "/images/male0001.png";
  }
  
  // Try to display immediately
  displayFirstImage();
  
  // Also try again when DOM is fully loaded
  window.addEventListener("load", displayFirstImage);
})();
