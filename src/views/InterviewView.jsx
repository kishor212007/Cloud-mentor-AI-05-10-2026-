import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  Sparkles, 
  Bookmark, 
  CheckCircle2, 
  Languages,
  ArrowRight
} from 'lucide-react';
import { interviewQuestions, interviewCategories } from '../data/interviewData';

export default function InterviewView({ language, setCurrentTab, setInitialChatQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState('int_1');
  const [bookmarkedIds, setBookmarkedIds] = useState(['int_1', 'int_5']);
  const [tamilViewIds, setTamilViewIds] = useState([]);

  const toggleBookmark = (e, id) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleTamilView = (e, id) => {
    e.stopPropagation();
    setTamilViewIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAskAI = (qTitle) => {
    setInitialChatQuery(`Provide interview guidance and a model answer for: "${qTitle}"`);
    setCurrentTab('chat');
  };

  const filteredQuestions = interviewQuestions.filter(q => {
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.shortExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="section-header" style={{ marginBottom: '1rem' }}>
        <div className="section-tag">
          <Briefcase size={14} />
          <span>{language === 'Tamil' ? 'கேம்பஸ் & வேலைவாய்ப்பு நேர்காணல்' : 'Placement & Job Prep'}</span>
        </div>
        <h2 className="section-title">
          {language === 'Tamil' ? 'AWS நேர்காணல் தயாரிப்பு (Interview Preparation)' : 'AWS Cloud Interview Preparation'}
        </h2>
        <p className="section-desc">
          {language === 'Tamil'
            ? 'அடிப்படை முதல் சூழ்நிலை அடிப்படையிலான (Scenario-based) வரை அடிக்கடி கேட்கப்படும் நேர்காணல் வினாக்களுக்கு தயார் ஆகுங்கள்.'
            : 'Master real-world technical and scenario-based interview questions asked by top cloud companies with structured model answers.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Categories */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {interviewCategories.map(cat => (
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

        {/* Search */}
        <div style={{ position: 'relative', minWidth: '260px' }}>
          <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder={language === 'Tamil' ? 'கேள்விகளைத் தேடு...' : 'Search interview questions...'}
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

      {/* Questions Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredQuestions.map((q) => {
          const isExpanded = expandedId === q.id;
          const isBookmarked = bookmarkedIds.includes(q.id);
          const isTamilSelected = tamilViewIds.includes(q.id) || language === 'Tamil';

          return (
            <div
              key={q.id}
              className="glass-card"
              style={{
                cursor: 'pointer',
                padding: '1.25rem 1.5rem',
                borderLeft: isBookmarked ? '4px solid #F59E0B' : '4px solid var(--border-hover)',
                transition: 'all var(--transition-normal)'
              }}
              onClick={() => setExpandedId(isExpanded ? null : q.id)}
            >
              {/* Question Row Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="badge badge-category">{q.category}</span>
                    <span className="badge badge-intermediate">{q.roleLevel}</span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.4 }}>
                    {q.question}
                  </h3>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <strong>{language === 'Tamil' ? 'சுருக்க விடை:' : 'Quick Summary:'}</strong>{' '}
                    {isTamilSelected ? q.tamilSummary : q.shortExplanation}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => toggleBookmark(e, q.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: isBookmarked ? '#F59E0B' : 'var(--text-dim)',
                      cursor: 'pointer',
                      padding: '0.2rem'
                    }}
                    title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                  >
                    <Star size={18} fill={isBookmarked ? '#F59E0B' : 'transparent'} />
                  </button>

                  {isExpanded ? <ChevronUp size={20} color="var(--primary)" /> : <ChevronDown size={20} color="var(--text-dim)" />}
                </div>
              </div>

              {/* Expanded Answer Content */}
              {isExpanded && (
                <div
                  style={{
                    marginTop: '1.25rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Language Toggle for this question */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={(e) => toggleTamilView(e, q.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.78rem',
                        padding: '0.3rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--primary)',
                        cursor: 'pointer'
                      }}
                    >
                      <Languages size={13} />
                      <span>{isTamilSelected ? 'Show in English' : 'தமிழில் காண்க (Tamil)'}</span>
                    </button>
                  </div>

                  {/* Detailed Model Answer */}
                  <div style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.92rem',
                    color: 'var(--text-main)',
                    lineHeight: 1.65,
                    whiteSpace: 'pre-wrap'
                  }}>
                    {isTamilSelected ? q.tamilExplanation : q.detailedAnswer}
                  </div>

                  {/* Interviewer Pro Tip */}
                  {q.interviewerTip && (
                    <div style={{
                      padding: '0.85rem 1.1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(56, 189, 248, 0.1)',
                      borderLeft: '4px solid var(--secondary)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.6rem'
                    }}>
                      <Lightbulb size={18} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase' }}>
                          Interviewer Pro Tip & Winning Strategy
                        </div>
                        <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                          {q.interviewerTip}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Ask AI for Custom Mock Drill */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
                    <button
                      className="btn-outline"
                      onClick={() => handleAskAI(q.question)}
                    >
                      <Sparkles size={14} />
                      <span>Ask AI for Follow-up Questions</span>
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
