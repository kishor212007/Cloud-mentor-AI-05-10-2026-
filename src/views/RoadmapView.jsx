import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  Target, 
  BookOpen, 
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';
import { roadmapMilestones } from '../data/roadmapData';
import { getRoadmapProgress, toggleRoadmapItem } from '../services/supabaseClient';

export default function RoadmapView({ language, setCurrentTab, setInitialChatQuery }) {
  const [completedItems, setCompletedItems] = useState([]);
  const [expandedId, setExpandedId] = useState('cloud_basics');
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    setCompletedItems(getRoadmapProgress());
  }, []);

  const handleToggleComplete = async (e, id) => {
    e.stopPropagation();
    const updated = await toggleRoadmapItem(id);
    setCompletedItems(updated);
  };

  const handleAskAI = (topicTitle) => {
    setInitialChatQuery(`Explain ${topicTitle} in simple terms with a real-world analogy`);
    setCurrentTab('chat');
  };

  const filteredMilestones = roadmapMilestones.filter(m => {
    if (selectedFilter === 'All') return true;
    return m.level === selectedFilter;
  });

  const progressPercent = Math.round((completedItems.length / roadmapMilestones.length) * 100);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="section-header" style={{ marginBottom: '1rem' }}>
        <div className="section-tag">
          <BookOpen size={14} />
          <span>{language === 'Tamil' ? '16 படிநிலைகள் கொண்ட பாடத்திட்டம்' : 'Official Learning Path'}</span>
        </div>
        <h2 className="section-title">
          {language === 'Tamil' ? 'AWS & கிளவுட் கற்றல் ரோடுமேப்' : 'Cloud & AWS Learning Roadmap'}
        </h2>
        <p className="section-desc">
          {language === 'Tamil'
            ? 'அடிப்படை கணினி மற்றும் நெட்வொர்க்கிங் முதல் தயாரிப்பு நிலை AWS கட்டமைப்புகள் வரை படி-படியாக கற்றுக்கொள்ளுங்கள்.'
            : 'Master Cloud Computing from foundational networks & Linux to production-grade AWS architecture. Check off milestones as you learn.'}
        </p>
      </div>

      {/* Progress Card */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(26, 38, 66, 0.9) 100%)',
        border: '1px solid var(--border-hover)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {language === 'Tamil' ? 'உங்கள் கற்றல் முன்னேற்றம்' : 'Your Roadmap Progress'}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {completedItems.length} {language === 'Tamil' ? 'முடிந்தது / மொத்தம்' : 'of'} {roadmapMilestones.length} {language === 'Tamil' ? 'பாடங்கள் முடிந்துள்ளன' : 'milestones completed'}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          width: '100%',
          height: '10px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--primary) 0%, #EA580C 100%)',
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.4s ease'
          }} />
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginRight: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Filter size={14} /> Filter:
        </span>
        {['All', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
          <button
            key={lvl}
            onClick={() => setSelectedFilter(lvl)}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: selectedFilter === lvl ? 'var(--primary)' : 'var(--bg-elevated)',
              color: selectedFilter === lvl ? '#FFFFFF' : 'var(--text-muted)',
              border: `1px solid ${selectedFilter === lvl ? 'var(--primary)' : 'var(--border-subtle)'}`,
              transition: 'all 0.15s ease'
            }}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Roadmap Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredMilestones.map((m) => {
          const isCompleted = completedItems.includes(m.id);
          const isExpanded = expandedId === m.id;

          return (
            <div
              key={m.id}
              className="glass-card"
              style={{
                borderLeft: isCompleted ? '4px solid var(--accent-emerald)' : '4px solid var(--border-hover)',
                cursor: 'pointer',
                padding: '1.25rem 1.5rem',
                transition: 'all var(--transition-normal)'
              }}
              onClick={() => setExpandedId(isExpanded ? null : m.id)}
            >
              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {/* Complete checkbox button */}
                  <button
                    onClick={(e) => handleToggleComplete(e, m.id)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isCompleted ? 'var(--accent-emerald)' : 'var(--bg-elevated)',
                      border: `2px solid ${isCompleted ? 'var(--accent-emerald)' : 'var(--border-subtle)'}`,
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'all 0.2s ease'
                    }}
                    title={isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
                  >
                    {isCompleted ? <Check size={16} strokeWidth={3} /> : <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700 }}>{m.stepNumber}</span>}
                  </button>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: isCompleted ? 'var(--text-muted)' : 'var(--text-main)',
                        textDecoration: isCompleted ? 'line-through' : 'none'
                      }}>
                        {language === 'Tamil' ? m.tamilTitle : m.title}
                      </span>
                      <span className={`badge badge-${m.level.toLowerCase()}`}>
                        {m.level}
                      </span>
                      <span className="badge badge-category">
                        {m.category}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {language === 'Tamil' ? m.tamilSummary : m.shortSummary}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                    <Clock size={14} />
                    <span>{m.duration}</span>
                  </div>
                  {isExpanded ? <ChevronUp size={18} color="var(--primary)" /> : <ChevronDown size={18} color="var(--text-dim)" />}
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div style={{
                  marginTop: '1.25rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem'
                }} onClick={(e) => e.stopPropagation()}>
                  {/* Real-world analogy box */}
                  <div style={{
                    padding: '0.85rem 1.1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--primary-light)',
                    borderLeft: '3px solid var(--primary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem'
                  }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Lightbulb size={15} />
                      <span>{language === 'Tamil' ? 'நிஜ உலக ஒப்புமை (Analogy):' : 'Real-World Beginner Analogy:'}</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                      {language === 'Tamil' ? m.tamilAnalogy : m.realWorldAnalogy}
                    </div>
                  </div>

                  {/* Key Topics List */}
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                      {language === 'Tamil' ? 'முக்கிய கற்றல் தலைப்புகள்:' : 'Key Concepts Covered:'}
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem' }}>
                      {m.keyTopics.map((topic, tIdx) => (
                        <div key={tIdx} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                          fontSize: '0.85rem',
                          color: 'var(--text-muted)'
                        }}>
                          <CheckCircle2 size={15} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Practice Challenge */}
                  <div style={{
                    padding: '0.85rem 1rem',
                    background: 'var(--bg-elevated)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <Target size={18} color="var(--secondary)" />
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase' }}>
                          {language === 'Tamil' ? 'பயிற்சி சவால் (Challenge)' : 'Hands-on Challenge'}
                        </div>
                        <div style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                          {m.practiceChallenge}
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn-outline"
                      style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem' }}
                      onClick={() => handleAskAI(m.title)}
                    >
                      <Sparkles size={14} />
                      <span>{language === 'Tamil' ? 'AI-யிடம் விளக்கம் கேள்' : 'Ask AI About This'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
