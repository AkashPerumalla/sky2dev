import type { Metadata } from "next";
import { site } from "@/site.config";
import { PageHeader, ExternalLink } from "@/components/ui";
import { EmailLink } from "@/components/email-link";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
  alternates: { canonical: "/about" },
};

/**
 * Skills and education live here as structured data rather than as Markdown
 * collections — they're short, they change rarely, and a collection for two
 * education entries would be indirection for its own sake.
 */
const SKILLS = [
  { group: "Languages", items: "Java, Python, JavaScript, C/C++, SQL, PL/SQL" },
  {
    group: "Android & Embedded",
    items:
      "AOSP modification, NDK/JNI, native libraries (.so), privileged system apps, Android services, boot-time initialization, multi-threading, real-time data processing, custom views",
  },
  {
    group: "Protocols & Hardware",
    items:
      "UART, SPI, I2C, GPIO, serial communication, SNMP & trap handling, TCP/UDP, hardware–software integration",
  },
  {
    group: "Backend",
    items:
      "Spring Boot, REST APIs, JWT, Node.js, PostgreSQL, Oracle SQL, Oracle EBS (P2P/O2C)",
  },
  {
    group: "AI/ML",
    items: "PyTorch, scikit-learn, OpenCV, RAG systems & evaluation, Docker",
  },
  {
    group: "Tools",
    items:
      "Git, SVN, Gradle, Maven, Linux, Android Studio, Postman, Wireshark, Docklight scripting",
  },
];

const EDUCATION = [
  {
    institution: "International Institute of Information Technology, Hyderabad",
    qualification: "PG Certification in Artificial Intelligence & Machine Learning",
    period: "Sep 2025 – Aug 2026",
    note: "Capstone: a real-world RAG system with an evaluation layer built on the RAGBench and RGB benchmarks.",
  },
  {
    institution: "JSpiders Training Institute",
    qualification: "Full Stack Java Development",
    period: "Aug 2023 – Apr 2024",
    note: "Core Java, Advanced Java, SQL, web technologies.",
  },
  {
    institution: "JNTUH College of Engineering, Jagitial",
    qualification: "B.Tech, Electronics & Communication Engineering",
    period: "Aug 2019 – May 2023",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-prose">
      <PageHeader title="About" />

      <div className="prose">
        <p>
          I&rsquo;m {site.name}, a software engineer in {site.location} working
          on embedded Android and real-time systems.
        </p>
        <p>
          Most of what I build sits below the application layer. Native code
          talking to hardware over serial, SPI, UART and I2C. AOSP modifications
          that grant an application access the platform normally withholds. The
          service layers that carry the resulting data somewhere useful. I have
          taken four systems from requirements through to deployment, including
          a patient monitor now in clinical use and a handheld satellite phone
          built under India&rsquo;s iDEX defence innovation programme.
        </p>
        <p>
          What connects them is that approximately right is not good enough. A
          dropped sample on a patient monitor, a failed handover on a satcom
          link, two radar contacts where only one vessel exists: none of these
          are cosmetic problems. That constraint is most of what makes the work
          interesting.
        </p>

        <h2>What&rsquo;s here</h2>
        <p>
          This site is a running log rather than a finished portfolio. Four
          things live on it:
        </p>
        <ul>
          <li>
            <strong>Work</strong>: roles I&rsquo;ve held and what I actually
            did in them.
          </li>
          <li>
            <strong>Projects</strong>: systems I&rsquo;ve built, including the
            ones still in progress.
          </li>
          <li>
            <strong>Writing</strong>: longer pieces, where I&rsquo;ve thought
            something through enough to take a position.
          </li>
          <li>
            <strong>Notes</strong>: short learnings, captured as they happen.
          </li>
        </ul>

        <h2>Skills</h2>
      </div>

      <dl className="mt-6 space-y-4">
        {SKILLS.map((skill) => (
          <div key={skill.group}>
            <dt className="font-mono text-[0.6875rem] tracking-[0.08em] text-faint uppercase">
              {skill.group}
            </dt>
            <dd className="mt-1 text-[0.9375rem] leading-relaxed text-muted">
              {skill.items}
            </dd>
          </div>
        ))}
      </dl>

      <div className="prose mt-12">
        <h2>Education</h2>
      </div>

      <ul className="mt-6 space-y-6">
        {EDUCATION.map((item) => (
          <li key={item.institution}>
            <div className="flex flex-col gap-x-4 gap-y-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <p className="text-[0.9375rem] font-medium">{item.institution}</p>
              <p className="shrink-0 font-mono text-[0.6875rem] text-faint">
                {item.period}
              </p>
            </div>
            <p className="mt-0.5 text-sm text-muted">{item.qualification}</p>
            {item.note && (
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {item.note}
              </p>
            )}
          </li>
        ))}
      </ul>

      <div className="prose mt-12">
        <h2>Elsewhere</h2>
        <ul>
          {site.socials.map((social) => (
            <li key={social.label}>
              <ExternalLink href={social.href}>{social.label}</ExternalLink>
            </li>
          ))}
          <li>
            <EmailLink />
          </li>
        </ul>

        <h2>This site</h2>
        <p>
          Built with Next.js and statically exported, so every page is plain
          HTML. Content is Markdown held in a git repository, with no database,
          no CMS and nothing to keep running. Syntax highlighting and typography
          are resolved at build time, so reading anything here requires no
          JavaScript.
        </p>
      </div>
    </div>
  );
}
