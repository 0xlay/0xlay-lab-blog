import type { Credential, Language } from '@/lib/types'

/** The degree first, then coursework, newest interest last. */
export const EDUCATION: Credential[] = [
  {
    title: 'BSc, computer engineering',
    detail: 'Kremenchuk Mykhailo Ostrohradskyi National University',
    period: '2017-2021',
  },
  { title: 'Windows 11 Internals: Foundation', detail: 'Pluralsight' },
  { title: 'Windows 11 Internals: Memory Management', detail: 'Pluralsight' },
  { title: 'Windows 11 Internals: Kernel Mechanisms', detail: 'Pluralsight' },
]

export const LANGUAGES: Language[] = [
  { name: 'Ukrainian', level: 'native' },
  { name: 'Russian', level: 'native' },
  { name: 'English', level: 'intermediate, B1+' },
]
