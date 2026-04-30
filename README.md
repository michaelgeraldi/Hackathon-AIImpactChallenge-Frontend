# Keroyok.AI Frontend

A modern project management platform providing a comprehensive dashboard for project tracking, task management, and team collaboration.

## 🎯 Project Overview

Keroyokin is a full-featured project management application designed for two primary user roles:

- **Clients**: Project owners who can manage projects, track progress, and provide feedback with the help of AI.
- **Talent/Workers**: Freelancers and professionals who complete tasks and receive performance feedback from AI.

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.js                # Root layout with providers
│   ├── page.js                  # Login page
│   ├── _components/             # Shared components
│   │   ├── CustomButton.js
│   │   ├── CustomCard.js
│   │   ├── CustomTextField.js
│   │   ├── CustomBarChart.js
│   │   ├── CustomDonutChart.js
│   │   ├── KanbanBoard.js
│   │   ├── NavigationBar.js
│   │   └── ...more components
│   ├── _providers/              # Context providers
│   │   ├── FeedbackProvider.js  # Snackbar notifications
│   │   └── ProgressIndicatorProvider.js  # Progress tracking
│   ├── _hooks/                  # Custom React hooks
│   │   ├── useProject.js        # Project data fetching
│   │   └── useMutation.js       # Data mutation handling
│   ├── home/                    # Home pages
│   │   ├── client/              # Client home page
│   │   └── talent/              # Worker home page
│   ├── dashboard/               # Dashboard pages
│   │   ├── client/              # Client dashboard
│   │   └── talent/              # Worker dashboard
│   └── lib/                     # Utilities
│       └── api.js              # API configuration
├── hooks/                       # Additional custom hooks
└── theme/
    └── theme.js                # Material-UI theme configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm installed
- Modern web browser

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd keroyokin-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables (if needed):

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication

### Demo Credentials

The application includes a demo login system for testing:

- **Email**: `user1@email.com`
- **Password**: `kirjau123`

You can log in as either a **Client** or **Talent** user to test different features.

## 📚 Available Pages

### Client Routes

- `/` - Login page
- `/home/client` - Client home page with projects
- `/dashboard/client` - Client dashboard and project overview

### Worker Routes

- `/home/talent` - Talent home page with assigned projects
- `/dashboard/talent` - Talent dashboard with performance metrics

---

**Built with ❤️ for the Dicoding Hackathon**
