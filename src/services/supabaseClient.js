import { createClient } from '@supabase/supabase-js';

// Default / fallback keys from env or localStorage
const getStoredCredentials = () => {
  const url = localStorage.getItem('cloudmentor_supabase_url') || import.meta.env.VITE_SUPABASE_URL || '';
  const key = localStorage.getItem('cloudmentor_supabase_anon_key') || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  return { url, key };
};

let supabaseInstance = null;

export const getSupabaseClient = () => {
  const { url, key } = getStoredCredentials();
  if (url && key && url.startsWith('http')) {
    try {
      if (!supabaseInstance) {
        supabaseInstance = createClient(url, key);
      }
      return supabaseInstance;
    } catch (e) {
      console.warn('Failed to initialize Supabase client:', e);
      return null;
    }
  }
  return null;
};

export const updateSupabaseCredentials = (url, key) => {
  if (url && key) {
    localStorage.setItem('cloudmentor_supabase_url', url);
    localStorage.setItem('cloudmentor_supabase_anon_key', key);
    supabaseInstance = createClient(url, key);
    return true;
  } else {
    localStorage.removeItem('cloudmentor_supabase_url');
    localStorage.removeItem('cloudmentor_supabase_anon_key');
    supabaseInstance = null;
    return false;
  }
};

export const isSupabaseConfigured = () => {
  const { url, key } = getStoredCredentials();
  return Boolean(url && key && url.startsWith('http'));
};

/* =========================================================
   Hybrid Storage Engine (Supabase Cloud + LocalStorage)
   Guarantees 100% offline functionality & immediate responsiveness
========================================================= */

// User Profile
export const getUserProfile = async () => {
  const local = localStorage.getItem('cloudmentor_user_profile');
  const defaultProfile = {
    name: 'Cloud Aspirant',
    level: 'Beginner',
    xp: 120,
    dailyStreak: 3,
    preferredLanguage: 'English' // 'English' | 'Tamil'
  };

  const parsedLocal = local ? JSON.parse(local) : defaultProfile;
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client.from('profiles').select('*').limit(1).single();
      if (!error && data) {
        return { ...parsedLocal, ...data };
      }
    } catch {
      // fallback
    }
  }
  return parsedLocal;
};

export const saveUserProfile = async (profile) => {
  localStorage.setItem('cloudmentor_user_profile', JSON.stringify(profile));
  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('profiles').upsert([profile]);
    } catch (e) {
      console.error('Supabase profile save error:', e);
    }
  }
};

// Chat History
export const getChatHistory = async () => {
  const local = localStorage.getItem('cloudmentor_chat_history');
  return local ? JSON.parse(local) : [];
};

export const saveChatMessage = async (message) => {
  const existing = await getChatHistory();
  const updated = [...existing, message];
  // keep last 50 messages locally
  if (updated.length > 50) updated.shift();
  localStorage.setItem('cloudmentor_chat_history', JSON.stringify(updated));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('chat_history').insert([
        {
          sender: message.sender,
          text: message.text,
          language: message.language || 'English',
          created_at: new Date().toISOString()
        }
      ]);
    } catch (e) {
      console.error('Supabase chat save error:', e);
    }
  }
  return updated;
};

export const clearChatHistory = async () => {
  localStorage.removeItem('cloudmentor_chat_history');
  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('chat_history').delete().neq('id', '0');
    } catch (e) {
      console.warn('Could not clear Supabase chat table:', e);
    }
  }
};

// Roadmap Progress
export const getRoadmapProgress = () => {
  const local = localStorage.getItem('cloudmentor_roadmap_progress');
  return local ? JSON.parse(local) : ['cloud_basics', 'networking_basics']; // default starter completed
};

export const toggleRoadmapItem = async (milestoneId) => {
  const current = getRoadmapProgress();
  let updated;
  if (current.includes(milestoneId)) {
    updated = current.filter(id => id !== milestoneId);
  } else {
    updated = [...current, milestoneId];
  }
  localStorage.setItem('cloudmentor_roadmap_progress', JSON.stringify(updated));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('user_progress').upsert([{
        type: 'roadmap',
        completed_items: updated,
        updated_at: new Date().toISOString()
      }]);
    } catch (e) {
      console.warn('Supabase roadmap sync error:', e);
    }
  }
  return updated;
};

// Completed Services
export const getCompletedServices = () => {
  const local = localStorage.getItem('cloudmentor_completed_services');
  return local ? JSON.parse(local) : ['ec2', 's3'];
};

export const toggleCompletedService = (serviceId) => {
  const current = getCompletedServices();
  let updated;
  if (current.includes(serviceId)) {
    updated = current.filter(id => id !== serviceId);
  } else {
    updated = [...current, serviceId];
  }
  localStorage.setItem('cloudmentor_completed_services', JSON.stringify(updated));
  return updated;
};

// Quiz Scores & History
export const getQuizHistory = () => {
  const local = localStorage.getItem('cloudmentor_quiz_history');
  return local ? JSON.parse(local) : [];
};

export const saveQuizScore = async (quizData) => {
  const history = getQuizHistory();
  const entry = {
    id: 'quiz_' + Date.now(),
    date: new Date().toISOString(),
    ...quizData
  };
  const updated = [entry, ...history];
  localStorage.setItem('cloudmentor_quiz_history', JSON.stringify(updated));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('quiz_scores').insert([entry]);
    } catch (e) {
      console.warn('Supabase quiz score sync error:', e);
    }
  }
  return updated;
};
