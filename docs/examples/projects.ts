// Example data that used to seed src/lib/data/projects.ts before the blog
// went live with real content. Kept here as a reference for the shape a
// Project object takes - see docs/adding-content.md.

import type { Project } from '@/lib/types'

export const EXAMPLE_PROJECTS: Project[] = [
  {
    slug: 'tracepoint',
    hex: '0x00',
    name: 'tracepoint',
    desc: 'Minimal syscall tracer for Windows - ETW-based, single binary, zero drivers.',
    lang: 'C++',
    status: 'stable',
    statusTone: 'ok',
    url: 'https://github.com/0xlay/tracepoint',
  },
  {
    slug: 'binwarden',
    hex: '0x01',
    name: 'binwarden',
    desc: 'Static binary triage: import hashing, entropy maps, packer heuristics. CLI + library.',
    lang: 'Rust',
    status: 'active',
    statusTone: 'accent',
    url: 'https://github.com/0xlay/binwarden',
  },
  {
    slug: 'pcb-bench',
    hex: '0x02',
    name: 'pcb-bench',
    desc: 'Open hardware test bench: programmable PSU, logic analyzer frontend, 3D-printed enclosure.',
    lang: 'KiCad',
    status: 'wip',
    statusTone: 'warn',
  },
  {
    slug: 'elfdump',
    hex: '0x03',
    name: 'elfdump.py',
    desc: 'Teaching-grade ELF parser in pure Python. Reads everything, assumes nothing.',
    lang: 'Python',
    status: 'stable',
    statusTone: 'ok',
    url: 'https://github.com/0xlay/elfdump',
  },
]
