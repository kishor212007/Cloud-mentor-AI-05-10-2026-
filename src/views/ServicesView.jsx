import React, { useState, useEffect } from 'react';
import { 
  Boxes, 
  Search, 
  Sparkles, 
  Lightbulb, 
  Terminal, 
  DollarSign, 
  ExternalLink, 
  ChevronRight, 
  CheckCircle,
  Copy,
  Check,
  X,
  Layers,
  ArrowRight
} from 'lucide-react';
import { awsServicesList } from '../data/servicesData';
import { getCompletedServices, toggleCompletedService } from '../services/supabaseClient';

export default function ServicesView({ language, setCurrentTab, setInitialChatQuery }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalService, setActiveModalService] = useState(null);
  const [completedServices, setCompletedServices] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    setCompletedServices(getCompletedServices());
  }, []);

  const categories = ['All', 'Compute', 'Storage', 'Database', 'Networking', 'Security', 'Management'];

  const handleToggleComplete = (e, sId) => {
    e.stopPropagation();
    const updated = toggleCompletedService(sId);
    setCompletedServices(updated);
  };

  const handleAskAI = (serviceName) => {
    setInitialChatQuery(`Explain ${serviceName} with beginner examples, real-world use case, and free tier details`);
    setCurrentTab('chat');
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredServices = awsServicesList.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="section-header" style={{ marginBottom: '1rem' }}>
        <div className="section-tag">
          <Boxes size={14} />
          <span>{language === 'Tamil' ? 'AWS சேவைகள் களஞ்சியம்' : 'Service Catalog'}</span>
        </div>
        <h2 className="section-title">
          {language === 'Tamil' ? 'AWS முக்கிய சேவைகள் (AWS Services Explorer)' : 'AWS Services Explorer'}
        </h2>
        <p className="section-desc">
          {language === 'Tamil'
            ? 'அனைத்து முக்கிய AWS சேவைகளின் எளிய விளக்கம், நிஜ உலக பயன்பாடு மற்றும் தொடக்கநிலை உதாரணங்களை ஆராயுங்கள்.'
            : 'Explore core AWS cloud services with beginner-friendly definitions, real-world analogies, Free Tier rules, and CLI snippets.'}
        </p>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: selectedCategory === cat ? 'var(--primary)' : 'var(--bg-card)',
                color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-muted)',
                border: `1px solid ${selectedCategory === cat ? 'var(--primary)' : 'var(--border-subtle)'}`,
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{
          position: 'relative',
          minWidth: '260px'
        }}>
          <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder={language === 'Tamil' ? 'சேவைகளைத் தேடு (EC2, S3...)' : 'Search services (e.g. S3, VPC)...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.85rem 0.5rem 2.2rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid-3">
        {filteredServices.map((service) => {
          const isMastered = completedServices.includes(service.id);

          return (
            <div
              key={service.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                borderTop: `3px solid ${isMastered ? 'var(--accent-emerald)' : 'var(--primary)'}`,
                cursor: 'pointer'
              }}
              onClick={() => setActiveModalService(service)}
            >
              {/* Card Top */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {service.name}
                    </h3>
                    <span className={`badge badge-${service.difficulty.toLowerCase()}`}>
                      {service.difficulty}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 500 }}>
                    {service.fullName}
                  </div>
                </div>

                {/* Mark as mastered check */}
                <button
                  onClick={(e) => handleToggleComplete(e, service.id)}
                  style={{
                    background: isMastered ? 'var(--accent-emerald-light)' : 'var(--bg-elevated)',
                    border: `1px solid ${isMastered ? 'var(--accent-emerald)' : 'var(--border-subtle)'}`,
                    color: isMastered ? 'var(--accent-emerald)' : 'var(--text-dim)',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title={isMastered ? 'Mastered!' : 'Mark as Mastered'}
                >
                  <CheckCircle size={16} />
                </button>
              </div>

              {/* Simple Definition */}
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55, flex: 1 }}>
                {language === 'Tamil' ? service.tamilDefinition : service.shortDefinition}
              </p>

              {/* Real World Use Case */}
              <div style={{
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.82rem',
                color: 'var(--text-main)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.2rem'
              }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                  {language === 'Tamil' ? 'நிஜ உலக பயன்பாடு:' : 'Real-World Use Case:'}
                </span>
                <span>{language === 'Tamil' ? service.tamilUseCase : service.realWorldUseCase}</span>
              </div>

              {/* Beginner Example */}
              <div style={{
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-light)',
                fontSize: '0.82rem',
                color: 'var(--text-main)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.2rem'
              }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                  {language === 'Tamil' ? 'தொடக்கநிலை உதாரணம்:' : 'Beginner Example:'}
                </span>
                <span>{language === 'Tamil' ? service.tamilExample : service.beginnerExample}</span>
              </div>

              {/* Footer Actions */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-subtle)',
                marginTop: 'auto'
              }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Layers size={13} /> {service.category}
                </span>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    className="btn-outline"
                    style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAskAI(service.name);
                    }}
                  >
                    <Sparkles size={12} />
                    <span>Ask AI</span>
                  </button>
                  <button
                    className="btn-secondary"
                    style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                    onClick={() => setActiveModalService(service)}
                  >
                    <span>Details</span>
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Deep-Dive Modal */}
      {activeModalService && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(5, 9, 20, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="glass-card" style={{
            maxWidth: '680px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-hover)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{activeModalService.name}</h3>
                  <span className={`badge badge-${activeModalService.difficulty.toLowerCase()}`}>
                    {activeModalService.difficulty}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{activeModalService.fullName} • {activeModalService.category}</p>
              </div>

              <button className="btn-icon" onClick={() => setActiveModalService(null)}>
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Definition */}
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Definition
                </h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  {language === 'Tamil' ? activeModalService.tamilDefinition : activeModalService.shortDefinition}
                </p>
              </div>

              {/* Free Tier Info */}
              <div style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}>
                <DollarSign size={18} color="var(--accent-emerald)" />
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase' }}>
                    Free Tier Allowance
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                    {activeModalService.freeTier}
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Key Features & Capabilities
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {activeModalService.keyFeatures.map((kf, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      <CheckCircle size={15} color="var(--primary)" />
                      <span>{kf}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CLI Command Example */}
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Terminal size={14} color="var(--secondary)" />
                  <span>AWS CLI Command Example</span>
                </h4>
                <div style={{ position: 'relative' }}>
                  <pre className="code-block" style={{ margin: 0 }}>
                    <code>{activeModalService.cliExample}</code>
                  </pre>
                  <button
                    className="code-copy-btn"
                    onClick={() => handleCopy(activeModalService.cliExample, 'modal_cli')}
                  >
                    {copiedId === 'modal_cli' ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                className="btn-secondary"
                onClick={() => setActiveModalService(null)}
              >
                Close
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  setActiveModalService(null);
                  handleAskAI(activeModalService.name);
                }}
              >
                <Sparkles size={16} />
                <span>Ask AI About {activeModalService.name}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
