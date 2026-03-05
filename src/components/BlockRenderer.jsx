// Block renderer — maps block types from CMS to styled React components

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

function Hero({ block }) {
  const t  = block.aiContent || 'We Help Your Business Grow Online'
  const st = block.seoHint   || 'Expert solutions tailored to your needs. Get started today.'
  return (
    <section style={{ ...section(), background:'linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%)', color:'#fff' }}>
      <div style={container}>
        <div style={{ maxWidth:680 }}>
          <h1 style={{ fontSize:'clamp(32px,5vw,56px)', fontWeight:800, lineHeight:1.15, marginBottom:20, letterSpacing:'-1px' }}>{t}</h1>
          <p style={{ fontSize:18, color:'#94A3B8', lineHeight:1.7, marginBottom:36 }}>{st}</p>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            <a href="#contact" style={{ padding:'14px 28px', background:'#3B82F6', color:'#fff', textDecoration:'none', borderRadius:10, fontWeight:700, fontSize:15 }}>Get Started →</a>
            <a href="#about"   style={{ padding:'14px 28px', border:'1px solid rgba(255,255,255,.2)', color:'#fff', textDecoration:'none', borderRadius:10, fontWeight:600, fontSize:15 }}>Learn More</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features({ block }) {
  const items = block.items || [
    { icon:'⚡', title:'Fast Delivery',   desc:'We work quickly without sacrificing quality.' },
    { icon:'🔒', title:'Secure & Reliable',desc:'Your data and security are our top priorities.' },
    { icon:'📈', title:'Results Driven',  desc:'Measurable outcomes that grow your business.'  },
  ]
  return (
    <section style={section()}>
      <div style={container}>
        <h2 style={{ textAlign:'center', fontSize:'clamp(24px,4vw,40px)', fontWeight:800, marginBottom:50, letterSpacing:'-0.5px' }}>Why Choose Us</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:24 }}>
          {items.map((f,i)=>(
            <div key={i} style={{ padding:28, background:'#f8fafc', borderRadius:14, border:'1px solid #e2e8f0' }}>
              <div style={{ fontSize:36, marginBottom:14 }}>{f.icon}</div>
              <h3 style={{ fontSize:18, fontWeight:700, marginBottom:8 }}>{f.title}</h3>
              <p style={{ color:'#64748B', lineHeight:1.7, margin:0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TwoColumn({ block }) {
  return (
    <section style={section({ background:'#f8fafc' })}>
      <div style={{ ...container, display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
        <div>
          <h2 style={{ fontSize:'clamp(22px,3.5vw,36px)', fontWeight:800, marginBottom:16, letterSpacing:'-0.5px' }}>{block.aiContent||'About Our Approach'}</h2>
          <p style={{ color:'#64748B', lineHeight:1.8, fontSize:16 }}>{block.seoHint||'We combine expertise, creativity and data-driven insights to deliver exceptional results for our clients.'}</p>
          <a href="#contact" style={{ display:'inline-block', marginTop:24, padding:'12px 24px', background:'#0f172a', color:'#fff', textDecoration:'none', borderRadius:8, fontWeight:600 }}>Talk to Us →</a>
        </div>
        <div style={{ background:'linear-gradient(135deg,#3B82F6,#8B5CF6)', borderRadius:16, height:320, display:'flex', alignItems:'center', justifyContent:'center', fontSize:64 }}>✨</div>
      </div>
    </section>
  )
}

function CTABanner({ block }) {
  return (
    <section style={{ padding:'60px 0', background:'#3B82F6', color:'#fff' }}>
      <div style={{ ...container, textAlign:'center' }}>
        <h2 style={{ fontSize:'clamp(22px,4vw,38px)', fontWeight:800, marginBottom:12 }}>{block.aiContent||'Ready to Get Started?'}</h2>
        <p style={{ fontSize:17, opacity:.85, marginBottom:28 }}>{block.seoHint||"Let's work together to build something great."}</p>
        <a href="#contact" style={{ padding:'14px 32px', background:'#fff', color:'#3B82F6', textDecoration:'none', borderRadius:10, fontWeight:700, fontSize:15 }}>Contact Us Today →</a>
      </div>
    </section>
  )
}

function Testimonials({ block }) {
  const items = block.items || [
    { name:'Sarah K.',    role:'CEO',           text:'Absolutely transformed our online presence. Highly recommend!', rating:5 },
    { name:'Mike R.',     role:'Marketing Dir', text:'Professional, fast, and the results speak for themselves.',     rating:5 },
    { name:'Priya L.',    role:'Founder',       text:'Best investment we made this year. Incredible team.',          rating:5 },
  ]
  return (
    <section style={section()}>
      <div style={container}>
        <h2 style={{ textAlign:'center', fontSize:'clamp(22px,4vw,38px)', fontWeight:800, marginBottom:48 }}>What Our Clients Say</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:20 }}>
          {items.map((t,i)=>(
            <div key={i} style={{ padding:26, background:'#fff', borderRadius:14, border:'1px solid #e2e8f0', boxShadow:'0 4px 20px rgba(0,0,0,.05)' }}>
              <div style={{ fontSize:18, marginBottom:12 }}>{'★'.repeat(t.rating)}</div>
              <p style={{ color:'#374151', lineHeight:1.7, marginBottom:16, fontStyle:'italic' }}>"{t.text}"</p>
              <div style={{ fontWeight:700, fontSize:14 }}>{t.name}</div>
              <div style={{ color:'#64748B', fontSize:12 }}>{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing({ block }) {
  const tiers = block.tiers || [
    { name:'Starter', price:'$49', period:'/mo', features:['5 pages','Basic SEO','Email support'],    cta:'Get Started', highlight:false },
    { name:'Pro',     price:'$99', period:'/mo', features:['20 pages','Full SEO','Priority support','Analytics'], cta:'Start Free Trial', highlight:true },
    { name:'Agency',  price:'$249',period:'/mo', features:['Unlimited pages','Custom domain','Dedicated manager','API access'], cta:'Contact Us', highlight:false },
  ]
  return (
    <section style={section({ background:'#f8fafc' })}>
      <div style={container}>
        <h2 style={{ textAlign:'center', fontSize:'clamp(22px,4vw,38px)', fontWeight:800, marginBottom:12 }}>Simple, Transparent Pricing</h2>
        <p style={{ textAlign:'center', color:'#64748B', fontSize:16, marginBottom:48 }}>No hidden fees. Cancel anytime.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:20, alignItems:'end' }}>
          {tiers.map((t,i)=>(
            <div key={i} style={{ padding:30, background:t.highlight?'#0f172a':'#fff', color:t.highlight?'#fff':'inherit', borderRadius:16, border:t.highlight?'2px solid #3B82F6':'1px solid #e2e8f0', boxShadow:t.highlight?'0 20px 60px rgba(59,130,246,.25)':'none', transform:t.highlight?'scale(1.04)':'none' }}>
              <div style={{ fontSize:15, fontWeight:600, marginBottom:8, color:t.highlight?'#93C5FD':'#64748B' }}>{t.name}</div>
              <div style={{ fontSize:42, fontWeight:800, lineHeight:1 }}>{t.price}<span style={{ fontSize:16, fontWeight:400, opacity:.6 }}>{t.period}</span></div>
              <ul style={{ margin:'20px 0', padding:0, listStyle:'none' }}>
                {t.features.map(f=><li key={f} style={{ padding:'6px 0', fontSize:14, display:'flex', gap:8 }}><span style={{ color:'#10B981' }}>✓</span>{f}</li>)}
              </ul>
              <a href="#contact" style={{ display:'block', padding:'12px', textAlign:'center', background:t.highlight?'#3B82F6':'#0f172a', color:'#fff', textDecoration:'none', borderRadius:8, fontWeight:700 }}>{t.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ({ block }) {
  const items = block.items || [
    { q:'How long does it take?',    a:'Most projects are completed within 2-4 weeks depending on scope.' },
    { q:'Do you offer revisions?',   a:'Yes, we include unlimited revisions until you are 100% satisfied.' },
    { q:'What is your pricing?',     a:'We offer flexible pricing starting from $49/month. See our pricing section.' },
  ]
  return (
    <section style={section()}>
      <div style={{ ...container, maxWidth:760 }}>
        <h2 style={{ textAlign:'center', fontSize:'clamp(22px,4vw,36px)', fontWeight:800, marginBottom:48 }}>Frequently Asked Questions</h2>
        {items.map((f,i)=>(
          <details key={i} style={{ borderBottom:'1px solid #e2e8f0', marginBottom:4 }}>
            <summary style={{ padding:'18px 0', fontSize:16, fontWeight:600, cursor:'pointer', listStyle:'none', display:'flex', justifyContent:'space-between' }}>
              {f.q} <span style={{ fontSize:20, lineHeight:1 }}>+</span>
            </summary>
            <div style={{ padding:'0 0 18px', color:'#64748B', lineHeight:1.7 }}>{f.a}</div>
          </details>
        ))}
      </div>
    </section>
  )
}

function StatRow({ block }) {
  const stats = block.stats || [{ value:'500+', label:'Clients' },{ value:'10yr', label:'Experience' },{ value:'98%', label:'Satisfaction' },{ value:'24/7', label:'Support' }]
  return (
    <section style={{ padding:'60px 0', background:'#0f172a', color:'#fff' }}>
      <div style={{ ...container, display:'grid', gridTemplateColumns:`repeat(${stats.length},1fr)`, gap:20, textAlign:'center' }}>
        {stats.map((s,i)=>(
          <div key={i}><div style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:800, color:'#3B82F6' }}>{s.value}</div><div style={{ fontSize:14, color:'#94A3B8', marginTop:6 }}>{s.label}</div></div>
        ))}
      </div>
    </section>
  )
}

function ContactForm({ block }) {
  return (
    <section style={section({ background:'#f8fafc' })} id="contact">
      <div style={{ ...container, maxWidth:600 }}>
        <h2 style={{ textAlign:'center', fontSize:'clamp(22px,4vw,36px)', fontWeight:800, marginBottom:8 }}>Get In Touch</h2>
        <p style={{ textAlign:'center', color:'#64748B', marginBottom:40 }}>{block.aiContent||"We'd love to hear from you."}</p>
        <form style={{ display:'flex', flexDirection:'column', gap:14 }} onSubmit={e=>e.preventDefault()}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            <input placeholder="Your name"  style={{ padding:'13px 16px', border:'1px solid #e2e8f0', borderRadius:9, fontSize:14, outline:'none' }}/>
            <input placeholder="Your email" style={{ padding:'13px 16px', border:'1px solid #e2e8f0', borderRadius:9, fontSize:14, outline:'none' }}/>
          </div>
          <input    placeholder="Subject"   style={{ padding:'13px 16px', border:'1px solid #e2e8f0', borderRadius:9, fontSize:14, outline:'none' }}/>
          <textarea placeholder="Message…"  rows={5} style={{ padding:'13px 16px', border:'1px solid #e2e8f0', borderRadius:9, fontSize:14, outline:'none', resize:'vertical' }}/>
          <button type="submit" style={{ padding:'14px', background:'#3B82F6', color:'#fff', border:'none', borderRadius:9, fontWeight:700, fontSize:15, cursor:'pointer' }}>Send Message →</button>
        </form>
      </div>
    </section>
  )
}

function Newsletter({ block }) {
  return (
    <section style={{ padding:'60px 0', background:'#f8fafc' }}>
      <div style={{ ...container, textAlign:'center', maxWidth:560 }}>
        <h2 style={{ fontSize:'clamp(20px,3.5vw,32px)', fontWeight:800, marginBottom:8 }}>{block.aiContent||'Stay Updated'}</h2>
        <p style={{ color:'#64748B', marginBottom:24 }}>Get the latest news and updates delivered to your inbox.</p>
        <form style={{ display:'flex', gap:8 }} onSubmit={e=>e.preventDefault()}>
          <input type="email" placeholder="Enter your email…" style={{ flex:1, padding:'12px 16px', border:'1px solid #e2e8f0', borderRadius:9, fontSize:14, outline:'none' }}/>
          <button type="submit" style={{ padding:'12px 24px', background:'#3B82F6', color:'#fff', border:'none', borderRadius:9, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' }}>Subscribe</button>
        </form>
      </div>
    </section>
  )
}

function Heading({ block }) {
  return (
    <section style={{ padding:'40px 0' }}>
      <div style={container}>
        <h2 style={{ fontSize:'clamp(24px,4vw,42px)', fontWeight:800, letterSpacing:'-0.5px', lineHeight:1.2 }}>{block.aiContent||'Section Heading'}</h2>
        {block.seoHint && <p style={{ color:'#64748B', fontSize:17, marginTop:10, lineHeight:1.7 }}>{block.seoHint}</p>}
      </div>
    </section>
  )
}

function BodyText({ block }) {
  return (
    <section style={{ padding:'24px 0' }}>
      <div style={{ ...container, maxWidth:720 }}>
        <div style={{ fontSize:16, color:'#374151', lineHeight:1.85 }}>{block.aiContent||'Body text content goes here.'}</div>
      </div>
    </section>
  )
}

function Gallery({ block }) {
  return (
    <section style={section()}>
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

function VideoEmbed({ block }) {
  return (
    <section style={{ padding:'40px 0' }}>
      <div style={container}>
        <div style={{ aspectRatio:'16/9', background:'#0f172a', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:64 }}>▶</div>
      </div>
    </section>
  )
}

function ImageBlock({ block }) {
  return (
    <section style={{ padding:'24px 0' }}>
      <div style={container}>
        <div style={{ width:'100%', height:360, background:'linear-gradient(135deg,#e2e8f0,#cbd5e1)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:64 }}>🖼</div>
      </div>
    </section>
  )
}

function MapEmbed({ block }) {
  return (
    <section style={{ padding:'40px 0' }}>
      <div style={container}>
        <div style={{ width:'100%', height:300, background:'#e2e8f0', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, color:'#64748B' }}>📍 Map Embed</div>
      </div>
    </section>
  )
}

function Footer({ block, site }) {
  return (
    <footer style={{ background:'#0f172a', color:'#94A3B8', padding:'60px 0 30px' }}>
      <div style={container}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:40, marginBottom:40 }}>
          <div>
            <div style={{ fontWeight:800, fontSize:20, color:'#fff', marginBottom:12 }}>{site?.name||'Your Company'}</div>
            <p style={{ lineHeight:1.7, maxWidth:300 }}>{block.aiContent||'Building exceptional digital experiences for businesses worldwide.'}</p>
          </div>
          <div>
            <div style={{ fontWeight:700, color:'#fff', marginBottom:14 }}>Company</div>
            {['About','Services','Portfolio','Blog','Contact'].map(l=><div key={l}><a href={`/${l.toLowerCase()}`} style={{ color:'#64748B', textDecoration:'none', fontSize:14, display:'block', marginBottom:8 }}>{l}</a></div>)}
          </div>
          <div>
            <div style={{ fontWeight:700, color:'#fff', marginBottom:14 }}>Legal</div>
            {['Privacy Policy','Terms of Service','Cookie Policy'].map(l=><div key={l}><a href="#" style={{ color:'#64748B', textDecoration:'none', fontSize:14, display:'block', marginBottom:8 }}>{l}</a></div>)}
          </div>
        </div>
        <div style={{ borderTop:'1px solid #1e293b', paddingTop:24, fontSize:13 }}>© {new Date().getFullYear()} {site?.name}. Built with WebAgent Platform.</div>
      </div>
    </footer>
  )
}
