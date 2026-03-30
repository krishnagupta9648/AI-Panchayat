# 🏛️ AI Panchayat — The Digital Referee for Housing Societies

**AI Panchayat** is a high-fidelity, multi-tenant SaaS platform designed to modernize the management of residential housing societies in India. It acts as an automated "referee," using artificial intelligence to settle disputes, manage maintenance, and provide a seamless communication layer between the RWA (Residents' Welfare Association) and the community.

---

## 🚀 The Vision
Managing a housing society involves endless WhatsApp chaos, manual maintenance tracking, and heated debates over bylaws. **AI Panchayat** solves this by:
1.  **AI-Powered Dispute Resolution**: A "Drama Filter" that turns 500+ chaotic WhatsApp messages into a 3-sentence actionable summary.
2.  **Voice-to-Ticket**: Letting residents speak their complaints (no typing required), which our AI automatically categorizes and assigns.
3.  **Digital Bylaw Assistant**: A chatbot that knows the society's specific legal rulebook and answers resident queries instantly.
4.  **Premium Experience**: A UI designed for the next generation of smart societies, emphasizing simplicity and luxury.

---

## 🎨 Premium UI/UX Design System
This project follows a strict **60-30-10 Design Architecture** to ensure it feels like a "World-Class Product":
-   **60% Base (Foundations)**: Utilizes a luxurious **Slate-50** canvas for soft aesthetics and reduced eye strain.
-   **30% Core (Structure)**: Employs **Glassmorphism** for headers and sidebars, featuring `backdrop-blur` and deep "Apple-like" soft shadows.
-   **10% Accent (Call to Action)**: Primary interactive elements use a vibrant **Violet-to-Indigo Glowing Gradient** to guide user behavior.
-   **Typography**: Powered by **Plus Jakarta Sans**, a modern sans-serif font that gives the platform a polished tech-startup vibe.

---

## 🛠️ Technological Architecture
The project is built as a **Monorepo** using industry-standard modern stacks:

### Frontend
-   **React + Vite**: For ultra-fast, blazingly high-performance UI rendering.
-   **Framer Motion**: For buttery-smooth micro-animations and layout transitions.
-   **Tailwind CSS**: For a custom, utility-first design system.
-   **Lucide React**: For a consistent, high-end iconography set.

### Backend
-   **Next.js (App Router)**: Handling API routes, serverless functions, and SEO.
-   **MongoDB (Mongoose)**: A flexible NoSQL database schema for multi-tenant isolation.
-   **OpenAI / Gemini Integration**: The engine behind the Drama Filter, Bylaw Bot, and Voice-to-Ticket features.
-   **Multi-Tenancy**: Built-in `societyCode` isolation, allowing thousands of societies to run on the same platform securely.

---

## ✨ Key Features 
-   **Voice-to-Ticket Processing**: Implemented audio recording and AI transcription to convert natural speech into formatted maintenance tickets.
-   **The Drama Filter**: Uses Large Language Models (LLMs) to summarize chaotic group chats into factual updates. Gain clarity in 10 seconds.
-   **Maintenance Arrears Dashboard**: A high-impact visualization for admins to track society finances and collection rates in real-time.
-   **Self-Service Onboarding**: A 2-step registration wizard for RWA managers to create their digital society in under 60 seconds.

---

## 📦 Installation & Deployment
1.  **Clone the Repo**: `git clone https://github.com/krishnagupta9648/AI-Panchayat.git`
2.  **Frontend**: `cd client && npm install && npm run dev`
3.  **Backend**: `cd server && npm install && npm run dev`
4.  **Environment**: Add your `MONGODB_URI` and `GEMINI_API_KEY` to the `.env` file in the server directory.

---

