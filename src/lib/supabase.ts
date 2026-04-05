import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://wlypvymrvgeteesbldho.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndseXB2eW1ydmdldGVlc2JsZGhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzNTk5OTUsImV4cCI6MjA5MDkzNTk5NX0.xpP53Y3FGp1p09jSNUhAvHmqMaPKHcAJHJnlSC8MWq8'
);
