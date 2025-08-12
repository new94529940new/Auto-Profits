import { getSupabaseClient } from '../../lib/supabase'

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const supabase = getSupabaseClient()

  if (req.method === 'POST') {
    const { method='bank', amount=0, reference='', note='' } = req.body || {}
    const { data, error } = await supabase
      .from('payments')
      .insert({ method, amount, reference, note, ts: Date.now() })
      .select()
    if (error) return res.status(500).json({ ok:false, error: error.message })
    return res.status(200).json({ ok:true, item: data?.[0] })
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('ts', { ascending:false })
      .limit(100)
    if (error) return res.status(500).json({ ok:false, error: error.message })
    return res.status(200).json({ ok:true, items: data || [] })
  }

  return res.status(405).json({ ok:false, error:'Method Not Allowed' })
}
