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
    title: 'Microsoft Certified: Azure Fundamentals',
    organization: 'Microsoft Azure',
    icon: '☁️',
    color: 'from-blue-500 to-sky-400',
    link: 'https://drive.google.com/file/d/1Ymn0kEy3D_HBC78PV-jnbnTbly2pLeLG/view',
    previewUrl: 'https://drive.google.com/file/d/1Ymn0kEy3D_HBC78PV-jnbnTbly2pLeLG/preview',
  },
  {
    title: 'ReactJS',
    organization: 'Infosys Springboard',
    icon: '⚛️',
    color: 'from-cyan-500 to-blue-500',
    link: 'https://drive.google.com/file/d/1Dex3E1UV6r9DqN0bFged32goILhO8HSs/view',
    previewUrl: 'https://drive.google.com/file/d/1Dex3E1UV6r9DqN0bFged32goILhO8HSs/preview',
  },
  {
    title: 'Java Programming and Fundamentals',
    organization: 'Infosys Springboard',
    icon: '☕',
    color: 'from-orange-500 to-amber-400',
    link: 'https://drive.google.com/file/d/1ll7yGnv0QsF8wNdBMiHsHC3a_isWmlDM/view',
    previewUrl: 'https://drive.google.com/file/d/1ll7yGnv0QsF8wNdBMiHsHC3a_isWmlDM/preview',
  },
  {
    title: 'Artificial Intelligence Foundation',
    organization: 'Infosys Springboard',
    icon: '🤖',
    color: 'from-violet-500 to-purple-400',
    link: 'https://drive.google.com/file/d/1do7we-jWeUmtbneR80ZzyYYw2meTHB6Y/view',
    previewUrl: 'https://drive.google.com/file/d/1do7we-jWeUmtbneR80ZzyYYw2meTHB6Y/preview',
  },
  {
    title: 'Academic Process Mining Fundamentals',
    organization: 'Celonis',
    icon: '📊',
    color: 'from-emerald-500 to-teal-400',
    link: 'https://drive.google.com/file/d/18A-_k6XKy77w6CfmWfQ8lc3UUVnpJXsT/view',
    previewUrl: 'https://drive.google.com/file/d/18A-_k6XKy77w6CfmWfQ8lc3UUVnpJXsT/preview',
  },
  {
    title: 'Machine Learning Onramp',
    organization: 'MathWorks',
    icon: '🧠',
    color: 'from-rose-500 to-pink-400',
    link: 'https://drive.google.com/file/d/127FMB448p_DA5JmcUKIBY4S4NGi2e9OK/view',
    previewUrl: 'https://drive.google.com/file/d/127FMB448p_DA5JmcUKIBY4S4NGi2e9OK/preview',
  },
  {
    title: 'People and Soft Skills Assessment',
    organization: 'IBM',
    icon: '🤝',
    color: 'from-indigo-500 to-blue-400',
    link: 'https://drive.google.com/file/d/1Y_Qu1Mm7TvAhhMNLfLdmzslOFi_5HQB4/view',
    previewUrl: 'https://drive.google.com/file/d/1Y_Qu1Mm7TvAhhMNLfLdmzslOFi_5HQB4/preview',
  },
  {
    title: 'Database and SQL',
    organization: 'Infosys Springboard',
    icon: '🗄️',
    color: 'from-yellow-500 to-amber-400',
    link: 'https://drive.google.com/file/d/1qC9ecLJ4OiecqB7TzsaIngiCUqirBKy0/view',
    previewUrl: 'https://drive.google.com/file/d/1qC9ecLJ4OiecqB7TzsaIngiCUqirBKy0/preview',
  },
  {
    title: 'C++ Fundamentals',
    organization: 'Infosys Springboard',
    icon: '⚙️',
    color: 'from-slate-500 to-gray-400',
    link: 'https://drive.google.com/file/d/1jfgE9Jt_ryfkvWDulQBNE4QeLbr7LDi5/view',
    previewUrl: 'https://drive.google.com/file/d/1jfgE9Jt_ryfkvWDulQBNE4QeLbr7LDi5/preview',
  },
  {
    title: 'AWS Cloud Practitioner Essentials',
    organization: 'AWS Skill Builder',
    icon: '🔶',
    color: 'from-orange-400 to-yellow-400',
    link: 'https://drive.google.com/file/d/1pZw_Z2yuNPcebXqAAS8dL_VEsCqEFUbP/view',
    previewUrl: 'https://drive.google.com/file/d/1pZw_Z2yuNPcebXqAAS8dL_VEsCqEFUbP/preview',
  },
]

export const socialLinks = {
  github: 'https://github.com/sarveshprince',
  linkedin: 'https://linkedin.com/in/sarvesh-kumar-202261334/',
  instagram: 'https://instagram.com/sarvesh_8228',
  email: 'mailto:sarvesh.jr10@gmail.com',
}
