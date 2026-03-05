import { getPublishedPages, getPageBySlug, getSite } from '../../lib/supabase'
import { PageContent, NotFound } from '../page'

export async function generateStaticParams() {
  const pages = await getPublishedPages()
  return pages.filter(p=>p.slug!=='home').map(p=>({ slug:p.slug }))
}

export default async function DynamicPage({ params }) {
  const { slug } = await params
  const [page, site] = await Promise.all([getPageBySlug(slug), getSite()])
  if (!page) return <NotFound/>
  return <PageContent page={page} site={site}/>
}
