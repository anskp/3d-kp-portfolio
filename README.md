# KP Portfolio - Modern React Portfolio

A modern and interactive portfolio website built with React, Material UI, Framer Motion, and Three.js.

## Features

- **Interactive 3D Model Animation** - Scroll-based 3D model animation that follows the page scroll
- **Modern UI with Material UI** - Clean and responsive design using Material UI components
- **Theme Switching** - Toggle between light and dark themes
- **Animated UI Elements** - Smooth animations and transitions using Framer Motion
- **Responsive Design** - Mobile-friendly layout that adapts to all screen sizes
- **Skills Visualization** - Visual representation of skills with progress bars
- **Project Showcase** - Display projects with interactive cards

## Tech Stack

- **React** - Frontend library for building the user interface
- **Vite** - Fast build tooling
- **Material UI** - Component library for modern UI design
- **Framer Motion** - Animation library for smooth transitions
- **Three.js** - 3D graphics library for model animation
- **React Three Fiber** - React renderer for Three.js
- **GSAP** - Animation library for advanced effects




## Project Structure

```
kp-portfolio/
├── public/               # Static assets
│   ├── images/           # Image assets
│   │   └── font/             # Font files
│   ├── models/           # 3D model assets
│   └── font/             # Font files
├── src/
│   ├── components/       # React components
│   │   ├── Navbar.jsx    # Navigation bar
│   │   ├── ProjectCard.jsx # Project display card
│   │   ├── ModelAnimation.jsx # 3D model animation
│   │   └── sections/     # Page sections
│   ├── context/          # React context
│   │   └── ThemeContext.jsx # Theme management
│   ├── App.jsx           # Main App component
│   ├── AppMUI.jsx        # Enhanced Material UI version
│   └── main.jsx          # Entry point
└── README.md             # Documentation
```

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Build for production:
   ```
   npm run build


   ```

## Screen Recorder

[View Screen Recording](public/Screen%20Recording%202025-05-18%20034318.mp4)


## Live Demo 

[Link Text](https://3d-kp-portfolio.vercel.app/)


## Customization

### Theme

You can modify the theme colors and typography in `src/context/ThemeContext.jsx`.

### Content

Update your personal information and projects in the `AppMUI.jsx` file.

### 3D Model

Replace the 3D model in the `public/models/` directory and update references in the `ModelAnimation.jsx` component.

## Credits

- 3D Model Animation concept inspired by [Cyberfiction](https://cyberfiction.io/)
- Designed and developed by Muhammed Anas KP

## License

MIT License
