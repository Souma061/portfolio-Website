import { Code2, Database, Zap } from 'lucide-react';

export const techStackIcons = [
  { name: 'HTML5', src: '/icons/html-5-svgrepo-com.svg' },
  { name: 'CSS3', src: '/icons/css-3-svgrepo-com.svg' },
  { name: 'JavaScript', src: '/icons/js-official-svgrepo-com.svg' },
  { name: 'React', src: '/icons/react-svgrepo-com.svg' },
  { name: 'Node.js', src: '/icons/nodejs-svgrepo-com.svg' },
  { name: 'Express.js', src: '/icons/express.svg' },
  { name: 'MongoDB', src: '/icons/mongodb-svgrepo-com.svg' },
  { name: 'Postman', src: '/icons/postman-icon-svgrepo-com.svg' },
  { name: 'VSCode', src: '/icons/vscode-svgrepo-com.svg' },
];

export const skillCategories = [
  {
    icon: Code2,
    title: 'Frontend',
    skills: ['React.js', 'JavaScript ES6+', 'Tailwind CSS', 'HTML5/CSS3'],
  },
  {
    icon: Database,
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Auth'],
  },
  {
    icon: Zap,
    title: 'Tools & Cloud',
    skills: ['Git/GitHub', 'Postman', 'Cloudinary', 'Appwrite', 'Socket.io'],
  },
];
