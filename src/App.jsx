import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SettingsModal from './components/SettingsModal';
import HomeView from './views/HomeView';
import ChatbotView from './views/ChatbotView';
import RoadmapView from './views/RoadmapView';
import ServicesView from './views/ServicesView';
import QuizView from './views/QuizView';
import PracticeView from './views/PracticeView';
import InterviewView from './views/InterviewView';
import ProjectsView from './views/ProjectsView';
import DashboardView from './views/DashboardView';
import { Cloud, Sparkles } from 'lucide-react';
import './App.css';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [language, setLanguage] = useState(() => localStorage.getItem('cloudmentor_lang') || 'English');
  const [theme, setTheme] = useState(() => localStorage.getItem('cloudmentor_theme') || 'dark');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [initialChatQuery, setInitialChatQuery] = useState('');

  // Sync theme attribute to HTML tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cloudmentor_theme', theme);
  }, [theme]);

  // Sync language
  useEffect(() => {
    localStorage.setItem('cloudmentor_lang', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'English' ? 'Tamil' : 'English'));
  };

  // Render current tab content
  const renderCurrentView = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HomeView
            setCurrentTab={setCurrentTab}
            language={language}
            setInitialChatQuery={setInitialChatQuery}
          />
        );
      case 'chat':
        return (
          <ChatbotView
            initialQuery={initialChatQuery}
            language={language}
            setLanguage={setLanguage}
          />
        );
      case 'roadmap':
        return (
          <RoadmapView
            language={language}
            setCurrentTab={setCurrentTab}
            setInitialChatQuery={setInitialChatQuery}
          />
        );
      case 'services':
        return (
          <ServicesView
            language={language}
            setCurrentTab={setCurrentTab}
            setInitialChatQuery={setInitialChatQuery}
          />
        );
      case 'quiz':
        return (
          <QuizView
            language={language}
            setCurrentTab={setCurrentTab}
          />
        );
      case 'practice':
        return (
          <PracticeView
            language={language}
            setCurrentTab={setCurrentTab}
            setInitialChatQuery={setInitialChatQuery}
          />
        );
      case 'interview':
        return (
          <InterviewView
            language={language}
            setCurrentTab={setCurrentTab}
            setInitialChatQuery={setInitialChatQuery}
          />
        );
      case 'projects':
        return (
          <ProjectsView
            language={language}
            setCurrentTab={setCurrentTab}
            setInitialChatQuery={setInitialChatQuery}
          />
        );
      case 'dashboard':
        return (
          <DashboardView
            language={language}
            setCurrentTab={setCurrentTab}
            setInitialChatQuery={setInitialChatQuery}
          />
        );
      default:
        return <HomeView setCurrentTab={setCurrentTab} language={language} setInitialChatQuery={setInitialChatQuery} />;
    }
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        theme={theme}
        toggleTheme={toggleTheme}
        language={language}
        toggleLanguage={toggleLanguage}
        openSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main View Body */}
      <main className="main-content">
        {renderCurrentView()}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        language={language}
      />

      {/* Global Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '6px',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF'
              }}>
                <Cloud size={16} />
              </div>
              <span>CloudMentor AI</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: '420px', lineHeight: 1.5 }}>
              {language === 'Tamil'
                ? 'மாணவர்கள் மற்றும் தொடக்கநிலையாளர்களுக்கு கிளவுட் கம்ப்யூட்டிங் மற்றும் Amazon Web Services (AWS) கற்பிக்கும் ஊடாடும் AI வழிகாட்டி.'
                : 'Interactive AI-powered cloud computing and Amazon Web Services (AWS) learning platform for engineering students and beginners.'}
            </p>
          </div>

          <div className="footer-links">
            <span className="footer-link" onClick={() => setCurrentTab('roadmap')}>Roadmap</span>
            <span className="footer-link" onClick={() => setCurrentTab('services')}>AWS Services</span>
            <span className="footer-link" onClick={() => setCurrentTab('quiz')}>Quiz Module</span>
            <span className="footer-link" onClick={() => setCurrentTab('interview')}>Interview Prep</span>
            <span className="footer-link" onClick={() => setCurrentTab('projects')}>Projects</span>
            <span className="footer-link" onClick={() => setIsSettingsOpen(true)}>Supabase Cloud</span>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textAlign: 'right' }}>
            Built with React, Supabase & AWS Architecture Insights
            <br />
            © {new Date().getFullYear()} CloudMentor AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
