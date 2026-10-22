# Mohammad Hosseini — ASCII Developer Portfolio

A distinctive, text-based personal developer portfolio crafted for **Mohammad Hosseini**, built with pure **HTML5**, **CSS3**, and **vanilla JavaScript**. 

Designed with an authentic Unix terminal and warm-paper aesthetic (`sample.png`), featuring custom ASCII art, responsive typography, interactive terminal emulation, and zero external build frameworks or runtime dependencies.

---

## ✦ Design Philosophy

- **Authentic ASCII Art**: Handcrafted text-based graphics using monospace typography and native `<pre>` blocks, fully selectable, scalable, and searchable.
- **Warm Paper & Terminal Aesthetics**: Default warm parchment theme (`#F5F2EB`) paired with crisp charcoal typography, subtle dashed borders, and retro prompt semantics.
- **Distinguished Geek Culture**: Balances terminal precision and playful technical details (ASCII mountain landscape, feline mascot, terminal meters, command-line interface) without generic developer clichés.
- **Zero Dependencies**: Pure HTML5, CSS3, and vanilla JavaScript. Deploys statically directly to GitHub Pages or any static web host.

---

## ✦ Project Structure

```
ascii-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml      # Automated GitHub Pages CI/CD workflow
├── .nojekyll               # Ensures GitHub Pages serves all assets directly
├── favicon.svg             # Terminal prompt ASCII favicon
├── index.html              # Semantic HTML5 single-page structure
├── style.css               # CSS custom properties, grid/flex, responsive ASCII styling
├── script.js               # Modal inspector, CLI prompt, themes, sound synthesis
├── sample.png              # Design reference image
└── README.md               # Documentation and deployment guide
```

---

## ✦ Featured Sections

1. **Introduction (`#home`)**:
   - Pixel/block ASCII name header (`MOHAMMAD HOSSEINI`).
   - Terminal prompt `>_` and concise professional positioning: **Software Developer** focused on clean architecture and modern web applications.
   - Handcrafted ASCII mountain landscape with celestial moon and evergreen pine forest.
   - Quick bracket navigation links.

2. **Featured Projects (`#projects`)**:
   - Distinctive cards for 4 known projects:
     - **PakMart** — E-commerce Platform [Full-Stack]
     - **Kavich** — Online Menu Platform [Web App]
     - **Anbarchi** — Inventory Management [AI / Full-Stack]
     - **LMS** — Learning Management System [Full-Stack]
   - Interactive `[ View Project ]` button opening an ASCII-framed project inspector dialog with full architecture details, tech stack pills, and single-click `git clone` copying.

3. **Tech Stack & Skills (`#skills`)**:
   - Categorized directory tree: Frontend, Backend, Database, DevOps.
   - Terminal box `> skills --list` with ASCII progress meters and ASCII cat mascot with the "Keep building..." motto.

4. **About Me (`#about`)**:
   - Professional background: Computer Science graduate from **Golestan University**.
   - Focus on full-stack web applications, clean code, Unix philosophy, and scalable systems.
   - Framed `</>` "Better Code Better Tomorrow" ASCII badge.

5. **Footer & Contact (`#contact`)**:
   - Interactive CLI prompt `mohammad@portfolio:~$ ▋`.
   - Links to GitHub, LinkedIn, Telegram, and single-click Email copy.

---

## ✦ Interactive Features

- **Tactile Keypress Audio (Web Audio API)**:
  - Subtitly synthesized 40ms mechanical keyboard click on user interactions.
  - Zero external sound files required. Muted by default; toggle anytime with `[ 🔈 / 🔊 ]` or CLI command `sound on`.
- **Theme Switcher**:
  - Cycle between **Paper** (default warm cream), **Dark** (midnight console), and **Amber** (retro amber CRT).
  - Persisted across page visits in `localStorage`.
- **Interactive Terminal Shell (`portfolio-shell`)**:
  - Click `mohammad@portfolio:~$` or press `?` / `/` to open.
  - Commands supported:
    - `help`: List commands
    - `projects`: Summary of projects
    - `project <name>`: Open project inspector modal
    - `skills`: Tech stack summary
    - `about`: Background bio
    - `contact`: Social handles & email
    - `theme [paper|dark|amber]`: Switch themes
    - `sound [on|off]`: Toggle tactile sound
    - `cat`: Display ASCII feline mascot
    - `whoami`: User identity
    - `clear`: Clear buffer
    - `exit`: Close terminal
- **Keyboard Shortcuts**:
  - `1`: Jump to Projects
  - `2`: Jump to Skills
  - `3`: Jump to About
  - `4`: Jump to Contact
  - `t`: Cycle Theme
  - `?` or `/`: Open Terminal CLI
  - `Esc`: Close any open dialog

---

## ✦ Local Development

Because this is a pure static website with zero dependencies, you can run it locally with any simple HTTP server:

### Option 1: Python 3
```bash
cd ascii-portfolio
python3 -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

### Option 2: Node.js (`npx serve`)
```bash
cd ascii-portfolio
npx serve .
```

### Option 3: Direct File Access
Simply double-click `index.html` to open it directly in Chrome, Firefox, Safari, or Edge. All asset links are strictly relative.

---

## ✦ GitHub Pages Deployment

The repository is pre-configured for GitHub Pages deployment.

### Method 1: Automated GitHub Actions (Recommended)
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Mohammad Hosseini ASCII Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ascii-portfolio.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
   - The included workflow `.github/workflows/deploy.yml` will automatically build and publish your site whenever you push to `main`.

### Method 2: Classic Branch Deployment
1. Push your repository to `main`.
2. In **Settings** > **Pages**:
   - Under **Source**, choose **Deploy from a branch**.
   - Select branch `main` and folder `/ (root)`.
   - Click **Save**.
   - Your site will be live at `https://<your-username>.github.io/<repository-name>/`.

---

## ✦ Personalization & Configuration

All developer details and project configurations are centralized and simple to update:

- **Personal Information**: Edit name, bio, and university details in `index.html`.
- **Contact Handles**: Update social links and email address in `index.html` and `DEV_EMAIL` in `script.js`.
- **Projects**: Update or add projects inside `PROJECTS_DATA` in `script.js` and the corresponding `<article class="project-card">` elements in `index.html`.
- **Skills**: Adjust percentages and categories in `index.html` under the `#skills` section.

---

## ✦ Accessibility & Compatibility

- **WCAG AAA Contrast**: Deep charcoal `#1C1B1A` on warm paper `#F5F2EB` guarantees > 12:1 contrast ratio.
- **Responsive Layout**: Designed to adapt from wide 4K screens down to 320px mobile viewports without horizontal page overflow.
- **`prefers-reduced-motion`**: Respects OS motion sensitivity by instantly disabling transitions and cursor blinks.
- **Semantic HTML5**: Full ARIA landmark roles, semantic heading hierarchy, and keyboard focus outlines.
