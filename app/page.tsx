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
  liveUrl?: string; // Propiedad opcional para enlaces en vivo
  categoria: 'fintech' | 'infra' | 'data' | 'automation' | 'backend' | 'ui-ux';
}

interface Habilidad {
  nombre: string;
  nivel: number; // 1-5
}

interface GrupoHabilidades {
  tab: string;
  icono: string;
  habilidades: Habilidad[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const proyectos: Proyecto[] = [
  {
    titulo: 'Sales & Business Design',
    subtitulo: 'Core Ledger · Command Center de Analítica e Interfaz',
    descripcion:
      'Diseño y desarrollo de un panel de control unificado enfocado en operaciones comerciales: marca, campañas de marketing, plantillas automatizadas de correo, programación social y analítica de datos en tiempo real.',
    periodo: 'En Vivo',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Recharts', 'UX/UI'],
    githubUrl: '', // Al dejarlo vacío, no se mostrará el botón de GitHub
    liveUrl: 'https://creative-sales.vercel.app/', // Nueva dirección de Vercel añadida
    categoria: 'ui-ux',
  },
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
      { fontNombre: 'Monorepo (Turborepo)', nivel: 4 },
      { nombre: 'CI/CD Pipelines', nivel: 4 },
      { nombre: 'Automatización Low-Code', nivel: 4 },
      { nombre: 'Excel Avanzado / Office Suite', nivel: 4 },
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
    badge: 'bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/30',
    badgeText: 'infra',
    dot: 'bg-cyan-400',
  },
  data: {
    border: 'border-blue-500',
    badge: 'bg-blue-500/10 text-blue-300 ring-1 ring-blue-500/30',
    badgeText: 'data',
    dot: 'bg-blue-400',
  },
  automation: {
    border: 'border-amber-500',
    badge: 'bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/30',
    badgeText: 'automation',
    dot: 'bg-amber-400',
  },
  backend: {
    border: 'border-pink-500',
    badge: 'bg-pink-500/10 text-pink-300 ring-1 ring-pink-500/30',
    badgeText: 'backend',
    dot: 'bg-pink-400',
  },
  'ui-ux': {
    border: 'border-fuchsia-500',
    badge: 'bg-fuchsia-500/10 text-fuchsia-300 ring-1 ring-fuchsia-500/30',
    badgeText: 'ui / ux',
    dot: 'bg-fuchsia-400',
  },
};

// ─── Icons (inline SVG, no external deps) ────────────────────────────────────

const IconGithub = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const IconMail = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="2,4 12,13 22,4" />
  </svg>
);

const IconLinkedIn = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const IconArrow = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
);

// ─── Sub-components ───────────────────────────────────────────────────────────

function SkillBar({ nivel }: { nivel: number }) {
  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`h-1 w-5 rounded-full transition-all ${
            i <= nivel ? 'bg-indigo-400' : 'bg-slate-700'
          }`}
        />
      ))}
    </div>
  );
}

function ProyectoCard({ proyecto }: { proyecto: Proyecto }) {
  const cfg = categoriaConfig[proyecto.categoria];
  return (
    <article
      className={`relative flex flex-col bg-slate-800/60 border border-slate-700/50 border-l-4 ${cfg.border} rounded-xl p-5 gap-4 hover:bg-slate-800 hover:border-slate-600/60 transition-all duration-200 group`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-mono text-sm font-medium text-white tracking-tight truncate">
            {proyecto.titulo}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
            {proyecto.subtitulo}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded ${cfg.badge}`}
          >
            {cfg.badgeText}
          </span>
          <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">
            {proyecto.periodo}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed flex-1">
        {proyecto.descripcion}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {proyecto.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-700/70 text-slate-300 ring-1 ring-slate-600/40"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 items-center mt-auto">
        {/* Solo renderiza el botón de GitHub si la URL no está vacía */}
        {proyecto.githubUrl && (
          <a
            href={proyecto.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start text-xs font-mono text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-600/50 hover:border-slate-400/60 bg-slate-700/40 hover:bg-slate-700/80 transition-all duration-150 group-hover:translate-x-0.5"
          >
            <IconGithub size={13} />
            ver repositorio
            <span className="ml-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
              <IconArrow />
            </span>
          </a>
        )}

        {/* Lógica condicional para el enlace en vivo del proyecto de Shop */}
        {proyecto.titulo === 'Shop' && (
          <a
            href="https://nestshop-production-a1c1.up.railway.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start text-xs font-mono text-emerald-400 hover:text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-500/30 hover:border-emerald-500/60 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all duration-150"
          >
            <span>●</span> ver app en vivo
          </a>
        )}

        {/* Lógica genérica para cualquier proyecto con liveUrl (como tu nueva tarjeta) */}
        {proyecto.titulo !== 'Shop' && proyecto.liveUrl && (
          <a
            href={proyecto.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start text-xs font-mono text-fuchsia-400 hover:text-fuchsia-300 px-3 py-1.5 rounded-lg border border-fuchsia-500/30 hover:border-fuchsia-500/60 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 transition-all duration-150"
          >
            <span>●</span> ver app en vivo
          </a>
        )}
      </div>
    </article>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Portfolio() {
  const [tabActiva, setTabActiva] = useState(0);

  return (
    <div className="min-h-screen bg-slate-900 text-white antialiased">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 flex flex-col items-center text-center">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-indigo-600/10 blur-3xl" />
          <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-cyan-600/5 blur-2xl" />
          <div className="absolute top-10 right-1/4 w-64 h-64 rounded-full bg-pink-600/5 blur-2xl" />
        </div>

        {/* Mono eyebrow */}
        <span className="font-mono text-xs text-indigo-400 tracking-widest uppercase mb-5 opacity-80">
          — portafolio 2026 —
        </span>

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight text-white mb-3">
          Saori Isabel{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-300">
            Tovar
          </span>
        </h1>

        {/* Title */}
        <p className="font-mono text-sm sm:text-base text-slate-400 mb-8 max-w-md leading-relaxed">
          Desarrolladora Híbrido:{' '}
          <span className="text-slate-200">Nest · React · TypeScript</span>
        </p>

        {/* Tagline */}
        <p className="text-slate-500 text-sm max-w-lg leading-relaxed mb-10">
          Arquitectura backend robusta + interfaces dinámicas escalables.
          <br />
          Bogotá, Colombia · Español / English C2 / French B2
        </p>

        {/* Contact buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:saorisabeltovar@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors duration-150"
          >
            <IconMail size={15} />
            Email
          </a>
          <a
            href="https://github.com/saorionline"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white text-sm font-medium border border-slate-600/50 hover:border-slate-500 transition-all duration-150"
          >
            <IconGithub size={15} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/saori-tovar-7459122b2/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white text-sm font-medium border border-slate-600/50 hover:border-slate-500 transition-all duration-150"
          >
            <IconLinkedIn size={15} />
            LinkedIn
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30">
          <div className="w-px h-8 bg-slate-500" />
          <span className="font-mono text-[9px] tracking-widest text-slate-500">
            scroll
          </span>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      {/* ── Projects ── */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="font-mono text-xs text-indigo-400 tracking-widest uppercase">
            experiencia
          </span>
          <h2 className="text-2xl font-semibold text-white mt-2">
            Proyectos destacados
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {proyectos.length} proyectos · 2020 – 2026
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {proyectos.map((proyecto) => (
            <ProyectoCard key={proyecto.titulo} proyecto={proyecto} />
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="w-full h
