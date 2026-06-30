'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Project {
  title: string;
  subtitle: string;
  description: string;
  period: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  category: 'fintech' | 'infra' | 'data' | 'automation' | 'backend' | 'ui-ux' | 'sandbox' | 'backend-ops';
}

interface Skill {
  name: string;
  level: number;
}

interface SkillGroup {
  tab: string;
  icon: string;
  skills: Skill[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const frontendProjects: Project[] = [
  
];

const backendProjects: Project[] = [
  {
    title: 'Enterprise Dark Pipeline',
    subtitle: 'enterprise_pipeline',
    description: 'enterprise_pipeline',
    period: 'prototype',
    tags: ['React', 'NestJS', 'PostgreSQL', 'Supabase', 'TypeScript', 'Executive Ops', 'Data Pipelines', 'Real-Time Systems'],
    githubUrl: 'https://github.com/saorionline/enterprise-dark-pipeline',
    category: 'backend-ops',
  },
  {
    title: 'Full-Stack Scientific Sandbox',
    subtitle: 'scientific_sandbox',
    description: 'scientific_sandbox',
    period: 'development',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'NestJS', 'Supabase', 'PostgreSQL', 'Architecture', 'Full-Stack', 'Real-Time Data'],
    githubUrl: 'https://github.com/saorionline/scientific-sandbox',
    category: 'sandbox',
  },
  {
    title: 'Executive Operations Center',
    subtitle: 'ops_center',
    description: 'exec_ops',
    period: 'live',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Executive Ops', 'UX/UI'],
    githubUrl: '',
    liveUrl: 'https://ceo-assistance.vercel.app/',
    category: 'automation',
  },
  {
    title: 'PM Dashboard & Training',
    subtitle: 'growth_center',
    description: 'pm_dashboard',
    period: 'live',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Recharts', 'react-beautiful-dnd', 'UX/UI'],
    githubUrl: '',
    liveUrl: 'https://product-ux-gules.vercel.app/',
    category: 'ui-ux',
  },
  {
    title: 'Support-Hub-UI',
    subtitle: 'support_hub',
    description: 'support_hub',
    period: 'live',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Recharts', 'date-fns', 'Dashboard'],
    githubUrl: '',
    liveUrl: 'https://project-2-support-ui.vercel.app/',
    category: 'automation',
  },
  {
    title: 'Sales & Business Design',
    subtitle: 'analytics_center',
    description: 'sales_design',
    period: 'live',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Recharts', 'UX/UI'],
    githubUrl: '',
    liveUrl: 'https://creative-sales.vercel.app/',
    category: 'ui-ux',
  },
];

// ─── Config: category → styles ───────────────────────────────────────────────

const categoryConfig: Record<
  Project['category'],
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
  sandbox: {
    border: 'border-emerald-500',
    badge: 'bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30',
    badgeText: 'sandbox',
    dot: 'bg-emerald-400',
  },
  'backend-ops': {
    border: 'border-sky-500',
    badge: 'bg-sky-500/10 text-sky-300 ring-1 ring-sky-500/30',
    badgeText: 'backend ops',
    dot: 'bg-sky-400',
  },
};

// ─── Icons (inline SVG) ──────────────────────────────────────────────────────

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

// ─── Language Toggle ──────────────────────────────────────────────────────────

function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = (next: string) => {
    // Replace /en or /es prefix in the current pathname
    const newPath = pathname.replace(/^\/(en|es)/, `/${next}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 p-1 bg-slate-800/60 border border-slate-700/50 rounded-lg">
      {(['en', 'es'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => toggle(lang)}
          className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-all duration-150 ${
            locale === lang
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SkillBar({ level }: { level: number }) {
  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`h-1 w-5 rounded-full transition-all ${
            i <= level ? 'bg-indigo-400' : 'bg-slate-700'
          }`}
        />
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations();
  const cfg = categoryConfig[project.category];
  const [expanded, setExpanded] = useState(false);

  const subtitle =
    project.subtitle
      ? t(`projects.subtitles.${project.subtitle}`)
      : null;

  const description = t(`projects.descriptions.${project.description}`);

  const periodKey = project.period as string;
  const period =
    periodKey === 'live'
      ? t('status.live')
      : periodKey === 'development'
      ? t('status.development')
      : periodKey === 'prototype'
      ? t('status.prototype')
      : periodKey;

  return (
    <article
      className={`relative flex flex-col bg-slate-800/60 border border-slate-700/50 border-l-4 ${cfg.border} rounded-xl p-5 gap-4 hover:bg-slate-800 hover:border-slate-600/60 transition-all duration-200 group`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-mono text-sm font-medium text-white tracking-tight truncate">
            {project.title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${cfg.badge}`}>
            {cfg.badgeText}
          </span>
          <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">
            {period}
          </span>
        </div>
      </div>

      <div className="flex-1">
        <p className={`text-sm text-slate-400 leading-relaxed transition-all duration-300 ${expanded ? '' : 'line-clamp-2'}`}>
          {description}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="mt-1 text-xs font-mono text-indigo-400 hover:text-indigo-300 transition-colors duration-150"
        >
          {expanded ? t('ui.read_less') : t('ui.read_more')}
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-700/70 text-slate-300 ring-1 ring-slate-600/40"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 items-center mt-auto">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start text-xs font-mono text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-600/50 hover:border-slate-400/60 bg-slate-700/40 hover:bg-slate-700/80 transition-all duration-150 group-hover:translate-x-0.5"
          >
            <IconGithub size={13} />
            {t('ui.view_repo')}
            <span className="ml-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
              <IconArrow />
            </span>
          </a>
        )}

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start text-xs font-mono text-fuchsia-400 hover:text-fuchsia-300 px-3 py-1.5 rounded-lg border border-fuchsia-500/30 hover:border-fuchsia-500/60 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 transition-all duration-150"
          >
            {t('ui.view_live')}
          </a>
        )}
      </div>
    </article>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Portfolio() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState(0);

  const skillGroups: SkillGroup[] = [
    {
      tab: t('skills.tabs.frontend'),
      icon: '⬡',
      skills: [
        { name: 'React / Next.js', level: 5 },
        { name: 'TypeScript', level: 5 },
        { name: 'Zustand / Redux / Context API', level: 4 },
        { name: 'React Hook Form + Zod', level: 4 },
        { name: 'Next.js Navigation', level: 4 },
        { name: 'Figma (UI/UX)', level: 3 },
        { name: 'Adobe Creative Cloud', level: 3 },
      ],
    },
    {
      tab: t('skills.tabs.backend'),
      icon: '⬢',
      skills: [
        { name: t('skills.names.nestjs_architecture'), level: 5 },
        { name: 'RESTful APIs', level: 5 },
        { name: 'GraphQL', level: 4 },
        { name: 'PostgreSQL', level: 4 },
        { name: 'Supabase', level: 4 },
        { name: t('skills.names.relational_modeling'), level: 4 },
        { name: t('skills.names.unit_testing'), level: 3 },
      ],
    },
    {
      tab: t('skills.tabs.tools'),
      icon: '⬟',
      skills: [
        { name: 'Git / GitHub', level: 4 },
        { name: 'Monorepo (Turborepo)', level: 4 },
        { name: 'CI/CD Pipelines', level: 4 },
        { name: t('skills.names.low_code_automation'), level: 4 },
        { name: t('skills.names.advanced_excel'), level: 4 },
        { name: 'Slack / Discord / Zoom', level: 5 },
        { name: t('skills.names.project_coordination'), level: 4 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white antialiased">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 flex flex-col items-center text-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-indigo-600/10 blur-3xl" />
          <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-cyan-600/5 blur-2xl" />
          <div className="absolute top-10 right-1/4 w-64 h-64 rounded-full bg-pink-600/5 blur-2xl" />
        </div>

        {/* Language toggle — top right */}
        <div className="absolute top-6 right-6 z-10">
          <LanguageToggle />
        </div>

        <span className="font-mono text-xs text-indigo-400 tracking-widest uppercase mb-5 opacity-80">
          {t('hero.tagline')}
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight text-white mb-3">
          Saori {' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-300">
            Tovar
          </span>
        </h1>

        <p className="font-mono text-sm sm:text-base text-slate-400 mb-8 max-w-md leading-relaxed">
          {t('hero.role')}
        </p>

        <p className="text-slate-500 text-sm max-w-lg leading-relaxed mb-10">
          {t('hero.subheading')}
          <br />
          {t('hero.location')}
        </p>

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

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30">
          <div className="w-px h-8 bg-slate-500" />
          <span className="font-mono text-[9px] tracking-widest text-slate-500">scroll</span>
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      {/* Section 1: Frontend Experience */}
      <section className="px-6 pt-20 pb-10 max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="font-mono text-xs text-indigo-400 tracking-widest uppercase">
            {t('sections.frontend.tag')}
          </span>
          <h2 className="text-2xl font-semibold text-white mt-2">
            {t('sections.frontend.title')}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {frontendProjects.length} {t('sections.frontend.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {frontendProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      {/* Section 2: Backend Experience */}
      <section className="px-6 pt-10 pb-20 max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
            {t('sections.backend.tag')}
          </span>
          <h2 className="text-2xl font-semibold text-white mt-2">
            {t('sections.backend.title')}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {backendProjects.length} {t('sections.backend.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {backendProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      {/* Skills */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="mb-10">
          <span className="font-mono text-xs text-indigo-400 tracking-widest uppercase">
            {t('sections.stack.tag')}
          </span>
          <h2 className="text-2xl font-semibold text-white mt-2">
            {t('sections.stack.title')}
          </h2>
        </div>

        <div className="flex gap-1 mb-8 p-1 bg-slate-800/60 border border-slate-700/50 rounded-xl w-fit">
          {skillGroups.map((group, idx) => (
            <button
              key={group.tab}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                activeTab === idx
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <span className="mr-1.5 text-xs opacity-70">{group.icon}</span>
              {group.tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {skillGroups[activeTab].skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center justify-between gap-4 bg-slate-800/50 border border-slate-700/40 rounded-xl px-4 py-3 hover:bg-slate-800/80 transition-colors duration-150"
            >
              <span className="text-sm text-slate-300 font-mono truncate">
                {skill.name}
              </span>
              <SkillBar level={skill.level} />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-6">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-1 w-5 rounded-full bg-indigo-400 opacity-30 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
          <span className="font-mono text-[10px] text-slate-600 ml-1">
            {t('sections.stack.legend')}
          </span>
        </div>
      </section>

      <footer className="border-t border-slate-800 px-6 py-10 text-center">
        <p className="font-mono text-xs text-slate-600">
          © 2026 Saori Isabel Tovar ·{' '}
          <a
            href="mailto:saorisabeltovar@gmail.com"
            className="text-slate-500 hover:text-indigo-400 transition-colors"
          >
            saorisabeltovar@gmail.com
          </a>
        </p>
        <p className="font-mono text-[10px] text-slate-700 mt-1 tracking-widest">
          {t('footer.location')}
        </p>
      </footer>
    </div>
  );
}
