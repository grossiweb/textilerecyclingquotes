// src/app/page.js — Home page (renders page with slug "home" or first published page)
import { getPublishedPages, getSite } from '../lib/supabase'
import { BlockRenderer } from '../components/BlockRenderer'

export default async function HomePage() {
  const [pages, site] = await Promise.all([getPublishedPages(), getSite()])
  const home = pages.find(p=>p.slug==='home'||p.slug==='index') || pages[0]

  if (!home) return (
    <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16, color:'#64748B' }}>
      <div style={{ fontSize:48 }}>🚀</div>
      <h1 style={{ fontWeight:800, color:'#0f172a' }}>Site is live!</h1>
      <p>Publish your first page in the WebAgent CMS to see it here.</p>
    </div>
  )

  return <PageContent page={home} site={site}/>
}

// ── Shared page renderer ──────────────────────────────────────────────────
function PageContent({ page, site }) {
  const blocks = page.blocks || []
  return (
    <>
      {/* SEO structured data */}
      {page.seo?.schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: page.seo.schema }}/>
      )}
      {/* Breadcrumbs for non-home pages */}
      {page.slug !== 'home' && (
        <div style={{ padding:'12px 24px', background:'#f8fafc', borderBottom:'1px solid #e2e8f0', fontSize:13, color:'#64748B' }}>
          <a href="/" style={{ color:'#3B82F6', textDecoration:'none' }}>Home</a>
          <span style={{ margin:'0 8px' }}>›</span>
          {page.title}
        </div>
      )}
      {/* Render all blocks */}
      {blocks.length ? (
        blocks.map((block,i)=><BlockRenderer key={block.instanceId||i} block={block} site={site}/>)
      ) : (
        <div style={{ padding:'80px 24px', textAlign:'center', color:'#94A3B8' }}>
          <div style={{ fontSize:40, marginBottom:12 }}>📄</div>
          <h2 style={{ fontWeight:700, color:'#0f172a' }}>{page.title}</h2>
          <p>This page has no blocks yet. Add blocks in the CMS editor.</p>
        </div>
      )}
      {/* Interlinks */}
      {(page.interlinking||[]).length>0 && (
        <section style={{ padding:'40px 24px', background:'#f8fafc', borderTop:'1px solid #e2e8f0' }}>
          <div style={{ maxWidth:1100, margin:'0 auto' }}>
            <p style={{ fontWeight:600, marginBottom:12, color:'#475569' }}>Related Pages:</p>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {page.interlinking.map(slug=>(
                <a key={slug} href={`/${slug}`} style={{ padding:'5px 12px', background:'#fff', border:'1px solid #e2e8f0', borderRadius:20, fontSize:13, color:'#3B82F6', textDecoration:'none' }}>→ {slug}</a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export { PageContent, NotFound }

function NotFound() {
  return (
    <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:12, color:'#64748B' }}>
      <div style={{ fontSize:64 }}>404</div>
      <h2 style={{ fontWeight:800, color:'#0f172a' }}>Page not found</h2>
      <a href="/" style={{ color:'#3B82F6', textDecoration:'none', fontWeight:600 }}>← Back to home</a>
    </div>
  )
}
