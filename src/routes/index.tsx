import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Github, Linkedin, Mail, MapPin, Download, ArrowRight, ArrowUp,
  Code2, Cpu, Database, Sparkles, Palette, Users, Award, Briefcase,
  FileText, Lightbulb, Trophy, Send, Moon, Sun, ExternalLink,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "sonner";
import portrait from "@/assets/akanksha-profile.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akanksha Khurana — Full Stack Developer & AI Innovator" },
      { name: "description", content: "Computer Science Engineer at Chandigarh University. Full Stack Developer at Metharvix Systems. 300+ DSA, patents, research, and shipped products." },
      { property: "og:title", content: "Akanksha Khurana — Full Stack Developer & AI Innovator" },
      { property: "og:description", content: "Computer Science Engineer, Full Stack Developer, AI enthusiast, researcher and innovator." },
    ],
  }),
  component: Portfolio,
});

/* ------------------------- Hooks & helpers ------------------------- */

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function useCounter(end: number, duration = 1600, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start]);
  return val;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------- Data ------------------------- */

const SKILLS = [
  { icon: Code2, title: "Programming Languages", items: ["C", "C++", "Java", "Python", "SQL"] },
  { icon: Palette, title: "Frontend Development", items: ["HTML", "CSS", "JavaScript", "React.js"] },
  { icon: Database, title: "Backend Development", items: ["Node.js", "REST APIs", "Authentication", "DB Design"] },
  { icon: Cpu, title: "AI & Emerging Tech", items: ["Prompt Engineering", "Generative AI", "ML Fundamentals", "AI Tools"] },
  { icon: Sparkles, title: "Design", items: ["UI/UX Design", "Canva", "Wireframing", "Product Design"] },
  { icon: Users, title: "Professional", items: ["Leadership", "Communication", "Presentation", "Negotiation"] },
];

const PROJECTS = [
  {
    name: "AlgoVista",
    tag: "Full Stack",
    title: "Student–Teacher Portal for Guided DSA Practice",
    desc: "Full-stack platform enabling teachers to assign and track DSA problems while students monitor learning progress with rich analytics.",
    features: ["Role-based Auth", "Problem Management", "Performance Analytics", "Teacher Dashboard"],
    stack: ["React.js", "Node.js", "MongoDB", "REST APIs"],
  },
  {
    name: "AquaSense",
    tag: "IoT",
    title: "IoT-Based Water Quality Monitoring System",
    desc: "IoT-enabled system for real-time monitoring of pH, temperature and turbidity using a sensor network with cloud visualization.",
    features: ["Sensor Integration", "Real-Time Monitoring", "Cloud Dashboard", "Smart Alerts"],
    stack: ["IoT Sensors", "Microcontrollers", "Cloud Platforms"],
  },
  {
    name: "LegacyLink",
    tag: "Full Stack",
    title: "Alumni Management Platform",
    desc: "Alumni networking platform connecting students and alumni through mentorship, events, networking and career opportunities.",
    features: ["Secure Auth", "Alumni Directory", "Mentorship", "Event Management"],
    stack: ["React.js", "Node.js", "PostgreSQL"],
  },
];

const NAV = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#research", label: "Research" },
  { href: "#contact", label: "Contact" },
];

/* ------------------------- Page ------------------------- */

function Portfolio() {
  const [light, setLight] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(p);
      setShowTop(h.scrollTop > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* scroll progress */}
      <div
        className="fixed left-0 top-0 z-[60] h-[3px] bg-gradient-to-r from-primary via-cyan to-purple transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />

      {/* Grid background */}
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-40" />

      <Toaster richColors position="top-center" theme="dark" />

      <Nav light={light} setLight={setLight} />

      <main className="relative">
        <Hero />
        <Stats />
        <About />
        <Experience />
        <Skills />
        <Projects filter={filter} setFilter={setFilter} filtered={filtered} />
        <Research />
        <Certifications />
        <Achievements />
        <Contact />
      </main>

      <Footer />

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full glass glow text-foreground transition-all duration-300 hover:scale-110 ${
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity .8s ease, transform .8s ease; }
        .reveal.is-visible { opacity: 1; transform: translateY(0); }
      `}</style>
    </div>
  );
}

/* ------------------------- Sections ------------------------- */

function Nav({ light, setLight }: { light: boolean; setLight: (v: boolean) => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full glass px-5 py-3">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-purple text-primary-foreground">
            AK
          </span>
          <span className="hidden sm:inline">Akanksha<span className="text-primary">.</span></span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLight(!light)}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-secondary-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <a href="#contact" className="hidden sm:block">
            <Button size="sm" className="rounded-full bg-gradient-to-r from-primary to-cyan text-primary-foreground hover:opacity-90">
              Hire Me <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </a>
        </div>
      </nav>
    </header>
  );
}

const ROLES = [
  "Full Stack Developer",
  "AI Enthusiast",
  "Software Engineer",
  "Researcher & Innovator",
];

const TECH_MARQUEE = [
  "React", "TypeScript", "Next.js", "Node.js", "Python", "TensorFlow",
  "PostgreSQL", "MongoDB", "Tailwind", "Docker", "AWS", "Git",
  "FastAPI", "GraphQL", "Redis", "Three.js",
];

function useTypewriter(words: string[], speed = 80, pause = 1600) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    if (!del && text === current) {
      const t = setTimeout(() => setDel(true), pause);
      return () => clearTimeout(t);
    }
    if (del && text === "") {
      setDel(false);
      setI((p) => p + 1);
      return;
    }
    const t = setTimeout(() => {
      setText(del ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);
  return text;
}

function Hero() {
  const role = useTypewriter(ROLES);
  return (
    <section id="top" className="relative overflow-hidden px-4 pt-36 pb-24 md:pt-44 md:pb-32">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg mask-radial opacity-60" />
        <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-primary/25 blur-3xl animate-aurora" />
        <div className="absolute top-20 right-0 h-[380px] w-[380px] rounded-full bg-purple/25 blur-3xl animate-aurora" style={{ animationDelay: "-4s" }} />
        <div className="absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-cyan/20 blur-3xl animate-aurora" style={{ animationDelay: "-8s" }} />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <Reveal>
          <Badge variant="outline" className="mb-6 gap-2 rounded-full border-primary/40 bg-primary/10 px-3 py-1 text-primary backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            Available for opportunities
          </Badge>

          <p className="mb-3 font-mono text-sm text-muted-foreground">
            <span className="text-cyan">$</span> whoami
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.02] md:text-7xl">
            <span className="block text-foreground">Akanksha</span>
            <span className="block text-gradient">Khurana</span>
          </h1>

          <div className="mt-5 flex items-center gap-2 font-mono text-base md:text-lg">
            <span className="text-muted-foreground">&gt;</span>
            <span className="text-foreground">{role}</span>
            <span className="inline-block h-5 w-[2px] bg-cyan caret md:h-6" />
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Computer Science student at <span className="text-foreground">Chandigarh University</span>,
            building systems that solve real problems. Currently
            <span className="text-foreground"> Full Stack Engineering Intern</span> at Metharvix Systems, Gurugram.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects">
              <Button size="lg" className="group rounded-full bg-gradient-to-r from-primary to-cyan text-primary-foreground hover:opacity-90 glow">
                View Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <a href="/Akanksha_Khurana_Resume.pdf" download="Akanksha_Khurana_Resume.pdf" target="_blank" rel="noreferrer">
              <Button size="lg" variant="outline" className="rounded-full border-border bg-secondary/50 backdrop-blur">
                <Download className="mr-2 h-4 w-4" /> Resume
              </Button>
            </a>
            <a href="#contact">
              <Button size="lg" variant="ghost" className="rounded-full">
                Let's Talk
              </Button>
            </a>
          </div>

          <div className="mt-8 flex items-center gap-5 text-muted-foreground">
            <a href="https://github.com/AkankshaKhurana-1" target="_blank" rel="noreferrer" className="transition hover:text-foreground hover:-translate-y-0.5"><Github className="h-5 w-5" /></a>
            <a href="https://linkedin.com/in/akanksha-khurana-0693983b5" target="_blank" rel="noreferrer" className="transition hover:text-foreground hover:-translate-y-0.5"><Linkedin className="h-5 w-5" /></a>
            <a href="mailto:akankshakhurana333@gmail.com" className="transition hover:text-foreground hover:-translate-y-0.5"><Mail className="h-5 w-5" /></a>
            <span className="ml-2 hidden font-mono text-xs sm:inline">// based in India</span>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative mx-auto w-full max-w-md">
            {/* Orbit rings */}
            <div className="pointer-events-none absolute inset-0 -m-6">
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-spin-slow">
                <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_20px_var(--cyan)]" />
              </div>
              <div className="absolute inset-6 rounded-full border border-purple/20 animate-spin-reverse">
                <span className="absolute top-1/2 -right-1.5 h-2 w-2 -translate-y-1/2 rounded-full bg-purple shadow-[0_0_16px_var(--purple)]" />
              </div>
            </div>

            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/30 via-purple/20 to-cyan/30 blur-2xl" />
            <div className="relative animate-float overflow-hidden rounded-3xl glass p-2 glow">
              <img
                src={portrait}
                alt="Akanksha Khurana — Portrait"
                width={896}
                height={1152}
                className="h-auto w-full rounded-2xl object-cover"
              />
              <div className="pointer-events-none absolute inset-2 rounded-2xl ring-1 ring-white/10" />
              {/* Status pill */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full glass px-3 py-1.5 text-xs font-mono">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                online · building
              </div>
            </div>

            {/* Floating chips */}
            <div className="absolute -left-4 top-10 hidden md:block">
              <FloatingChip><Code2 className="h-4 w-4 text-cyan" /> 300+ DSA</FloatingChip>
            </div>
            <div className="absolute -right-6 bottom-20 hidden md:block">
              <FloatingChip><Sparkles className="h-4 w-4 text-purple" /> AI / ML</FloatingChip>
            </div>
            <div className="absolute -bottom-4 left-10 hidden md:block">
              <FloatingChip><Briefcase className="h-4 w-4 text-primary" /> Metharvix Intern</FloatingChip>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Tech marquee */}
      <div className="relative mt-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee gap-3">
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((t, i) => (
            <span key={i} className="rounded-full glass px-4 py-2 font-mono text-xs text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#about" aria-label="Scroll down" className="mt-12 mx-auto hidden h-10 w-6 items-center justify-center rounded-full border border-border md:flex">
        <span className="h-2 w-2 rounded-full bg-cyan scroll-dot" />
      </a>
    </section>
  );
}

function FloatingChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-full glass px-3 py-2 text-xs font-medium shadow-lg animate-float">
      {children}
    </div>
  );
}

function Stats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setStart(true), { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const stats = [
    { n: 300, suffix: "+", label: "DSA Problems Solved", icon: Code2 },
    { n: 3, suffix: "+", label: "Major Dev Projects", icon: Briefcase },
    { n: 2, suffix: "", label: "Patent Innovations", icon: Lightbulb },
    { n: 2, suffix: "", label: "Research Papers", icon: FileText },
  ];
  return (
    <section ref={ref} className="px-4 pb-12">
      <div className="relative mx-auto max-w-6xl">
        <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-r from-primary/40 via-cyan/40 to-purple/40 opacity-60 blur-md" />
        <div className="relative grid grid-cols-2 gap-px overflow-hidden rounded-3xl glass md:grid-cols-4">
          {stats.map((s, i) => (
            <StatItem key={s.label} n={s.n} suffix={s.suffix} label={s.label} icon={s.icon} start={start} delay={i * 200} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ n, suffix, label, icon: Icon, start, delay }: { n: number; suffix: string; label: string; icon: any; start: boolean; delay: number }) {
  const v = useCounter(n, 1500 + delay, start);
  return (
    <div className="group relative bg-card/40 p-6 text-center transition hover:bg-card/70 md:p-8">
      <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-cyan/20 text-cyan transition group-hover:scale-110">
        <Icon className="h-5 w-5" />
      </div>
      <div className="font-display text-4xl font-bold text-gradient md:text-5xl">
        {v}{suffix}
      </div>
      <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground md:text-sm">{label}</div>
    </div>
  );
}

function SectionHeader({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-14 text-center">
      <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_var(--cyan)]" />
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{kicker}</p>
      </div>
      <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">{title}</h2>
      <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
      {sub && <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}

function About() {
  const strengths = [
    "Problem Solving", "Critical Thinking", "Full Stack Development", "Research & Innovation",
    "Product Development", "Leadership", "Communication", "Team Collaboration",
  ];
  return (
    <section id="about" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader kicker="about me" title="Engineer. Builder. Innovator." />
        <div className="grid items-start gap-10 md:grid-cols-2">
          <Reveal>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Dynamic and innovation-driven Computer Science Engineering student with a strong
                foundation in <span className="text-foreground">programming, problem-solving and product development</span>.
              </p>
              <p>
                Passionate about leveraging technology to build impactful solutions with hands-on
                experience in <span className="text-foreground">startup ideation, AI-powered product design</span>, and real-world project execution.
              </p>
              <p>
                Seeking opportunities to contribute to forward-looking organizations while
                continuously enhancing technical expertise, entrepreneurial skills, and
                research-driven innovation.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="rounded-3xl glass p-6 md:p-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-cyan">core strengths</p>
              <div className="flex flex-wrap gap-2">
                {strengths.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-sm transition hover:border-primary/50 hover:bg-primary/10"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Location</p>
                  <p className="font-medium">Kullu, HP · India</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Status</p>
                  <p className="font-medium text-cyan">Open to work</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


function Experience() {
  const responsibilities = [
    "Building scalable web applications end-to-end",
    "Owning frontend & backend feature development",
    "Contributing to production-grade software solutions",
    "Collaborating across product, design and engineering",
    "Applying modern software engineering practices",
  ];
  return (
    <section id="experience" className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader kicker="experience" title="Where I'm Building" />
        <Reveal>
          <div className="overflow-hidden rounded-3xl glass">
            <div className="flex flex-col items-start justify-between gap-4 border-b border-border p-6 md:flex-row md:items-center md:p-8">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-purple text-primary-foreground">
                  <Briefcase className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Full Stack Engineering Intern</h3>
                  <p className="text-sm text-primary">Metharvix Systems Pvt. Ltd. · Gurugram</p>
                </div>
              </div>
              <Badge className="bg-cyan/20 text-cyan border-cyan/30">Current</Badge>
            </div>
            <ul className="grid gap-3 p-6 md:grid-cols-2 md:p-8">
              {responsibilities.map((r) => (
                <li key={r} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-primary to-cyan" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader kicker="tech stack" title="Skills & Tools" sub="The full toolkit I use to take ideas from whiteboard to production." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="group relative h-full rounded-2xl p-[1px] transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-cyan/0 to-purple/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/60 group-hover:via-cyan/60 group-hover:to-purple/60 group-hover:opacity-100" />
                <div className="relative h-full overflow-hidden rounded-2xl glass p-6">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-purple/20 text-primary transition group-hover:scale-110 group-hover:text-cyan">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-3 font-semibold">{s.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((i) => (
                      <span key={i} className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 font-mono text-xs transition hover:border-primary/40 hover:text-primary">
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({
  filter, setFilter, filtered,
}: { filter: string; setFilter: (s: string) => void; filtered: typeof PROJECTS }) {
  const tags = ["All", "Full Stack", "IoT"];
  return (
    <section id="projects" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader kicker="featured work" title="Projects That Ship" sub="Real systems built end-to-end — from architecture to deployment." />
        <Reveal>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  filter === t
                    ? "bg-gradient-to-r from-primary to-cyan text-primary-foreground glow"
                    : "border border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <article className="group relative h-full overflow-hidden rounded-3xl glass p-7 transition-all duration-500 hover:-translate-y-1.5 hover:glow">
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-primary/30 to-purple/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute right-6 top-6 font-display text-5xl font-bold text-foreground/5 transition group-hover:text-primary/20">
                  0{i + 1}
                </span>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan">
                      <span className="h-1 w-1 rounded-full bg-cyan" /> {p.tag}
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-bold">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">{p.title}</p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-muted-foreground transition group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-5">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Features</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.features.map((f) => (
                      <span key={f} className="rounded-md bg-secondary/70 px-2 py-1 text-xs">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-5 border-t border-border pt-4">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 font-mono text-xs text-primary">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Research() {
  const patents = [
    {
      title: "AI-Powered Embedded Smart Window",
      desc: "Intelligent smart window integrating AI automation, security monitoring, environmental sensing and smart building tech.",
    },
    {
      title: "SlotSpace — AI-Driven Warehouse Rental",
      desc: "Marketplace platform optimizing warehouse utilization with intelligent matching, booking and management.",
    },
  ];
  const papers = [
    {
      title: "Combining Blockchain with AI for Fraud Detection",
      desc: "Researching the integration of blockchain and AI to improve fraud detection, transparency and security.",
    },
    {
      title: "AI for Climate Modelling and Weather Prediction",
      desc: "Data-driven initiative using meteorological datasets and ML techniques for climate forecasting.",
    },
  ];
  return (
    <section id="research" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader kicker="research & innovation" title="Patents & Papers in Progress" />
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-5 flex items-center gap-2 font-display text-xl font-semibold">
              <Lightbulb className="h-5 w-5 text-cyan" /> Patents
            </h3>
            <div className="space-y-4">
              {patents.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <div className="group rounded-2xl glass p-6 transition hover:glow">
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-purple/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-purple">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple" /> In Progress
                    </div>
                    <h4 className="font-semibold">{p.title}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-5 flex items-center gap-2 font-display text-xl font-semibold">
              <FileText className="h-5 w-5 text-cyan" /> Research Papers
            </h3>
            <div className="space-y-4">
              {papers.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <div className="group rounded-2xl glass p-6 transition hover:glow">
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-cyan/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" /> In Progress
                    </div>
                    <h4 className="font-semibold">{p.title}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  const certs = [
    {
      title: "Prompt Engineering & GenAI",
      org: "Chandigarh University · 2025",
      topics: ["Advanced Prompt Engineering", "LLMs", "Generative AI", "AI-Assisted Dev"],
    },
    {
      title: "Introduction to Machine Learning",
      org: "IIT Madras · 2026",
      topics: ["ML Fundamentals", "Supervised Learning", "Model Evaluation", "AI Concepts"],
    },
  ];
  return (
    <section id="certifications" className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader kicker="credentials" title="Certifications" />
        <div className="grid gap-5 md:grid-cols-2">
          {certs.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="rounded-2xl glass p-6 transition hover:glow">
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan/30 to-primary/30 text-cyan">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{c.title}</h4>
                    <p className="text-xs text-muted-foreground">{c.org}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.topics.map((t) => (
                    <span key={t} className="rounded-md bg-secondary/70 px-2 py-1 font-mono text-xs">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeader kicker="achievements" title="Recognition" />
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl glass p-8 md:p-10">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-cyan/30 to-primary/30 blur-3xl" />
            <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
              <div className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-purple text-primary-foreground glow">
                <Trophy className="h-8 w-8" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-cyan">Smart India Hackathon · Teckathon 2.0</p>
                <h3 className="mt-1 font-display text-2xl font-bold">Top 50 — University Internal Round</h3>
                <p className="mt-2 text-muted-foreground">
                  Selected among the top 50 teams in the university-level internal hackathon for an innovative
                  problem-solving solution combining technology, research and product thinking.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [sending, setSending] = useState(false);
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (sending) return;
    setSending(true);
    emailjs
      .sendForm(
        "service_bgdajkw",
        "template_mnshmqk",
        form,
        { publicKey: "UEoCNdWUnEWMCRnMe" }
      )
      .then(() => {
        toast.success("Message sent! I'll get back to you soon.");
        form.reset();
      })
      .catch(() => {
        toast.error("Failed to send. Please try again.");
      })
      .finally(() => setSending(false));
  }
  const contacts = [
    { icon: Mail, label: "Email", value: "akankshakhurana333@gmail.com", href: "mailto:akankshakhurana333@gmail.com" },
    { icon: MapPin, label: "Location", value: "Kullu, Himachal Pradesh, India" },
    { icon: Linkedin, label: "LinkedIn", value: "/in/akanksha-khurana", href: "https://linkedin.com/in/akanksha-khurana-0693983b5" },
    { icon: Github, label: "GitHub", value: "AkankshaKhurana-1", href: "https://github.com/AkankshaKhurana-1" },
  ];
  return (
    <section id="contact" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader kicker="get in touch" title="Let's Build Something" sub="Internships, collaborations, research, or just a quick hello — my inbox is open." />
        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="space-y-3">
              {contacts.map((c) => {
                const Cmp: any = c.href ? "a" : "div";
                return (
                  <Cmp
                    key={c.label}
                    {...(c.href ? { href: c.href, target: c.href.startsWith("http") ? "_blank" : undefined, rel: "noreferrer" } : {})}
                    className="flex items-center gap-4 rounded-2xl glass p-4 transition hover:glow"
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-cyan/30 text-cyan">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                      <p className="truncate font-medium">{c.value}</p>
                    </div>
                  </Cmp>
                );
              })}
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-3">
            <form onSubmit={onSubmit} className="rounded-3xl glass p-6 md:p-8 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-muted-foreground">Name</label>
                  <Input required name="name" placeholder="Your name" className="bg-secondary/40 border-border" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-muted-foreground">Email</label>
                  <Input required type="email" name="email" placeholder="you@example.com" className="bg-secondary/40 border-border" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-muted-foreground">Message</label>
                <Textarea required name="message" rows={5} placeholder="Tell me about the opportunity…" className="bg-secondary/40 border-border" />
              </div>
              <Button type="submit" size="lg" disabled={sending} className="w-full rounded-full bg-gradient-to-r from-primary to-cyan text-primary-foreground hover:opacity-90 glow">
                {sending ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…</>
                ) : (
                  <>Send Message <Send className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-purple text-primary-foreground">AK</span>
              Akanksha<span className="text-primary">.</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Building impactful technology through innovation, research, and software engineering.
            </p>
          </div>
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">Navigate</p>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} className="text-muted-foreground transition hover:text-foreground">{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">Connect</p>
            <div className="flex gap-2">
              <a href="https://github.com/AkankshaKhurana-1" target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-xl glass transition hover:glow"><Github className="h-4 w-4" /></a>
              <a href="https://linkedin.com/in/akanksha-khurana-0693983b5" target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-xl glass transition hover:glow"><Linkedin className="h-4 w-4" /></a>
              <a href="mailto:akankshakhurana333@gmail.com" className="grid h-10 w-10 place-items-center rounded-xl glass transition hover:glow"><Mail className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Akanksha Khurana. All rights reserved.</p>
          <p className="font-mono">Crafted with React · TanStack · Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
