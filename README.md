# MeFolio - Modern Developer Portfolio 🚀

![MeFolio Banner](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge) ![Tech Stack](https://img.shields.io/badge/Stack-Next.js%2014%20%7C%20Sanity%20%7C%20Tailwind-blue?style=for-the-badge)

**MeFolio** is a high-performance, aesthetically pleasing, and technically robust personal portfolio tailored for Software Engineers, SDETs, and Designers. It bridges the gap between a stunning visual presentation and a headless content management system.

## 🌟 Features

-   **Headless CMS Integration**: Powered by [Sanity.io](https://www.sanity.io/) for real-time content management (Projects, Experience, Education, Skills).
-   **Modern Tech Stack**: Built with **Next.js 14+ (App Router)**, **TypeScript**, and **Tailwind CSS v4**.
-   **Interactive UI**: Smooth animations using **Framer Motion**, **Lenis** (smooth scrolling), and **Shadcn/UI components**.
-   **SEO Optimized**: Dynamic metadata, OpenGraph tags, and semantic HTML structure.
-   **Responsive Design**: Mobile-first approach ensuring a flawless experience across all devices.
-   **Dark Mode**: Native dark mode support with system preference detection.

## 🏗 Architecture & Design Patterns

MeFolio follows a modern **Component-Based Architecture** with a clear separation of concerns, effectively mirroring the **MVC (Model-View-Controller)** pattern:

### System Architecture Diagram

```mermaid
graph TD
    User[End User] -->|HTTPS Request| CDN[Vercel Edge Network]
    CDN -->|Cache Hit| User
    CDN -->|Cache Miss| NextServer[Next.js Server]
    
    subgraph "Controller (The Logic)"
        NextServer -->|Server Components| PageLogic[Page Controllers]
    end
    
    subgraph "Model (The Data)"
        PageLogic -->|GROQ Query| SanityClient[Sanity Client]
        SanityClient -->|Fetch JSON| SanityDB[(Sanity Content Lake)]
    end
    
    subgraph "View (The Presentation)"
        PageLogic -->|Props| ReactComp[React Components]
        ReactComp -->|HTML/CSS/JS| User
    end

    style NextServer fill:#000,stroke:#fff,color:#fff
    style SanityDB fill:#f03e2f,stroke:#fff,color:#fff
```

### Data Flow

1.  **Content Creation**: You update content (Add a new Job, specific Skill, or Project) in the **Sanity Studio** (`/studio`).
2.  **Build/Request Time**: Next.js fetches this data using **GROQ** queries defined in `sanity/lib/queries.ts`.
3.  **Rendering**: The data is passed to **Atomic UI Components** (`components/ui/*`) for rendering.
4.  **Client Hydration**: Client-side interactivity (Framer Motion, 3D elements) is hydrated for the user.

## 🛠 Tech Stack

| Category | Technology | Usage |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) | Core application framework (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type safety and robust code patterns |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling system |
| **CMS** | [Sanity v3](https://www.sanity.io/) | Headless content backend |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Complex UI transitions and layouts |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent and clean SVG icons |
| **Deployment** | [Vercel](https://vercel.com/) | CI/CD, Hosting, and Edge caching |

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+ installed
-   A [Sanity.io](https://www.sanity.io/) account (Free tier is sufficient)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/mefolio.git
    cd mefolio
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables**:
    Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
    NEXT_PUBLIC_SANITY_DATASET="production"
    ```

4.  **Run the Development Server**:
    ```bash
    npm run dev
    ```

5.  **Access the App**:
    -   Frontend: `http://localhost:3000`
    -   Admin Studio: `http://localhost:3000/studio`

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router (Controllers)
│   ├── page.tsx          # Main entry point / Home Controller
│   ├── layout.tsx        # Root layout (Fonts, Metadata)
│   └── studio/           # Sanity Studio route
├── components/           # React Components (Views)
│   ├── ui/               # Reusable atomic components (Buttons, Cards, Inputs)
├── sanity/               # Backend Logic (Models)
│   ├── lib/              # Client configuration & GROQ Queries
│   ├── schemaTypes/      # Content Schema Definitions
│   └── structure.ts      # Desk structure configuration
├── public/               # Static assets (Images, Fonts)
└── styles/               # Global styles (Tailwind config)
```

## 🛡 License

This project is open-source and available under the [MIT License](LICENSE).

---

Designed & Developed with ❤️ by [Sirajul Islam](https://github.com/sirajul-islam)
