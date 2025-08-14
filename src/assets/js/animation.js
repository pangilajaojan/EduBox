// EduBox LED Cube Animation Library
// Predefined animations and patterns for LED cube

class EduBoxAnimations {
  constructor() {
    this.animations = new Map();
    this.registerAnimations();
  }

  registerAnimations() {
    // Rainbow wave animation
    this.animations.set('rainbow', this.rainbowWave.bind(this));
    
    // Fire effect animation
    this.animations.set('fire', this.fireEffect.bind(this));
    
    // Snake game animation
    this.animations.set('snake', this.snakeGame.bind(this));
    
    // Matrix rain effect
    this.animations.set('matrix', this.matrixRain.bind(this));
    
    // Spiral animation
    this.animations.set('spiral', this.spiral.bind(this));
    
    // Cube rotation
    this.animations.set('rotate', this.cubeRotate.bind(this));
    
    // Pulse effect
    this.animations.set('pulse', this.pulse.bind(this));
    
    // Wave effect
    this.animations.set('wave', this.wave.bind(this));
  }

  // Rainbow wave animation
  rainbowWave(cube) {
    const time = cube.millis() / 1000;
    
    for (let i = 0; i < 64; i++) {
      const x = i % 4;
      const y = Math.floor(i / 4) % 4;
      const z = Math.floor(i / 16);
      
      const hue = (time * 0.5 + i * 0.1) % 1;
      const color = cube.hsvToRgb(hue, 1, 1);
      
      cube.setPixel(i, color);
    }
  }

  // Fire effect animation
  fireEffect(cube) {
    const time = cube.millis() / 1000;
    const fire = new Array(64).fill(0);
    
    // Generate fire at bottom layer
    for (let x = 0; x < 4; x++) {
      for (let z = 0; z < 4; z++) {
        const intensity = 0.5 + 0.5 * Math.sin(time * 3 + x * 0.5 + z * 0.3);
        fire[x + z * 16] = intensity;
      }
    }
    
    // Propagate fire upward
    for (let y = 1; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        for (let z = 0; z < 4; z++) {
          const index = x + y * 4 + z * 16;
          const below = x + (y - 1) * 4 + z * 16;
          
          fire[index] = fire[below] * 0.8 + Math.random() * 0.2;
        }
      }
    }
    
    // Apply fire colors
    for (let i = 0; i < 64; i++) {
      const intensity = fire[i];
      const r = Math.round(intensity * 255);
      const g = Math.round(intensity * 128);
      const b = Math.round(intensity * 64);
      
      cube.setPixel(i, cube.rgb(r, g, b));
    }
  }

  // Snake game animation
  snakeGame(cube) {
    const time = cube.millis() / 1000;
    
    // Simple snake movement
    const snakeLength = 5;
    const headX = Math.floor(Math.sin(time) * 2 + 2);
    const headZ = Math.floor(Math.cos(time) * 2 + 2);
    
    cube.clear();
    
    // Draw snake
    for (let i = 0; i < snakeLength; i++) {
      const x = (headX + i) % 4;
      const z = (headZ + i) % 4;
      const y = 2;
      
      const color = i === 0 ? cube.GREEN : cube.YELLOW;
      cube.setPixel3D(x, y, z, color);
    }
    
    // Draw food
    const foodX = Math.floor(Math.sin(time * 2) * 2 + 2);
    const foodZ = Math.floor(Math.cos(time * 2) * 2 + 2);
    cube.setPixel3D(foodX, 2, foodZ, cube.RED);
  }

  // Matrix rain effect
  matrixRain(cube) {
    const time = cube.millis() / 1000;
    
    cube.clear();
    
    // Create falling green characters
    for (let x = 0; x < 4; x++) {
      const dropLength = Math.floor(Math.random() * 3) + 1;
      const startY = Math.floor((time * 2 + x) % 8) - 4;
      
      for (let i = 0; i < dropLength; i++) {
        const y = startY + i;
        if (y >= 0 && y < 4) {
          const intensity = 1 - (i / dropLength);
          const green = Math.round(intensity * 255);
          cube.setPixel3D(x, y, 2, cube.rgb(0, green, 0));
        }
      }
    }
  }

  // Spiral animation
  spiral(cube) {
    const time = cube.millis() / 1000;
    
    cube.clear();
    
    // Create spiral pattern
    for (let i = 0; i < 64; i++) {
      const x = i % 4;
      const y = Math.floor(i / 4) % 4;
      const z = Math.floor(i / 16);
      
      const angle = Math.atan2(y - 1.5, x - 1.5);
      const radius = Math.sqrt((x - 1.5) ** 2 + (y - 1.5) ** 2);
      
      const hue = (angle / (2 * Math.PI) + time * 0.5) % 1;
      const color = cube.hsvToRgb(hue, 1, 1);
      
      cube.setPixel(i, color);
    }
  }

  // Cube rotation
  cubeRotate(cube) {
    const time = cube.millis() / 1000;
    
    cube.clear();
    
    // Rotate cube around Y axis
    for (let i = 0; i < 64; i++) {
      const x = i % 4;
      const y = Math.floor(i / 4) % 4;
      const z = Math.floor(i / 16);
      
      // Apply rotation
      const cos = Math.cos(time);
      const sin = Math.sin(time);
      const rotX = (x - 1.5) * cos - (z - 1.5) * sin + 1.5;
      const rotZ = (x - 1.5) * sin + (z - 1.5) * cos + 1.5;
      
      if (rotX >= 0 && rotX < 4 && rotZ >= 0 && rotZ < 4) {
        const color = cube.hsvToRgb((time + i * 0.1) % 1, 1, 1);
        cube.setPixel3D(Math.floor(rotX), y, Math.floor(rotZ), color);
      }
    }
  }

  // Pulse effect
  pulse(cube) {
    const time = cube.millis() / 1000;
    
    const intensity = 0.5 + 0.5 * Math.sin(time * 3);
    
    for (let i = 0; i < 64; i++) {
      const x = i % 4;
      const y = Math.floor(i / 4) % 4;
      const z = Math.floor(i / 16);
      
      // Center-based intensity
      const centerX = 1.5;
      const centerY = 1.5;
      const centerZ = 1.5;
      
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2 + (z - centerZ) ** 2);
      const pulseIntensity = intensity * Math.max(0, 1 - distance / 3);
      
      const color = cube.rgb(
        Math.round(255 * pulseIntensity),
        Math.round(128 * pulseIntensity),
        Math.round(255 * pulseIntensity)
      );
      
      cube.setPixel(i, color);
    }
  }

  // Wave effect
  wave(cube) {
    const time = cube.millis() / 1000;
    
    cube.clear();
    
    for (let i = 0; i < 64; i++) {
      const x = i % 4;
      const y = Math.floor(i / 4) % 4;
      const z = Math.floor(i / 16);
      
      // Create wave pattern
      const wave1 = Math.sin(time * 2 + x * 0.5) * 0.5 + 0.5;
      const wave2 = Math.sin(time * 1.5 + z * 0.5) * 0.5 + 0.5;
      const wave3 = Math.sin(time * 3 + y * 0.5) * 0.5 + 0.5;
      
      const combined = (wave1 + wave2 + wave3) / 3;
      
      const color = cube.hsvToRgb(combined, 1, 1);
      cube.setPixel(i, color);
    }
  }

  // Get animation by name
  getAnimation(name) {
    return this.animations.get(name);
  }

  // Get list of available animations
  getAvailableAnimations() {
    return Array.from(this.animations.keys());
  }

  // Create custom animation
  createCustomAnimation(patternFunction) {
    return patternFunction;
  }
}

// Global animations instance
window.EduBoxAnimations = new EduBoxAnimations();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EduBoxAnimations;
}
