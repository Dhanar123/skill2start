#  Skill2Start: Empowering Next-Gen Entrepreneurs

![Skill2Start Banner](https://img.shields.io/badge/Skill2Start-AI--Powered-blueviolet?style=for-the-badge&logo=rocket)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-Framework-009688?style=for-the-badge&logo=fastapi)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)
![Gemini](https://img.shields.io/badge/Google_GenAI-Gemini_1.5-4285F4?style=for-the-badge&logo=google-cloud)

**Skill2Start** is a cutting-edge, AI-driven platform designed to bridge the gap between skill acquisition and entrepreneurial success. By leveraging modern AI and a robust cloud infrastructure, we provide aspiring founders with the tools, community, and guidance they need to launch their ventures.

---

##  Key Features

- ** AI Strategy Assistant**: Powered by **Google Gemini 1.5 Flash**, get instant, intelligent answers to your business and technical questions.
- ** Entrepreneurship Hub**: 
  - Register as an entrepreneur and showcase your profile.
  - Apply for internships in diverse sectors.
  - Access a curated list of funding opportunities and venture funds.
- ** Community Engines**: Create and join niche communities to collaborate with like-minded individuals.
- ** Curated Intelligence**: Explore domain-specific content across various sectors, from tech to social impact.
- ** Personalized Experience**: Log views, bookmark essential posts, and track your learning journey.
- ** Enterprise-Grade Security**: Full JWT-based authentication powered by Supabase Auth with custom role management.

---

## Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Backend Communication**: Supabase JS Client

### Backend
- **Engine**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **AI Core**: [Google GenAI (Gemini)](https://ai.google.dev/)
- **Database Wrapper**: Supabase Python Client
- **Validation**: Pydantic

### Infrastructure & DevOps
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Deployment**: Firebase Hosting (Frontend) & Scalable Python Environment (Backend)
- **Auth**: Supabase Auth (JWT)

---

##  Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- Supabase Account & Project
- Google AI (Gemini) API Key

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Configure environment variables in `.env`:
   ```env
   GEMINI_API_KEY=your_gemini_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_service_role_key
   ```
4. Start the server:
   ```bash
   python main.py
   ```

### Frontend Setup
1. Navigate to the root directory:
   ```bash
   cd ..
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_API_BASE_URL=http://127.0.0.1:5050
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

---

##  Security Architecture

Skill2Start implements a multi-layered security approach:
- **JWT Verification**: Every backend request is verified using Supabase's identity tokens.
- **Origin Control**: CORS protection ensures only authorized frontend applications can communicate with the API.
- **Data Isolation**: User-specific data (bookmarks, views, applications) is strictly partitioned based on authenticated IDs.

---

##  Contributing

We welcome contributions! Please feel free to submit Pull Requests or open Issues to improve the platform.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


##  License

This project is licensed under the **ISC License**. See the `package.json` for details.

