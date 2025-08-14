// EduBox LED Cube Pattern Library
// Pattern generation and manipulation utilities

class EduBoxPatterns {
  constructor() {
    this.patterns = new Map();
    this.registerPatterns();
  }

  registerPatterns() {
    // Basic geometric patterns
    this.patterns.set('cube', this.cubePattern.bind(this));
    this.patterns.set('sphere', this.spherePattern.bind(this));
    this.patterns.set('cylinder', this.cylinderPattern.bind(this));
    this.patterns.set('plane', this.planePattern.bind(this));
    
    // Text and symbols
    this.patterns.set('heart', this.heartPattern.bind(this));
    this.patterns.set('star', this.starPattern.bind(this));
    this.patterns.set('cross', this.crossPattern.bind(this));
    this.patterns.set('diamond', this.diamondPattern.bind(this));
    
    // Mathematical patterns
    this.patterns.set('fibonacci', this.fibonacciPattern.bind(this));
    this.patterns.set('goldenRatio', this.goldenRatioPattern.bind(this));
    this.patterns.set('fractal', this.fractalPattern.bind(this));
    
    // Artistic patterns
    this.patterns.set('gradient', this.gradientPattern.bind(this));
    this.patterns.set('checkerboard', this.checkerboardPattern.bind(this));
    this.patterns.set('stripes', this.stripesPattern.bind(this));
    this.patterns.set('dots', this.dotsPattern.bind(this));
  }

  // Generate cube outline pattern
  cubePattern(cube, color = null) {
    cube.clear();
    
    const patternColor = color || cube.BLUE;
    
    // Draw cube edges
    for (let i = 0; i < 4; i++) {
      // Bottom face edges
      cube.setPixel3D(i, 0, 0, patternColor);
      cube.setPixel3D(0, 0, i, patternColor);
      cube.setPixel3D(3, 0, i, patternColor);
      cube.setPixel3D(i, 0, 3, patternColor);
      
      // Top face edges
      cube.setPixel3D(i, 3, 0, patternColor);
      cube.setPixel3D(0, 3, i, patternColor);
      cube.setPixel3D(3, 3, i, patternColor);
      cube.setPixel3D(i, 3, 3, patternColor);
      
      // Vertical edges
      cube.setPixel3D(0, i, 0, patternColor);
      cube.setPixel3D(3, i, 0, patternColor);
      cube.setPixel3D(0, i, 3, patternColor);
      cube.setPixel3D(3, i, 3, patternColor);
    }
  }

  // Generate sphere pattern
  spherePattern(cube, center = {x: 1.5, y: 1.5, z: 1.5}, radius = 1.5, color = null) {
    cube.clear();
    
    const patternColor = color || cube.RED;
    
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        for (let z = 0; z < 4; z++) {
          const distance = Math.sqrt(
            (x - center.x) ** 2 + 
            (y - center.y) ** 2 + 
            (z - center.z) ** 2
          );
          
          if (Math.abs(distance - radius) < 0.5) {
            cube.setPixel3D(x, y, z, patternColor);
          }
        }
      }
    }
  }

  // Generate cylinder pattern
  cylinderPattern(cube, center = {x: 1.5, z: 1.5}, radius = 1.5, color = null) {
    cube.clear();
    
    const patternColor = color || cube.GREEN;
    
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        for (let z = 0; z < 4; z++) {
          const distance = Math.sqrt((x - center.x) ** 2 + (z - center.z) ** 2);
          
          if (Math.abs(distance - radius) < 0.5) {
            cube.setPixel3D(x, y, z, patternColor);
          }
        }
      }
    }
  }

  // Generate plane pattern
  planePattern(cube, normal = 'y', position = 2, color = null) {
    cube.clear();
    
    const patternColor = color || cube.YELLOW;
    
    switch (normal) {
      case 'x':
        for (let y = 0; y < 4; y++) {
          for (let z = 0; z < 4; z++) {
            cube.setPixel3D(position, y, z, patternColor);
          }
        }
        break;
      case 'y':
        for (let x = 0; x < 4; x++) {
          for (let z = 0; z < 4; z++) {
            cube.setPixel3D(x, position, z, patternColor);
          }
        }
        break;
      case 'z':
        for (let x = 0; x < 4; x++) {
          for (let y = 0; y < 4; y++) {
            cube.setPixel3D(x, y, position, patternColor);
          }
        }
        break;
    }
  }

  // Generate heart pattern
  heartPattern(cube, color = null) {
    cube.clear();
    
    const patternColor = color || cube.RED;
    
    // Heart shape coordinates (simplified)
    const heartCoords = [
      [1, 3, 2], [2, 3, 2], [3, 3, 2],
      [0, 2, 2], [1, 2, 2], [2, 2, 2], [3, 2, 2], [4, 2, 2],
      [0, 1, 2], [1, 1, 2], [2, 1, 2], [3, 1, 2], [4, 1, 2],
      [1, 0, 2], [2, 0, 2], [3, 0, 2]
    ];
    
    heartCoords.forEach(([x, y, z]) => {
      if (x >= 0 && x < 4 && y >= 0 && y < 4 && z >= 0 && z < 4) {
        cube.setPixel3D(x, y, z, patternColor);
      }
    });
  }

  // Generate star pattern
  starPattern(cube, color = null) {
    cube.clear();
    
    const patternColor = color || cube.YELLOW;
    
    // Star points
    const starCoords = [
      [2, 3, 2], // top
      [1, 2, 1], [3, 2, 1], // upper left/right
      [0, 1, 2], [4, 1, 2], // middle left/right
      [1, 0, 3], [3, 0, 3], // lower left/right
      [2, 0, 1] // bottom
    ];
    
    starCoords.forEach(([x, y, z]) => {
      if (x >= 0 && x < 4 && y >= 0 && y < 4 && z >= 0 && z < 4) {
        cube.setPixel3D(x, y, z, patternColor);
      }
    });
  }

  // Generate cross pattern
  crossPattern(cube, color = null) {
    cube.clear();
    
    const patternColor = color || cube.WHITE;
    
    // Vertical line
    for (let y = 0; y < 4; y++) {
      cube.setPixel3D(2, y, 2, patternColor);
    }
    
    // Horizontal line
    for (let x = 0; x < 4; x++) {
      cube.setPixel3D(x, 2, 2, patternColor);
    }
  }

  // Generate diamond pattern
  diamondPattern(cube, color = null) {
    cube.clear();
    
    const patternColor = color || cube.CYAN;
    
    // Diamond shape
    for (let i = 0; i < 4; i++) {
      cube.setPixel3D(2, i, 2, patternColor); // vertical center
      cube.setPixel3D(2, 2, i, patternColor); // horizontal center
    }
    
    // Diagonal lines
    for (let i = 0; i < 4; i++) {
      cube.setPixel3D(i, i, 2, patternColor);
      cube.setPixel3D(3 - i, i, 2, patternColor);
    }
  }

  // Generate Fibonacci spiral pattern
  fibonacciPattern(cube, color = null) {
    cube.clear();
    
    const patternColor = color || cube.MAGENTA;
    
    // Fibonacci sequence
    const fib = [1, 1, 2, 3, 5, 8, 13, 21];
    
    for (let i = 0; i < Math.min(fib.length, 8); i++) {
      const angle = i * Math.PI / 4;
      const radius = fib[i] / 21; // Normalize to 0-1
      
      const x = Math.floor((Math.cos(angle) * radius * 2 + 2));
      const y = Math.floor((Math.sin(angle) * radius * 2 + 2));
      
      if (x >= 0 && x < 4 && y >= 0 && y < 4) {
        cube.setPixel3D(x, y, 2, patternColor);
      }
    }
  }

  // Generate golden ratio pattern
  goldenRatioPattern(cube, color = null) {
    cube.clear();
    
    const patternColor = color || cube.YELLOW;
    const phi = 1.618033988749895; // Golden ratio
    
    for (let i = 0; i < 16; i++) {
      const angle = i * 2 * Math.PI / phi;
      const radius = (i % 4) / 4;
      
      const x = Math.floor((Math.cos(angle) * radius * 3 + 2));
      const y = Math.floor((Math.sin(angle) * radius * 3 + 2));
      
      if (x >= 0 && x < 4 && y >= 0 && y < 4) {
        cube.setPixel3D(x, y, 2, patternColor);
      }
    }
  }

  // Generate fractal-like pattern
  fractalPattern(cube, color = null) {
    cube.clear();
    
    const patternColor = color || cube.BLUE;
    
    // Simple fractal-like pattern
    for (let i = 0; i < 64; i++) {
      const x = i % 4;
      const y = Math.floor(i / 4) % 4;
      const z = Math.floor(i / 16);
      
      // Create recursive-like pattern
      if ((x + y + z) % 2 === 0) {
        if ((x + y) % 2 === 0) {
          cube.setPixel(i, patternColor);
        }
      }
    }
  }

  // Generate gradient pattern
  gradientPattern(cube, startColor = null, endColor = null) {
    cube.clear();
    
    const start = startColor || cube.RED;
    const end = endColor || cube.BLUE;
    
    for (let i = 0; i < 64; i++) {
      const x = i % 4;
      const y = Math.floor(i / 4) % 4;
      const z = Math.floor(i / 16);
      
      // Create gradient based on position
      const factor = (x + y + z) / 12; // 0 to 1
      
      const r = Math.round((start >> 16) * (1 - factor) + (end >> 16) * factor);
      const g = Math.round(((start >> 8) & 255) * (1 - factor) + ((end >> 8) & 255) * factor);
      const b = Math.round((start & 255) * (1 - factor) + (end & 255) * factor);
      
      cube.setPixel(i, cube.rgb(r, g, b));
    }
  }

  // Generate checkerboard pattern
  checkerboardPattern(cube, color1 = null, color2 = null) {
    cube.clear();
    
    const c1 = color1 || cube.WHITE;
    const c2 = color2 || cube.BLACK;
    
    for (let i = 0; i < 64; i++) {
      const x = i % 4;
      const y = Math.floor(i / 4) % 4;
      const z = Math.floor(i / 16);
      
      if ((x + y + z) % 2 === 0) {
        cube.setPixel(i, c1);
      } else {
        cube.setPixel(i, c2);
      }
    }
  }

  // Generate stripes pattern
  stripesPattern(cube, direction = 'x', color1 = null, color2 = null) {
    cube.clear();
    
    const c1 = color1 || cube.RED;
    const c2 = color2 || cube.BLUE;
    
    for (let i = 0; i < 64; i++) {
      const x = i % 4;
      const y = Math.floor(i / 4) % 4;
      const z = Math.floor(i / 16);
      
      let coord;
      switch (direction) {
        case 'x': coord = x; break;
        case 'y': coord = y; break;
        case 'z': coord = z; break;
        default: coord = x;
      }
      
      if (coord % 2 === 0) {
        cube.setPixel(i, c1);
      } else {
        cube.setPixel(i, c2);
      }
    }
  }

  // Generate dots pattern
  dotsPattern(cube, spacing = 2, color = null) {
    cube.clear();
    
    const patternColor = color || cube.GREEN;
    
    for (let i = 0; i < 64; i++) {
      const x = i % 4;
      const y = Math.floor(i / 4) % 4;
      const z = Math.floor(i / 16);
      
      if (x % spacing === 0 && y % spacing === 0 && z % spacing === 0) {
        cube.setPixel(i, patternColor);
      }
    }
  }

  // Get pattern by name
  getPattern(name) {
    return this.patterns.get(name);
  }

  // Get list of available patterns
  getAvailablePatterns() {
    return Array.from(this.patterns.keys());
  }

  // Create custom pattern
  createCustomPattern(patternFunction) {
    return patternFunction;
  }

  // Combine multiple patterns
  combinePatterns(patterns, blendMode = 'add') {
    return (cube) => {
      cube.clear();
      
      patterns.forEach(({pattern, weight = 1}) => {
        if (typeof pattern === 'string') {
          pattern = this.getPattern(pattern);
        }
        
        if (pattern) {
          pattern(cube);
          // Apply weight (simplified blending)
          for (let i = 0; i < 64; i++) {
            const current = cube.cube.pixels[i];
            if (current > 0) {
              cube.setPixel(i, Math.floor(current * weight));
            }
          }
        }
      });
    };
  }
}

// Global patterns instance
window.EduBoxPatterns = new EduBoxPatterns();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EduBoxPatterns;
}
