import type { SkillGroup } from '@/lib/types'

/**
 * The "toolkit" section on /about. Grouped rather than flat: a single list of
 * seventy badges is unreadable, and the grouping is itself information - what
 * gets written, what it gets written against, and what takes it apart again.
 */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    slug: 'developer',
    title: 'Developer',
    rows: [
      {
        label: 'Languages',
        items: ['C++ (98-23)', 'C99', 'Rust', 'Python', 'x86/x86-64 asm', 'SQL'],
      },
      {
        label: 'SDKs and libraries',
        items: [
          'STL',
          'WinAPI',
          'WDM/WDF',
          'minifilter',
          'WFP',
          'COM',
          'Detours',
          'MHook',
          'POSIX/System V',
          'Qt',
          'Boost',
          'Abseil',
          'Folly',
          'OpenSSL',
          'ZeroMQ',
          'cURL',
          'PJSIP',
          'GoogleTest',
        ],
      },
      {
        label: 'Protocols',
        items: ['TCP/IP', 'SSH', 'HTTP', 'HTTPS', 'RDP', 'VNC', 'TNS', 'TDS', 'SIP'],
      },
      {
        label: 'Databases',
        items: ['SQLite', 'MySQL', 'MSSQL', 'Oracle', 'PostgreSQL', 'MongoDB', 'Cassandra'],
      },
      {
        label: 'Tooling',
        items: ['Git', 'CMake', 'Visual Studio', 'WSL', 'Docker', 'devcontainers', 'Kubernetes'],
      },
      {
        label: 'AI',
        items: ['Claude Code', 'Codex', 'Gemini', 'LM Studio', 'Ollama', 'Qwen', 'MCP'],
      },
    ],
  },
  {
    slug: 'security-research',
    title: 'Security research',
    rows: [
      {
        label: 'Practice',
        items: [
          'PE/ELF reverse engineering',
          'static analysis',
          'dynamic analysis',
          'malware triage',
          'YARA rules',
        ],
      },
      {
        label: 'Tooling',
        items: [
          'IDA',
          'Ghidra',
          'x64dbg',
          'WinDbg',
          'GDB',
          'PEStudio',
          'CFF Explorer',
          'Detect It Easy',
          'Sysinternals',
          'Wireshark',
          'Nmap',
          'PcapDroid',
          'dnSpy',
          'Java decompiler',
          'VMware',
        ],
      },
    ],
  },
  {
    slug: 'hardware',
    title: 'Hardware',
    note: 'hobby',
    rows: [
      {
        items: [
          'analog electronics',
          'digital electronics',
          'PCB repair',
          'soldering',
          'embedded systems',
          '3D printing',
          'DIY tooling',
        ],
      },
    ],
  },
]
