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

function buildFontUrl(settings) {
  const fonts = new Set()
  if (settings?.headingFont) fonts.add(settings.headingFont)
  if (settings?.bodyFont) fonts.add(settings.bodyFont)
  if (!fonts.size) fonts.add('Inter')
  const families = [...fonts].map(f => `family=${f.replace(/ /g, '+')}:wght@400;500;600;700;800`).join('&')
  return `https://fonts.googleapis.com/css2?${families}&display=swap`
}

export default async function RootLayout({ children }) {
  const [site, primaryMenu] = await Promise.all([getSite(), getMenuByLocation('primary')])
  const s = site?.settings || {}

  const fontUrl = buildFontUrl(s)
  const bodyFont = s.bodyFont || 'Inter'
  const headingFont = s.headingFont || bodyFont
  const textColor = s.textColor || '#0f172a'
  const bgColor = s.backgroundColor || '#FFFFFF'
  const primaryColor = s.primaryColor || '#3B82F6'
  const linkColor = s.linkColor || primaryColor
  const containerWidth = s.containerWidth || '1100'
  const btnRadius = s.buttonRadius || '10'
  const btnPx = s.buttonPaddingX || '28'
  const btnPy = s.buttonPaddingY || '14'

  // Inject CSS variables as inline style tag
  const cssVars = `
    :root {
      --heading-font: '${headingFont}', system-ui, sans-serif;
      --body-font: '${bodyFont}', system-ui, sans-serif;
      --primary: ${primaryColor};
      --secondary: ${s.secondaryColor || '#8B5CF6'};
      --accent: ${s.accentColor || '#10B981'};
      --bg: ${bgColor};
      --text: ${textColor};
      --muted: ${s.mutedColor || '#64748B'};
      --link: ${linkColor};
      --link-hover: ${s.linkHoverColor || '#2563EB'};
      --footer-bg: ${s.footerBgColor || '#0f172a'};
      --footer-text: ${s.footerTextColor || '#94A3B8'};
      --h1: ${s.h1Size || '48'}px;
      --h2: ${s.h2Size || '36'}px;
      --h3: ${s.h3Size || '24'}px;
      --body-size: ${s.bodySize || '16'}px;
      --heading-weight: ${s.headingWeight || '800'};
      --body-line-height: ${s.bodyLineHeight || '1.7'};
      --btn-radius: ${btnRadius}px;
      --btn-px: ${btnPx}px;
      --btn-py: ${btnPy}px;
      --container: ${containerWidth}px;
    }
    body { margin:0; font-family:var(--body-font); color:var(--text); background:var(--bg); font-size:var(--body-size); line-height:var(--body-line-height); }
    h1,h2,h3,h4,h5,h6 { font-family:var(--heading-font); font-weight:var(--heading-weight); }
    a { color:var(--link); }
    a:hover { color:var(--link-hover); }
  `

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href={fontUrl} rel="stylesheet"/>
        <style dangerouslySetInnerHTML={{ __html: cssVars }}/>
      </head>
      <body>
        <Nav site={site} menu={primaryMenu} settings={s}/>
        <main>{children}</main>
      </body>
    </html>
  )
}

function Nav({ site, menu, settings }) {
  const items = menu?.items || []
  const s = settings || {}
  const logoUrl = s.logoUrl
  const primaryColor = s.primaryColor || '#3B82F6'
  const btnRadius = s.buttonRadius || '10'

  return (
    <nav style={{ position:'sticky', top:0, zIndex:100, background:'rgba(255,255,255,.95)', backdropFilter:'blur(10px)', borderBottom:'1px solid #e2e8f0', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:64 }}>
      <a href="/" style={{ display:'flex', alignItems:'center', gap:10, fontWeight:800, fontSize:18, color:'#0f172a', textDecoration:'none', letterSpacing:'-0.3px' }}>
        {logoUrl ? (
          <img src={logoUrl} alt={s.logoAlt||site?.name||'Site'} style={{ height:36, objectFit:'contain' }}/>
        ) : (
          site?.name || 'Site'
        )}
      </a>
      <div style={{ display:'flex', gap:4, alignItems:'center', flexWrap:'wrap' }}>
        {items.map(item=>(
          <a key={item.id||item.label}
            href={item.url || (item.pageId ? '#' : `/${item.label.toLowerCase()}`)}
            target={item.target||'_self'}
            style={{ padding:'6px 14px', color:'#475569', textDecoration:'none', fontSize:14, fontWeight:500, borderRadius:6, transition:'all .12s' }}>
            {item.label}
          </a>
        ))}
        <a href="/contact" style={{ marginLeft:8, padding:'7px 16px', background:primaryColor, color:'#fff', textDecoration:'none', fontSize:14, fontWeight:600, borderRadius:`${btnRadius}px` }}>Contact</a>
      </div>
    </nav>
  )
}
