// import blogImg from "../assets/images/Blog.jpeg";
import EventVault from "../assets/images/Eventvault.jpeg";
import linguaChat from "../assets/images/linguachat.jpg";
import metriq from "../assets/images/metriq.jpeg";
import sonic_waves from "../assets/images/sonic_waves.jpeg";
import stellarium from "../assets/images/stellarium.jpeg";
export const projects = [
  {
    id: 1,
    year: "2026",
    title: "EventVault - Event Booking Platform",
    description:
      "A full-stack event booking application built with FastAPI (backend) and React (frontend) with TypeScript. This service allows users to browse events, book tickets, manage bookings, and process payments securely.",
    technologies: ["FastAPI", "CashFree", "PostgreSQL", "typescript", "React.js", "Redux", "Tailwind CSS"],
    status: "completed",
    github: "https://github.com/Souma061/Event-Booking-Service",
    live: "https://event-booking-service.vercel.app/",
    category: "major",
    img: EventVault,
    role: "Full Stack",
    metrics: "API response times (p95, p99) < 200ms",
  },
  {
    id: 2,
    year: "2026",
    title: "LinguaChat - Real-Time Chat",
    description:
      "LinguaChat is a full-stack, real-time multilingual chat application. Users speaking different languages can join the same room and communicate effortlessly — every message is automatically translated into each participant's preferred language using the Lingo.dev AI translation engine.",

    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    status: "completed",
    github: "https://github.com/Souma061/LinguaChat",
    live: "https://lingua-chat.vercel.app/",
    category: "major",
    img: linguaChat,
    role: "Backend Architect",
    metrics: "< 50ms Latency",
  },
  {
    id: 3,
    year: "2025",
    title: "Stellarium - Astrology Portal",
    description:
      "A modern, elegant astrology website that brings the mysteries of the cosmos to your fingertips. Personalized horoscope readings and celestial insights.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    status: "completed",
    github: "https://github.com/Souma061/Stellarium",
    live: "https://stellarium-ecru.vercel.app/",
    category: "mini",
    img: stellarium,
    role: "Frontend Designer",
  },
  {
    id: 4,
    year: "2025",
    title: "Metriq - Unit Converter",
    description:
      "Metriq is a professional, high-performance unit conversion application. Seamless user experience with real-time currency rates and instant search.",
    technologies: ["React.js", "Tailwind", "JavaScript"],
    status: "completed",
    github: "https://github.com/Souma061/Unit-Convertor",
    live: "https://unit-convertor-n1lp.vercel.app/",
    category: "mini",
    img: metriq,
    role: "Solo Developer",
  },
  {
    id: 5,
    year: "2025",
    title: "Sonic Waves - 3D Visualizer",
    description:
      "Sonic Waves is an immersive, interactive 3D audio visualization experience. Transforms music into stunning, real-time visual landscapes.",
    technologies: ["React", "Three.js", "React Three Fiber", "Tailwind CSS"],
    status: "completed",
    github: "https://github.com/Souma061/AudioVisuializer",
    live: "https://audio-visuializer.vercel.app/",
    category: "mini",
    img: sonic_waves,
    role: "Creative Developer",
  },
];
