# Satyam - Software Engineer Portfolio

A premium, fully responsive Software Engineer portfolio website built with HTML5, Tailwind CSS, and Vanilla JavaScript.

## Features

- **Dark/Light Mode** — Toggle between themes with persistent preference
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Smooth Animations** — AOS scroll reveals, Typed.js typing effect, counter animations
- **Glassmorphism UI** — Modern glass effects with gradient accents
- **Sticky Navigation** — Active section highlighting, scroll progress indicator
- **Mobile Menu** — Hamburger navigation for smaller screens
- **SEO Optimized** — Meta tags, semantic HTML, accessibility friendly

## Sections

- Hero with profile photo & typing animation
- About Me with statistic cards
- Tech Stack showcase
- Skills (categorized)
- Featured Projects (6 projects)
- Experience timeline
- Education timeline
- Certifications
- GitHub & Coding Profiles
- Achievements with animated counters
- Testimonials
- Contact form
- Footer with quick links

## Tech Stack

- HTML5
- [Tailwind CSS](https://tailwindcss.com/) (CDN)
- Vanilla JavaScript
- [Font Awesome 6](https://fontawesome.com/) (Icons)
- [AOS](https://michalsnik.github.io/aos/) (Animate On Scroll)
- [Typed.js](https://github.com/mattboldt/typed.js/) (Typing animation)

## Project Structure

```
portfolio/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── images/
│   │   ├── profile-photo.jpg
│   │   ├── project1.jpg – project6.jpg
│   │   └── placeholders/
│   └── resume/
│       └── resume.pdf
├── README.md
└── .gitignore
```

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your browser, or serve locally:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .

# Using PHP
php -S localhost:8000
```

3. Visit `http://localhost:8000`

## Customization

### Profile Photo
Replace `assets/images/profile-photo.jpg` with your own photo (recommended: 400×400px, square crop).

### Resume
Replace `assets/resume/resume.pdf` with your actual resume PDF.

### Project Images
Replace `assets/images/project1.jpg` through `project6.jpg` with your project screenshots.

### Personal Information
Edit `index.html` to update:
- Name, tagline, bio
- Contact details (email, location, social links)
- Social profile links
- Project details and links
- Experience, education, certifications

### GitHub Stats
Replace the placeholder sections in the Profiles area with your GitHub stats cards from [github-readme-stats](https://github.com/anuraghazra/github-readme-stats).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal use.

---

Built with passion by **Satyam**
