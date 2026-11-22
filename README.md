<div align="center">

# GOURAB.SEC

### Cybersecurity · Engineering · Building

**The portfolio of Gourab Ghosh** — a terminal-inspired showcase of security work, projects, and learning.

[![MIT License](https://img.shields.io/badge/License-MIT-20C997?style=for-the-badge)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Webpack 5](https://img.shields.io/badge/Webpack-5-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black)](https://webpack.js.org/)
[![Formspree](https://img.shields.io/badge/Contact-Formspree-E84A5F?style=for-the-badge)](https://formspree.io/)

[Explore the repository](https://github.com/gourab-0/GOURAB.SEC-portfolio) · [Contact Gourab](mailto:gourabghosh828@gmail.com)

</div>

---

## Inside the portfolio

| Focus | What you'll find |
| --- | --- |
| **Security** | Cybersecurity domains, experience, skills, certifications, and hands-on work |
| **Projects** | Selected builds presented with descriptions, tools, and project links |
| **Interaction** | Animated terminal intro, optional synthesized sound, and responsive navigation |
| **Contact** | A website form that sends messages through Formspree, with validation and delivery feedback |

The visual direction pairs a dark interface with restrained crimson and cyan accents, terminal details, and motion. On phones, the navigation stays in the viewport and project and certificate cards can be swiped horizontally.

## Built with

<p>
  <img alt="React" src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" />
  <img alt="Webpack" src="https://img.shields.io/badge/Webpack-5-8DD6F9?logo=webpack&logoColor=black" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white" />
  <img alt="Formspree" src="https://img.shields.io/badge/Formspree-React-E84A5F" />
</p>

## Get started

You'll need [Node.js](https://nodejs.org/) and npm.

```bash
git clone https://github.com/gourab-0/GOURAB.SEC-portfolio.git
cd GOURAB.SEC-portfolio
npm ci
npm run dev -- --host 0.0.0.0 --port 3004
```

Open [http://localhost:3004](http://localhost:3004) on the computer running the server. To preview on a phone, connect it to the same Wi-Fi and open `http://<computer-LAN-IP>:3004` using the computer's local IPv4 address.

## Build and quality checks

```bash
npm run build
npm run lint
```

Webpack writes the production site to `dist/`, and `vercel.json` tells Vercel to serve that build output. The generated folder is excluded from Git.

## Contact form setup

The site submits messages directly to Formspree form `mnpdgjdn`; visitors don't need to open an email app. The form ID is public because it is embedded in the browser bundle. **Never put private API keys or credentials in frontend code.**

To use another form, set `CONTACT_FORM_ID` before building. In PowerShell:

```powershell
$env:CONTACT_FORM_ID = "your-form-id"
npm run build
```

Set the recipient address in the Formspree dashboard and send a test submission after changing the form or recipient. `.env.example` documents the current public form ID. Webpack does not load `.env` files automatically.

## Project map

```text
src/                 React app, page sections, and interactions
public/              Images, project media, and resume assets
images & resume/     Original portfolio assets
webpack.config.js    Development server and production build config
```

## Connect

<div align="center">

[GitHub](https://github.com/gourab-0) · [LinkedIn](https://linkedin.com/in/gourabghosh-zecuron) · [Email](mailto:gourabghosh828@gmail.com)

**Made by Gourab Ghosh**

[Back to top](#gourabsec)

</div>

## License

Distributed under the MIT License. See [LICENSE](LICENSE).
