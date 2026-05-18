import { useEffect, useRef, useState } from "react";

// ============== DATA ==============
const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

const SKILLS = [
  {
    icon: "fa-solid fa-code",
    title: "Programming",
    items: ["C++", "Python", "HTML", "CSS"],
  },
  {
    icon: "fa-solid fa-brain",
    title: "AI / ML",
    items: ["TensorFlow", "Scikit-learn", "Deep Learning", "Generative AI", "LLMOps"],
  },
  {
    icon: "fa-solid fa-cube",
    title: "Frameworks & Tools",
    items: ["FastAPI", "Google ADK", "MCP", "Agno Framework", "ChromaDB", "Gradio"],
  },
  {
    icon: "fa-solid fa-layer-group",
    title: "Full-Stack",
    items: ["React.js", "Node.js", "Express.js", "MongoDB", "Flutter", "Next.js", "Firebase"],
  },
  {
    icon: "fa-solid fa-cloud",
    title: "Cloud & DevOps",
    items: ["Google Cloud Run", "Docker", "GitHub Actions", "BigQuery", "Pub/Sub", "Firestore"],
  },
  {
    icon: "fa-solid fa-chart-line",
    title: "Data & Analytics",
    items: ["Apache Superset", "FAISS", "SQLite", "OpenTelemetry"],
  },
];

const PROJECTS = [
  {
    num: "01",
    title: "OperaIQ",
    tagline: "AI-Powered Production Intelligence Platform",
    desc: "An open, developer-first SRE intelligence system combining a FastMCP-based tool surface with multi-agent orchestration via Google ADK. Features semantic runbook search (ChromaDB), operator-gated remediation workflows, real-time Next.js dashboard with SSE/WebSocket streaming, and auto-generated postmortem scoring. Agents: Triage, Remediation, PostMortem Coordinator.",
    tech: ["Google ADK", "FastMCP", "Next.js", "BigQuery", "Pub/Sub", "Firestore", "ChromaDB", "Python"],
    link: "https://github.com/HBX814/operaiq",
    size: "featured",
  },
  {
    num: "02",
    title: "CommunityPulse",
    tagline: "Google Solution Challenge 2026 · Nova Rangers",
    event: "GSC '26",
    desc: "AI-powered volunteer coordination platform for NGOs in Madhya Pradesh. Uses Gemini 2.5 Flash via Google ADK for needs classification, deduplication, priority ranking, and volunteer matching. Full-stack with Flutter mobile app, FastAPI backend, Firestore DB, Apache Superset analytics, and Cloud Run CI/CD.",
    tech: ["Google ADK", "Gemini 2.5", "FastAPI", "Flutter", "Firestore", "BigQuery", "Superset", "Upstash Redis", "Cloud Run"],
    link: "https://github.com/HBX814/Nova_Rangers",
    size: "half",
  },
  {
    num: "03",
    title: "Drift Detector",
    tagline: "Agents MCP Hackathon",
    desc: "MCP server for monitoring LLM performance drift using adaptive sampling and differential analysis. Implements baseline diagnostic system with tailored questionnaires, automated drift scoring (threshold alerts >50), and SQLite-backed persistence with Gradio dashboard for real-time trend visualization.",
    tech: ["Python", "MCP SDK", "SQLite", "Fast-Agent", "Gradio"],
    link: "https://github.com/HBX814/drift-detector",
    size: "half",
  },
  {
    num: "04",
    title: "Infinite Feed",
    tagline: "Music Recommendation System",
    event: "IITISoC '25",
    desc: "Full-stack AI-powered music recommendation platform with hybrid filtering (content-based + collaborative). Integrated Spotify Web API with 7 themed playlist generation modes and advanced semantic search.",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Scikit-learn", "Spotify API"],
    link: "https://github.com/HBX814/InfiMusicRecSys",
    size: "third",
  },
  {
    num: "05",
    title: "Virtual Makeup Try-On",
    tagline: "IITISoC '24 · 2nd Place",
    medal: "🥈 Silver",
    desc: "Real-time virtual makeup application using BeautyGAN for realistic makeup transfer and MediaPipe for facial landmark detection. Streamlit interface for applying lipstick, eyeshadow, toner via webcam or photo upload.",
    tech: ["Python", "OpenCV", "MediaPipe", "BeautyGAN", "Streamlit", "Dlib"],
    link: "https://github.com/HBX814/Virtual-Makeup-Try-on",
    size: "third",
  },
  {
    num: "06",
    title: "SHL Assessment Recommender",
    tagline: "Semantic Search Engine",
    desc: "Intelligent semantic recommendation engine for hiring managers to find relevant SHL assessments from natural language job descriptions. Uses INSTRUCTOR-XL embeddings and FAISS vector search. Evaluated with MAP@3 and Recall@3 metrics.",
    tech: ["Python", "FAISS", "INSTRUCTOR-XL", "hkunlp", "NumPy"],
    link: "https://github.com/HBX814/SHL-Assessment-Recommendation-System",
    size: "third",
  },
  {
    num: "07",
    title: "Multi-Agent Path Planning",
    tagline: "Inter IIT Tech Meet 13.0 · Bharat Forge",
    desc: "Multi-agent path planning system using prioritized A* algorithm with collision avoidance in grid environments. Built for the Bharat Forge challenge at Inter IIT Tech Meet 13.0.",
    tech: ["Python", "NumPy", "Matplotlib", "A* Algorithm"],
    link: "https://github.com/HBX814/MultiAgentPathPlanningAstar",
    size: "half",
  },
];

const EXPERIENCE = [
  {
    role: "ML Research Intern",
    org: "AgriHub, IIT Indore · Under Prof. Aruna Tiwari",
    date: "May 2025 — Present",
    desc: "Fine-tuned an LSTM model on the CGWB dataset to predict groundwater levels across Indore and Madhya Pradesh. Built end-to-end forecasting pipeline with feature engineering, temporal cross-validation, and reproducible training artifacts.",
  },
  {
    role: "Machine Learning Intern",
    org: "tochan.ai",
    date: "Jun 2025 — Aug 2025",
    desc: "Built AI Agents from scratch using Model Context Protocol (MCP) and the Agno Framework. Designed tool-calling surfaces, conversation memory, and evaluation harnesses for production-grade agent deployments.",
  },
];

const ACHIEVEMENTS = [
  {
    icon: "fa-solid fa-medal",
    year: "'24",
    title: "Silver Medal — IITISoC '24",
    desc: "2nd Place, AI/ML Division for Virtual Makeup Try-On project using BeautyGAN + MediaPipe.",
  },
  {
    icon: "fa-solid fa-handshake-angle",
    year: "'24",
    title: "Inter IIT Tech Meet 13.0",
    desc: "Contingent Member — Bharat Forge challenge with Multi-Agent Path Planning system.",
  },
  {
    icon: "fa-solid fa-bolt",
    year: "'25",
    title: "CodeForces Rating: 1231",
    desc: "Current & Highest rating · Specialist trajectory · Consistent algorithmic problem-solving.",
  },
];

const POSITIONS = [
  {
    icon: "fa-solid fa-pen-nib",
    role: "Head of Content",
    org: "Cynaptics Club (ML Club), IIT Indore",
    date: "Jan 2025 — Present",
  },
  {
    icon: "fa-solid fa-user-graduate",
    role: "Mentor — AI/ML Domain",
    org: "IITISoC '25",
    date: "May — Jul 2025",
  },
  {
    icon: "fa-solid fa-hotel",
    role: "Head of Accommodation",
    org: "Model United Nations, IIT Indore",
    date: "Sep 2024 — Jan 2025",
  },
  {
    icon: "fa-solid fa-clipboard-list",
    role: "USG Operational & Logistics",
    org: "Model United Nations, IIT Indore",
    date: "Sep 2024 — Jan 2025",
  },
];

// ============== SPIDER WEB SVG ==============
const SpiderWebSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" data-testid="spider-web-svg">
    <g fill="none" stroke="#c0392b" strokeWidth="0.7" strokeLinecap="round">
      <line x1="0" y1="0" x2="200" y2="0" />
      <line x1="0" y1="0" x2="0" y2="200" />
      <line x1="0" y1="0" x2="200" y2="200" />
      <line x1="0" y1="0" x2="200" y2="60" />
      <line x1="0" y1="0" x2="60" y2="200" />
      <line x1="0" y1="0" x2="200" y2="120" />
      <line x1="0" y1="0" x2="120" y2="200" />
      <path d="M 20 0 Q 30 18 0 20" />
      <path d="M 40 0 Q 56 30 0 40" />
      <path d="M 60 0 Q 80 50 0 60" />
      <path d="M 80 0 Q 110 70 0 80" />
      <path d="M 100 0 Q 140 90 0 100" />
      <path d="M 130 0 Q 175 115 0 130" />
      <path d="M 160 0 Q 200 140 0 160" />
      <path d="M 190 0 Q 200 170 0 190" />
    </g>
  </svg>
);

// ============== HERO WEB BACKGROUND (parallax canvas) ==============
const HeroWeb = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (!svgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      svgRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // generate radial web
  const centerX = 600;
  const centerY = 500;
  const spokes = 16;
  const rings = 7;
  const radius = 800;

  const spokeLines = Array.from({ length: spokes }).map((_, i) => {
    const angle = (i / spokes) * Math.PI * 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    return <line key={`s-${i}`} x1={centerX} y1={centerY} x2={x} y2={y} />;
  });

  const ringPaths = Array.from({ length: rings }).map((_, r) => {
    const rr = ((r + 1) / rings) * radius;
    const points = Array.from({ length: spokes }).map((_, i) => {
      const a = (i / spokes) * Math.PI * 2;
      return `${centerX + Math.cos(a) * rr},${centerY + Math.sin(a) * rr}`;
    });
    return <polygon key={`r-${r}`} points={points.join(" ")} fill="none" />;
  });

  return (
    <div className="hero-bg">
      <svg ref={svgRef} viewBox="0 0 1200 1000" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="webfade" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#c0392b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c0392b" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g stroke="url(#webfade)" strokeWidth="0.6" fill="none" strokeLinecap="round">
          {spokeLines}
          {ringPaths}
        </g>
        {/* dew dots */}
        {Array.from({ length: 20 }).map((_, i) => {
          const a = (i / 20) * Math.PI * 2;
          const rr = 200 + (i % 4) * 120;
          return (
            <circle
              key={`d-${i}`}
              cx={centerX + Math.cos(a) * rr}
              cy={centerY + Math.sin(a) * rr}
              r="1.5"
              fill="#ff2a3c"
              opacity="0.6"
            />
          );
        })}
      </svg>
    </div>
  );
};

// ============== CUSTOM CURSOR ==============
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let raf;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    const enter = () => ringRef.current?.classList.add("hover");
    const leave = () => ringRef.current?.classList.remove("hover");

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);

    const interactive = document.querySelectorAll('a, button, .skill-card, .proj-card, .ach-card, .stat-card, .pos-row, .contact-item, .tl-item, .social-link, .music-widget');
    interactive.forEach(el => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      interactive.forEach(el => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" data-testid="custom-cursor-ring" />
      <div ref={dotRef} className="cursor-dot" data-testid="custom-cursor-dot" />
    </>
  );
};

// ============== MUSIC PLAYER WIDGET ==============
const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [src, setSrc] = useState("/audio/spider-theme.mp3");
  const FALLBACK = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3";

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      try { a.pause(); } catch { /* noop */ }
      setPlaying(false);
      return;
    }
    // Optimistically reflect UI state so user gets feedback even if source blocked
    setPlaying(true);
    try {
      await a.play();
    } catch {
      if (src !== FALLBACK) {
        setSrc(FALLBACK);
        setTimeout(async () => {
          try { await a.play(); } catch { /* keep optimistic UI */ }
        }, 120);
      }
    }
  };

  const onError = () => {
    if (src !== FALLBACK) setSrc(FALLBACK);
  };

  return (
    <div className={`music-widget ${playing ? "" : "paused"}`} data-testid="music-player-widget">
      <button
        type="button"
        onClick={toggle}
        className={`music-btn ${playing ? "playing" : ""}`}
        aria-label={playing ? "Pause music" : "Play music"}
        data-testid="music-toggle-btn"
      >
        <i className={`fa-solid ${playing ? "fa-pause" : "fa-play"}`} />
      </button>
      <div className="music-info">
        <span className="ml">Now Playing</span>
        <span className="mt">Spider Theme</span>
      </div>
      <div className="music-bars" aria-hidden="true">
        <span /><span /><span /><span />
      </div>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="none"
        onError={onError}
        crossOrigin="anonymous"
      />
    </div>
  );
};

// ============== NAVBAR ==============
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);

    const sections = document.querySelectorAll("section[id]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} data-testid="navbar">
        <div className="nav-inner">
          <a href="#top" className="nav-logo" data-testid="nav-logo">
            <span className="logo-mark" />
            <span>HARSH<span style={{ color: "var(--red)" }}>.</span>B</span>
          </a>
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={active === l.href ? "active" : ""} data-testid={`nav-link-${l.label.toLowerCase()}`}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="nav-cta" data-testid="nav-cta-hire">
            <i className="fa-solid fa-paper-plane" /> Hire Me
          </a>
          <button
            type="button"
            className="nav-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            data-testid="nav-mobile-toggle"
          >
            <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars"}`} />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${open ? "open" : ""}`} data-testid="mobile-menu">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)} data-testid={`mobile-link-${l.label.toLowerCase()}`}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
};

// ============== SCROLL REVEAL HOOK ==============
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

// ============== MAIN PORTFOLIO ==============
const Portfolio = () => {
  useReveal();

  return (
    <div id="top" data-testid="portfolio-root">
      <CustomCursor />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="hero" data-testid="hero-section">
        <HeroWeb />
        <div className="hero-grain" />
        <SpiderWebSVG className="web-deco tl" />
        <SpiderWebSVG className="web-deco br" />

        <div className="hero-badge reveal" data-testid="hero-badge">
          <span className="label">// Education</span>
          B.Tech · Metallurgical Engineering &amp; Materials Science · IIT Indore
        </div>

        <div className="hero-inner">
          <div className="hero-tag reveal" data-testid="hero-status">
            <span className="dot" /> Available for AI/ML opportunities · 2026
          </div>

          <h1 className="hero-title reveal" data-testid="hero-title">
            <span className="glitch word" data-text="HARSH">HARSH</span>{" "}
            <span className="glitch word red" data-text="BHATI">BHATI</span>
          </h1>

          <div className="hero-sub reveal reveal-delay-1" data-testid="hero-subtitle">
            <span>ML Engineer</span>
            <span>AI Systems Builder</span>
            <span>IIT Indore</span>
          </div>

          <div className="hero-actions reveal reveal-delay-2">
            <a href="#projects" className="btn btn-primary" data-testid="hero-cta-projects">
              <i className="fa-solid fa-rocket" /> View Projects
            </a>
            <a href="#contact" className="btn btn-ghost" data-testid="hero-cta-contact">
              <i className="fa-solid fa-comment-dots" /> Contact Me
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-ghost" data-testid="hero-cta-resume">
              <i className="fa-solid fa-file-arrow-down" /> Download Resume
            </a>
          </div>

          <div className="hero-socials reveal reveal-delay-3" data-testid="hero-socials">
            <a href="https://github.com/HBX814" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub" data-testid="hero-social-github">
              <i className="fa-brands fa-github" />
            </a>
            <a href="https://www.linkedin.com/in/harsh-bhati-451a6930a" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn" data-testid="hero-social-linkedin">
              <i className="fa-brands fa-linkedin-in" />
            </a>
            <a href="mailto:harshbhati814@gmail.com" className="social-link" aria-label="Email" data-testid="hero-social-email">
              <i className="fa-solid fa-envelope" />
            </a>
          </div>
        </div>

        <div className="hero-scroll" data-testid="hero-scroll-indicator">
          <span>Scroll</span>
          <span className="line" />
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="block" data-testid="about-section">
        <SpiderWebSVG className="web-deco tr" />
        <div className="container">
          <div className="section-head reveal">
            <div className="section-kicker">// 01 · Origin Story</div>
            <h2 className="section-title">About <span className="accent">Me</span></h2>
          </div>
          <div className="about-grid">
            <div className="about-card reveal" data-testid="about-card">
              <p>
                I'm <strong style={{ color: "#fff" }}>Harsh Bhati</strong>, a B.Tech student at IIT Indore
                specializing in Metallurgical Engineering &amp; Materials Science, with a deep passion for
                AI, ML systems, and agentic software. I build production-grade AI pipelines, multi-agent
                systems, and full-stack platforms — from hackathon MVPs to research prototypes.
                Currently serving as <strong style={{ color: "var(--red-hot)" }}>Head of Content</strong>{" "}
                at Cynaptics Club (ML Club) at IIT Indore and mentoring in the AI/ML domain at IITISoC'25.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-card reveal reveal-delay-1" data-testid="stat-codeforces">
                <div className="label">// CodeForces Rating</div>
                <div className="value"><span className="badge-rating">1231</span> · Specialist</div>
              </div>
              <div className="stat-card reveal reveal-delay-2" data-testid="stat-projects">
                <div className="label">// Active Projects</div>
                <div className="value">7+ Production-grade</div>
              </div>
              <div className="stat-card reveal reveal-delay-3" data-testid="stat-club">
                <div className="label">// Leadership</div>
                <div className="value">Cynaptics · ML Club</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section id="skills" className="block" data-testid="skills-section">
        <SpiderWebSVG className="web-deco bl" />
        <div className="container">
          <div className="section-head reveal">
            <div className="section-kicker">// 02 · Arsenal</div>
            <h2 className="section-title">Skills &amp; <span className="accent">Stack</span></h2>
          </div>
          <div className="skills-grid">
            {SKILLS.map((s, i) => (
              <div className={`skill-card reveal reveal-delay-${(i % 4) + 1}`} key={s.title} data-testid={`skill-card-${i}`}>
                <div className="skill-icon"><i className={s.icon} /></div>
                <h3>{s.title}</h3>
                <div className="skill-tags">
                  {s.items.map((t) => (
                    <span className="skill-tag" key={t} data-testid={`skill-tag-${t.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section id="projects" className="block" data-testid="projects-section">
        <SpiderWebSVG className="web-deco tl" />
        <SpiderWebSVG className="web-deco br" />
        <div className="container">
          <div className="section-head reveal">
            <div className="section-kicker">// 03 · Selected Works</div>
            <h2 className="section-title">Project <span className="accent">Vault</span></h2>
          </div>
          <div className="bento">
            {PROJECTS.map((p, i) => (
              <article
                className={`proj-card ${p.size} reveal reveal-delay-${(i % 3) + 1}`}
                key={p.title}
                data-testid={`project-card-${i}`}
              >
                <div className="proj-meta">
                  <span className="proj-num">PRJ — {p.num}</span>
                  {p.medal && <span className="proj-medal">{p.medal}</span>}
                  {p.event && !p.medal && <span className="proj-tag-event">{p.event}</span>}
                </div>
                <h3 className="proj-title">{p.title}</h3>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--red-hot)",
                  marginBottom: 14,
                }}>{p.tagline}</div>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-tech">
                  {p.tech.map((t) => (
                    <span className="tech-pill" key={t}>{t}</span>
                  ))}
                </div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" className="proj-link" data-testid={`project-link-${i}`}>
                    <i className="fa-brands fa-github" /> View on GitHub <i className="fa-solid fa-arrow-right" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPERIENCE ===== */}
      <section id="experience" className="block" data-testid="experience-section">
        <SpiderWebSVG className="web-deco tr" />
        <div className="container">
          <div className="section-head reveal">
            <div className="section-kicker">// 04 · Trajectory</div>
            <h2 className="section-title">Experi<span className="accent">ence</span></h2>
          </div>
          <div className="timeline">
            {EXPERIENCE.map((e, i) => (
              <div className={`tl-item reveal reveal-delay-${i + 1}`} key={e.role} data-testid={`experience-item-${i}`}>
                <div className="tl-head">
                  <span className="tl-role">{e.role}</span>
                  <span className="tl-date">{e.date}</span>
                </div>
                <div className="tl-org">{e.org}</div>
                <p className="tl-desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ACHIEVEMENTS ===== */}
      <section id="achievements" className="block" data-testid="achievements-section">
        <SpiderWebSVG className="web-deco bl" />
        <div className="container">
          <div className="section-head reveal">
            <div className="section-kicker">// 05 · Honors</div>
            <h2 className="section-title">Achieve<span className="accent">ments</span></h2>
          </div>
          <div className="ach-grid">
            {ACHIEVEMENTS.map((a, i) => (
              <div className={`ach-card reveal reveal-delay-${i + 1}`} key={a.title} data-testid={`achievement-card-${i}`}>
                <div className="ach-year">{a.year}</div>
                <div className="ach-icon"><i className={a.icon} /></div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POSITIONS ===== */}
      <section id="positions" className="block" data-testid="positions-section">
        <div className="container">
          <div className="section-head reveal">
            <div className="section-kicker">// 06 · Leadership</div>
            <h2 className="section-title">Positions of <span className="accent">Responsibility</span></h2>
          </div>
          <div className="pos-list">
            {POSITIONS.map((p, i) => (
              <div className={`pos-row reveal reveal-delay-${(i % 4) + 1}`} key={p.role + p.org} data-testid={`position-row-${i}`}>
                <div className="pos-icon"><i className={p.icon} /></div>
                <div className="pos-text">
                  <div className="role">{p.role}</div>
                  <div className="meta">{p.org}<span className="date">{p.date}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="block" data-testid="contact-section">
        <SpiderWebSVG className="web-deco tl" />
        <SpiderWebSVG className="web-deco br" />
        <div className="container">
          <div className="section-head reveal">
            <div className="section-kicker">// 07 · Signal Boost</div>
            <h2 className="section-title">Get in <span className="accent">Touch</span></h2>
          </div>
          <div className="contact-card reveal" data-testid="contact-card">
            <h2>Let's build something <span style={{ color: "var(--red-hot)" }}>extraordinary</span>.</h2>
            <p className="sub">
              Open to AI/ML internships, research collaborations, and full-stack agentic projects.
              Reach out — I respond within 24 hours.
            </p>
            <div className="contact-grid">
              <a className="contact-item" href="mailto:harshbhati814@gmail.com" data-testid="contact-email-personal">
                <i className="fa-solid fa-envelope" />
                <div>
                  <span className="ci-label">// Email</span>
                  <span className="ci-value">harshbhati814@gmail.com</span>
                </div>
              </a>
              <a className="contact-item" href="mailto:mems230005017@iiti.ac.in" data-testid="contact-email-institute">
                <i className="fa-solid fa-graduation-cap" />
                <div>
                  <span className="ci-label">// Institute</span>
                  <span className="ci-value">mems230005017@iiti.ac.in</span>
                </div>
              </a>
              <a className="contact-item" href="tel:+919351270751" data-testid="contact-phone">
                <i className="fa-solid fa-phone" />
                <div>
                  <span className="ci-label">// Phone</span>
                  <span className="ci-value">+91 93512 70751</span>
                </div>
              </a>
              <a className="contact-item" href="https://github.com/HBX814" target="_blank" rel="noreferrer" data-testid="contact-github">
                <i className="fa-brands fa-github" />
                <div>
                  <span className="ci-label">// GitHub</span>
                  <span className="ci-value">github.com/HBX814</span>
                </div>
              </a>
              <a className="contact-item" href="https://www.linkedin.com/in/harsh-bhati-451a6930a" target="_blank" rel="noreferrer" data-testid="contact-linkedin">
                <i className="fa-brands fa-linkedin-in" />
                <div>
                  <span className="ci-label">// LinkedIn</span>
                  <span className="ci-value">linkedin.com/in/harsh-bhati-451a6930a</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer" data-testid="footer">
        Built with <span className="spider" aria-label="spider" /> by Harsh Bhati · 2026
      </footer>

      <MusicPlayer />
    </div>
  );
};

export default Portfolio;
