// This script will run immediately and display the first image
(function() {
  console.log("🔍 FIX-IMAGE SCRIPT RUNNING");
  
  // Function to display image directly
  function displayFirstImage() {
    console.log("Attempting to display first image directly");
    
    // Check if document.body exists yet
    if (!document.body) {
      console.log("Document body not ready yet, waiting...");
      setTimeout(displayFirstImage, 50);
      return;
    }
    
    // Get the canvas or create one if it doesn't exist
    let canvas = document.querySelector("canvas");
    
    if (!canvas) {
      console.log("Canvas not found, creating one...");
      canvas = document.createElement("canvas");
      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.zIndex = "9";
      canvas.style.pointerEvents = "none";
      document.body.appendChild(canvas);
    } else {
      console.log("Found existing canvas");
    }
    
    // Set dimensions explicitly
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = "block";
    canvas.style.visibility = "visible";
    
    // Get context
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Could not get canvas context");
      return;
    }
    
    // Create image and load it
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = function() {
      console.log("✅ FIRST IMAGE LOADED SUCCESSFULLY!");
      
      // Clear canvas and draw image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Make sure the image is visible
      canvas.style.opacity = "1";
      
      // Add success message
      const successDiv = document.createElement("div");
      successDiv.style.position = "fixed";
      successDiv.style.bottom = "10px";
      successDiv.style.right = "10px";
      successDiv.style.background = "rgba(0,0,0,0.7)";
      successDiv.style.color = "white";
      successDiv.style.padding = "5px 10px";
      successDiv.style.borderRadius = "5px";
      successDiv.style.zIndex = "10000";
      successDiv.textContent = "3D Model Loaded ✓";
      document.body.appendChild(successDiv);
      
      // Remove after 3 seconds
      setTimeout(() => {
        if (successDiv.parentNode) {
          successDiv.parentNode.removeChild(successDiv);
        }
      }, 3000);
    };
    
    img.onerror = function() {
      console.error("❌ ERROR LOADING IMAGE:", img.src);
      
      // Show error message on screen
      const errorDiv = document.createElement("div");
      errorDiv.style.position = "fixed";
      errorDiv.style.top = "50%";
      errorDiv.style.left = "50%";
      errorDiv.style.transform = "translate(-50%, -50%)";
      errorDiv.style.background = "rgba(255,0,0,0.8)";
      errorDiv.style.color = "white";
      errorDiv.style.padding = "20px";
      errorDiv.style.borderRadius = "5px";
      errorDiv.style.zIndex = "10000";
      errorDiv.innerHTML = `
        <h3>Image Load Error</h3>
        <p>Failed to load: ${img.src}</p>
        <p>Please check the browser console for details.</p>
        <button onclick="location.reload()">Reload Page</button>
      `;
      document.body.appendChild(errorDiv);
    };
    
    // Set the direct path to the first image
    img.src = "/images/male0001.png";
    console.log("🔄 Loading image from:", img.src);
  }
  
  // Instead of running immediately, wait for DOM to be at least partly ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      console.log("DOM Content Loaded, trying to display image");
      displayFirstImage();
    });
  } else {
    // If already past loading state, run with a slight delay to ensure body is available
    setTimeout(displayFirstImage, 10);
  }
})(); 