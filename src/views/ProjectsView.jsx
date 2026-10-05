import React, { useState } from 'react';
import { 
  FolderGit2, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  Copy, 
  Check, 
  Terminal, 
  Sparkles, 
  ChevronRight, 
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { projectSuggestions } from '../data/projectsData';

export default function ProjectsView({ language, setCurrentTab, setInitialChatQuery }) {
  const [selectedProjectId, setSelectedProjectId] = useState('proj_s3_hosting');
  const [copiedId, setCopiedId] = useState(null);

  const selectedProject = projectSuggestions.find(p => p.id === selectedProjectId) || projectSuggestions[0];

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAskAIAboutProject = (projTitle) => {
    setInitialChatQuery(`Guide me step-by-step to build the AWS project: "${projTitle}"`);
    setCurrentTab('chat');
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="section-header" style={{ marginBottom: '1rem' }}>
        <div className="section-tag">
          <FolderGit2 size={14} />
          <span>{language === 'Tamil' ? 'போர்ட்ஃபோலியோ திட்டங்கள்' : 'Portfolio Projects'}</span>
        </div>
        <h2 className="section-title">
          {language === 'Tamil' ? 'AWS நடைமுறை திட்டங்கள் (Hands-on Projects)' : 'Hands-on AWS Cloud Projects'}
        </h2>
        <p className="section-desc">
          {language === 'Tamil'
            ? 'உங்கள் ரெஸ்யூம் (Resume) மற்றும் GitHub-ல் சேர்க்கக்கூடிய, Free Tier-ல் இலவசமாக செய்யக்கூடிய 5+ திட்டங்கள்.'
            : 'Build real-world AWS projects for your GitHub portfolio and job interviews. All projects are Free Tier eligible.'}
        </p>
      </div>

      {/* Projects Container (Split Layout: Sidebar list + Active Project Details) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Left: Project Selector List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {projectSuggestions.map((proj) => {
            const isSelected = selectedProjectId === proj.id;

            return (
              <div
                key={proj.id}
                className="glass-card"
                onClick={() => setSelectedProjectId(proj.id)}
                style={{
                  padding: '1rem 1.25rem',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'var(--primary-light)' : 'var(--bg-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className={`badge badge-${proj.difficulty.toLowerCase()}`}>
                    {proj.difficulty}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Clock size={12} /> {proj.estimatedTime}
                  </span>
                </div>

                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.4 }}>
                  {language === 'Tamil' ? proj.tamilTitle : proj.title}
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <DollarSign size={12} /> {proj.cost}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Project Deep Dive */}
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Project Title & Meta */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <span className={`badge badge-${selectedProject.difficulty.toLowerCase()}`}>
                  {selectedProject.difficulty}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  ⏱️ {selectedProject.estimatedTime}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                  💎 {selectedProject.cost}
                </span>
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {language === 'Tamil' ? selectedProject.tamilTitle : selectedProject.title}
              </h3>
            </div>

            <button
              className="btn-primary"
              style={{ fontSize: '0.88rem', padding: '0.55rem 1.1rem' }}
              onClick={() => handleAskAIAboutProject(selectedProject.title)}
            >
              <Sparkles size={16} />
              <span>{language === 'Tamil' ? 'AI உதவி கேள்' : 'Ask AI for Help'}</span>
            </button>
          </div>

          {/* Objective Box */}
          <div style={{
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
              {language === 'Tamil' ? 'திட்டத்தின் நோக்கம் (Objective):' : 'Project Objective:'}
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              {language === 'Tamil' ? selectedProject.tamilObjective : selectedProject.objective}
            </p>
          </div>

          {/* Required Services */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={16} color="var(--secondary)" />
              <span>AWS Services Required</span>
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {selectedProject.servicesRequired.map((srv, idx) => (
                <div key={idx} style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2rem'
                }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {srv.name}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {srv.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation Steps */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
              {language === 'Tamil' ? 'செயல்படுத்தும் படிகள் (Step-by-Step Instructions):' : 'Step-by-Step Implementation Guide:'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {selectedProject.steps.map((st) => (
                <div key={st.step} style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <span style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {st.step}
                  </span>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {st.title}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: 1.5 }}>
                      {st.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code / Configuration Template */}
          {selectedProject.codeSnippet && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Terminal size={14} color="var(--secondary)" />
                  <span>Configuration / Bootstrap Code</span>
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <pre className="code-block" style={{ margin: 0 }}>
                  <code>{selectedProject.codeSnippet}</code>
                </pre>
                <button
                  className="code-copy-btn"
                  onClick={() => handleCopy(selectedProject.codeSnippet, selectedProject.id)}
                >
                  {copiedId === selectedProject.id ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </div>
            </div>
          )}

          {/* Expected Output */}
          <div style={{
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent-emerald-light)',
            borderLeft: '4px solid var(--accent-emerald)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem'
          }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase' }}>
              {language === 'Tamil' ? 'எதிர்பார்க்கப்படும் வெளியீடு (Expected Output):' : 'Expected Output & Deliverable:'}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
              {language === 'Tamil' ? selectedProject.tamilExpectedOutput : selectedProject.expectedOutput}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
