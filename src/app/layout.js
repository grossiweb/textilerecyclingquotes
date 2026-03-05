// src/app/layout.js
import { getSite, getMenuByLocation } from '../lib/supabase'

export async function generateMetadata() {
  const site = await getSite()
  return {
    title: { template:`%s | ${site?.name||'Site'}`, default: site?.name||'Site' },
    description: site?.settings?.seoDescription||'',
    openGraph: { siteName: site?.name }
  }
}

export default async function RootLayout({ children }) {
  const [site, primaryMenu] = await Promise.all([getSite(), getMenuByLocation('primary')])

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      </head>
      <body style={{ margin:0, fontFamily:'Inter,system-ui,sans-serif', color:'#0f172a' }}>
        <Nav site={site} menu={primaryMenu}/>
        <main>{children}</main>
      </body>
    </html>
  )
}

function Nav({ site, menu }) {
  const items = menu?.items || []
  return (
    <nav style={{ position:'sticky', top:0, zIndex:100, background:'rgba(255,255,255,.95)', backdropFilter:'blur(10px)', borderBottom:'1px solid #e2e8f0', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:64 }}>
      <a href="/" style={{ fontWeight:800, fontSize:18, color:'#0f172a', textDecoration:'none', letterSpacing:'-0.3px' }}>
        {site?.name || 'Site'}
      </a>
      <div style={{ display:'flex', gap:4 }}>
        {items.map(item=>(
          <a key={item.id}
            href={item.url || (item.pageId ? '#' : `/${item.label.toLowerCase()}`)}
            target={item.target||'_self'}
            style={{ padding:'6px 14px', color:'#475569', textDecoration:'none', fontSize:14, fontWeight:500, borderRadius:6, transition:'all .12s' }}
            onMouseEnter={e=>{e.target.style.background='#f1f5f9';e.target.style.color='#0f172a'}}
            onMouseLeave={e=>{e.target.style.background='';e.target.style.color='#475569'}}>
            {item.label}
          </a>
        ))}
        <a href="/contact" style={{ marginLeft:8, padding:'7px 16px', background:'#3B82F6', color:'#fff', textDecoration:'none', fontSize:14, fontWeight:600, borderRadius:7 }}>Contact</a>
      </div>
    </nav>
  )
}
