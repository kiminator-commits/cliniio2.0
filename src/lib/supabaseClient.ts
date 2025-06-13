import { createClient } from '@supabase/supabase-js';
import { getEnv } from './getEnv';

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

// Create a mock client for testing
const mockClient = {
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: [], error: null }),
    update: () => Promise.resolve({ data: [], error: null }),
    delete: () => Promise.resolve({ data: [], error: null }),
  }),
  auth: {
    signIn: () => Promise.resolve({ data: { user: null }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
  },
};

// Use mock client in test environment, real client otherwise
const supabase =
  process.env.NODE_ENV === 'test'
    ? mockClient
    : createClient(supabaseUrl || '', supabaseAnonKey || '');

export default supabase;
