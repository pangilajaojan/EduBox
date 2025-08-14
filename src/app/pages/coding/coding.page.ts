import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coding',
  templateUrl: './coding.page.html',
  styleUrls: ['./coding.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class CodingPage implements OnInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  code = `// LED Cube Animation Code
// Example: Rainbow Pattern

function setup() {
  // Initialize LED cube
  cube.init();
}

function loop() {
  // Create rainbow effect
  for (let i = 0; i < 64; i++) {
    let hue = (millis() / 10 + i * 5) % 360;
    let color = hsvToRgb(hue, 100, 100);
    cube.setPixel(i, color);
  }
  
  cube.show();
  delay(50);
}`;

  selectedLanguage = 'javascript';
  isRunning = false;
  output = '';
  
  languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'cpp', label: 'C++' },
    { value: 'arduino', label: 'Arduino' }
  ];

  ngOnInit() {
    this.initCubePreview();
  }

  initCubePreview() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;

    // Draw LED cube preview
    this.drawCube(ctx);
  }

  drawCube(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, 400, 400);
    
    // Draw cube structure
    ctx.strokeStyle = '#1972a4';
    ctx.lineWidth = 2;
    
    // Draw cube outline
    ctx.beginPath();
    ctx.moveTo(100, 300);
    ctx.lineTo(300, 300);
    ctx.lineTo(300, 100);
    ctx.lineTo(100, 100);
    ctx.closePath();
    ctx.stroke();
    
    // Draw vertical lines
    ctx.beginPath();
    ctx.moveTo(100, 300);
    ctx.lineTo(100, 100);
    ctx.moveTo(200, 300);
    ctx.lineTo(200, 100);
    ctx.moveTo(300, 300);
    ctx.lineTo(300, 100);
    ctx.stroke();
    
    // Draw horizontal lines
    ctx.beginPath();
    ctx.moveTo(100, 200);
    ctx.lineTo(300, 200);
    ctx.stroke();
    
    // Draw sample LEDs
    this.drawLED(ctx, 150, 250, '#f5b202');
    this.drawLED(ctx, 200, 250, '#1972a4');
    this.drawLED(ctx, 250, 250, '#28a745');
    this.drawLED(ctx, 150, 200, '#dc3545');
    this.drawLED(ctx, 200, 200, '#6f42c1');
    this.drawLED(ctx, 250, 200, '#fd7e14');
  }

  drawLED(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add glow effect
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  runCode() {
    this.isRunning = true;
    this.output = 'Running code...\n';
    
    // Simulate code execution
    setTimeout(() => {
      this.output += 'Code executed successfully!\n';
      this.output += 'LED Cube pattern updated.\n';
      this.isRunning = false;
      
      // Update cube preview with new pattern
      this.updateCubePreview();
    }, 2000);
  }

  stopCode() {
    this.isRunning = false;
    this.output += 'Code execution stopped.\n';
  }

  updateCubePreview() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and redraw with new pattern
    this.drawCube(ctx);
    
    // Add some animation
    this.animateCube(ctx);
  }

  animateCube(ctx: CanvasRenderingContext2D) {
    let frame = 0;
    const animate = () => {
      frame++;
      
      // Clear and redraw
      this.drawCube(ctx);
      
      // Add animated LEDs
      const colors = ['#f5b202', '#1972a4', '#28a745', '#dc3545', '#6f42c1'];
      for (let i = 0; i < 5; i++) {
        const x = 150 + (i * 25);
        const y = 250 + Math.sin(frame * 0.1 + i) * 20;
        const color = colors[i % colors.length];
        this.drawLED(ctx, x, y, color);
      }
      
      if (frame < 100) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }

  saveCode() {
    // Save code to localStorage or Firebase
    localStorage.setItem('edubox_code', this.code);
    this.output += 'Code saved successfully!\n';
  }

  loadCode() {
    const savedCode = localStorage.getItem('edubox_code');
    if (savedCode) {
      this.code = savedCode;
      this.output += 'Code loaded successfully!\n';
    }
  }

  clearCode() {
    this.code = '';
    this.output += 'Code editor cleared.\n';
  }
}
