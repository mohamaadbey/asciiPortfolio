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
      github: 'https://github.com/mohammadhosseini/anbarchi',
      demo: 'https://anbarchi.demo.app',
      asciiIcon: `  .-----------.
  |  [=] [=]  |
  |  |AI|BOX| |
  |  [=] [=]  |
  '-----------'`
    },
    pakmart: {
      id: 'pakmart',
      title: 'PakMart',
      subtitle: 'E-commerce Platform',
      tagline: 'Modern Multi-Vendor Retail & Order Processing System',
      description: 'A robust e-commerce platform built with modular component architecture and responsive user experience. Features dynamic catalog filtering, shopping cart persistence, secure payment workflow, and merchant inventory synchronization.',
      techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      github: 'https://github.com/mohammadhosseini/pakmart',
      demo: 'https://pakmart.demo.app',
      asciiIcon: `  .-----------.
  |  ___/\\___ |
  |  | SHOP | |
  |  |______| |
  |   (o) (o) |
  '-----------'`
    },
    kavich: {
      id: 'kavich',
      title: 'Kavich',
      subtitle: 'Online Menu Platform',
      tagline: 'Interactive Digital Menu & Hospitality Ordering Platform',
      description: 'A responsive digital dining menu engineered for restaurants and cafes. Enables real-time menu item curation, category browsing, multi-language ingredient descriptions, and rapid QR code-based ordering workflows.',
      techStack: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'MySQL'],
      github: 'https://github.com/mohammadhosseini/kavich',
      demo: 'https://kavich.demo.app',
      asciiIcon: `  .-----------.
  |   .---.   |
  |  ( MENU ) |
  |   \\===/   |
  |   _|_|_   |
  '-----------'`
    },
    lms: {
      id: 'lms',
      title: 'LMS',
      subtitle: 'Learning Management System',
      tagline: 'Comprehensive Academic Platform & Course Workflow',
      description: 'A full-stack learning management architecture facilitating student enrollment, interactive module tracking, assignment review pipelines, and instructor assessment tools with strict role-based access control.',
      techStack: ['TypeScript', 'React', 'Next.js', 'PostgreSQL', 'Docker', 'Linux'],
      github: 'https://github.com/mohammadhosseini/lms',
      demo: 'https://lms.demo.app',
      asciiIcon: `  .-----------.
  | .-------. |
  | | >_LMS | |
  | '-------' |
  | [=======] |
  '-----------'`
    }
  };

  /* --------------------------------------------------------------------------
     2. Tactile Audio Feedback (Synthesized via Web Audio API)
     -------------------------------------------------------------------------- */
  let audioCtx = null;
  let isSoundEnabled = localStorage.getItem('ascii_sound_enabled') === 'true';

  const soundToggleBtn = document.getElementById('sound-toggle');
  
  function updateSoundButtonUI() {
    if (soundToggleBtn) {
      soundToggleBtn.innerHTML = `<span class="control-label">[ ${isSoundEnabled ? '🔊 Sound' : '🔈 Mute'} ]</span>`;
    }
  }
  updateSoundButtonUI();

  function playKeyClickSound() {
    if (!isSoundEnabled) return;

    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtx = new AudioContextClass();
        }
      }
      if (!audioCtx || audioCtx.state === 'suspended') {
        audioCtx?.resume();
      }

      // Vintage mechanical keyboard key-click blip
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch {
      // Audio not permitted or supported; silent fail
    }
  }

  soundToggleBtn?.addEventListener('click', () => {
    isSoundEnabled = !isSoundEnabled;
    localStorage.setItem('ascii_sound_enabled', isSoundEnabled);
    updateSoundButtonUI();
    showToast(`Tactile sound: ${isSoundEnabled ? 'ENABLED' : 'MUTED'}`);
    if (isSoundEnabled) {
      playKeyClickSound();
    }
  });

  // Attach click sound to interactive triggers
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button, input');
    if (target) {
      playKeyClickSound();
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
      themeMeta.content = theme === 'paper' ? '#F5F2EB' : (theme === 'dark' ? '#121314' : '#161208');
    }

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      const labels = {
        paper: '[ ☀ Paper ]',
        dark: '[ ☾ Dark ]',
        amber: '[ ⚡ Amber ]'
      };
      themeToggleBtn.innerHTML = `<span class="control-label">${labels[theme] || '[ ☀ Theme ]'}</span>`;
    }
  }

  applyTheme(currentTheme);

  const themeToggleBtn = document.getElementById('theme-toggle');
  themeToggleBtn?.addEventListener('click', () => {
    const nextIndex = (THEMES.indexOf(currentTheme) + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex];
    applyTheme(nextTheme);
    showToast(`Theme changed to: ${nextTheme.toUpperCase()}`);
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
  const cmdToggleBtn = document.getElementById('cmd-toggle');
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
  cmdToggleBtn?.addEventListener('click', openTerminal);
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
        appendCliOutput('  projects          - list and explore featured projects');
        appendCliOutput('  project <name>    - inspect a specific project (pakmart, kavich, anbarchi, lms)');
        appendCliOutput('  skills            - show technical stack summary');
        appendCliOutput('  about             - view developer background');
        appendCliOutput('  contact           - display contact and profile links');
        appendCliOutput('  theme [theme]     - view or switch theme (paper, dark, amber)');
        appendCliOutput('  sound [on|off]    - toggle mechanical audio clicks');
        appendCliOutput('  cat               - summon ASCII feline companion');
        appendCliOutput('  whoami            - display active identity');
        appendCliOutput('  clear             - clear terminal buffer');
        appendCliOutput('  exit / quit       - close this terminal');
        break;

      case 'projects':
        appendCliOutput('Featured Projects:');
        appendCliOutput('  1. PakMart   - E-commerce Platform [Full-Stack]');
        appendCliOutput('  2. Kavich    - Online Menu Platform [Web App]');
        appendCliOutput('  3. Anbarchi  - Inventory Management [AI / Full-Stack]');
        appendCliOutput('  4. LMS       - Learning Management System [Full-Stack]');
        appendCliOutput("Type 'project <name>' or click [ View Project ] on the page to view architecture.");
        break;

      case 'project':
        if (!args[0]) {
          appendCliOutput("Usage: project <pakmart|kavich|anbarchi|lms>");
        } else {
          const target = args[0].toLowerCase();
          if (PROJECTS_DATA[target]) {
            closeTerminal();
            openProjectModal(target);
          } else {
            appendCliOutput(`Project '${args[0]}' not found. Available: pakmart, kavich, anbarchi, lms`);
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
        appendCliOutput("Passionate about building scalable web applications with clean architecture and Unix philosophy.");
        break;

      case 'contact':
        appendCliOutput(`Email:    ${DEV_EMAIL}`);
        appendCliOutput('GitHub:   https://github.com/mohammadhosseini');
        appendCliOutput('LinkedIn: https://linkedin.com/in/mohammadhosseini');
        appendCliOutput('Telegram: https://t.me/mohammadhosseini');
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
          playKeyClickSound();
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
        appendCliOutput(`    /\\_/\\\n   ( o.o )   *purr*\n    > ^ <    Keep building...\n   /     \\\n  (       )\n  (  " "  )`);
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

      case 'sudo':
        appendCliOutput("mohammad is not in the sudoers file. This incident will be reported.");
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
    // If user is actively typing in a form input, skip shortcuts unless Esc
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
