import type { WorkEntry } from '@/lib/types'

/**
 * The "work" list on /about, in reverse chronological order.
 *
 * Cut by what was built rather than by employer: two of the engagements
 * overlap in time, so a chronology of unnamed companies would read as a
 * mistake instead of a fact. Employers are deliberately absent from this file
 * - the domain and the stack carry everything a reader needs. The `stack`
 * field holds what each description used to carry in a parenthetical.
 */
export const WORK: WorkEntry[] = [
  {
    slug: 'pam',
    title: 'Proxy-based PAM system',
    stack: ['C++', 'POSIX/System V', 'Boost'],
    desc: 'Developed a proxy-based PAM system supporting SSH, RDP, VNC, Telnet, MySQL, MSSQL, PostgreSQL, MongoDB, Cassandra, Oracle, AWS, Azure, GCloud, and Kubernetes for privileged session control and auditing.',
  },
  {
    slug: 'epm',
    title: 'Endpoint privilege management',
    stack: ['C++', 'WinAPI', 'COM', 'POSIX', 'Boost'],
    desc: 'Developed EPM modules for Windows and Linux enforcing least-privilege policies and controlling application execution rights across endpoints.',
  },
  {
    slug: 'email-security',
    title: 'Advanced email security',
    stack: ['C++', 'WinAPI', 'WDM', 'minifilter', 'COM', 'hooks', 'Boost'],
    desc: 'Developed an advanced email security system with kernel-level mail interception, scanning text, hyperlinks, and attachments against persistent threats.',
  },
  {
    slug: 'epp',
    title: 'Endpoint protection platform',
    stack: ['C++', 'Rust', 'WinAPI', 'WDM', 'WFP', 'minifilter', 'hooks', 'Boost', 'Qt'],
    desc: 'Developed an endpoint protection platform featuring kernel-level file system and process monitoring, early threat detection, static and heuristic analyzers, a behavioral analysis engine, and automated threat response.',
  },
  {
    slug: 'sip-telephony',
    title: 'SIP cross-messenger telephony',
    stack: ['C++', 'WinAPI', 'hooks', 'Boost', 'Qt', 'pjsip'],
    desc: 'Developed a SIP cross-messenger telephony system enabling transparent call forwarding between heterogeneous messengers via SIP-based routing and protocol integration layers.',
  },
  {
    slug: 'satellite-mirror',
    title: 'Satellite mirror correction',
    stack: ['Borland C++'],
    desc: 'Maintained and extended satellite mirror correction software for real-time adjustment of orbital mirror positioning systems.',
  },
  {
    slug: 'malware-analysis',
    title: 'Malware analysis',
    stack: [
      'IDA Pro',
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
      'Java decompiler',
      'dnSpy',
    ],
    desc: 'Conducted static and dynamic malware analysis. Produced detailed technical reports and authored YARA detection rules.',
  },
  {
    slug: 'esim-research',
    title: 'eSIM infrastructure security research',
    stack: ['Wireshark', 'Nmap', 'PcapDroid', 'MITM proxy', 'Java decompiler'],
    desc: 'Performed security research and testing of an eSIM operator infrastructure. Analyzed network traffic and protocols, and reverse-engineered components.',
  },
  {
    slug: 'ios-backup-recovery',
    title: 'iOS backup data recovery',
    stack: ['C++', 'CoreFoundation'],
    desc: 'Maintained and extended iOS backup data recovery software.',
  },
  {
    slug: 'anti-cheat',
    title: 'Anti-cheat system',
    stack: ['C++', 'WinAPI', 'hooks', 'Boost'],
    desc: 'Developed an anti-cheat system for a private multiplayer gaming platform. Involved reverse engineering of existing cheat techniques to design effective countermeasures.',
  },
]
