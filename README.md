# EduBox - Platform Pembelajaran Inovatif

EduBox adalah platform pembelajaran inovatif yang dirancang untuk mengatasi tantangan peringkat PISA Indonesia dan mempersiapkan generasi muda untuk Revolusi Industri 5.0. Dengan memanfaatkan pseudo-hologram, AI, dan IoT, EduBox tidak hanya meningkatkan pemahaman konsep STEAM tetapi juga menumbuhkan keterampilan kritis dan minat belajar siswa.

## 🚀 Fitur Utama

### 🔐 Sistem Autentikasi
- Login dan registrasi dengan Firebase Authentication
- Keamanan data pengguna yang terjamin
- Profile management yang lengkap

### 💻 LED Cube Coding Studio
- Editor kode real-time dengan syntax highlighting
- Preview LED cube 3D yang interaktif
- Dukungan multiple bahasa pemrograman (JavaScript, Python, C++, Arduino)
- Library preset kode yang lengkap

### 🌐 EduBox Community Forum
- Forum diskusi untuk berbagi pengalaman
- Kategori topik yang terorganisir
- Sistem pencarian dan filter yang canggih
- Posting dan komentar yang mudah

### 📚 Library & Presets
- Koleksi preset kode LED cube yang luas
- Kategori: Animation, Pattern, Games, Education, Premium
- Upload dan share project pribadi
- Rating dan review system

### 📱 Device Manager
- Bluetooth scanning untuk LED cube devices
- Connection management yang mudah
- Firmware update otomatis
- Device statistics dan monitoring

## 🎨 Desain & UI/UX

- **Color Scheme**: Menggunakan warna brand EduBox (#1972a4 dan #f5b202)
- **Modern Design**: Interface yang clean, modern, dan responsive
- **Mobile First**: Optimized untuk semua ukuran layar
- **Interactive Elements**: Animasi dan transisi yang smooth

## 🛠️ Teknologi yang Digunakan

### Frontend
- **Ionic Angular 8**: Framework hybrid mobile app
- **Angular 20**: Latest version dengan standalone components
- **TypeScript**: Type-safe development
- **SCSS**: Advanced styling dengan variables dan mixins

### Backend & Database
- **Firebase**: 
  - Authentication
  - Firestore Database
  - Storage
  - Hosting

### LED Cube Programming
- **Custom JavaScript Libraries**:
  - `main.js`: Core LED cube functionality
  - `animation.js`: Predefined animations
  - `pattern.js`: Pattern generation utilities

## 📁 Struktur Proyek

```
EduBox/
├── src/
│   ├── app/
│   │   ├── guards/           # Authentication guards
│   │   ├── pages/            # Application pages
│   │   │   ├── auth/         # Login & Register
│   │   │   ├── landing/      # Main navigation
│   │   │   ├── dashboard/    # User dashboard
│   │   │   ├── coding/       # LED cube coding studio
│   │   │   ├── forum/        # Community forum
│   │   │   ├── library/      # Code library & presets
│   │   │   ├── devices/      # Device manager
│   │   │   └── profile/      # User profile
│   │   ├── app.component.ts  # Root component
│   │   ├── app.routes.ts     # Application routing
│   │   └── app.config.ts     # App configuration
│   ├── assets/
│   │   └── js/               # LED cube JavaScript libraries
│   │       ├── main.js       # Core functionality
│   │       ├── animation.js  # Animation library
│   │       └── pattern.js    # Pattern generation
│   ├── environments/          # Environment configuration
│   └── theme/                # Global styling
├── resources/                 # App icons and splash screens
└── package.json              # Dependencies
```

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Ionic CLI

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/edubox.git
cd edubox

# Install dependencies
npm install

# Install Ionic CLI globally (if not installed)
npm install -g @ionic/cli

# Run development server
ionic serve
```

### Build untuk Production
```bash
# Build untuk web
ionic build

# Build untuk Android
ionic capacitor build android

# Build untuk iOS
ionic capacitor build ios
```

## 🔧 Konfigurasi Firebase

1. Buat project baru di [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication, Firestore, dan Storage
3. Update `src/environments/environment.ts` dengan konfigurasi Firebase Anda:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
  }
};
```

## 📱 Fitur Mobile

- **Responsive Design**: Optimized untuk semua ukuran layar
- **Touch Gestures**: Swipe, tap, dan pinch gestures
- **Offline Support**: Basic offline functionality
- **Push Notifications**: Real-time updates (future feature)

## 🎯 Target Pengguna

- **Siswa SD/SMP/SMA**: Pembelajaran STEAM interaktif
- **Guru**: Tools untuk mengajar programming
- **Hobbyist**: LED cube programming enthusiasts
- **Developer**: Platform untuk sharing code dan projects

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Basic authentication system
- ✅ LED cube coding studio
- ✅ Community forum
- ✅ Code library
- ✅ Device management

### Phase 2 (Next)
- 🚧 AI-powered code suggestions
- 🚧 Real-time collaboration
- 🚧 Advanced 3D visualization
- 🚧 Mobile app (iOS/Android)

### Phase 3 (Future)
- 📋 AR/VR integration
- 📋 Machine learning patterns
- 📋 IoT device support
- 📋 International localization

## 🤝 Kontribusi

Kami menyambut kontribusi dari komunitas! Silakan:

1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 📞 Kontak

- **Website**: [edubox.id](https://edubox.id)
- **Email**: info@edubox.id
- **GitHub**: [@edubox](https://github.com/edubox)

## 🙏 Ucapan Terima Kasih

Terima kasih kepada semua kontributor dan komunitas yang telah mendukung pengembangan EduBox. Mari kita bersama-sama memajukan pendidikan STEAM di Indonesia!

---

**EduBox** - Mempersiapkan Generasi Muda untuk Revolusi Industri 5.0 🚀
