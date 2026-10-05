import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Map, 
  Boxes, 
  HelpCircle, 
  Briefcase, 
  FolderGit2, 
  Terminal, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Languages, 
  Flame,
  Award,
  ChevronRight
} from 'lucide-react';

export default function HomeView({ setCurrentTab, language, setInitialChatQuery }) {
  const [quickInput, setQuickInput] = useState('');

  const handleQuickAsk = (e) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    setInitialChatQuery(quickInput);
    setCurrentTab('chat');
  };

  const sampleQuestions = [
    "What is Amazon EC2?",
    "Difference between EC2 and Lambda?",
    "What is Amazon S3?",
    "Explain IAM in Tamil"
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '3rem 1.5rem',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(180deg, rgba(255, 153, 0, 0.08) 0%, rgba(15, 23, 42, 0.4) 100%)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Glow elements */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '350px',
          height: '180px',
          background: 'radial-gradient(ellipse, var(--primary-glow) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Badge */}
        <div className="section-tag" style={{ marginBottom: '1.25rem' }}>
          <Sparkles size={14} />
          <span>{language === 'Tamil' ? 'AI-ஆல் இயக்கப்படும் கிளவுட் வழிகாட்டி' : 'Next-Gen Cloud Learning Platform'}</span>
        </div>

        {/* Main Title */}
        <h1 style={{
          fontSize: 'clamp(2.4rem, 5vw, 4rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          maxWidth: '900px',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #FFFFFF 30%, var(--primary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {language === 'Tamil' ? 'கிளவுட் கற்றுக்கொள். AWS தேர்ச்சி பெறு. எதிர்காலத்தை உருவாக்கு.' : 'Learn Cloud. Master AWS. Build Your Future.'}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'var(--text-muted)',
          maxWidth: '680px',
          marginBottom: '2rem',
          lineHeight: 1.6
        }}>
          {language === 'Tamil'
            ? 'மாணவர்கள் மற்றும் தொடக்கநிலையாளர்களுக்கு கிளவுட் கம்ப்யூட்டிங் & AWS தொழில்நுட்பங்களை எளிய தமிழில் மற்றும் ஆங்கிலத்தில் கற்றுத்தரும் இன்டராக்டிவ் AI வழிகாட்டி.'
            : 'Your AI-powered assistant for learning Cloud Computing and Amazon Web Services (AWS) with simplified analogies, bilingual explanations, interactive roadmaps, and interview drills.'}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <button 
            className="btn-primary" 
            style={{ fontSize: '1.05rem', padding: '0.85rem 1.8rem' }}
            onClick={() => setCurrentTab('roadmap')}
          >
            <Map size={18} />
            <span>{language === 'Tamil' ? 'கற்றலைத் தொடங்கு (Start Learning)' : 'Start Learning'}</span>
            <ArrowRight size={18} />
          </button>

          <button 
            className="btn-secondary" 
            style={{ fontSize: '1.05rem', padding: '0.85rem 1.8rem' }}
            onClick={() => setCurrentTab('chat')}
          >
            <Sparkles size={18} color="var(--primary)" />
            <span>{language === 'Tamil' ? 'AI-யிடம் கேள் (Ask AI)' : 'Ask AI'}</span>
          </button>
        </div>

        {/* Quick Ask Bar */}
        <form onSubmit={handleQuickAsk} style={{
          maxWidth: '650px',
          width: '100%',
          display: 'flex',
          gap: '0.5rem',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-hover)',
          borderRadius: 'var(--radius-full)',
          padding: '0.35rem 0.45rem 0.35rem 1.2rem',
          boxShadow: 'var(--shadow-md)',
          alignItems: 'center'
        }}>
          <Sparkles size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
          <input
            type="text"
            placeholder={language === 'Tamil' ? 'எந்த ஒரு கிளவுட் கேள்வியையும் கேளுங்கள்... (எ.கா. What is EC2?)' : 'Ask anything about Cloud or AWS (e.g., What is S3 vs EBS?)...'}
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-main)',
              fontSize: '0.95rem'
            }}
          />
          <button type="submit" className="btn-primary" style={{ borderRadius: 'var(--radius-full)', padding: '0.55rem 1.2rem', fontSize: '0.88rem' }}>
            <span>{language === 'Tamil' ? 'கேள்' : 'Ask'}</span>
            <ArrowRight size={15} />
          </button>
        </form>

        {/* Sample prompt pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', alignSelf: 'center' }}>
            {language === 'Tamil' ? 'உடனடி கேள்விகள்:' : 'Try asking:'}
          </span>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInitialChatQuery(q);
                setCurrentTab('chat');
              }}
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'var(--primary)';
                e.target.style.color = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'var(--border-subtle)';
                e.target.style.color = 'var(--text-muted)';
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </section>

      {/* Target Audiences & Key Statistics */}
      <section className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'var(--primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)'
          }}>
            <Map size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>16 Milestones</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {language === 'Tamil' ? 'அடிப்படை முதல் அட்வான்ஸ்டு வரை' : 'Foundations to Cloud Architect'}
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'var(--secondary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--secondary)'
          }}>
            <Boxes size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>10+ AWS Services</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {language === 'Tamil' ? 'எளிய உதாரணங்கள் & CLI கட்டளைகள்' : 'With Beginner Examples & CLI'}
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'var(--accent-emerald-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-emerald)'
          }}>
            <Languages size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>Bilingual AI</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {language === 'Tamil' ? 'தமிழ் & ஆங்கிலம் விளக்கம்' : 'English & Tamil Explanations'}
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(168, 85, 247, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-purple)'
          }}>
            <Briefcase size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>30+ Interview Drills</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {language === 'Tamil' ? 'கேம்பஸ் & வேலைவாய்ப்பு தயாரிப்பு' : 'Campus Placement & Scenario Prep'}
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Modules Grid */}
      <section>
        <div className="section-header">
          <div className="section-tag">
            <Cpu size={14} />
            <span>{language === 'Tamil' ? 'முழுமையான கற்றல் களம்' : 'Platform Modules'}</span>
          </div>
          <h2 className="section-title">
            {language === 'Tamil' ? 'கிளவுட் மாஸ்டர் ஆவதற்கு தேவையான அனைத்தும்' : 'Everything You Need to Master AWS'}
          </h2>
          <p className="section-desc">
            {language === 'Tamil'
              ? 'பாடங்கள், நேரடி தேர்வுகள், நேர்காணல் வழிகாட்டல்கள் மற்றும் திட்டப் பணிகள் அனைத்தும் ஒரே இடத்தில்.'
              : 'Structured step-by-step pathways tailored for college engineering students, beginners, and certification candidates.'}
          </p>
        </div>

        <div className="grid-3">
          {/* Card 1: AI Chatbot */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)'
              }}>
                <Sparkles size={20} />
              </div>
              <span className="badge badge-beginner">Interactive AI</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              {language === 'Tamil' ? 'AI சாட்பாட் வழிகாட்டி' : 'AI Cloud Chatbot'}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>
              {language === 'Tamil'
                ? 'சிக்கலான கிளவுட் கருத்துகளை எளிய உதாரணங்கள் மற்றும் தமிழ்/ஆங்கில விளக்கங்களுடன் 24/7 கற்றுக்கொள்ளுங்கள்.'
                : 'Ask questions like "What is EC2?", "Explain S3", or "Difference between EC2 & Lambda" in plain English or Tamil.'}
            </p>
            <button className="btn-outline" onClick={() => setCurrentTab('chat')}>
              <span>{language === 'Tamil' ? 'சாட் செய்ய தொடங்கு' : 'Chat with AI'}</span>
              <ChevronRight size={15} />
            </button>
          </div>

          {/* Card 2: Roadmap */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'var(--secondary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--secondary)'
              }}>
                <Map size={20} />
              </div>
              <span className="badge badge-intermediate">16 Steps</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              {language === 'Tamil' ? '16-படி கிளவுட் ரோடுமேப்' : 'Cloud Learning Roadmap'}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>
              {language === 'Tamil'
                ? 'நெட்வொர்க்கிங், லினக்ஸ், EC2, S3, VPC முதல் சர்வர்லெஸ் மற்றும் ஆட்டோ ஸ்கேலிங் வரை முழுமையான வரைபடம்.'
                : 'Step-by-step syllabus from basic networking and Linux up to IAM, VPC, RDS, Lambda, and production deployments.'}
            </p>
            <button className="btn-outline" onClick={() => setCurrentTab('roadmap')}>
              <span>{language === 'Tamil' ? 'ரோடுமேப் காண்க' : 'Explore Roadmap'}</span>
              <ChevronRight size={15} />
            </button>
          </div>

          {/* Card 3: AWS Services */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'var(--accent-emerald-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-emerald)'
              }}>
                <Boxes size={20} />
              </div>
              <span className="badge badge-beginner">Core Services</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              {language === 'Tamil' ? 'AWS சேவைகள் எக்ஸ்ப்ளோரர்' : 'AWS Services Explorer'}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>
              {language === 'Tamil'
                ? 'EC2, S3, VPC, RDS, Lambda, CloudFront மற்றும் Route 53 சேவைகளின் பயன்பாடு மற்றும் நிஜ உலக உதாரணங்கள்.'
                : 'Dedicated service cards with simple definitions, real-world examples, Free Tier guidelines, and CLI commands.'}
            </p>
            <button className="btn-outline" onClick={() => setCurrentTab('services')}>
              <span>{language === 'Tamil' ? 'சேவைகளை காண்க' : 'View Services'}</span>
              <ChevronRight size={15} />
            </button>
          </div>

          {/* Card 4: Quiz & Practice */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F59E0B'
              }}>
                <HelpCircle size={20} />
              </div>
              <span className="badge badge-intermediate">Quizzes & Drills</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              {language === 'Tamil' ? 'AWS வினாடி வினா & பயிற்சி' : 'AWS Quizzes & Practice Drills'}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>
              {language === 'Tamil'
                ? 'தொடக்க, இடைநிலை மற்றும் உயர் நிலை வினாக்கள். உடனடி மதிப்பெண் மற்றும் விரிவான தமிழ் விளக்கங்கள்.'
                : 'Multiple-choice questions with 4 options, instant scoring, answer feedback, and targeted topic-based practice drills.'}
            </p>
            <button className="btn-outline" onClick={() => setCurrentTab('quiz')}>
              <span>{language === 'Tamil' ? 'வினாடி வினா தொடங்கு' : 'Take Quiz'}</span>
              <ChevronRight size={15} />
            </button>
          </div>

          {/* Card 5: Interview Prep */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'var(--accent-purple)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Briefcase size={20} />
              </div>
              <span className="badge badge-advanced">Placements</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              {language === 'Tamil' ? 'AWS நேர்காணல் தயாரிப்பு' : 'AWS Interview Preparation'}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>
              {language === 'Tamil'
                ? 'அடிப்படை, தொழில்நுட்ப மற்றும் சூழ்நிலை சார்ந்த கேள்விகள். இன்டர்வியூவில் வெற்றி பெற சிறந்த டிப்ஸ்கள்.'
                : 'Basic, technical, scenario-based, and troubleshooting questions with interviewer tips and bilingual answers.'}
            </p>
            <button className="btn-outline" onClick={() => setCurrentTab('interview')}>
              <span>{language === 'Tamil' ? 'கேள்விகளை படிக்க' : 'Practice Interviews'}</span>
              <ChevronRight size={15} />
            </button>
          </div>

          {/* Card 6: Hands-on Projects */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'var(--accent-rose-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-rose)'
              }}>
                <FolderGit2 size={20} />
              </div>
              <span className="badge badge-beginner">Hands-on</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              {language === 'Tamil' ? 'நடைமுறை கிளவுட் திட்டங்கள்' : 'Hands-on Cloud Projects'}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>
              {language === 'Tamil'
                ? 'S3 இணையதளம், EC2 வெப் சர்வர், Lambda தானியங்கி ரீசைசர் போன்ற கவர்ச்சிகரமான போர்ட்ஃபோலியோ திட்டங்கள்.'
                : 'Step-by-step guides for Static Website Hosting, NGINX on EC2, Serverless Image Resizer, and Monitoring Dashboards.'}
            </p>
            <button className="btn-outline" onClick={() => setCurrentTab('projects')}>
              <span>{language === 'Tamil' ? 'திட்டங்களை பார்க்க' : 'View Projects'}</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Daily AWS Tip & Real-World Analogy Spotlight */}
      <section style={{
        background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%)',
        border: '1px solid var(--border-hover)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Flame size={20} color="var(--primary)" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary)' }}>
            {language === 'Tamil' ? 'இன்றைய கிளவுட் டிப் (Daily Cloud Tip)' : 'Daily AWS Architecture Insight'}
          </h3>
        </div>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
          <strong>{language === 'Tamil' ? 'டிஜிட்டல் லாக்கர் தத்துவம்:' : 'The Infinite Locker Concept:'}</strong>{' '}
          {language === 'Tamil'
            ? 'Amazon S3 பக்கெட்டில் கோப்புகளை சேமிக்கும் போது, ஒவ்வொரு கோப்பிற்கும் ஒரு URL முகவரி கிடைக்கும். இதற்கு நீங்கள் சர்வர் எதையும் உருவாக்கவோ, இயக்கவோ தேவையில்லை. 1 கோப்பு முதல் 1 கோடி கோப்புகள் வரை தானாகவே சேமிக்கலாம்!'
            : 'Never store user-uploaded files inside an EC2 instance filesystem directly! EC2 virtual instances should remain stateless. Always offload user photos and documents to Amazon S3 for 11 9s of durability and infinite automatic scalability.'}
        </p>
      </section>
    </div>
  );
}
