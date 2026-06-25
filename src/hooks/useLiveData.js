import { useState, useEffect } from 'react'

// Fetch live data from Supabase; fall back to staticFallback if the
// table is empty or the request fails (useful during dev with no data yet).
export default function useLiveData(apiFn, staticFallback) {
  const [data, setData] = useState(staticFallback)
  useEffect(() => {
    apiFn().then((live) => {
      if (live && Array.isArray(live) && live.length) setData(live)
    })
  }, [])
  return data
}
