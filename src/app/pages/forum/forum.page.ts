import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class ForumPage {
  searchQuery = '';
  selectedCategory = 'all';
  isCreatingPost = false;
  
  newPost = {
    title: '',
    content: '',
    category: 'general',
    tags: ''
  };

  categories = [
    { value: 'all', label: 'All Topics' },
    { value: 'general', label: 'General Discussion' },
    { value: 'coding', label: 'Coding Help' },
    { value: 'projects', label: 'Project Showcase' },
    { value: 'tutorials', label: 'Tutorials' },
    { value: 'hardware', label: 'Hardware Issues' }
  ];

  posts = [
    {
      id: 1,
      title: 'How to create a rainbow pattern on LED Cube?',
      author: 'CodingMaster',
      category: 'coding',
      tags: ['pattern', 'rainbow', 'beginner'],
      content: 'I\'m trying to create a beautiful rainbow pattern on my 4x4x4 LED cube. Can anyone help me with the code?',
      replies: 5,
      views: 128,
      date: '2 hours ago',
      isSticky: false
    },
    {
      id: 2,
      title: 'My first LED Cube project - Snake Game!',
      author: 'GameDevPro',
      category: 'projects',
      tags: ['game', 'snake', 'interactive'],
      content: 'Check out my first LED cube project! I created a simple snake game that you can control with buttons.',
      replies: 12,
      views: 256,
      date: '1 day ago',
      isSticky: true
    },
    {
      id: 3,
      title: 'LED Cube not responding to Bluetooth commands',
      author: 'TechGuru',
      category: 'hardware',
      tags: ['bluetooth', 'connection', 'troubleshooting'],
      content: 'My LED cube connects via Bluetooth but doesn\'t respond to commands. Any suggestions?',
      replies: 8,
      views: 89,
      date: '3 days ago',
      isSticky: false
    },
    {
      id: 4,
      title: 'Complete beginner guide to LED Cube programming',
      author: 'EduBoxTeam',
      category: 'tutorials',
      tags: ['tutorial', 'beginner', 'guide'],
      content: 'A comprehensive guide for beginners who want to start programming LED cubes with EduBox.',
      replies: 25,
      views: 512,
      date: '1 week ago',
      isSticky: true
    }
  ];

  filteredPosts = [...this.posts];

  constructor() {
    this.filterPosts();
  }

  filterPosts() {
    this.filteredPosts = this.posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           post.content.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase()));
      
      const matchesCategory = this.selectedCategory === 'all' || post.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }

  onSearchChange() {
    this.filterPosts();
  }

  onCategoryChange() {
    this.filterPosts();
  }

  createPost() {
    if (!this.newPost.title || !this.newPost.content) {
      return;
    }

    const post = {
      id: this.posts.length + 1,
      title: this.newPost.title,
      author: 'CurrentUser',
      category: this.newPost.category,
      tags: this.newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      content: this.newPost.content,
      replies: 0,
      views: 0,
      date: 'Just now',
      isSticky: false
    };

    this.posts.unshift(post);
    this.filterPosts();
    
    // Reset form
    this.newPost = {
      title: '',
      content: '',
      category: 'general',
      tags: ''
    };
    
    this.isCreatingPost = false;
  }

  cancelPost() {
    this.isCreatingPost = false;
    this.newPost = {
      title: '',
      content: '',
      category: 'general',
      tags: ''
    };
  }

  getCategoryLabel(value: string): string {
    const category = this.categories.find(cat => cat.value === value);
    return category ? category.label : value;
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'general': '#1972a4',
      'coding': '#28a745',
      'projects': '#f5b202',
      'tutorials': '#6f42c1',
      'hardware': '#dc3545'
    };
    return colors[category] || '#1972a4';
  }
}
