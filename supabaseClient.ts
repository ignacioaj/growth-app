import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uhwfmfpchbbyfhenmliw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVod2ZtZnBjaGJieWZoZW5tbGl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMDA3NDgsImV4cCI6MjA4MTU3Njc0OH0.6VRmPTmqFPrb9rUowd-tOOBgMEqcmQtpyo7nJjmwD20'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
