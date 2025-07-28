# Chrono Locus - Pomodoro Time Tracker

A modern time tracking application that implements the Pomodoro Technique to help foster deep work sessions and boost productivity.

## 🍅 About the Pomodoro Technique

The Pomodoro Technique is a time management method that uses focused work intervals (traditionally 25 minutes) separated by short breaks. This application helps you:

- **Focus deeply** during work sessions
- **Take regular breaks** to maintain mental freshness
- **Track your productivity** over time
- **Build consistent work habits**

## ✨ Features

- ⏰ Customizable timer intervals
- 🔔 Audio notifications for session transitions
- 📊 Session tracking and statistics
- 🎯 Clean, distraction-free interface
- 📱 Responsive design for desktop and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/chrono-locus-main.git
cd chrono-locus-main
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run dev:server` - Start the backend server
- `npm run dev:full` - Run both frontend and backend simultaneously
- `npm run lint` - Run ESLint

## 🏗️ Tech Stack

**Frontend:**

- React 19 with modern hooks
- Vite for fast development and building
- Tailwind CSS for styling
- ESLint for code quality

**Backend:**

- Express.js server
- Supabase integration (planned)
- RESTful API design

**Deployment:**

- Vercel (frontend)
- Serverless functions for API

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── App.jsx             # Main application component
└── main.jsx            # Application entry point

api/                    # Serverless API functions
server.js              # Express server for development
```

## 🎯 Roadmap

- [ ] Complete timer functionality
- [ ] Add session statistics
- [ ] Implement user authentication
- [ ] Add sound notifications
- [ ] Create productivity analytics
- [ ] Mobile app version

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Francesco Cirillo's Pomodoro Technique
- Built with modern web technologies for optimal performance
