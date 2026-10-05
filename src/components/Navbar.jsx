import React, { useState } from 'react';
import { 
  Cloud, 
  MessageSquareText, 
  Map, 
  Boxes, 
  HelpCircle, 
  Code2, 
  Briefcase, 
  FolderGit2, 
  BarChart3, 
  Moon, 
  Sun, 
  Languages, 
  Menu, 
  X,
  Settings,
  Database
} from 'lucide-react';
import { isSupabaseConfigured } from '../services/supabaseClient';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  theme, 
  toggleTheme, 
  language, 
  toggleLanguage,
  openSettings
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const supabaseConnected = isSupabaseConfigured();

  const navItems = [
    { id: 'home', label: 'Home', tamilLabel: 'முகப்பு', icon: Cloud },
    { id: 'chat', label: 'AI Chatbot', tamilLabel: 'AI சாட்பாட்', icon: MessageSquareText },
    { id: 'roadmap', label: 'Roadmap', tamilLabel: 'ரோடுமேப்', icon: Map },
    { id: 'services', label: 'AWS Services', tamilLabel: 'AWS சேவைகள்', icon: Boxes },
    { id: 'quiz', label: 'Quiz', tamilLabel: 'வினாடி வினா', icon: HelpCircle },
    { id: 'practice', label: 'Practice', tamilLabel: 'பயிற்சி', icon: Code2 },
    { id: 'interview', label: 'Interview Prep', tamilLabel: 'நேர்காணல்', icon: Briefcase },
    { id: 'projects', label: 'Projects', tamilLabel: 'திட்டங்கள்', icon: FolderGit2 },
    { id: 'dashboard', label: 'Dashboard', tamilLabel: 'டாஷ்போர்டு', icon: BarChart3 },
  ];

  const handleNavClick = (id) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="navbar">
        <div className="nav-brand" onClick={() => handleNavClick('home')}>
          <div className="brand-icon-wrapper">
            <Cloud size={24} strokeWidth={2.2} />
          </div>
          <div className="brand-text">
            <div className="brand-title">
              CloudMentor <span className="brand-badge">AI</span>
            </div>
            <div className="brand-subtitle">
              {language === 'Tamil' ? 'AWS & கிளவுட் கற்றல் வழிகாட்டி' : 'Cloud & AWS Learning Assistant'}
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <li key={item.id}>
                <button
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <Icon size={16} />
                  <span>{language === 'Tamil' ? item.tamilLabel : item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Global Action Controls */}
        <div className="nav-actions">
          {/* Language Toggle */}
          <button 
            className="lang-toggle-btn" 
            onClick={toggleLanguage}
            title={language === 'English' ? 'Switch to Tamil' : 'Switch to English'}
          >
            <Languages size={15} />
            <span>{language === 'English' ? 'தமிழ்' : 'English'}</span>
          </button>

          {/* Theme Toggle */}
          <button 
            className="btn-icon" 
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Database / Settings */}
          <button 
            className="btn-icon" 
            onClick={openSettings}
            title={supabaseConnected ? 'Supabase Connected' : 'Settings & Cloud Database'}
            style={supabaseConnected ? { borderColor: 'var(--accent-emerald)', color: 'var(--accent-emerald)' } : {}}
          >
            {supabaseConnected ? <Database size={17} /> : <Settings size={17} />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button 
            className="btn-icon mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              style={{ width: '100%', justifyContent: 'flex-start' }}
              onClick={() => handleNavClick(item.id)}
            >
              <Icon size={18} />
              <span>{language === 'Tamil' ? item.tamilLabel : item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
