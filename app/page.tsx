'use client';

import { useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Proyecto {
  titulo: string;
  subtitulo: string;
  descripcion: string;
  periodo: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  categoria: 'fintech' | 'infra' | 'data' | 'automation' | 'backend' | 'ui-ux';
}

interface Habilidad {
  nombre: string;
  nivel: number;
}

interface GrupoHabilidades {
  tab: string;
  icono: string;
  habilidades: Habilidad[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const proyectosFrontend: Proyecto[] = [
  {
    titulo: 'Executive Operations Center',
    subtitulo: 'Core Ledger · Command Center de Asistencia Ejecutiva y Operaciones',
    descripcion:
      'Panel operativo premium con diseño Glassmorphism enfocado en la gestión de alta dirección. Centraliza flujos críticos como agendas semanales codificadas, control de itinerarios de viaje, colas de aprobación documental (Salud/Educación), directorios de equipo en tiempo real y flujos automatizados de reclutamiento.',
    periodo: 'En Vivo',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Executive Ops', 'UX/UI'],
    githubUrl: '', 
    liveUrl: 'https://ceo-assistance.vercel.app/',
    categoria: 'automation',
  },
  {
    titulo: 'PM Dashboard & Training',
    subtitulo: 'Core Ledger · Centro de Gestión de Producto y Growth',
    descripcion:
      'Dashboard interactivo enfocado en la gestión de producto y analítica de crecimiento. Implementa tableros Kanban interactivos para Sprints, rastreadores de diseño, cronogramas de hitos técnicos, previsualizaciones móviles y módulos avanzados de analítica visual para embudos de conversión y retención (DAU).',
    periodo: 'En Vivo',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Recharts', 'react-beautiful-dnd', 'UX/UI'],
    githubUrl: '', 
    liveUrl: 'https://product-ux-gules.vercel.app/', 
    categoria: 'ui-ux', 
  },
  {
    titulo: 'Support-Hub-UI',
    subtitulo: 'Omnichannel Support Hub · Phone, Chat, Scheduling & Commerce',
    descripcion:
      'Plataforma modular de soporte omnicanal con cola de tickets filtrable por canal, prioridad y estado, panel de chat en vivo con indicador de escritura animado, calendario de citas en modos Health y Education, lookup de órdenes con acciones de reembolso y escalación, tracker de migración de sistema y dashboard de KPIs con gráficas en tiempo real.',
    periodo: 'En Vivo',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Recharts', 'date-fns', 'Dashboard'],
    githubUrl: '',
    liveUrl: 'https://project-2-support-ui.vercel.app/',
    categoria: 'automation',
  },
  {
    titulo: 'Sales & Business Design',
    subtitulo: 'Core Ledger · Command Center de Analítica e Interfaz',
    descripcion:
      'Diseño y desarrollo de un panel de control unificado enfocado en operaciones comerciales: marca, campañas de marketing, plantillas automatizadas de correo, programación social y analítica de datos en tiempo real.',
    periodo: 'En Vivo',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Recharts', 'UX/UI'],
    githubUrl: '',
    liveUrl: 'https://creative-sales.vercel.app/',
    categoria: 'ui-ux',
  },
];

const proyectosBackend: Proyecto[] = [
  {
    titulo: 'Shop',
    subtitulo: 'Desarrollo Full Stack Web',
    descripcion:
      'Aplicación comercial en vivo con base de datos relacional en SQL Supabase. Integra de extremo a extremo la lógica de negocio del backend y la interfaz dinámica del frontend, conectadas y desplegadas de forma continua a través de Railway.',
    periodo: 'En Vivo',
    tags: ['React', 'Next.js', 'SQL', 'Supabase', 'Vercel', 'Full Stack'],
    githubUrl: 'https://github.com/saorionline/NestShop',
    categoria: 'backend',
  },
  {
    titulo: 'Banking-Engine',
    subtitulo: 'Honest Taskers · Arquitectura Financiera Backend',
    descripcion:
      'Motor bancario para transacciones líquidas con validaciones estrictas de balance y reglas de negocio complejas para alta disponibilidad.',
    periodo: 'Mar 2025 – Abr 2026',
    tags: ['NestJS', 'TypeScript', 'Fintech', 'PostgreSQL', 'REST API'],
    githubUrl: 'https://github.com/saorionline/Banking-Engine',
    categoria: 'fintech',
  },
  {
    titulo: 'MonorepoVault',
    subtitulo: 'Horatio · Infraestructura y Estructuración de Código',
    descripcion:
      'Arquitectura de monorepo escalable para centralizar múltiples aplicaciones, unificando pipelines de CI/CD y reduciendo fricción en equipos multidisciplinarios.',
    periodo: 'Dic 2023 – Ene 2025',
    tags: ['Monorepo', 'TypeScript', 'CI/CD', 'Next.js', 'Turborepo'],
    githubUrl: 'https://github.com/saorionline/MonorepoVault',
    categoria: 'infra',
  },
  {
    titulo: 'Inventory-Logic-DB',
    subtitulo: 'Emapta · Modelado de Datos e Inventarios',
    descripcion:
      'Base de datos relacional para control de inventarios con indexación eficiente, traduciendo flujos comerciales en modelos limpios y métricas de stock precisas.',
    periodo: 'Feb 2022 – Oct 2023',
    tags: ['PostgreSQL', 'Supabase', 'NestJS', 'TypeScript', 'SQL'],
    githubUrl: 'https://github.com/saorionline/Inventory-Logic-Database',
    categoria: 'data',
  },
  {
    titulo: 'Automating-Exec-Tasks',
    subtitulo: 'AAA Medical Billing · Scripts de Eficiencia',
    descripcion:
      'Flujos automatizados de extremo a extremo integrando APIs y herramientas digitales para eliminar cuellos de botella operativos y reducir el error humano.',
    periodo: 'Nov 2020 – Ene 2022',
    tags: ['Automatización', 'APIs', 'Low-Code', 'Scripts'],
    githubUrl: 'https://github.com/saorionline/Automating-Executive-Tasks',
    categoria: 'automation',
  },
  {
    titulo: 'NestShop',
    subtitulo: 'Vinali Staffing · Backend Comercial Web',
    descripcion:
      'API comercial robusta con módulos para gestión de productos, órdenes de compra y pasarelas de pago, aplicando código limpio y patrones de diseño modernos.',
    periodo: 'Ene 2020 – Oct 2020',
    tags: ['NestJS', 'TypeScript', 'E-commerce', 'REST API', 'Pagos'],
    githubUrl: 'https://github.com/saorionline/NestShop',
    categoria: 'backend',
  },
];

const habilidades: GrupoHabilidades[] = [
  {
    tab: 'Frontend & UX',
    icono: '⬡',
    habilidades: [
      { nombre: 'React / Next.js', nivel: 5 },
      { nombre: 'TypeScript', nivel: 5 },
      { nombre: 'Zustand / Redux / Context API', nivel: 4 },
      { nombre: 'React Hook Form + Zod', nivel: 4 },
      { nombre: 'Next.js Navigation', nivel: 4 },
      { nombre: 'Figma (UI/UX)', nivel: 3 },
      { nombre: 'Adobe Creative Cloud', nivel: 3 },
    ],
  },
  {
    tab: 'Backend & DB',
    icono: '⬢',
    habilidades: [
      { nombre: 'NestJS (Arquitectura Modular)', nivel: 5 },
      { nombre: 'RESTful APIs', nivel: 5 },
      { nombre: 'GraphQL', nivel: 4 },
      { nombre: 'PostgreSQL', nivel: 4 },
      { nombre: 'Supabase', nivel: 4 },
      { nombre: 'Modelado Relacional', nivel: 4 },
      { nombre: 'Pruebas Unitarias / Debugging', nivel: 3 },
    ],
  },
  {
    tab: 'Herramientas',
    icono: '⬟',
    habilidades: [
      { nombre: 'Git / GitHub', nivel: 4 },
      { nombre: 'Monorepo (Turborepo)', nivel: 4 },
      { nombre: 'CI/CD Pipelines', nivel: 4 },
      { nombre: 'Automatización Low-Code', nivel: 4 },
      { fontNombre: 'Excel Avanzado / Office Suite', nivel: 4 },
      { nombre: 'Slack / Discord / Zoom', nivel: 5 },
      { nombre: 'Coordinación de Proyectos', nivel: 4 },
    ],
  },
];

// ─── Config: categoría → estilos ─────────────────────────────────────────────

const categoriaConfig: Record<
  Proyecto['categoria'],
  { border: string; badge: string; badgeText: string; dot: string }
> = {
  fintech: {
    border: 'border-indigo-500',
    badge: 'bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/30',
    badgeText: 'fintech',
    dot: 'bg-indigo-400',
  },
  infra: {
    border: 'border-cyan-500',
    badge: 'bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500
