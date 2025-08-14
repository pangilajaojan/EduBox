import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class LibraryPage {
  searchQuery = '';
  selectedCategory = 'all';
  selectedType = 'all';
  isUploading = false;
  
  newProject = {
    name: '',
    description: '',
    category: 'animation',
    type: 'preset',
    code: '',
    tags: ''
  };

  categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'animation', label: 'Animation' },
    { value: 'pattern', label: 'Pattern' },
    { value: 'game', label: 'Games' },
    { value: 'education', label: 'Education' },
    { value: 'premium', label: 'Premium' }
  ];

  types = [
    { value: 'all', label: 'All Types' },
    { value: 'preset', label: 'Presets' },
    { value: 'project', label: 'Projects' },
    { value: 'tutorial', label: 'Tutorials' }
  ];

  presets = [
    {
      id: 1,
      name: 'Rainbow Wave',
      category: 'animation',
      type: 'preset',
      description: 'Beautiful rainbow wave animation that flows through the LED cube',
      author: 'EduBox Team',
      downloads: 1250,
      rating: 4.8,
      tags: ['rainbow', 'wave', 'animation', 'beginner'],
      code: `function setup() {
  cube.init();
}

function loop() {
  for (let i = 0; i < 64; i++) {
    let hue = (millis() / 10 + i * 5) % 360;
    let color = hsvToRgb(hue, 100, 100);
    cube.setPixel(i, color);
  }
  cube.show();
  delay(50);
}`,
      isPremium: false
    },
    {
      id: 2,
      name: 'Snake Game',
      category: 'game',
      type: 'preset',
      description: 'Classic snake game with LED cube controls and scoring',
      author: 'GameDevPro',
      downloads: 890,
      rating: 4.9,
      tags: ['game', 'snake', 'interactive', 'intermediate'],
      code: `// Snake game implementation
let snake = [{x: 2, y: 2, z: 2}];
let food = generateFood();
let direction = 'right';

function loop() {
  moveSnake();
  checkCollision();
  drawGame();
  delay(200);
}`,
      isPremium: false
    },
    {
      id: 3,
      name: 'Math Visualizer',
      category: 'education',
      type: 'preset',
      description: 'Educational tool to visualize mathematical concepts in 3D',
      author: 'MathTeacher',
      downloads: 456,
      rating: 4.7,
      tags: ['education', 'math', '3d', 'visualization'],
      code: `// Math visualization functions
function drawSphere(center, radius) {
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      for (let z = 0; z < 4; z++) {
        let distance = Math.sqrt((x-center.x)**2 + (y-center.y)**2 + (z-center.z)**2);
        if (Math.abs(distance - radius) < 0.5) {
          cube.setPixel(x + y*4 + z*16, BLUE);
        }
      }
    }
  }
}`,
      isPremium: true
    },
    {
      id: 4,
      name: 'Fire Effect',
      category: 'pattern',
      type: 'preset',
      description: 'Realistic fire effect with flickering flames and heat waves',
      author: 'FXMaster',
      downloads: 2340,
      rating: 4.9,
      tags: ['fire', 'effect', 'realistic', 'advanced'],
      code: `// Fire effect simulation
let fire = new Array(64).fill(0);

function updateFire() {
  for (let i = 0; i < 64; i++) {
    fire[i] = Math.max(0, fire[i] - Math.random() * 0.1);
    if (i < 16) { // Bottom layer
      fire[i] = Math.random() * 0.5 + 0.5;
    }
  }
}`,
      isPremium: true
    }
  ];

  filteredPresets = [...this.presets];

  constructor() {
    this.filterPresets();
  }

  filterPresets() {
    this.filteredPresets = this.presets.filter(preset => {
      const matchesSearch = preset.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           preset.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           preset.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase()));
      
      const matchesCategory = this.selectedCategory === 'all' || preset.category === this.selectedCategory;
      const matchesType = this.selectedType === 'all' || preset.type === this.selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  }

  onSearchChange() {
    this.filterPresets();
  }

  onCategoryChange() {
    this.filterPresets();
  }

  onTypeChange() {
    this.filterPresets();
  }

  uploadProject() {
    if (!this.newProject.name || !this.newProject.description || !this.newProject.code) {
      return;
    }

    const project = {
      id: this.presets.length + 1,
      name: this.newProject.name,
      category: this.newProject.category,
      type: this.newProject.type,
      description: this.newProject.description,
      author: 'CurrentUser',
      downloads: 0,
      rating: 0,
      tags: this.newProject.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      code: this.newProject.code,
      isPremium: false
    };

    this.presets.unshift(project);
    this.filterPresets();
    
    // Reset form
    this.newProject = {
      name: '',
      description: '',
      category: 'animation',
      type: 'preset',
      code: '',
      tags: ''
    };
    
    this.isUploading = false;
  }

  downloadPreset(preset: any) {
    // Simulate download
    const element = document.createElement('a');
    const file = new Blob([preset.code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${preset.name}.js`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    // Update download count
    preset.downloads++;
  }

  getCategoryLabel(value: string): string {
    const category = this.categories.find(cat => cat.value === value);
    return category ? category.label : value;
  }

  getTypeLabel(value: string): string {
    const type = this.types.find(t => t.value === value);
    return type ? type.label : value;
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'animation': '#1972a4',
      'pattern': '#28a745',
      'game': '#f5b202',
      'education': '#6f42c1',
      'premium': '#dc3545'
    };
    return colors[category] || '#1972a4';
  }

  getTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
      'preset': '#17a2b8',
      'project': '#28a745',
      'tutorial': '#6f42c1'
    };
    return colors[type] || '#17a2b8';
  }

  getCategoryDescription(category: string): string {
    const descriptions: { [key: string]: string } = {
      'animation': 'Dynamic LED animations and effects',
      'pattern': 'Static LED patterns and designs',
      'game': 'Interactive LED cube games',
      'education': 'Educational LED cube projects',
      'premium': 'Advanced and premium content'
    };
    return descriptions[category] || 'LED cube projects and presets';
  }
}
