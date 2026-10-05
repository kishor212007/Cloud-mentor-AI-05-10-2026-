import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Award, 
  Map, 
  Boxes, 
  HelpCircle, 
  Flame, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';
import { getRoadmapProgress, getCompletedServices, getQuizHistory, getUserProfile } from '../services/supabaseClient';
import { roadmapMilestones } from '../data/roadmapData';
import { awsServicesList } from '../data/servicesData';

export default function DashboardView({ language, setCurrentTab, setInitialChatQuery }) {
  const [profile, setProfile] = useState({ name: 'Cloud Student', level: 'AWS Apprentice', dailyStreak: 3, xp: 240 });
  const [completedMilestones, setCompletedMilestones] = useState([]);
  const [masteredServices, setMasteredServices] = useState([]);
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const p = await getUserProfile();
      setProfile(p);
      setCompletedMilestones(getRoadmapProgress());
      setMasteredServices(getCompletedServices());
      setQuizHistory(getQuizHistory());
    };
    loadData();
  }, []);

  const totalMilestones = roadmapMilestones.length;
  const roadmapPercent = Math.round((completedMilestones.length / totalMilestones) * 100);

  const totalServices = awsServicesList.length;
  const servicesPercent = Math.round((masteredServices.length / totalServices) * 100);

  // Overall weighted learning progress
  const overallProgress = Math.round((roadmapPercent * 0.6) + (servicesPercent * 0.4));

  // Determine Learning Level title
  let currentLevelTitle = 'Cloud Novice';
  let badgeColor = 'var(--text-dim)';
  if (overallProgress >= 75) {
    currentLevelTitle = 'AWS Solutions Architect in Training 🏆';
    badgeColor = 'var(--accent-purple)';
  } else if (overallProgress >= 40) {
    currentLevelTitle = 'Cloud Practitioner Ready 🚀';
    badgeColor = 'var(--primary)';
  } else if (overallProgress >= 15) {
    currentLevelTitle = 'AWS Apprentice ⚡';
    badgeColor = 'var(--secondary)';
  }

  // Find next recommended milestone
  const nextMilestone = roadmapMilestones.find(m => !completedMilestones.includes(m.id)) || roadmapMilestones[0];

  // Calculate quiz statistics
  const totalQuizzesTaken = quizHistory.length;
  const averageQuizScore = totalQuizzesTaken > 0
    ? Math.round(quizHistory.reduce((acc, curr) => acc + (curr.percentage || 0), 0) / totalQuizzesTaken)
    : 85; // default encouraging baseline

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Header */}
      <div className="section-header" style={{ marginBottom: '0.5rem' }}>
        <div className="section-tag">
          <BarChart3 size={14} />
          <span>{language === 'Tamil' ? 'முன்னேற்றக் கண்காணிப்பு' : 'Learning Analytics'}</span>
        </div>
        <h2 className="section-title">
          {language === 'Tamil' ? 'உங்கள் கற்றல் முன்னேற்ற பலகை' : 'Learning Progress Dashboard'}
        </h2>
        <p className="section-desc">
          {language === 'Tamil'
            ? 'உங்கள் அன்றாட கற்றல், வினாடி வினா மதிப்பெண்கள் மற்றும் அடுத்த கட்ட இலக்குகளைக் கண்காணியுங்கள்.'
            : 'Track your milestones, completed services, quiz accuracy, and recommended next steps.'}
        </p>
      </div>

      {/* Top Profile & Rank Hero Card */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(22, 34, 60, 0.95) 100%)',
        border: '1px solid var(--border-hover)',
        padding: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--primary) 0%, #EA580C 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 0 20px var(--primary-glow)'
          }}>
            <Award size={32} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {profile.name}
              </h3>
              <span style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                padding: '0.2rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--primary-light)',
                border: '1px solid var(--border-hover)',
                color: 'var(--primary)'
              }}>
                {currentLevelTitle}
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {language === 'Tamil' ? 'AWS கிளவுட் கற்றல் பயணம்' : 'AWS Cloud Career Journey'} • Level {Math.floor(overallProgress / 20) + 1}
            </div>
          </div>
        </div>

        {/* Quick Streak & XP Stats */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <Flame size={24} color="#F59E0B" />
            <div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {profile.dailyStreak || 3} Days
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                {language === 'Tamil' ? 'தொடர் பயிற்சி' : 'Daily Streak'}
              </div>
            </div>
          </div>

          <div style={{
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <Zap size={24} color="var(--primary)" />
            <div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {profile.xp + (completedMilestones.length * 50)} XP
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                {language === 'Tamil' ? 'மொத்த புள்ளிகள்' : 'Total Cloud XP'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Cards Grid */}
      <div className="grid-3">
        {/* Card 1: Roadmap Completion */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem' }}>
              <Map size={18} color="var(--primary)" />
              <span>{language === 'Tamil' ? 'ரோடுமேப் தலைப்புகள்' : 'Roadmap Progress'}</span>
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
              {roadmapPercent}%
            </span>
          </div>

          <div style={{
            width: '100%',
            height: '8px',
            background: 'var(--bg-elevated)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${roadmapPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--primary) 0%, #EA580C 100%)',
              borderRadius: 'var(--radius-full)'
            }} />
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <strong>{completedMilestones.length}</strong> {language === 'Tamil' ? 'பாடங்கள் முடிந்தது' : 'of'} <strong>{totalMilestones}</strong> {language === 'Tamil' ? 'மொத்த பாடங்களில்' : 'topics completed'}
          </div>

          <button className="btn-outline" style={{ marginTop: 'auto' }} onClick={() => setCurrentTab('roadmap')}>
            <span>{language === 'Tamil' ? 'ரோடுமேப் செல்' : 'Continue Roadmap'}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Card 2: AWS Services Mastered */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem' }}>
              <Boxes size={18} color="var(--secondary)" />
              <span>{language === 'Tamil' ? 'தேர்ச்சி பெற்ற சேவைகள்' : 'Completed Services'}</span>
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)' }}>
              {servicesPercent}%
            </span>
          </div>

          <div style={{
            width: '100%',
            height: '8px',
            background: 'var(--bg-elevated)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${servicesPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--secondary) 0%, #0284C7 100%)',
              borderRadius: 'var(--radius-full)'
            }} />
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <strong>{masteredServices.length}</strong> {language === 'Tamil' ? 'சேவைகளில் தேர்ச்சி' : 'of'} <strong>{totalServices}</strong> {language === 'Tamil' ? 'சேவைகளில்' : 'services mastered'}
          </div>

          <button className="btn-outline" style={{ marginTop: 'auto' }} onClick={() => setCurrentTab('services')}>
            <span>{language === 'Tamil' ? 'சேவைகளை காண்க' : 'Explore Services'}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Card 3: Quiz Accuracy */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem' }}>
              <HelpCircle size={18} color="var(--accent-emerald)" />
              <span>{language === 'Tamil' ? 'வினாடி வினா சராசரி' : 'Quiz Performance'}</span>
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
              {averageQuizScore}%
            </span>
          </div>

          <div style={{
            width: '100%',
            height: '8px',
            background: 'var(--bg-elevated)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${averageQuizScore}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--accent-emerald) 0%, #059669 100%)',
              borderRadius: 'var(--radius-full)'
            }} />
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <strong>{totalQuizzesTaken}</strong> {language === 'Tamil' ? 'தேர்வுகள் எழுதப்பட்டுள்ளன' : 'quizzes completed so far'}
          </div>

          <button className="btn-outline" style={{ marginTop: 'auto' }} onClick={() => setCurrentTab('quiz')}>
            <span>{language === 'Tamil' ? 'புதிய தேர்வு எழுது' : 'Take a Quiz'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Recommended Next Topic Card */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(255, 153, 0, 0.08) 0%, rgba(15, 23, 42, 0.6) 100%)',
        border: '1px solid var(--border-hover)',
        padding: '1.75rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--primary)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Target size={24} />
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
              {language === 'Tamil' ? 'பரிந்துரைக்கப்படும் அடுத்த பாடம்:' : 'Recommended Next Milestone:'}
            </span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
              {language === 'Tamil' ? nextMilestone.tamilTitle : nextMilestone.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem', maxWidth: '600px' }}>
              {language === 'Tamil' ? nextMilestone.tamilSummary : nextMilestone.shortSummary}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="btn-secondary"
            onClick={() => {
              setInitialChatQuery(`Teach me about ${nextMilestone.title} step-by-step`);
              setCurrentTab('chat');
            }}
          >
            <Sparkles size={16} />
            <span>Ask AI</span>
          </button>
          <button
            className="btn-primary"
            onClick={() => setCurrentTab('roadmap')}
          >
            <span>{language === 'Tamil' ? 'பாடத்தை தொடங்கு' : 'Start Milestone'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
