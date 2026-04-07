# Jason Lee's Portfolio

A modern, interactive portfolio website built with Next.js 14 and cutting-edge web technologies. Features a 3D robot companion, smooth scrolling animations, generative audio system, and a comprehensive showcase of projects and experience.

## Features

### Generative Audio System
Experience a fully generative music system powered by the Web Audio API:
- 75 BPM lofi backing track with synthesized drums (kick, snare, hi-hat)
- Bass line and ambient pads following an Am - F - C - G chord progression
- Mouse-controlled melody in A minor pentatonic scale
- Pentatonic scale harmonics that change pitch based on vertical mouse position
- Stereo panning that follows horizontal mouse movement
- Distance-aware volume control (louder near center)
- Piano notes play on hover over interactive elements
- Live circular audio visualizer that reacts to all audio sources
- Mute/unmute toggle for full control

### Interactive 3D Robot
The centerpiece is an interactive 3D robot model created with Spline. The robot dynamically follows cursor movements, creating an engaging and playful user experience with unique animations in each section.

### Smooth Scrolling & Animations
Powered by Framer Motion and custom UI components, featuring:
- Buttery-smooth scroll animations
- Parallax effects
- Micro-interactions throughout
- Carefully choreographed section transitions

### Technology Stack
- **TypeScript** - Type safety and robust development
- **Next.js 14** - App Router for optimal performance and SEO
- **Tailwind CSS** - Utility-first styling
- **ShadCN UI** - Consistent, accessible component design
- **Spline** - Interactive 3D graphics
- **Framer Motion** - Fluid animations
- **GSAP** - Advanced scroll-triggered animations
- **Web Audio API** - Generative audio interactions
- **Lenis** - Smooth scrolling

### Experience Timeline
Beautifully designed work experience timeline with:
- Company logos and interactive hover states
- Hobbies section
- Musical note feedback on hover

## Getting Started

### Prerequisites
- Node.js 18+ or Yarn

### Installation

Install dependencies:

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the root directory:

```env
RESEND_API_KEY=your_resend_api_key_here
```

## Configuration

### Contact Form
The contact form uses Resend API for email functionality. Configure your Resend API key in the environment variables.

### Analytics
- Vercel Analytics integration enabled
- Vercel Speed Insights for performance monitoring
- Umami Analytics support (optional)

## Performance Optimizations

- Next.js Image optimization with WebP/AVIF formats
- Lazy loading for non-critical images
- Content visibility optimization for below-fold sections
- Spline 3D model loading coordination with preloader
- Mobile-optimized (3D disabled on mobile devices)

## Project Structure

```
src/
├── app/              # Next.js pages and layouts
├── components/       # Reusable components
│   ├── sections/    # Page sections
│   ├── ui/          # UI components
│   └── ...
├── contexts/        # React contexts (audio, etc.)
├── data/            # Project data and constants
├── hooks/           # Custom React hooks
└── lib/             # Utility functions
```

## License

This project is personal portfolio code. Feel free to use it as inspiration for your own portfolio.

## Contact

For questions or collaboration opportunities, use the contact form on the live site.
