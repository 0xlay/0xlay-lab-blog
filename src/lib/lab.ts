import {
  Binary,
  BrainCircuit,
  CircuitBoard,
  Code2,
  Cpu,
  Microscope,
  Printer,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

export type LabCard = {
  title: string
  blurb: string
  Icon: LucideIcon
}

/**
 * The "the lab" grid on the home page: the subject areas this site covers,
 * software and hardware alike. Eight cards fill the four-column grid exactly.
 * Blurbs describe the area rather than any claim of expertise in it - the
 * skills actually claimed live in `@/lib/data/skills`, which /about renders.
 */
export const LAB_CARDS: LabCard[] = [
  {
    title: 'Software engineering',
    blurb: 'Systems, CLIs, and tooling written in C++ and Rust.',
    Icon: Code2,
  },
  {
    title: 'Reverse engineering',
    blurb: 'Malware, firmware, and binaries built to resist being read.',
    Icon: Binary,
  },
  {
    title: 'AI',
    blurb: 'Machine learning pointed at binaries, traffic, and signals.',
    Icon: BrainCircuit,
  },
  {
    title: 'Embedded',
    blurb: 'Firmware on bare metal: STM32, ESP32, AVR.',
    Icon: Cpu,
  },
  {
    title: 'Electronics',
    blurb: 'Analog and digital, from breadboard to finished board.',
    Icon: CircuitBoard,
  },
  {
    title: 'PCB repair',
    blurb: 'Board-level diagnosis, microsoldering, reflow.',
    Icon: Microscope,
  },
  {
    title: '3D printing',
    blurb: 'Enclosures, jigs and fixtures for one-off tools.',
    Icon: Printer,
  },
  {
    title: 'DIY tooling',
    blurb: "If the right instrument doesn't exist, build it.",
    Icon: Wrench,
  },
]
