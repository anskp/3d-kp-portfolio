// This script will run immediately and display the first image
(function() {
  console.log("🔍 FIX-IMAGE SCRIPT RUNNING");
  
  // Function to display image directly
  function displayFirstImage() {
    console.log("Attempting to display first image directly");
    
    // Get the canvas
    const canvas = document.querySelector("canvas");
    if (!canvas) {
      console.error("Canvas not found! Retrying in 500ms...");
      setTimeout(displayFirstImage, 500);
      return;
    }
    
    // Set dimensions explicitly
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = "block";
    canvas.style.position = "fixed";
    canvas.style.pointerEvents = "none";
    
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
      canvas.style.visibility = "visible";
      
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
  
  // Try to load image immediately
  displayFirstImage();
  
  // Also set up event listener for when DOM is fully loaded
  document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded, trying to display image again");
    displayFirstImage();
  });
  
  // If we're already past DOMContentLoaded
  if (document.readyState === "complete" || document.readyState === "interactive") {
    console.log("Document already loaded, trying immediately");
    displayFirstImage();
  }
})(); 