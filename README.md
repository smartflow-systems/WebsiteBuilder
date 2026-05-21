# WebsiteBuilder

> A visual website builder for service businesses — compose branded landing pages from pre-built sections without writing code.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-FFD700?style=for-the-badge&logo=replit&logoColor=black)](https://websitebuilder.replit.app)
[![SmartFlow Systems](https://img.shields.io/badge/SmartFlow-Systems-0a0a0a?style=for-the-badge)](https://github.com/smartflow-systems)

---

## What It Does

WebsiteBuilder is a drag-and-drop page composition tool that allows service businesses to assemble professional landing pages from pre-built sections — Hero, Features, Navbar, and CTA components. The live server hosts static content and captures visitor leads. A React + Vite builder interface (source in `src/components/Builder/`: Canvas, ComponentLibrary, Hero, Features, Navbar, CTA components) is included in the codebase as the intended production frontend; it requires a Vite build step to be deployed.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | JavaScript (runtime server) / TypeScript + React (builder frontend in development) |
| Runtime | Node.js 18+ |
| Framework | Express.js |
| Frontend | Static HTML/CSS/JS (served from `/public`); React + Vite builder (source in `src/`, requires build) |
| Database / Storage | JSON flat-files for lead capture (`data/leads.json`) |
| Key packages | express, dotenv, stripe, axios; React, Vite, Tailwind CSS (builder frontend) |

---

## How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/smartflow-systems/WebsiteBuilder.git
cd WebsiteBuilder

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

The app will be available at `http://localhost:5000`.

> No `.env.example` is provided. Set the optional environment variables below directly in a `.env` file.

---

## Environment Variables

| Variable | Required | Description | Example |
|---|---|---|---|
| `PORT` | No | Port the server listens on | `5000` |
| `STRIPE_SECRET_KEY` | No | Stripe secret key (enables the checkout endpoint) | `sk_test_abc123` |

---

## API Endpoints

The live `server.js` runtime exposes the following endpoints:

| Method | Route | Auth required | Description |
|---|---|---|---|
| `GET` | `/health` | No | Health check with site name and version |
| `GET` | `/api/health` | No | Health check (API path) |
| `POST` | `/api/leads` | No | Capture a visitor lead (firstName, lastName, email, company, phone, source) |
| `GET` | `/api/leads` | No | List all captured leads |
| `POST` | `/api/stripe/checkout` | No | Stripe checkout — currently a placeholder (returns a contact redirect) |

---

## How It Connects to SmartFlow Systems

- **Main hub** — [`smartflow-systems/SmartFlowSite`](https://github.com/smartflow-systems/SmartFlowSite) links to this repo's live demo from the product cards on the homepage.
- **Design system** — follows the SFS design system (gold `#FFD700` on dark `#0a0a0a`). See [`sfs-claude-skills`](https://github.com/smartflow-systems/sfs-claude-skills) for the full token reference. The builder component library ships with Hero, Features, Navbar, and CTA blocks pre-styled to SFS brand standards.
- **Stripe** — Checkout endpoint is a placeholder in the current `server.js`; full Stripe integration is planned.
- **Other integrations** — None.

---

## Live Demo

**https://websitebuilder.replit.app** — Visual page builder with lead capture and Stripe checkout.

---

## Design System

This repo follows the SmartFlow Systems design system.

- Brand colours: Gold `#FFD700` on dark background `#0a0a0a`
- Typography: Inter (headings), system-ui (body)
- Full token reference and component rules: [`sfs-claude-skills/sfs-design-system/SKILL.md`](https://github.com/smartflow-systems/sfs-claude-skills/blob/main/sfs-design-system/SKILL.md)

---

## Contact

| | |
|---|---|
| Sales enquiries | [sales@smartflowsystems.com](mailto:sales@smartflowsystems.com) |
| Book a demo | [calendly.com/boweazy123](https://calendly.com/boweazy123) |

---

## Part of the SmartFlow Systems Suite

SmartFlow Systems builds automation tools for modern businesses — booking, CRM, e-commerce, AI bots, analytics, and more.

| | |
|---|---|
| Website | [smartflowsystems.replit.app](https://smartflowsystems.replit.app) |
| All repos | [github.com/smartflow-systems](https://github.com/smartflow-systems) |

---

*Built by SmartFlow Systems.*
