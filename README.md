# GOURAB.SEC — Portfolio

Personal portfolio for **Gourab Ghosh**, presenting cybersecurity work, projects, experience, skills, certifications, and contact information in a terminal-inspired interface.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev/)

## Contents

- [Highlights](#highlights)
- [Tech stack](#tech-stack)
- [Run locally](#run-locally)
- [Build and lint](#build-and-lint)
- [Contact form](#contact-form)
- [Project layout](#project-layout)
- [License](#license)

## Highlights

- Responsive portfolio sections for About, Experience, Skills and certifications, Projects, Domains, and Contact.
- Animated terminal-style introduction with optional, user-enabled synthesized sound.
- Mobile navigation and swipeable project and certificate carousels.
- Contact form submissions sent from the site through Formspree, with validation and success/error feedback.
- Resume and portfolio assets served with the site.

## Tech stack

- React 19
- Webpack 5
- Tailwind CSS 4 and project CSS
- Framer Motion
- Formspree React
- React Icons

## Run locally

Install [Node.js](https://nodejs.org/) and npm, then run:

```bash
git clone https://github.com/gourab-0/GOURAB.SEC-portfolio.git
cd GOURAB.SEC-portfolio
npm install
npm run dev -- --host 0.0.0.0 --port 3004
```

Open [http://localhost:3004](http://localhost:3004) on the computer running the server. To preview on a phone, connect it to the same Wi-Fi and open `http://<computer-LAN-IP>:3004` in its browser. Replace `<computer-LAN-IP>` with the computer's local IPv4 address.

## Build and lint

```bash
npm run build
npm run lint
```

The production build is written to `dist/`. The generated folder is ignored by Git; deploy its contents to a static hosting provider when you're ready. No hosting provider is configured by this repository.

## Contact form

The contact form uses Formspree form `mnpdgjdn`. The form ID is public because it is included in the browser bundle; do not put private API keys or credentials in frontend code.

The current form ID is supplied by `webpack.config.js` and can be overridden at build time with `CONTACT_FORM_ID`. For example, in PowerShell:

```powershell
$env:CONTACT_FORM_ID = "your-form-id"
npm run build
```

The recipient email is configured in the Formspree dashboard. Confirm the recipient there and submit a test message after changing forms or recipients. `.env.example` documents the current public form ID; Webpack does not load `.env` files automatically.

## Project layout

```text
src/                 React application and portfolio sections
public/              Static images, project media, and resume assets
images & resume/     Original portfolio assets
webpack.config.js    Development server and production build config
```

## License

This project is distributed under the MIT License. See [LICENSE](LICENSE).
