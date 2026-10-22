/**
 * ==========================================================================
 * MOHAMMAD HOSSEINI — ASCII PORTFOLIO
 * Vanilla JavaScript interactions, tactile feedback, project inspector & CLI
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Project Data Store
     -------------------------------------------------------------------------- */
  const PROJECTS_DATA = {
    anbarchi: {
      id: 'anbarchi',
      title: 'Anbarchi',
      subtitle: 'Inventory Management',
      tagline: 'AI-Powered Warehouse & Stock Optimization Platform',
      description: 'An intelligent inventory management system designed to streamline warehouse stock control, forecast replenishment cycles, and automate SKU tracking. Features real-time inventory auditing, anomaly detection, and automated stock reorder triggers.',
      techStack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'REST API'],
      github: 'https://github.com/mohamaadbey/anbarchi',
      demo: 'https://anbarchi.demo.app',
      asciiIcon: `   .( :o).
 .---------.
 | [=] [=] |
 | [=] [=] |
 '---------'`
    },
    pakmart: {
      id: 'pakmart',
      title: 'PakMart',
      subtitle: 'E-commerce Platform',
      tagline: 'Modern Multi-Vendor Retail & Order Processing System',
      description: 'A robust e-commerce platform built with modular component architecture and responsive user experience. Features dynamic catalog filtering, shopping cart persistence, secure payment workflow, and merchant inventory synchronization.',
      techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      github: 'https://github.com/mohamaadbey/OnlineStore',
      demo: 'https://pakmart.org',
      asciiIcon: `  .-------.
 /  ===    \\
| [=] [=]   |
|   $$$     |
 '---------'`
    },
    kavich: {
      id: 'kavich',
      title: 'Kavich',
      subtitle: 'Online Menu Platform',
      tagline: 'Interactive Digital Menu & Hospitality Ordering Platform',
      description: 'A responsive digital dining menu engineered for restaurants and cafes. Enables real-time menu item curation, category browsing, multi-language ingredient descriptions, and rapid QR code-based ordering workflows.',
      techStack: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'MySQL'],
      github: 'https://github.com/mohamaadbey/kavichcafe',
      demo: 'https://kavich1.ir',
      asciiIcon: `   .-----.
  ( MENU  )
   \\ === /
    _| |_`
    },
    lms: {
      id: 'lms',
      title: 'LMS',
      subtitle: 'Learning Management System',
      tagline: 'Comprehensive Academic Platform & Course Workflow',
      description: 'A full-stack learning management architecture facilitating student enrollment, interactive module tracking, assignment review pipelines, and instructor assessment tools with strict role-based access control.',
      techStack: ['TypeScript', 'React', 'Next.js', 'PostgreSQL', 'Docker', 'Linux'],
      github: 'https://github.com/mohamaadbey/lms',
      demo: 'https://lms.demo.app',
      asciiIcon: `    .-----.
 .--| LMS |
 |  | === |
 '--------'`
    }
  };

  /* --------------------------------------------------------------------------
     2. Tactile Audio Feedback (Web Audio API Synthesizer)
     -------------------------------------------------------------------------- */
  let audioCtx = null;
  let isSoundEnabled = localStorage.getItem('ascii_sound_enabled') === 'true';

  const soundToggleBtn = document.getElementById('sound-toggle');
  
  function updateSoundButtonUI() {
    if (soundToggleBtn) {
      soundToggleBtn.innerHTML = isSoundEnabled ? '[ 🔊 Sound: On ]' : '[ 🔈 Sound: Muted ]';
      soundToggleBtn.setAttribute('title', isSoundEnabled ? 'Click to mute sound' : 'Click to enable tactile sound');
    }
  }
  updateSoundButtonUI();

  async function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }
    return audioCtx;
  }

  function playKeyClickSound(type = 'click') {
    if (!isSoundEnabled) return;

    getAudioContext().then(ctx => {
      if (!ctx || ctx.state !== 'running') return;
      const now = ctx.currentTime;

      if (type === 'enable-chime') {
        // Confirmation chime when enabling sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(783.99, now + 0.08); // G5
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
        return;
      }

      // Authentic tactile keypress click:
      // High transient snap (mechanical switch impact)
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = 'triangle';
      snapOsc.frequency.setValueAtTime(1600, now);
      snapOsc.frequency.exponentialRampToValueAtTime(300, now + 0.025);
      snapGain.gain.setValueAtTime(0.25, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      snapOsc.connect(snapGain);
      snapGain.connect(ctx.destination);
      snapOsc.start(now);
      snapOsc.stop(now + 0.028);

      // Low resonant body thump
      const thumpOsc = ctx.createOscillator();
      const thumpGain = ctx.createGain();
      thumpOsc.type = 'sine';
      thumpOsc.frequency.setValueAtTime(280, now);
      thumpOsc.frequency.exponentialRampToValueAtTime(90, now + 0.04);
      thumpGain.gain.setValueAtTime(0.2, now);
      thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      thumpOsc.connect(thumpGain);
      thumpGain.connect(ctx.destination);
      thumpOsc.start(now);
      thumpOsc.stop(now + 0.045);
    }).catch(() => {
      // Audio not permitted by browser; fail silently
    });
  }

  soundToggleBtn?.addEventListener('click', async () => {
    isSoundEnabled = !isSoundEnabled;
    localStorage.setItem('ascii_sound_enabled', isSoundEnabled);
    updateSoundButtonUI();

    if (isSoundEnabled) {
      // Direct user gesture initializes and unlocks Web Audio
      await getAudioContext();
      playKeyClickSound('enable-chime');
      showToast('Tactile audio: ENABLED');
    } else {
      showToast('Tactile audio: MUTED');
    }
  });

  // Attach tactile click sound to interactive triggers
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button, input');
    if (target && target !== soundToggleBtn) {
      playKeyClickSound('click');
    }
  });

  /* --------------------------------------------------------------------------
     3. Theme Switcher (Paper, Dark, Amber)
     -------------------------------------------------------------------------- */
  const THEMES = ['paper', 'dark', 'amber'];
  let currentTheme = localStorage.getItem('ascii_theme') || 'paper';

  function applyTheme(theme) {
    if (!THEMES.includes(theme)) theme = 'paper';
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('ascii_theme', theme);
    currentTheme = theme;

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.content = theme === 'paper' ? '#F5F2EB' : (theme === 'dark' ? '#131415' : '#151108');
    }

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      const labels = {
        paper: '[ ☀ Paper ]',
        dark: '[ ☾ Dark ]',
        amber: '[ ⚡ Amber ]'
      };
      themeToggleBtn.innerHTML = labels[theme] || '[ ☀ Theme ]';
    }
  }

  applyTheme(currentTheme);

  const themeToggleBtn = document.getElementById('theme-toggle');
  themeToggleBtn?.addEventListener('click', () => {
    const nextIndex = (THEMES.indexOf(currentTheme) + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex];
    applyTheme(nextTheme);
    showToast(`Theme: ${nextTheme.toUpperCase()}`);
  });

  /* --------------------------------------------------------------------------
     4. Toast Notification
     -------------------------------------------------------------------------- */
  const toastEl = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  let toastTimer = null;

  function showToast(msg) {
    if (!toastEl || !toastText) return;
    toastText.textContent = `[ ${msg} ]`;
    toastEl.classList.remove('hidden');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.add('hidden');
    }, 2400);
  }

  /* --------------------------------------------------------------------------
     5. Project Inspection Modal
     -------------------------------------------------------------------------- */
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');
  const modalIcon = document.getElementById('modal-icon');
  const modalTitle = document.getElementById('modal-title');
  const modalTagline = document.getElementById('modal-tagline');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');
  const modalClone = document.getElementById('modal-clone');
  const cloneCopyBtn = document.getElementById('clone-copy-btn');
  const modalLiveLink = document.getElementById('modal-live-link');
  const modalRepoLink = document.getElementById('modal-repo-link');

  function openProjectModal(projectId) {
    const proj = PROJECTS_DATA[projectId];
    if (!proj || !projectModal) return;

    if (modalIcon) modalIcon.innerHTML = `<pre>${proj.asciiIcon}</pre>`;
    if (modalTitle) modalTitle.textContent = proj.title;
    if (modalTagline) modalTagline.textContent = `${proj.subtitle} — ${proj.tagline}`;
    if (modalDesc) modalDesc.textContent = proj.description;

    if (modalTech) {
      modalTech.innerHTML = proj.techStack
        .map(t => `<span class="tech-pill">${t}</span>`)
        .join('');
    }

    const cloneCmd = `git clone ${proj.github}.git`;
    if (modalClone) modalClone.textContent = cloneCmd;

    if (modalLiveLink) modalLiveLink.href = proj.demo;
    if (modalRepoLink) modalRepoLink.href = proj.github;

    projectModal.showModal();
  }

  function closeProjectModal() {
    if (projectModal?.open) {
      projectModal.close();
    }
  }

  document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projId = e.currentTarget.getAttribute('data-project');
      if (projId) openProjectModal(projId);
    });
  });

  modalCloseBtn?.addEventListener('click', closeProjectModal);
  modalDismissBtn?.addEventListener('click', closeProjectModal);

  projectModal?.addEventListener('click', (e) => {
    const rect = projectModal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeProjectModal();
    }
  });

  cloneCopyBtn?.addEventListener('click', () => {
    if (modalClone) {
      navigator.clipboard.writeText(modalClone.textContent.trim())
        .then(() => showToast('Git clone command copied!'))
        .catch(() => showToast('Failed to copy'));
    }
  });

  /* --------------------------------------------------------------------------
     6. Copy Contact Email
     -------------------------------------------------------------------------- */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const DEV_EMAIL = 'mohammad.hosseini.dev@gmail.com';

  copyEmailBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText(DEV_EMAIL)
      .then(() => showToast(`Copied: ${DEV_EMAIL}`))
      .catch(() => showToast(DEV_EMAIL));
  });

  /* --------------------------------------------------------------------------
     7. Interactive CLI / Terminal Modal
     -------------------------------------------------------------------------- */
  const terminalModal = document.getElementById('terminal-modal');
  const cliTriggerBtn = document.getElementById('cli-trigger');
  const cliCloseBtn = document.getElementById('cli-close-btn');
  const cliForm = document.getElementById('cli-form');
  const cliInput = document.getElementById('cli-input');
  const cliHistory = document.getElementById('cli-history');

  function openTerminal() {
    if (!terminalModal) return;
    terminalModal.showModal();
    setTimeout(() => cliInput?.focus(), 50);
  }

  function closeTerminal() {
    if (terminalModal?.open) {
      terminalModal.close();
    }
  }

  cliTriggerBtn?.addEventListener('click', openTerminal);
  cliCloseBtn?.addEventListener('click', closeTerminal);

  terminalModal?.addEventListener('click', (e) => {
    const rect = terminalModal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeTerminal();
    }
  });

  function appendCliOutput(line, isCommand = false, isSystem = false) {
    if (!cliHistory) return;
    const row = document.createElement('div');
    row.className = `cli-row ${isCommand ? 'user-cmd' : (isSystem ? 'system-msg' : 'output-line')}`;
    row.textContent = line;
    cliHistory.appendChild(row);
    cliHistory.scrollTop = cliHistory.scrollHeight;
  }

  cliForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const rawVal = cliInput.value.trim();
    if (!rawVal) return;

    appendCliOutput(`mohammad@portfolio:~$ ${rawVal}`, true);
    cliInput.value = '';

    const parts = rawVal.split(' ').filter(Boolean);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    handleCommand(cmd, args);
  });

  function handleCommand(cmd, args) {
    switch (cmd) {
      case 'help':
        appendCliOutput('Available commands:');
        appendCliOutput('  projects          - list featured projects');
        appendCliOutput('  project <name>    - inspect project (anbarchi, pakmart, kavich, lms)');
        appendCliOutput('  skills            - show technical stack summary');
        appendCliOutput('  about             - view developer background');
        appendCliOutput('  contact           - display contact details');
        appendCliOutput('  theme [theme]     - switch theme (paper, dark, amber)');
        appendCliOutput('  sound [on|off]    - toggle mechanical audio clicks');
        appendCliOutput('  cat               - summon ASCII feline companion');
        appendCliOutput('  whoami            - display active identity');
        appendCliOutput('  clear             - clear terminal buffer');
        appendCliOutput('  exit / quit       - close this terminal');
        break;

      case 'projects':
        appendCliOutput('Featured Projects:');
        appendCliOutput('  1. Anbarchi  - Inventory Management [Full-Stack]');
        appendCliOutput('  2. PakMart   - E-commerce Platform [Full-Stack]');
        appendCliOutput('  3. Kavich    - Online Menu Platform [Full-Stack]');
        appendCliOutput('  4. LMS       - Learning Management System [Full-Stack]');
        appendCliOutput("Type 'project <name>' to view detailed architecture.");
        break;

      case 'project':
        if (!args[0]) {
          appendCliOutput("Usage: project <anbarchi|pakmart|kavich|lms>");
        } else {
          const target = args[0].toLowerCase();
          if (PROJECTS_DATA[target]) {
            closeTerminal();
            openProjectModal(target);
          } else {
            appendCliOutput(`Project '${args[0]}' not found. Available: anbarchi, pakmart, kavich, lms`);
          }
        }
        break;

      case 'skills':
        appendCliOutput('Technical Stack:');
        appendCliOutput('  Frontend: React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind');
        appendCliOutput('  Backend:  Node.js, Express, REST APIs, Socket.IO');
        appendCliOutput('  Database: PostgreSQL, MySQL, MongoDB');
        appendCliOutput('  DevOps:   Docker, Linux, Nginx, Git & GitHub');
        break;

      case 'about':
        appendCliOutput("Mohammad Hosseini — Software Developer");
        appendCliOutput("Computer Science graduate from Golestan University.");
        appendCliOutput("Focusing on clean architecture, full-stack systems, and Unix philosophy.");
        break;

      case 'contact':
        appendCliOutput(`Email:    ${DEV_EMAIL}`);
        appendCliOutput('GitHub:   https://github.com/mohamaadbey');
        appendCliOutput('LinkedIn: https://linkedin.com/in/mohamaadbey');
        appendCliOutput('Telegram: https://t.me/mohamaadbey');
        break;

      case 'theme':
        if (args[0]) {
          const chosen = args[0].toLowerCase();
          if (THEMES.includes(chosen)) {
            applyTheme(chosen);
            appendCliOutput(`Theme set to: ${chosen}`);
            showToast(`Theme: ${chosen.toUpperCase()}`);
          } else {
            appendCliOutput(`Invalid theme. Choose: paper, dark, amber`);
          }
        } else {
          appendCliOutput(`Current theme: ${currentTheme}. Options: paper, dark, amber`);
        }
        break;

      case 'sound':
        if (args[0] === 'on') {
          isSoundEnabled = true;
          localStorage.setItem('ascii_sound_enabled', 'true');
          updateSoundButtonUI();
          getAudioContext().then(() => playKeyClickSound('enable-chime'));
          appendCliOutput('Tactile sound: ON');
        } else if (args[0] === 'off') {
          isSoundEnabled = false;
          localStorage.setItem('ascii_sound_enabled', 'false');
          updateSoundButtonUI();
          appendCliOutput('Tactile sound: OFF');
        } else {
          appendCliOutput(`Sound is currently: ${isSoundEnabled ? 'ON' : 'OFF'}. Use 'sound on' or 'sound off'.`);
        }
        break;

      case 'cat':
        appendCliOutput(`     /\\     /\\\n    /  '---'  \\\n   (  - •   • - )\n    \\    o    /\n  _  /       \\\n ( )/  |   |  \\\n  \\_\\  |___|  /`);
        break;

      case 'whoami':
        appendCliOutput('mohammad hosseini — software developer (uid=1000, gid=1000)');
        break;

      case 'clear':
        if (cliHistory) {
          cliHistory.innerHTML = '';
        }
        break;

      case 'exit':
      case 'quit':
        closeTerminal();
        break;

      default:
        appendCliOutput(`Command not found: '${cmd}'. Type 'help' for available commands.`);
        break;
    }
  }

  /* --------------------------------------------------------------------------
     8. Global Keyboard Shortcuts
     -------------------------------------------------------------------------- */
  document.addEventListener('keydown', (e) => {
    const isInputActive = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);

    if (e.key === 'Escape') {
      if (projectModal?.open) closeProjectModal();
      if (terminalModal?.open) closeTerminal();
      return;
    }

    if (isInputActive) return;

    if (e.key === '?' || e.key === '/') {
      e.preventDefault();
      openTerminal();
    } else if (e.key === 't' || e.key === 'T') {
      const nextIndex = (THEMES.indexOf(currentTheme) + 1) % THEMES.length;
      applyTheme(THEMES[nextIndex]);
      showToast(`Theme: ${THEMES[nextIndex].toUpperCase()}`);
    } else if (e.key === '1') {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === '2') {
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === '3') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === '4') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  /* --------------------------------------------------------------------------
     9. Navigation Scroll Highlighting
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => navObserver.observe(sec));
});
