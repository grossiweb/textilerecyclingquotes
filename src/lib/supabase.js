import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID

// ── Site data ──────────────────────────────────────────────────────────────
export async function getSite() {
  const { data } = await supabase.from('sites').select('id,name,slug,domain,settings').eq('id', SITE_ID).single()
  return data
}

// ── All published pages ────────────────────────────────────────────────────
export async function getPublishedPages() {
  const { data } = await supabase.from('pages')
    .select('id,title,slug,blocks,seo,interlinking,page_type_id,sort_order,published_at,page_types(name,slug,icon,color)')
    .eq('site_id', SITE_ID).eq('status','published').order('sort_order')
  return data || []
}

// ── Single page by slug ────────────────────────────────────────────────────
export async function getPageBySlug(slug) {
  const { data } = await supabase.from('pages')
    .select('*,page_types(name,slug,icon,color)')
    .eq('site_id', SITE_ID).eq('slug', slug).eq('status','published').single()
  return data
}

// ── Menus ──────────────────────────────────────────────────────────────────
export async function getMenus() {
  const { data } = await supabase.from('menus').select('*').eq('site_id', SITE_ID).eq('is_active', true)
  return data || []
}

export async function getMenuByLocation(location) {
  const { data } = await supabase.from('menus').select('*').eq('site_id', SITE_ID).eq('location', location).single()
  return data
}
