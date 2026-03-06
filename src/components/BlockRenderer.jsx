'use client'
// Block renderer — maps block types from CMS to styled React components
// Supports per-block style overrides and element visibility toggles

export function BlockRenderer({ block, site }) {
  const props = { block, site }
  switch (block.type) {
    case 'hero':         return <Hero         {...props}/>
    case 'features':     return <Features     {...props}/>
    case 'two_col':      return <TwoColumn    {...props}/>
    case 'cta_banner':   return <CTABanner    {...props}/>
    case 'testimonials': return <Testimonials {...props}/>
    case 'pricing':      return <Pricing      {...props}/>
    case 'faq':          return <FAQ          {...props}/>
    case 'footer':       return <Footer       {...props}/>
    case 'heading':      return <Heading      {...props}/>
    case 'body_text':    return <BodyText     {...props}/>
    case 'stat_row':     return <StatRow      {...props}/>
    case 'contact_form': return <ContactForm  {...props}/>
    case 'newsletter':   return <Newsletter   {...props}/>
    case 'gallery':      return <Gallery      {...props}/>
    case 'video_embed':  return <VideoEmbed   {...props}/>
    case 'image_block':  return <ImageBlock   {...props}/>
    case 'map_embed':    return <MapEmbed     {...props}/>
    default: return (
      <div style={{ padding:'40px 20px', textAlign:'center', border:'2px dashed #ddd', borderRadius:8, color:'#999', margin:'20px auto', maxWidth:800 }}>
        Block: <code>{block.type}</code>
      </div>
    )
  }
}

// ── Shared styles ──────────────────────────────────────────────────────────
const container = { maxWidth:1100, margin:'0 auto', padding:'0 24px' }
const section   = (extra={}) => ({ padding:'80px 0', ...extra })

// ── Style helpers ──────────────────────────────────────────────────────────
const shadowMap = {
  sm: '0 1px 3px rgba(0,0,0,.1)',
  md: '0 4px 12px rgba(0,0,0,.1)',
  lg: '0 10px 30px rgba(0,0,0,.15)',
  xl: '0 20px 60px rgba(0,0,0,.2)',
}

function buildBlockStyle(style={}, defaults={}) {
  const s = {}
  // Background
  if (style.bgType === 'gradient' && style.gradientFrom && style.gradientTo) {
    s.background = `linear-gradient(${style.gradientDir||'135deg'},${style.gradientFrom},${style.gradientTo})`
  } else if (style.bgType === 'none') {
    s.background = 'transparent'
  } else if (style.bgColor) {
    s.background = style.bgColor
  }
  // Text
  if (style.textColor) s.color = style.textColor
  // Spacing
  if (style.paddingTop) s.paddingTop = style.paddingTop + 'px'
  if (style.paddingBottom) s.paddingBottom = style.paddingBottom + 'px'
  if (style.paddingLeft) s.paddingLeft = style.paddingLeft + 'px'
  if (style.paddingRight) s.paddingRight = style.paddingRight + 'px'
  if (style.marginTop) s.marginTop = style.marginTop + 'px'
  if (style.marginBottom) s.marginBottom = style.marginBottom + 'px'
  // Border
  if (style.borderRadius) s.borderRadius = style.borderRadius + 'px'
  if (style.borderWidth) s.border = `${style.borderWidth}px solid ${style.borderColor||'#e2e8f0'}`
  else if (style.borderColor) s.border = `1px solid ${style.borderColor}`
  // Typography
  if (style.fontSize) s.fontSize = style.fontSize + 'px'
  if (style.fontWeight) s.fontWeight = style.fontWeight
  if (style.textAlign) s.textAlign = style.textAlign
  if (style.lineHeight) s.lineHeight = (style.lineHeight / 10).toFixed(1)
  if (style.letterSpacing) s.letterSpacing = style.letterSpacing + 'px'
  // Shadow
  if (style.boxShadow && shadowMap[style.boxShadow]) s.boxShadow = shadowMap[style.boxShadow]
  // Opacity
  if (style.opacity && style.opacity < 100) s.opacity = style.opacity / 100
  return { ...defaults, ...s }
}

function btnStyle(style={}, defaults={}) {
  const s = { ...defaults }
  if (style.btnBg) s.background = style.btnBg
  if (style.btnColor) s.color = style.btnColor
  if (style.btnRadius) s.borderRadius = style.btnRadius + 'px'
  if (style.btnPadX) s.paddingLeft = s.paddingRight = style.btnPadX + 'px'
  if (style.btnPadY) s.paddingTop = s.paddingBottom = style.btnPadY + 'px'
  return s
}

function vis(block, key) {
  return block.visibility?.[key] !== false
}

// ── Helper: parse YouTube/Vimeo URL to embed URL ──────────────────────────
function toEmbedUrl(url) {
  if (!url) return null
  let m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/)
  if (m) return `https://www.youtube.com/embed/${m[1]}`
  m = url.match(/vimeo\.com\/(\d+)/)
  if (m) return `https://player.vimeo.com/video/${m[1]}`
  return url
}

function Hero({ block }) {
  const st = block.style || {}
  const heading    = block.heading    || block.aiContent || 'We Help Your Business Grow Online'
  const subheading = block.subheading || block.seoHint   || 'Expert solutions tailored to your needs. Get started today.'
  const btnText    = block.buttonText || 'Get Started →'
  const btnLink    = block.buttonLink || '#contact'
  const bgImage    = block.backgroundImage

  const defaultBg = bgImage
    ? { ...section(), background:`linear-gradient(rgba(15,23,42,.85),rgba(30,27,75,.9)), url(${bgImage}) center/cover`, color:'#fff' }
    : { ...section(), background:'linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%)', color:'#fff' }

  const sectionStyle = buildBlockStyle(st, defaultBg)

  return (
    <section style={sectionStyle}>
      <div style={container}>
        <div style={{ maxWidth:680 }}>
          {vis(block,'heading') && <h1 style={{ fontSize:'clamp(32px,5vw,56px)', fontWeight:800, lineHeight:1.15, marginBottom:20, letterSpacing:'-1px', color:st.headingColor||undefined }}>{heading}</h1>}
          {vis(block,'subheading') && <p style={{ fontSize:18, color:st.textColor||'#94A3B8', lineHeight:1.7, marginBottom:36 }}>{subheading}</p>}
          <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            {vis(block,'button') && <a href={btnLink} style={btnStyle(st, { padding:'14px 28px', background:'#3B82F6', color:'#fff', textDecoration:'none', borderRadius:10, fontWeight:700, fontSize:15 })}>{btnText}</a>}
            {vis(block,'button2') && (block.buttonText2 || 'Learn More') && <a href={block.buttonLink2||'#about'} style={{ padding:'14px 28px', border:'1px solid rgba(255,255,255,.2)', color:'#fff', textDecoration:'none', borderRadius:10, fontWeight:600, fontSize:15 }}>{block.buttonText2||'Learn More'}</a>}
          </div>
        </div>
      </div>
    </section>
  )
}

function Features({ block }) {
  const st = block.style || {}
  const heading = block.heading || block.aiContent || 'Why Choose Us'
  const items = block.items || [
    { icon:'⚡', title:'Fast Delivery',   desc:'We work quickly without sacrificing quality.' },
    { icon:'🔒', title:'Secure & Reliable',desc:'Your data and security are our top priorities.' },
    { icon:'📈', title:'Results Driven',  desc:'Measurable outcomes that grow your business.'  },
  ]
  return (
    <section style={buildBlockStyle(st, section())}>
      <div style={container}>
        {vis(block,'heading') && <h2 style={{ textAlign:'center', fontSize:'clamp(24px,4vw,40px)', fontWeight:800, marginBottom:50, letterSpacing:'-0.5px', color:st.headingColor||undefined }}>{heading}</h2>}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:24 }}>
          {items.map((f,i)=>(
            <div key={i} style={{ padding:28, background:st.accentColor?`${st.accentColor}08`:'#f8fafc', borderRadius:14, border:`1px solid ${st.accentColor?`${st.accentColor}20`:'#e2e8f0'}` }}>
              {vis(block,'icons') && <div style={{ fontSize:36, marginBottom:14 }}>{f.icon}</div>}
              {vis(block,'titles') && <h3 style={{ fontSize:18, fontWeight:700, marginBottom:8, color:st.headingColor||undefined }}>{f.title}</h3>}
              {vis(block,'descriptions') && <p style={{ color:st.textColor||'#64748B', lineHeight:1.7, margin:0 }}>{f.desc}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TwoColumn({ block }) {
  const st = block.style || {}
  const heading = block.heading  || block.aiContent || 'About Our Approach'
  const body    = block.body     || block.seoHint   || 'We combine expertise, creativity and data-driven insights to deliver exceptional results for our clients.'
  const imgUrl  = block.imageUrl
  const imgAlt  = block.imageAlt || heading
  return (
    <section style={buildBlockStyle(st, section({ background:'#f8fafc' }))}>
      <div style={{ ...container, display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
        <div>
          {vis(block,'heading') && <h2 style={{ fontSize:'clamp(22px,3.5vw,36px)', fontWeight:800, marginBottom:16, letterSpacing:'-0.5px', color:st.headingColor||undefined }}>{heading}</h2>}
          {vis(block,'body') && <p style={{ color:st.textColor||'#64748B', lineHeight:1.8, fontSize:16 }}>{body}</p>}
          {vis(block,'button') && <a href={block.buttonLink||'#contact'} style={btnStyle(st, { display:'inline-block', marginTop:24, padding:'12px 24px', background:'#0f172a', color:'#fff', textDecoration:'none', borderRadius:8, fontWeight:600 })}>{block.buttonText||'Talk to Us →'}</a>}
        </div>
        {vis(block,'image') && (imgUrl ? (
          <img src={imgUrl} alt={imgAlt} style={{ width:'100%', borderRadius:16, objectFit:'cover', maxHeight:400 }}/>
        ) : (
          <div style={{ background:'linear-gradient(135deg,#3B82F6,#8B5CF6)', borderRadius:16, height:320, display:'flex', alignItems:'center', justifyContent:'center', fontSize:64 }}>✨</div>
        ))}
      </div>
    </section>
  )
}

function CTABanner({ block }) {
  const st = block.style || {}
  const heading = block.heading    || block.aiContent || 'Ready to Get Started?'
  const subtext = block.subtext    || block.seoHint   || "Let's work together to build something great."
  const btnText = block.buttonText || 'Contact Us Today →'
  const btnLink = block.buttonLink || '#contact'
  return (
    <section style={buildBlockStyle(st, { padding:'60px 0', background:'#3B82F6', color:'#fff' })}>
      <div style={{ ...container, textAlign:st.textAlign||'center' }}>
        {vis(block,'heading') && <h2 style={{ fontSize:'clamp(22px,4vw,38px)', fontWeight:800, marginBottom:12, color:st.headingColor||undefined }}>{heading}</h2>}
        {vis(block,'subtext') && <p style={{ fontSize:17, opacity:.85, marginBottom:28 }}>{subtext}</p>}
        {vis(block,'button') && <a href={btnLink} style={btnStyle(st, { padding:'14px 32px', background:'#fff', color:'#3B82F6', textDecoration:'none', borderRadius:10, fontWeight:700, fontSize:15 })}>{btnText}</a>}
      </div>
    </section>
  )
}

function Testimonials({ block }) {
  const st = block.style || {}
  const heading = block.heading || 'What Our Clients Say'
  const items = block.items || [
    { name:'Sarah K.',    role:'CEO',           text:'Absolutely transformed our online presence. Highly recommend!', rating:5 },
    { name:'Mike R.',     role:'Marketing Dir', text:'Professional, fast, and the results speak for themselves.',     rating:5 },
    { name:'Priya L.',    role:'Founder',       text:'Best investment we made this year. Incredible team.',          rating:5 },
  ]
  return (
    <section style={buildBlockStyle(st, section())}>
      <div style={container}>
        {vis(block,'heading') && <h2 style={{ textAlign:'center', fontSize:'clamp(22px,4vw,38px)', fontWeight:800, marginBottom:48, color:st.headingColor||undefined }}>{heading}</h2>}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:20 }}>
          {items.map((t,i)=>(
            <div key={i} style={{ padding:26, background:'#fff', borderRadius:14, border:'1px solid #e2e8f0', boxShadow:'0 4px 20px rgba(0,0,0,.05)' }}>
              {vis(block,'rating') && <div style={{ fontSize:18, marginBottom:12, color:st.accentColor||'#F59E0B' }}>{'★'.repeat(t.rating||5)}</div>}
              {vis(block,'quote') && <p style={{ color:st.textColor||'#374151', lineHeight:1.7, marginBottom:16, fontStyle:'italic' }}>"{t.text}"</p>}
              {vis(block,'name') && <div style={{ fontWeight:700, fontSize:14, color:st.headingColor||undefined }}>{t.name}</div>}
              {vis(block,'role') && <div style={{ color:'#64748B', fontSize:12 }}>{t.role}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing({ block }) {
  const st = block.style || {}
  const heading = block.heading || 'Simple, Transparent Pricing'
  const tiers = (block.tiers || [
    { name:'Starter', price:'$49', period:'/mo', features:['5 pages','Basic SEO','Email support'],    cta:'Get Started', highlight:false },
    { name:'Pro',     price:'$99', period:'/mo', features:['20 pages','Full SEO','Priority support','Analytics'], cta:'Start Free Trial', highlight:true },
    { name:'Agency',  price:'$249',period:'/mo', features:['Unlimited pages','Custom domain','Dedicated manager','API access'], cta:'Contact Us', highlight:false },
  ]).map(t => ({
    ...t,
    features: Array.isArray(t.features) ? t.features : (t.features||'').split(',').map(s=>s.trim()).filter(Boolean)
  }))
  return (
    <section style={buildBlockStyle(st, section({ background:'#f8fafc' }))}>
      <div style={container}>
        {vis(block,'heading') && <h2 style={{ textAlign:'center', fontSize:'clamp(22px,4vw,38px)', fontWeight:800, marginBottom:12, color:st.headingColor||undefined }}>{heading}</h2>}
        {vis(block,'subtitle') && <p style={{ textAlign:'center', color:'#64748B', fontSize:16, marginBottom:48 }}>{block.subtitle||'No hidden fees. Cancel anytime.'}</p>}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:20, alignItems:'end' }}>
          {tiers.map((t,i)=>(
            <div key={i} style={{ padding:30, background:t.highlight?'#0f172a':'#fff', color:t.highlight?'#fff':'inherit', borderRadius:16, border:t.highlight?`2px solid ${st.accentColor||'#3B82F6'}`:'1px solid #e2e8f0', boxShadow:t.highlight?`0 20px 60px ${st.accentColor?st.accentColor+'40':'rgba(59,130,246,.25)'}`:'none', transform:t.highlight?'scale(1.04)':'none' }}>
              {vis(block,'tierName') && <div style={{ fontSize:15, fontWeight:600, marginBottom:8, color:t.highlight?'#93C5FD':'#64748B' }}>{t.name}</div>}
              {vis(block,'price') && <div style={{ fontSize:42, fontWeight:800, lineHeight:1 }}>{t.price}<span style={{ fontSize:16, fontWeight:400, opacity:.6 }}>{t.period}</span></div>}
              {vis(block,'features') && <ul style={{ margin:'20px 0', padding:0, listStyle:'none' }}>
                {t.features.map(f=><li key={f} style={{ padding:'6px 0', fontSize:14, display:'flex', gap:8 }}><span style={{ color:st.accentColor||'#10B981' }}>✓</span>{f}</li>)}
              </ul>}
              {vis(block,'cta') && <a href="#contact" style={btnStyle(st, { display:'block', padding:'12px', textAlign:'center', background:t.highlight?(st.accentColor||'#3B82F6'):'#0f172a', color:'#fff', textDecoration:'none', borderRadius:8, fontWeight:700 })}>{t.cta}</a>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ({ block }) {
  const st = block.style || {}
  const heading = block.heading || 'Frequently Asked Questions'
  const items = block.items || [
    { q:'How long does it take?',    a:'Most projects are completed within 2-4 weeks depending on scope.' },
    { q:'Do you offer revisions?',   a:'Yes, we include unlimited revisions until you are 100% satisfied.' },
    { q:'What is your pricing?',     a:'We offer flexible pricing starting from $49/month. See our pricing section.' },
  ]
  return (
    <section style={buildBlockStyle(st, section())}>
      <div style={{ ...container, maxWidth:760 }}>
        {vis(block,'heading') && <h2 style={{ textAlign:'center', fontSize:'clamp(22px,4vw,36px)', fontWeight:800, marginBottom:48, color:st.headingColor||undefined }}>{heading}</h2>}
        {items.map((f,i)=>(
          <details key={i} style={{ borderBottom:`1px solid ${st.accentColor?st.accentColor+'30':'#e2e8f0'}`, marginBottom:4 }}>
            {vis(block,'questions') && <summary style={{ padding:'18px 0', fontSize:16, fontWeight:600, cursor:'pointer', listStyle:'none', display:'flex', justifyContent:'space-between', color:st.headingColor||undefined }}>
              {f.q} <span style={{ fontSize:20, lineHeight:1 }}>+</span>
            </summary>}
            {vis(block,'answers') && <div style={{ padding:'0 0 18px', color:st.textColor||'#64748B', lineHeight:1.7 }}>{f.a}</div>}
          </details>
        ))}
      </div>
    </section>
  )
}

function StatRow({ block }) {
  const st = block.style || {}
  const stats = block.stats || [{ value:'500+', label:'Clients' },{ value:'10yr', label:'Experience' },{ value:'98%', label:'Satisfaction' },{ value:'24/7', label:'Support' }]
  return (
    <section style={buildBlockStyle(st, { padding:'60px 0', background:'#0f172a', color:'#fff' })}>
      <div style={{ ...container, display:'grid', gridTemplateColumns:`repeat(${stats.length},1fr)`, gap:20, textAlign:'center' }}>
        {stats.map((s,i)=>(
          <div key={i}>
            {vis(block,'values') && <div style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:800, color:st.accentColor||'#3B82F6' }}>{s.value}</div>}
            {vis(block,'labels') && <div style={{ fontSize:14, color:st.textColor||'#94A3B8', marginTop:6 }}>{s.label}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}

function ContactForm({ block }) {
  const st = block.style || {}
  const heading = block.heading     || 'Get In Touch'
  const desc    = block.description || block.aiContent || "We'd love to hear from you."
  return (
    <section style={buildBlockStyle(st, section({ background:'#f8fafc' }))} id="contact">
      <div style={{ ...container, maxWidth:600 }}>
        {vis(block,'heading') && <h2 style={{ textAlign:'center', fontSize:'clamp(22px,4vw,36px)', fontWeight:800, marginBottom:8, color:st.headingColor||undefined }}>{heading}</h2>}
        {vis(block,'description') && <p style={{ textAlign:'center', color:st.textColor||'#64748B', marginBottom:40 }}>{desc}</p>}
        <form style={{ display:'flex', flexDirection:'column', gap:14 }} onSubmit={e=>e.preventDefault()}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            {vis(block,'nameField') && <input placeholder="Your name"  style={{ padding:'13px 16px', border:'1px solid #e2e8f0', borderRadius:9, fontSize:14, outline:'none' }}/>}
            {vis(block,'emailField') && <input placeholder="Your email" style={{ padding:'13px 16px', border:'1px solid #e2e8f0', borderRadius:9, fontSize:14, outline:'none' }}/>}
          </div>
          {vis(block,'subjectField') && <input    placeholder="Subject"   style={{ padding:'13px 16px', border:'1px solid #e2e8f0', borderRadius:9, fontSize:14, outline:'none' }}/>}
          {vis(block,'messageField') && <textarea placeholder="Message…"  rows={5} style={{ padding:'13px 16px', border:'1px solid #e2e8f0', borderRadius:9, fontSize:14, outline:'none', resize:'vertical' }}/>}
          {vis(block,'submitBtn') && <button type="submit" style={btnStyle(st, { padding:'14px', background:'#3B82F6', color:'#fff', border:'none', borderRadius:9, fontWeight:700, fontSize:15, cursor:'pointer' })}>Send Message →</button>}
        </form>
      </div>
    </section>
  )
}

function Newsletter({ block }) {
  const st = block.style || {}
  const heading = block.heading     || block.aiContent || 'Stay Updated'
  const desc    = block.description || 'Get the latest news and updates delivered to your inbox.'
  return (
    <section style={buildBlockStyle(st, { padding:'60px 0', background:'#f8fafc' })}>
      <div style={{ ...container, textAlign:'center', maxWidth:560 }}>
        {vis(block,'heading') && <h2 style={{ fontSize:'clamp(20px,3.5vw,32px)', fontWeight:800, marginBottom:8, color:st.headingColor||undefined }}>{heading}</h2>}
        {vis(block,'description') && <p style={{ color:st.textColor||'#64748B', marginBottom:24 }}>{desc}</p>}
        <form style={{ display:'flex', gap:8 }} onSubmit={e=>e.preventDefault()}>
          {vis(block,'emailInput') && <input type="email" placeholder="Enter your email…" style={{ flex:1, padding:'12px 16px', border:'1px solid #e2e8f0', borderRadius:9, fontSize:14, outline:'none' }}/>}
          {vis(block,'submitBtn') && <button type="submit" style={btnStyle(st, { padding:'12px 24px', background:'#3B82F6', color:'#fff', border:'none', borderRadius:9, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' })}>Subscribe</button>}
        </form>
      </div>
    </section>
  )
}

function Heading({ block }) {
  const st = block.style || {}
  const heading  = block.heading  || block.aiContent || 'Section Heading'
  const subtitle = block.subtitle || block.seoHint
  return (
    <section style={buildBlockStyle(st, { padding:'40px 0' })}>
      <div style={container}>
        {vis(block,'heading') && <h2 style={{ fontSize:'clamp(24px,4vw,42px)', fontWeight:800, letterSpacing:'-0.5px', lineHeight:1.2, color:st.headingColor||undefined }}>{heading}</h2>}
        {vis(block,'subtitle') && subtitle && <p style={{ color:st.textColor||'#64748B', fontSize:17, marginTop:10, lineHeight:1.7 }}>{subtitle}</p>}
      </div>
    </section>
  )
}

function BodyText({ block }) {
  const st = block.style || {}
  const text = block.text || block.aiContent || 'Body text content goes here.'
  return (
    <section style={buildBlockStyle(st, { padding:'24px 0' })}>
      <div style={{ ...container, maxWidth:720 }}>
        <div style={{ fontSize:st.fontSize?st.fontSize+'px':'16px', color:st.textColor||'#374151', lineHeight:1.85, whiteSpace:'pre-wrap' }}>{text}</div>
      </div>
    </section>
  )
}

function Gallery({ block }) {
  const st = block.style || {}
  const images = block.images || []
  if (images.length === 0) {
    return (
      <section style={buildBlockStyle(st, section())}>
        <div style={container}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:12 }}>
            {[1,2,3,4,5,6].map(i=>(
              <div key={i} style={{ aspectRatio:'1', background:`hsl(${i*40},60%,80%)`, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:36 }}>🖼</div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  return (
    <section style={buildBlockStyle(st, section())}>
      <div style={container}>
        {vis(block,'heading') && block.heading && <h2 style={{ textAlign:'center', fontSize:'clamp(22px,4vw,36px)', fontWeight:800, marginBottom:32, color:st.headingColor||undefined }}>{block.heading}</h2>}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:12 }}>
          {images.map((img,i)=>(
            <div key={i}>
              <img src={img.url} alt={img.alt||''} style={{ width:'100%', aspectRatio:'1', objectFit:'cover', borderRadius:10 }}/>
              {vis(block,'captions') && img.alt && <p style={{ fontSize:12, color:'#64748B', textAlign:'center', marginTop:4 }}>{img.alt}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function VideoEmbed({ block }) {
  const st = block.style || {}
  const embedUrl = toEmbedUrl(block.videoUrl)
  if (!embedUrl) {
    return (
      <section style={buildBlockStyle(st, { padding:'40px 0' })}>
        <div style={container}>
          <div style={{ aspectRatio:'16/9', background:'#0f172a', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:64 }}>▶</div>
        </div>
      </section>
    )
  }
  return (
    <section style={buildBlockStyle(st, { padding:'40px 0' })}>
      <div style={container}>
        <iframe src={embedUrl} style={{ width:'100%', aspectRatio:'16/9', border:'none', borderRadius:14 }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
      </div>
    </section>
  )
}

function ImageBlock({ block }) {
  const st = block.style || {}
  const imgUrl = block.imageUrl
  const alt    = block.alt     || ''
  const caption= block.caption || ''
  if (!imgUrl) {
    return (
      <section style={buildBlockStyle(st, { padding:'24px 0' })}>
        <div style={container}>
          <div style={{ width:'100%', height:360, background:'linear-gradient(135deg,#e2e8f0,#cbd5e1)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:64 }}>🖼</div>
        </div>
      </section>
    )
  }
  return (
    <section style={buildBlockStyle(st, { padding:'24px 0' })}>
      <div style={container}>
        <figure style={{ margin:0 }}>
          {vis(block,'image') && <img src={imgUrl} alt={alt} style={{ width:'100%', maxHeight:500, objectFit:'cover', borderRadius:14 }}/>}
          {vis(block,'caption') && caption && <figcaption style={{ textAlign:'center', color:'#64748B', fontSize:14, marginTop:8 }}>{caption}</figcaption>}
        </figure>
      </div>
    </section>
  )
}

function MapEmbed({ block }) {
  const st = block.style || {}
  const embedUrl = block.embedUrl
  if (!embedUrl) {
    return (
      <section style={buildBlockStyle(st, { padding:'40px 0' })}>
        <div style={container}>
          <div style={{ width:'100%', height:300, background:'#e2e8f0', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, color:'#64748B' }}>📍 Map Embed</div>
        </div>
      </section>
    )
  }
  return (
    <section style={buildBlockStyle(st, { padding:'40px 0' })}>
      <div style={container}>
        <iframe src={embedUrl} style={{ width:'100%', height:400, border:'none', borderRadius:14 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
      </div>
    </section>
  )
}

function Footer({ block, site }) {
  const st = block.style || {}
  const desc      = block.description   || block.aiContent || 'Building exceptional digital experiences for businesses worldwide.'
  const copyright = block.copyrightText || `© ${new Date().getFullYear()} ${site?.name||'Your Company'}. Built with WebAgent Platform.`

  const cols = parseInt(st.columns) || 3
  const footerBg   = st.bgColor      || '#0f172a'
  const footerText = st.textColor     || '#94A3B8'
  const linkColor  = st.linkColor     || '#64748B'
  const headColor  = st.headingColor  || '#fff'
  const padTop     = st.paddingTop    || 60
  const padBot     = st.paddingBottom || 30
  const colGap     = st.columnGap     || 40
  const fSize      = st.fontSize      || 14
  const hSize      = st.headingSize   || 16
  const hWeight    = st.headingWeight || '700'
  const divColor   = st.dividerColor  || '#1e293b'
  const copyBg     = st.copyrightBg   || 'transparent'

  // Social links
  const socials = ['facebook','twitter','instagram','linkedin','youtube','tiktok']
    .filter(p => st[`social_${p}`])
    .map(p => ({ platform:p, url:st[`social_${p}`] }))

  const socialIcons = { facebook:'f', twitter:'𝕏', instagram:'📷', linkedin:'in', youtube:'▶', tiktok:'♪' }

  const gridCols = cols === 1 ? '1fr' : cols === 2 ? '1fr 1fr' : cols === 4 ? '2fr 1fr 1fr 1fr' : '2fr 1fr 1fr'

  return (
    <footer style={{ background:footerBg, color:footerText, padding:`${padTop}px 0 ${padBot}px`, fontSize:fSize }}>
      <div style={container}>
        <div style={{ display:'grid', gridTemplateColumns:gridCols, gap:colGap, marginBottom:40, textAlign:st.textAlign||'left' }}>
          {vis(block,'logo') && (
            <div>
              <div style={{ fontWeight:800, fontSize:20, color:headColor, marginBottom:12 }}>{site?.name||'Your Company'}</div>
              {vis(block,'description') && <p style={{ lineHeight:1.7, maxWidth:300 }}>{desc}</p>}
              {/* Social links */}
              {vis(block,'socialLinks') && socials.length > 0 && (
                <div style={{ display:'flex', gap:10, marginTop:16 }}>
                  {socials.map(s => (
                    <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer"
                      style={{ width:32, height:32, borderRadius:8, background:'rgba(255,255,255,.08)', display:'flex', alignItems:'center', justifyContent:'center', color:linkColor, textDecoration:'none', fontSize:14, fontWeight:700 }}>
                      {socialIcons[s.platform]}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
          {vis(block,'companyLinks') && cols >= 2 && (
            <div>
              <div style={{ fontWeight:hWeight, fontSize:hSize, color:headColor, marginBottom:14 }}>Company</div>
              {['About','Services','Portfolio','Blog','Contact'].map(l=><div key={l}><a href={`/${l.toLowerCase()}`} style={{ color:linkColor, textDecoration:'none', fontSize:fSize, display:'block', marginBottom:8 }}>{l}</a></div>)}
            </div>
          )}
          {vis(block,'legalLinks') && cols >= 3 && (
            <div>
              <div style={{ fontWeight:hWeight, fontSize:hSize, color:headColor, marginBottom:14 }}>Legal</div>
              {['Privacy Policy','Terms of Service','Cookie Policy'].map(l=><div key={l}><a href="#" style={{ color:linkColor, textDecoration:'none', fontSize:fSize, display:'block', marginBottom:8 }}>{l}</a></div>)}
            </div>
          )}
          {cols >= 4 && (
            <div>
              <div style={{ fontWeight:hWeight, fontSize:hSize, color:headColor, marginBottom:14 }}>Contact</div>
              <div style={{ color:footerText, fontSize:fSize, lineHeight:2 }}>
                <div>info@example.com</div>
                <div>+1 (555) 000-0000</div>
              </div>
            </div>
          )}
        </div>
        {vis(block,'copyright') && (
          <div style={{ borderTop:`1px solid ${divColor}`, paddingTop:24, fontSize:13, background:copyBg, textAlign:st.textAlign||undefined }}>{copyright}</div>
        )}
      </div>
    </footer>
  )
}
