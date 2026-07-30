import { SectionLabel } from '@/components/ui/SectionLabel'

export function AboutHero() {
  return (
    <div>
      <SectionLabel hex="0x04">About</SectionLabel>
      <h1 className="oxl-page-title">An engineer&apos;s path</h1>
      <div className="oxl-about-intro">
        <p>
          Hi, I&apos;m Serge - 0xlay in most places online. I&apos;m a systems software engineer with 6+ years of experience building production-grade software in C++ and Rust for Windows and Linux across cybersecurity, telephony, and data recovery domains. I specialize in kernel and user-mode development and cross-platform system-level programming, and complement that engineering depth with hands-on experience in reverse engineering and malware analysis.
        </p>
        <p>
          I keep pace with modern development practices: I actively use AI-assisted workflows with Claude Code, Codex, and local LLMs (Qwen via LM Studio/Ollama), integrate MCP servers, and develop custom skills and commands for AI agents. I apply LLM agents to parallel development tasks while maintaining rigorous code review discipline, treating AI-generated code as a first draft that requires careful verification to ensure product stability and correctness.
        </p>
        <p>
          I also have a hobby, and it turns out to be engineering again. I just like tinkering with hardware and printing enclosures for it on a 3D printer. The one hobby that isn&apos;t engineering at all is the electric guitar.
        </p>
      </div>
    </div>
  )
}
