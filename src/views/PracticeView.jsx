import React, { useState } from 'react';
import { 
  Code2, 
  Sparkles, 
  Lightbulb, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  Check, 
  Layers,
  BookOpen
} from 'lucide-react';
import { topicPracticeQuestions } from '../data/quizData';

export default function PracticeView({ language, setCurrentTab, setInitialChatQuery }) {
  const [selectedTopic, setSelectedTopic] = useState('ec2');
  const [userAnswers, setUserAnswers] = useState({});
  const [showHints, setShowHints] = useState({});

  const topics = [
    { id: 'ec2', name: 'Amazon EC2', icon: 'Compute', count: topicPracticeQuestions.ec2?.length || 3 },
    { id: 's3', name: 'Amazon S3', icon: 'Storage', count: topicPracticeQuestions.s3?.length || 2 },
    { id: 'iam', name: 'AWS IAM', icon: 'Security', count: topicPracticeQuestions.iam?.length || 1 },
    { id: 'vpc', name: 'Amazon VPC', icon: 'Networking', count: topicPracticeQuestions.vpc?.length || 1 },
    { id: 'lambda', name: 'AWS Lambda', icon: 'Serverless', count: topicPracticeQuestions.lambda?.length || 1 }
  ];

  const currentQuestions = topicPracticeQuestions[selectedTopic] || [];

  const handleSelectAnswer = (qId, optionIdx) => {
    setUserAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const toggleHint = (qId) => {
    setShowHints(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleAskAIAboutQuestion = (qText) => {
    setInitialChatQuery(`Explain this AWS practice question step-by-step: "${qText}"`);
    setCurrentTab('chat');
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="section-header" style={{ marginBottom: '1rem' }}>
        <div className="section-tag">
          <Code2 size={14} />
          <span>{language === 'Tamil' ? 'தலைப்பு வாரியான பயிற்சி' : 'Topic-Based Drill'}</span>
        </div>
        <h2 className="section-title">
          {language === 'Tamil' ? 'AWS பயிற்சி மோடு (Practice Mode)' : 'AWS Practice Drill Mode'}
        </h2>
        <p className="section-desc">
          {language === 'Tamil'
            ? 'நீங்கள் விரும்பும் குறிப்பிட்ட சேவையைத் தேர்ந்தெடுத்து, அதற்கான பிரத்யேக கேள்விகள் மற்றும் குறிப்புகளைப் பெறுங்கள்.'
            : 'Select any specific AWS service topic to generate targeted drill questions with interactive beginner hints.'}
        </p>
      </div>

      {/* Topic Selector Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {topics.map(t => (
          <button
            key={t.id}
            onClick={() => {
              setSelectedTopic(t.id);
              setUserAnswers({});
              setShowHints({});
            }}
            className="glass-card"
            style={{
              padding: '0.85rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              border: selectedTopic === t.id ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
              background: selectedTopic === t.id ? 'var(--primary-light)' : 'var(--bg-card)'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: selectedTopic === t.id ? 'var(--primary)' : 'var(--bg-elevated)',
              color: selectedTopic === t.id ? '#FFFFFF' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Layers size={16} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {t.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                {t.count} {language === 'Tamil' ? 'கேள்விகள்' : 'Questions'}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Practice Questions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {currentQuestions.map((q, qIndex) => {
          const selectedAns = userAnswers[q.id];
          const hasAnswered = selectedAns !== undefined;
          const isCorrect = selectedAns === q.correctAnswer;
          const isHintOpen = showHints[q.id];

          return (
            <div key={q.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Question Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {qIndex + 1}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.5, color: 'var(--text-main)' }}>
                    {q.question}
                  </h3>
                </div>

                <button
                  onClick={() => toggleHint(q.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: isHintOpen ? 'rgba(245, 158, 11, 0.2)' : 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    color: isHintOpen ? '#F59E0B' : 'var(--text-muted)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  <Lightbulb size={13} />
                  <span>{isHintOpen ? 'Hide Hint' : 'Hint'}</span>
                </button>
              </div>

              {/* Hint Box */}
              {isHintOpen && (
                <div style={{
                  padding: '0.65rem 0.95rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  fontSize: '0.84rem',
                  color: 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Lightbulb size={16} color="#F59E0B" />
                  <span>{language === 'Tamil' ? q.tamilHint : q.hint}</span>
                </div>
              )}

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {q.options.map((opt, oIdx) => {
                  const isThisSelected = selectedAns === oIdx;
                  const isThisCorrect = oIdx === q.correctAnswer;

                  let border = '1px solid var(--border-subtle)';
                  let bg = 'var(--bg-elevated)';
                  let color = 'var(--text-main)';

                  if (hasAnswered) {
                    if (isThisCorrect) {
                      border = '1px solid var(--accent-emerald)';
                      bg = 'var(--accent-emerald-light)';
                      color = 'var(--accent-emerald)';
                    } else if (isThisSelected && !isThisCorrect) {
                      border = '1px solid var(--accent-rose)';
                      bg = 'var(--accent-rose-light)';
                      color = 'var(--accent-rose)';
                    }
                  } else if (isThisSelected) {
                    border = '1px solid var(--primary)';
                    bg = 'var(--primary-light)';
                  }

                  return (
                    <div
                      key={oIdx}
                      onClick={() => handleSelectAnswer(q.id, oIdx)}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border,
                        background: bg,
                        color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: hasAnswered ? 'default' : 'pointer',
                        fontSize: '0.88rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ fontWeight: 700, color: 'var(--text-dim)', fontSize: '0.78rem' }}>
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        <span>{opt}</span>
                      </div>

                      {hasAnswered && isThisCorrect && (
                        <CheckCircle size={16} color="var(--accent-emerald)" />
                      )}
                      {hasAnswered && isThisSelected && !isThisCorrect && (
                        <XCircle size={16} color="var(--accent-rose)" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Post-answer feedback */}
              {hasAnswered && (
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: isCorrect ? 'var(--accent-emerald-light)' : 'var(--primary-light)',
                  borderLeft: `4px solid ${isCorrect ? 'var(--accent-emerald)' : 'var(--primary)'}`,
                  fontSize: '0.85rem',
                  color: 'var(--text-main)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <div>
                    <strong>{isCorrect ? 'Correct! ' : 'Explanation: '}</strong>
                    {q.explanation}
                  </div>

                  <button
                    className="btn-outline"
                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem' }}
                    onClick={() => handleAskAIAboutQuestion(q.question)}
                  >
                    <Sparkles size={12} />
                    <span>Ask AI</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
