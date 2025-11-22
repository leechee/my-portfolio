# Jason Lee's Portfolio

A modern, **sonically-interactive** portfolio website built with Next.js 14 and cutting-edge web technologies. Features a stunning 3D robot companion that follows your cursor, smooth scrolling animations, interactive audio system, and a comprehensive showcase of projects and experience.

## ✨ Features

### 🎵 Generative Lofi Audio System
Experience a fully **generative lofi music system** powered by the Web Audio API:
- **75 BPM lofi backing track** with synthesized kick, snare, and hi-hat drums
- **Bass line and ambient pads** following an Am - F - C - G chord progression
- **Mouse-controlled melody** in A minor pentatonic scale that harmonizes with the chords
- **Pentatonic scale harmonics** that change pitch based on vertical mouse position
- **Stereo panning** that follows horizontal movement
- **Distance-aware volume** - sounds louder near the center (where the robot is!)
- **Piano notes** in A minor pentatonic play on hover over buttons, navigation links, experience cards, and projects
- **Live circular audio visualizer** that reacts to all audio sources (drums, bass, pads, melody, and piano)
- **Mute/unmute toggle** in the top-right corner for full control

The generative audio system creates an immersive, meditative lofi atmosphere while you explore the portfolio.

### 🤖 Interactive 3D Robot
The centerpiece of the portfolio is an interactive 3D robot model created with Spline and seamlessly integrated into the Next.js application. The robot dynamically follows your cursor movements, creating an engaging and playful user experience. Watch it perform unique animations in different sections:
- **Spinning** on the hero section
- **Interactive keyboard** in the about/skills section
- **Bongo cat animation** in the projects section
- **Keycap rain** in the contact section

### ✨ Smooth Scrolling & Animations
Powered by Framer Motion and Aceternity UI, the site features buttery-smooth scroll animations, parallax effects, and micro-interactions throughout. Every section transition is carefully choreographed to guide the user's attention and create a memorable browsing experience.

### 🛠️ Modern Tech Stack
- **TypeScript** for type safety and robust development
- **Next.js 14** with App Router for optimal performance and SEO
- **Tailwind CSS** for utility-first styling
- **ShadCN UI** for consistent, accessible component design
- **Spline** for interactive 3D graphics
- **Framer Motion** for fluid animations
- **GSAP** for advanced scroll-triggered animations
- **Web Audio API** for generative audio interactions
- **Lenis** for smooth scrolling

### 📊 Experience Timeline
Features a beautifully designed work experience timeline with company logos, interactive hover states, and a hobbies section. Each experience card plays a unique musical note on hover, adding an extra layer of interactivity.

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
RESEND_API_KEY=your_resend_api_key_here
```

## Contact Form

The contact form uses Resend API for email functionality. Make sure to set up your Resend API key in the environment variables.

## License

This project is personal portfolio code. Feel free to use it as inspiration for your own portfolio!
