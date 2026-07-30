import type { GearGroup } from '@/lib/types'

/**
 * The two groups on /gear mirror the split that SKILL_GROUPS already makes
 * between the professional work and the hardware hobby. Every note says what the
 * thing is used for in a sentence or two: a paragraph each turns the page into
 * equipment reviews and has to be rewritten every time something is replaced.
 */
export const GEAR_GROUPS: GearGroup[] = [
  {
    slug: 'desk',
    title: 'Desk',
    rows: [
      {
        label: 'compute',
        items: [
          {
            name: 'Custom desktop',
            spec: 'i9-11900K · 64 GB · RTX 5070 Ti · Windows + WSL',
            note: 'Main machine for development, analysis, and research.',
          },
          {
            name: 'MacBook Pro 16',
            spec: 'M1 Pro · 32 GB',
            note: 'Laptop for travel, and for projects that need macOS.',
          },
        ],
      },
      {
        label: 'display',
        items: [
          {
            name: 'BenQ RD240Q',
            spec: '24.1" · 2560 × 1600 · 16:10',
            note: 'A good monitor for long hours of work.',
          },
        ],
      },
      {
        label: 'input',
        items: [
          {
            name: 'Logitech MX Master 3S and MX Keys',
            note: "A mouse and keyboard set that's easy to share between the PC and the laptop.",
          },
        ],
      },
      {
        label: 'audio',
        items: [
          {
            name: 'Focusrite Scarlett 2i2',
            spec: '4th gen',
            note: "Audio interface for good sound (I'm a music lover).",
          },
          {
            name: 'Adam Audio T8V',
            note: 'Studio monitors for listening, recording and making music (I play electric guitar as a hobby).',
          },
          {
            name: 'Beyerdynamic DT 990 Pro',
            spec: '250 Ω',
            note: 'Headphones for listening to music in good quality, and for making music.',
          },
        ],
      },
    ],
  },
  {
    slug: 'bench',
    title: 'Bench',
    rows: [
      {
        label: 'print',
        items: [
          {
            name: 'Bambu Lab P1S',
            spec: 'with AMS',
            note: '3D printer for printing cases, crafts, decor, and other useful things.',
          },
        ],
      },
      {
        label: 'measure',
        items: [
          {
            name: 'FNIRSI DST210',
            note: 'Multimeter and oscilloscope in one, for working with electronics.',
          },
          {
            name: 'ESR tester',
            spec: 'ATmega328',
            note: 'Component tester for capacitors and unmarked parts.',
          },
        ],
      },
      {
        label: 'solder',
        items: [
          {
            name: 'YIHUA 8786D',
            note: 'Soldering iron and hot air station for soldering various things.',
          },
        ],
      },
    ],
  },
]
