import React, { useState, useEffect } from 'react';
import { X, Database, Key, CheckCircle, RefreshCw, Trash2, ShieldCheck, Sparkles } from 'lucide-react';
import { updateSupabaseCredentials, isSupabaseConfigured, clearChatHistory } from '../services/supabaseClient';

export default function SettingsModal({ isOpen, onClose, language }) {
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setSupabaseUrl(localStorage.getItem('cloudmentor_supabase_url') || '');
      setSupabaseKey(localStorage.getItem('cloudmentor_supabase_anon_key') || '');
      setGeminiApiKey(localStorage.getItem('cloudmentor_gemini_api_key') || '');
      setConnectionStatus(isSupabaseConfigured() ? 'connected' : 'offline');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (supabaseUrl && supabaseKey) {
      updateSupabaseCredentials(supabaseUrl, supabaseKey);
      setConnectionStatus('connected');
    } else {
      updateSupabaseCredentials('', '');
      setConnectionStatus('offline');
    }

    if (geminiApiKey) {
      localStorage.setItem('cloudmentor_gemini_api_key', geminiApiKey);
    } else {
      localStorage.removeItem('cloudmentor_gemini_api_key');
    }

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2000);
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all quiz scores, roadmap progress, and chat history?')) {
      localStorage.removeItem('cloudmentor_roadmap_progress');
      localStorage.removeItem('cloudmentor_completed_services');
      localStorage.removeItem('cloudmentor_quiz_history');
      clearChatHistory();
      window.location.reload();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(5, 9, 20, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="glass-card" style={{
        maxWidth: '560px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-hover)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)'
            }}>
              <Database size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                {language === 'Tamil' ? 'அமைப்புகள் & கிளவுட் டேட்டாபேஸ்' : 'Settings & Cloud Database'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {language === 'Tamil' ? 'Supabase டேட்டாபேஸ் & AI அமைப்புகள்' : 'Configure Supabase & Optional Live AI Models'}
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Connection status banner */}
        <div style={{
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.25rem',
          background: connectionStatus === 'connected' ? 'var(--accent-emerald-light)' : 'var(--bg-elevated)',
          border: `1px solid ${connectionStatus === 'connected' ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-subtle)'}`,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontSize: '0.85rem'
        }}>
          {connectionStatus === 'connected' ? (
            <>
              <CheckCircle size={16} color="var(--accent-emerald)" />
              <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
                {language === 'Tamil' ? 'Supabase கிளவுட் டேட்டாபேஸ் இணைக்கப்பட்டுள்ளது' : 'Supabase Cloud Database Connected & Syncing'}
              </span>
            </>
          ) : (
            <>
              <ShieldCheck size={16} color="var(--primary)" />
              <span style={{ color: 'var(--text-muted)' }}>
                {language === 'Tamil' ? 'உள்ளூர் சேமிப்பகம் (Offline Mode) இயங்குகிறது' : 'Local Offline Engine Active (100% functional without external keys)'}
              </span>
            </>
          )}
        </div>

        {/* Supabase inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
              Supabase Project URL
            </label>
            <input
              type="text"
              placeholder="https://xyzcompany.supabase.co"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-main)',
                fontSize: '0.88rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
              Supabase Anon Key
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={supabaseKey}
              onChange={(e) => setSupabaseKey(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-main)',
                fontSize: '0.88rem'
              }}
            />
            <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '0.3rem' }}>
              Used to sync your user profile, chat history, quiz scores, and roadmap across devices.
            </p>
          </div>

          {/* Optional Gemini API Key */}
          <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
              <Sparkles size={14} color="var(--primary)" />
              {language === 'Tamil' ? 'விருப்பத்திற்கேற்ப Gemini AI Key' : 'Optional: Google Gemini API Key'}
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-main)',
                fontSize: '0.88rem'
              }}
            />
            <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '0.3rem' }}>
              Leave blank to use the built-in comprehensive CloudMentor Knowledge Engine.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={handleResetProgress}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 0.9rem',
              borderRadius: 'var(--radius-md)',
              background: 'transparent',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              color: 'var(--accent-rose)',
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            <Trash2 size={14} />
            <span>{language === 'Tamil' ? 'பயிற்சியை ரீசெட் செய்' : 'Reset Progress'}</span>
          </button>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button className="btn-secondary" style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }} onClick={onClose}>
              {language === 'Tamil' ? 'மூடு' : 'Close'}
            </button>
            <button className="btn-primary" style={{ padding: '0.55rem 1.2rem', fontSize: '0.85rem' }} onClick={handleSave}>
              {saveSuccess ? (
                <>
                  <CheckCircle size={15} />
                  <span>{language === 'Tamil' ? 'சேமிக்கப்பட்டது!' : 'Saved!'}</span>
                </>
              ) : (
                <span>{language === 'Tamil' ? 'சேமி' : 'Save Settings'}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
