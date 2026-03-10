import { getPublishedPages, getPageBySlug, getSite } from '../../lib/supabase'
import { PageContent, NotFound } from '../page'

export async function generateStaticParams() {
  const pages = await getPublishedPages()
  return pages
    .filter(p => p.slug && p.slug !== 'home' && p.slug !== 'index')
    .map(p => ({
      // Split slug into array segments for catch-all route
      // e.g. "services/web-design" → ["services", "web-design"]
      slug: p.slug.split('/').filter(Boolean),
    }))
}

export default async function DynamicPage({ params }) {
  const { slug } = await params
  // Join array segments back into a single slug string for DB query
  // e.g. ["services", "web-design"] → "services/web-design"
  const fullSlug = Array.isArray(slug) ? slug.join('/') : slug
  const [page, site] = await Promise.all([getPageBySlug(fullSlug), getSite()])
  if (!page) return <NotFound/>
  return <PageContent page={page} site={site}/>
}
