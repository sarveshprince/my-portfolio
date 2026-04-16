import type { Achievement, Certification, Project, SkillCategory } from '../types'

export const navLinks = [
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'LeetCode', href: '#leetcode' },
  { label: 'Contact', href: '#contact' },
]

export const education = [
  {
    institute: 'Sri Krishna College of Engineering and Technology',
    detail: 'B.Tech Artificial Intelligence & Data Science (2023-2027)',
    metric: 'CGPA: 8.05',
  },
  {
    institute: 'Alpha Wisdom Vidyashram',
    detail: 'Senior Secondary Education (12th Grade)',
    metric: 'Score: 80.06%',
  },
]

export const skills: SkillCategory[] = [
  {
    title: 'Languages',
    icon: 'code',
    skills: ['C++', 'Java', 'JavaScript', 'SQL', 'Python'],
  },
  {
    title: 'Tools',
    icon: 'database',
    skills: ['VS Code', 'Postman', 'MySQL', 'Power BI', 'GitHub'],
  },
  {
    title: 'Technologies',
    icon: 'cpu',
    skills: ['React', 'AWS', 'Linux', 'REST APIs'],
  },
]

export const projects: Project[] = [
  {
    title: 'SKCET MediCare Application',
    description: 'AI-powered hospital management system designed for fast and reliable care operations.',
    features: ['Appointment booking', 'E-prescriptions', 'Ambulance tracking', 'Bed availability system'],
    tech: ['React', 'Python', 'MySQL'],
    image: 'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=1200&q=80',
    github: 'https://github.com/sarveshprince',
  },
]

export const achievements: Achievement[] = [
  {
    title: 'Hack Summit 5.0',
    subtitle: 'SRM University, Chennai',
    note: 'Presented an AI Smart Hospital System with focus on patient workflows and real-time operations.',
  },
]

export const certifications: Certification[] = [
  {
    title: 'Microsoft Azure Fundamentals',
    organization: 'Microsoft',
    link: 'https://drive.google.com/',
  },
  {
    title: 'ReactJS',
    organization: 'Infosys Springboard',
    link: 'https://drive.google.com/',
  },
  {
    title: 'Data Structures and Algorithms',
    organization: 'NPTEL',
    link: 'https://drive.google.com/',
  },
]

export const socialLinks = {
  github: 'https://github.com/sarveshprince',
  linkedin: 'https://linkedin.com/in/sarvesh-kumar-202261334/',
  instagram: 'https://instagram.com/sarvesh_8228',
  email: 'mailto:sarvesh.jr10@gmail.com',
}
