// EduBox LED Cube Main JavaScript File
// Main functionality for LED cube programming and control

class EduBoxLEDCube {
  constructor() {
    this.cube = null;
    this.isInitialized = false;
    this.currentPattern = null;
    this.animationId = null;
    this.isRunning = false;
    
    this.init();
  }

  init() {
    console.log('EduBox LED Cube initializing...');
    
    // Initialize cube structure (4x4x4 = 64 LEDs)
    this.cube = {
      pixels: new Array(64).fill(0),
      brightness: 255,
      frameRate: 60,
      isConnected: false
    };
    
    this.isInitialized = true;
    console.log('EduBox LED Cube initialized successfully');
  }

  // Connect to physical LED cube device
  async connectDevice() {
    try {
      // Simulate device connection
      await this.simulateConnection();
      this.cube.isConnected = true;
      console.log('Device connected successfully');
      return true;
    } catch (error) {
      console.error('Failed to connect device:', error);
      return false;
    }
  }

  // Simulate connection delay
  simulateConnection() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  // Set individual pixel color
  setPixel(index, color) {
    if (index >= 0 && index < 64) {
      this.cube.pixels[index] = color;
    }
  }

  // Set pixel by 3D coordinates
  setPixel3D(x, y, z, color) {
    if (x >= 0 && x < 4 && y >= 0 && y < 4 && z >= 0 && z < 4) {
      const index = x + y * 4 + z * 16;
      this.setPixel(index, color);
    }
  }

  // Clear all pixels
  clear() {
    this.cube.pixels.fill(0);
  }

  // Show current pattern
  show() {
    if (this.cube.isConnected) {
      console.log('Displaying pattern on LED cube');
      // In real implementation, this would send data to the device
    }
  }

  // Start animation loop
  startAnimation(pattern, frameRate = 60) {
    if (this.isRunning) {
      this.stopAnimation();
    }

    this.currentPattern = pattern;
    this.isRunning = true;
    
    const animate = () => {
      if (!this.isRunning) return;
      
      pattern(this);
      this.show();
      
      this.animationId = setTimeout(animate, 1000 / frameRate);
    };
    
    animate();
  }

  // Stop animation
  stopAnimation() {
    this.isRunning = false;
    if (this.animationId) {
      clearTimeout(this.animationId);
      this.animationId = null;
    }
  }

  // Utility functions
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  millis() {
    return Date.now();
  }

  // Color utilities
  rgb(r, g, b) {
    return (r << 16) | (g << 8) | b;
  }

  hsvToRgb(h, s, v) {
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }

    return this.rgb(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
  }

  // Predefined colors
  get RED() { return this.rgb(255, 0, 0); }
  get GREEN() { return this.rgb(0, 255, 0); }
  get BLUE() { return this.rgb(0, 0, 255); }
  get WHITE() { return this.rgb(255, 255, 255); }
  get BLACK() { return this.rgb(0, 0, 0); }
  get YELLOW() { return this.rgb(255, 255, 0); }
  get CYAN() { return this.rgb(0, 255, 255); }
  get MAGENTA() { return this.rgb(255, 0, 255); }
}

// Global EduBox instance
window.EduBox = new EduBoxLEDCube();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EduBoxLEDCube;
}
