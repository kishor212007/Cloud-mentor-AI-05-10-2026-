import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Sparkles, 
  Timer,
  BookOpen,
  Check
} from 'lucide-react';
import { quizBank } from '../data/quizData';
import { saveQuizScore } from '../services/supabaseClient';

export default function QuizView({ language, setCurrentTab }) {
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [answersHistory, setAnswersHistory] = useState([]);

  const currentQuestions = quizBank[selectedLevel] || quizBank.beginner;
  const currentQ = currentQuestions[currentQuestionIndex];

  const handleSelectOption = (index) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOption === currentQ.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setAnswersHistory(prev => [
      ...prev,
      {
        questionId: currentQ.id,
        selected: selectedOption,
        correct: currentQ.correctAnswer,
        isCorrect
      }
    ]);
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex + 1 < currentQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Save quiz score
      await saveQuizScore({
        level: selectedLevel,
        score: score + (selectedOption === currentQ.correctAnswer ? 1 : 0),
        total: currentQuestions.length,
        percentage: Math.round(((score + (selectedOption === currentQ.correctAnswer ? 1 : 0)) / currentQuestions.length) * 100)
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
    setAnswersHistory([]);
  };

  const handleLevelChange = (lvl) => {
    setSelectedLevel(lvl);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
    setAnswersHistory([]);
  };

  const finalPercentage = Math.round((score / currentQuestions.length) * 100);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="section-header" style={{ marginBottom: '1rem' }}>
        <div className="section-tag">
          <HelpCircle size={14} />
          <span>{language === 'Tamil' ? 'AWS மதிப்பீட்டு தேர்வு' : 'Interactive Knowledge Check'}</span>
        </div>
        <h2 className="section-title">
          {language === 'Tamil' ? 'AWS வினாடி வினா & தேர்வுகள் (Quiz Module)' : 'AWS Cloud Quiz Module'}
        </h2>
        <p className="section-desc">
          {language === 'Tamil'
            ? 'AWS தேர்வுகளுக்கு (Cloud Practitioner & Solutions Architect) தயார் செய்யும் மல்டிபிள் சாய்ஸ் கேள்விகள் மற்றும் விளக்கங்கள்.'
            : 'Test your cloud knowledge across Beginner, Intermediate, and Advanced tiers with detailed explanations for every option.'}
        </p>
      </div>

      {/* Level Selector Tabs */}
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
        {[
          { id: 'beginner', label: 'Beginner (Cloud Practitioner)', tamilLabel: 'தொடக்கநிலை (Cloud Practitioner)' },
          { id: 'intermediate', label: 'Intermediate (Solutions Architect)', tamilLabel: 'இடைநிலை (Solutions Architect)' },
          { id: 'advanced', label: 'Advanced (SysOps & Security)', tamilLabel: 'உயர்நிலை (SysOps & Security)' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => handleLevelChange(tab.id)}
            style={{
              padding: '0.6rem 1.1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: selectedLevel === tab.id ? 'var(--primary)' : 'var(--bg-card)',
              color: selectedLevel === tab.id ? '#FFFFFF' : 'var(--text-muted)',
              border: `1px solid ${selectedLevel === tab.id ? 'var(--primary)' : 'var(--border-subtle)'}`,
              transition: 'all 0.15s ease'
            }}
          >
            {language === 'Tamil' ? tab.tamilLabel : tab.label}
          </button>
        ))}
      </div>

      {/* Main Quiz Area */}
      {!isQuizCompleted ? (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
          {/* Progress Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-dim)' }}>
              {language === 'Tamil' ? 'கேள்வி' : 'Question'} {currentQuestionIndex + 1} of {currentQuestions.length}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={16} color="var(--primary)" />
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>
                {language === 'Tamil' ? 'மதிப்பெண்:' : 'Score:'} {score}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{
            width: '100%',
            height: '6px',
            background: 'var(--bg-elevated)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--primary) 0%, #EA580C 100%)',
              transition: 'width 0.3s ease'
            }} />
          </div>

          {/* Question Text */}
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.5, color: 'var(--text-main)' }}>
            {currentQ.question}
          </h3>

          {/* Options List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentQ.correctAnswer;

              let optionStyle = {
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-main)',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: isAnswerSubmitted ? 'default' : 'pointer',
                transition: 'all 0.15s ease'
              };

              if (isSelected && !isAnswerSubmitted) {
                optionStyle.border = '1px solid var(--primary)';
                optionStyle.background = 'var(--primary-light)';
              }

              if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  optionStyle.background = 'var(--accent-emerald-light)';
                  optionStyle.border = '1px solid var(--accent-emerald)';
                  optionStyle.color = 'var(--accent-emerald)';
                  optionStyle.fontWeight = '600';
                } else if (isSelected && !isCorrectAnswer) {
                  optionStyle.background = 'var(--accent-rose-light)';
                  optionStyle.border = '1px solid var(--accent-rose)';
                  optionStyle.color = 'var(--accent-rose)';
                }
              }

              return (
                <div
                  key={idx}
                  style={optionStyle}
                  onClick={() => handleSelectOption(idx)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswerSubmitted && isCorrectAnswer && (
                    <CheckCircle size={18} color="var(--accent-emerald)" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle size={18} color="var(--accent-rose)" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation Box upon answer submit */}
          {isAnswerSubmitted && (
            <div style={{
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-light)',
              borderLeft: '4px solid var(--primary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              marginTop: '0.5rem'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                {language === 'Tamil' ? 'விளக்கம் (Explanation):' : 'Detailed Explanation:'}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
                {language === 'Tamil' ? currentQ.tamilExplanation : currentQ.explanation}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            {!isAnswerSubmitted ? (
              <button
                className="btn-primary"
                disabled={selectedOption === null}
                onClick={handleSubmitAnswer}
                style={{ opacity: selectedOption === null ? 0.5 : 1 }}
              >
                <span>{language === 'Tamil' ? 'விடையை சமர்ப்பி' : 'Submit Answer'}</span>
                <Check size={16} />
              </button>
            ) : (
              <button
                className="btn-primary"
                onClick={handleNextQuestion}
              >
                <span>
                  {currentQuestionIndex + 1 === currentQuestions.length
                    ? (language === 'Tamil' ? 'முடிவுகளை காண்க' : 'View Results')
                    : (language === 'Tamil' ? 'அடுத்த கேள்வி' : 'Next Question')}
                </span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="glass-card" style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'var(--primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)',
            boxShadow: '0 0 24px var(--primary-glow)'
          }}>
            <Award size={36} />
          </div>

          <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            {language === 'Tamil' ? 'வினாடி வினா முடிந்தது!' : 'Quiz Completed!'}
          </h3>

          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '500px' }}>
            {finalPercentage >= 70
              ? (language === 'Tamil' ? 'அருமை! நீங்கள் இந்த தலைப்பில் சிறந்த புரிதலைக் கொண்டுள்ளீர்கள்.' : 'Outstanding! You have a solid grasp of core AWS concepts.')
              : (language === 'Tamil' ? 'நல்ல முயற்சி! ரோடுமேப் பாடங்களை மீண்டும் படித்து மீண்டும் தேர்வு எழுதுங்கள்.' : 'Good effort! Review the roadmap milestones and try again to improve your score.')}
          </p>

          <div style={{
            display: 'flex',
            gap: '2rem',
            padding: '1.25rem 2.5rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            margin: '0.5rem 0'
          }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>
                {score} / {currentQuestions.length}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {language === 'Tamil' ? 'சரியான விடைகள்' : 'Correct Answers'}
              </div>
            </div>

            <div style={{ width: '1px', background: 'var(--border-subtle)' }} />

            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: finalPercentage >= 70 ? 'var(--accent-emerald)' : '#F59E0B' }}>
                {finalPercentage}%
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {language === 'Tamil' ? 'சதவீதம்' : 'Accuracy'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn-secondary" onClick={handleRestartQuiz}>
              <RotateCcw size={16} />
              <span>{language === 'Tamil' ? 'மீண்டும் தொடங்கு' : 'Retake Quiz'}</span>
            </button>

            <button className="btn-primary" onClick={() => setCurrentTab('practice')}>
              <span>{language === 'Tamil' ? 'பயிற்சி மோடுக்கு செல்' : 'Try Practice Mode'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
