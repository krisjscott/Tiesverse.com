// Public API client for the main site.
// Reads from the Node.js backend (tiesversewebsite/backend) which proxies Supabase.

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function get(path) {
  try {
    const res = await fetch(`${API}${path}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export const fetchEvents = () => get('/api/events');
export const fetchFeaturedEvent = () => get('/api/events/featured');
export const fetchArticles = () => get('/api/articles');
export const fetchYoutubeVideos = () => get('/api/youtube-videos');
export const fetchWorkshops = () => get('/api/workshops');
export const fetchTeam = () => get('/api/team');
export const fetchGuests = () => get('/api/guests');
export const fetchSettings = () => get('/api/settings');

// Webinar events – read from Node.js which proxies Turso via webinar site
export const fetchWebinarEvents = () => get('/api/webinar/events');

// Career positions – public (no auth needed for listing open positions)
export const fetchOpenPositions = async () => {
  const data = await get('/api/career/positions');
  if (!data) return [];
  return data.filter((p) => p.position_var);
};
