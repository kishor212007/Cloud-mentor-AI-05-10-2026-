import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  Copy, 
  Check, 
  Trash2, 
  Languages, 
  Terminal, 
  Lightbulb, 
  ArrowRight,
  BookOpen,
  HelpCircle,
  Download
} from 'lucide-react';
import { queryCloudMentorAI, predefinedQuestions } from '../data/aiKnowledgeBase';
import { getChatHistory, saveChatMessage, clearChatHistory } from '../services/supabaseClient';

export default function ChatbotView({ initialQuery, language, setLanguage }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize chat
  useEffect(() => {
    const loadHistory = async () => {
      const history = await getChatHistory();
      if (history && history.length > 0) {
        setMessages(history);
      } else {
        // Default welcoming message
        const welcomeMsg = {
          id: 'msg_welcome',
          sender: 'bot',
          title: language === 'Tamil' ? 'வணக்கம்! நான் CloudMentor AI' : 'Welcome to CloudMentor AI!',
          text: language === 'Tamil'
            ? 'நான் உங்கள் கிளவுட் மற்றும் AWS கற்றல் வழிகாட்டி. EC2, S3, IAM, VPC, Lambda அல்லது எந்த ஒரு கிளவுட் கேள்வியையும் நீங்கள் கேட்கலாம். எளிய உதாரணங்கள் மற்றும் தமிழில் விளக்குகிறேன்!'
            : 'I am your personal AI mentor for Cloud Computing and AWS. Ask me anything like "What is Amazon EC2?", "What is S3?", or "Difference between EC2 & Lambda". I explain concepts step-by-step with real-world analogies!',
          analogy: language === 'Tamil'
            ? 'கிளவுட் சேவைகள் மின்சார பயன்பாடு போன்றவை - பயன்படுத்தியதற்கு மட்டும் கட்டணம்!'
            : 'Cloud services are like utility power: turn the switch on when needed, and pay only for units consumed.',
          steps: [
            language === 'Tamil' ? '1. எளிய கேள்விகளை கீழே தேர்ந்தெடுக்கலாம்.' : '1. Try asking simple beginner questions from the suggestions below.',
            language === 'Tamil' ? '2. "Explain in Tamil" என்று குறிப்பிட்டால் தமிழில் விளக்குவேன்.' : '2. Click "Explain in Tamil" on any response for local language explanations.',
            language === 'Tamil' ? '3. உதாரணங்கள் மற்றும் CLI கட்டளைகளைப் பார்க்கலாம்.' : '3. Check out the hands-on real-world examples and CLI snippets.'
          ],
          suggestedFollowUps: [
            "What is Amazon EC2?",
            "What is Amazon S3?",
            "Difference between EC2 and Lambda?",
            "Explain AWS IAM in Tamil"
          ],
          language: language,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([welcomeMsg]);
      }
    };
    loadHistory();
  }, [language]);

  // Handle initial query if forwarded from HomeView
  useEffect(() => {
    if (initialQuery && initialQuery.trim().length > 0) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : inputText;
    if (!query.trim()) return;

    const userMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    saveChatMessage(userMessage);
    setInputText('');
    setIsTyping(true);

    // Check optional Gemini API Key
    const geminiKey = localStorage.getItem('cloudmentor_gemini_api_key');

    // Simulate natural AI thinking time (400-800ms)
    setTimeout(async () => {
      let aiResponse;
      if (geminiKey && geminiKey.trim()) {
        try {
          // Live Gemini call fallback
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `You are CloudMentor AI, an expert beginner-friendly AWS and Cloud instructor. The student asks: "${query}". Provide a beginner-friendly explanation with: 1) Simple Definition, 2) Real-world example/analogy, 3) Step-by-step bullet points, 4) AWS CLI snippet if relevant. Prefer ${language} language.`
                }]
              }]
            })
          });
          const data = await res.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            aiResponse = {
              title: 'CloudMentor AI Answer',
              summary: rawText,
              analogy: 'Real-world practical implementation in cloud architecture.',
              steps: ['Understood from Gemini live inference'],
              suggestedFollowUps: ['What is Amazon EC2?', 'What is Amazon S3?']
            };
          } else {
            aiResponse = queryCloudMentorAI(query, language);
          }
        } catch {
          aiResponse = queryCloudMentorAI(query, language);
        }
      } else {
        // Built-in intelligent knowledge base
        aiResponse = queryCloudMentorAI(query, language);
      }

      const botMessage = {
        id: 'msg_' + (Date.now() + 1),
        sender: 'bot',
        title: aiResponse.title,
        text: aiResponse.summary,
        analogy: aiResponse.analogy,
        steps: aiResponse.steps,
        codeSnippet: aiResponse.codeSnippet,
        suggestedFollowUps: aiResponse.suggestedFollowUps,
        language: aiResponse.language || language,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      saveChatMessage(botMessage);
      setIsTyping(false);
    }, 700);
  };

  const handleExplainInOtherLanguage = (msgIndex, targetLang) => {
    const targetMsg = messages[msgIndex];
    if (!targetMsg) return;

    // Find the original query from preceding user message or current message
    let queryContext = targetMsg.title || targetMsg.text;
    if (msgIndex > 0 && messages[msgIndex - 1].sender === 'user') {
      queryContext = messages[msgIndex - 1].text;
    }

    const rephrased = queryCloudMentorAI(queryContext, targetLang);
    const updated = [...messages];
    updated[msgIndex] = {
      ...targetMsg,
      title: rephrased.title,
      text: rephrased.summary,
      analogy: rephrased.analogy,
      steps: rephrased.steps,
      codeSnippet: rephrased.codeSnippet,
      suggestedFollowUps: rephrased.suggestedFollowUps,
      language: targetLang
    };
    setMessages(updated);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    if (window.confirm('Do you want to clear your current chat history?')) {
      clearChatHistory();
      setMessages([]);
    }
  };

  const handleExportChat = () => {
    const textContent = messages.map(m => `[${m.timestamp}] ${m.sender.toUpperCase()}: ${m.text || ''}\n${m.analogy ? `Example: ${m.analogy}\n` : ''}`).join('\n---\n');
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CloudMentor-Chat-${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fade-in" style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 120px)',
      maxHeight: '850px',
      gap: '1rem'
    }}>
      {/* Top Chat Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1rem',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
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
            <Bot size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
              CloudMentor Assistant
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-emerald)' }}></span>
              {language === 'Tamil' ? 'ஆன்லைன் | தமிழ் மற்றும் ஆங்கிலம்' : 'Online | Bilingual AWS Mentor'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            className="btn-icon" 
            onClick={handleExportChat} 
            title="Export Chat History"
          >
            <Download size={15} />
          </button>
          <button 
            className="btn-icon" 
            onClick={handleClearChat} 
            title="Clear Chat"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Messages Stream Container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)'
      }}>
        {messages.map((msg, index) => {
          const isBot = msg.sender === 'bot';
          return (
            <div
              key={msg.id || index}
              style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start',
                flexDirection: isBot ? 'row' : 'row-reverse',
                maxWidth: '90%',
                alignSelf: isBot ? 'flex-start' : 'flex-end'
              }}
            >
              {/* Avatar */}
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: isBot ? 'var(--primary-light)' : 'var(--bg-elevated)',
                border: `1px solid ${isBot ? 'var(--primary)' : 'var(--border-subtle)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isBot ? 'var(--primary)' : 'var(--text-main)',
                flexShrink: 0
              }}>
                {isBot ? <Bot size={18} /> : <User size={18} />}
              </div>

              {/* Message Bubble */}
              <div style={{
                background: isBot ? 'var(--bg-card)' : 'linear-gradient(135deg, var(--primary) 0%, #EA580C 100%)',
                color: isBot ? 'var(--text-main)' : '#FFFFFF',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-lg)',
                border: isBot ? '1px solid var(--border-subtle)' : 'none',
                boxShadow: isBot ? 'var(--shadow-sm)' : '0 4px 12px var(--primary-glow)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                maxWidth: '680px'
              }}>
                {/* Title & Language Indicator for Bot */}
                {isBot && msg.title && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '1rem', color: 'var(--primary)' }}>
                      <Sparkles size={15} />
                      <span>{msg.title}</span>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'var(--bg-elevated)' }}>
                      {msg.language || 'English'}
                    </span>
                  </div>
                )}

                {/* Main Explanation */}
                <div style={{ fontSize: '0.93rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                  {msg.text}
                </div>

                {/* Real-World Analogy Highlight */}
                {isBot && msg.analogy && (
                  <div style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--primary-light)',
                    borderLeft: '3px solid var(--primary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Lightbulb size={14} />
                      <span>{msg.language === 'Tamil' ? 'நிஜ உலக உதாரணம் (Real-World Analogy):' : 'Real-World Example / Analogy:'}</span>
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                      {msg.analogy}
                    </div>
                  </div>
                )}

                {/* Step-by-Step Breakdown */}
                {isBot && msg.steps && msg.steps.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                      {msg.language === 'Tamil' ? 'படி-படியான விளக்கம்:' : 'Step-by-Step Breakdown:'}
                    </div>
                    {msg.steps.map((st, i) => (
                      <div key={i} style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                        {st}
                      </div>
                    ))}
                  </div>
                )}

                {/* Code / CLI Snippet */}
                {isBot && msg.codeSnippet && (
                  <div style={{ position: 'relative' }}>
                    <pre className="code-block" style={{ margin: 0 }}>
                      <code>{msg.codeSnippet}</code>
                    </pre>
                    <button
                      className="code-copy-btn"
                      onClick={() => handleCopy(msg.codeSnippet, msg.id)}
                    >
                      {copiedId === msg.id ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  </div>
                )}

                {/* Action buttons on bot messages */}
                {isBot && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                      {msg.timestamp}
                    </span>

                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {msg.language !== 'Tamil' ? (
                        <button
                          onClick={() => handleExplainInOtherLanguage(index, 'Tamil')}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontSize: '0.75rem',
                            background: 'var(--bg-elevated)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--primary)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          <Languages size={12} />
                          <span>Explain in Tamil (தமிழில்)</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleExplainInOtherLanguage(index, 'English')}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontSize: '0.75rem',
                            background: 'var(--bg-elevated)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--secondary)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          <Languages size={12} />
                          <span>Explain in English</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Follow-up question chips */}
                {isBot && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginTop: '0.25rem' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                      {msg.language === 'Tamil' ? 'தொடர்புடைய அடுத்த கேள்விகள்:' : 'Suggested follow-up questions:'}
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {msg.suggestedFollowUps.map((fu, fIdx) => (
                        <button
                          key={fIdx}
                          onClick={() => handleSendMessage(fu)}
                          style={{
                            fontSize: '0.74rem',
                            background: 'var(--bg-elevated)',
                            color: 'var(--text-main)',
                            border: '1px solid var(--border-subtle)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: 'var(--radius-full)',
                            cursor: 'pointer'
                          }}
                        >
                          {fu}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing animation bubble */}
        {isTyping && (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)'
            }}>
              <Bot size={18} />
            </div>
            <div style={{
              background: 'var(--bg-card)',
              padding: '0.85rem 1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', animation: 'typingDots 1.4s infinite ease-in-out', animationDelay: '0s' }}></div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', animation: 'typingDots 1.4s infinite ease-in-out', animationDelay: '0.2s' }}></div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', animation: 'typingDots 1.4s infinite ease-in-out', animationDelay: '0.4s' }}></div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
                {language === 'Tamil' ? 'விளக்கம் தயாராகிறது...' : 'CloudMentor is thinking...'}
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Question Carousel */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        padding: '0.2rem 0',
        whiteSpace: 'nowrap'
      }}>
        {predefinedQuestions.map((pq, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(pq)}
            style={{
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              transition: 'all var(--transition-fast)'
            }}
          >
            <HelpCircle size={12} color="var(--primary)" />
            <span>{pq}</span>
          </button>
        ))}
      </div>

      {/* Input Message Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }} style={{
        display: 'flex',
        gap: '0.5rem',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-hover)',
        padding: '0.4rem 0.5rem 0.4rem 1rem',
        alignItems: 'center',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <input
          type="text"
          placeholder={language === 'Tamil' ? 'கேள்வி கேளுங்கள்... (எ.கா. What is Amazon EC2?)' : 'Ask anything about AWS or Cloud (e.g. Difference between EC2 & Lambda)...'}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-main)',
            fontSize: '0.95rem'
          }}
        />

        {/* Explain in Tamil quick toggle button */}
        <button
          type="button"
          onClick={() => {
            if (inputText.trim()) {
              handleSendMessage(inputText + ' (explain in Tamil)');
            } else {
              handleSendMessage('Explain Amazon EC2 in Tamil');
            }
          }}
          className="btn-secondary"
          style={{
            fontSize: '0.75rem',
            padding: '0.4rem 0.75rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-elevated)'
          }}
          title="Explain in Tamil"
        >
          <Languages size={13} color="var(--primary)" />
          <span>தமிழ்</span>
        </button>

        <button 
          type="submit" 
          className="btn-primary" 
          disabled={!inputText.trim()}
          style={{
            opacity: !inputText.trim() ? 0.6 : 1,
            padding: '0.65rem 1.2rem',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <span>{language === 'Tamil' ? 'அனுப்பு' : 'Send'}</span>
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
