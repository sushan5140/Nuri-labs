'use client';
import { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, BookOpen, ChevronRight, Compass, FlaskConical, Globe2, Heart, Menu, Sparkles, X } from 'lucide-react';
import { products, type Product } from '@/lib/products';
const initials: Record<string,string> = { hallium:'한', kmate:'K', video:'늘', drama:'극' };
function ProductCard({ product }: { product: Product }) {
 const inner = <><div className="card-head"><span className="mono">{product.number} / {product.category}</span><ArrowUpRight size={20}/></div>
 <div className={`product-icon ${product.accent}`}>{initials[product.id]}</div>
 <p className="eyebrow">{product.kicker}</p><h3>{product.name}</h3><p className="description">{product.description}</p>
 <div className="tags">{product.features.map(f => <span key={f}>{f}</span>)}</div>
 <div className="card-foot"><span>{product.href?'Explore product':'Link coming soon'}</span>{product.href?<ArrowUpRight size={18}/>:<ChevronRight size={18}/>}</div></>;
 return product.href ? <a className={`product-card ${product.accent}`} href={product.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${product.name} in a new tab`}>{inner}</a> : <article className={`product-card ${product.accent}`}>{inner}</article>;
}
export default function Hub() {
 const [view, setView] = useState<'home'|'dashboard'>('home');
 const [menu, setMenu] = useState(false);
 const [filter, setFilter] = useState('All');
 const navigate = (v:'home'|'dashboard') => { setView(v); setMenu(false); window.scrollTo({top:0,behavior:'smooth'}); };
 const scroll = (id:string) => { navigate('home'); setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'}),50); };
 const visible = products.filter(p=>filter==='All'||(filter==='Language'&&['hallium','video','drama'].includes(p.id))||(filter==='Study abroad'&&p.id==='kmate'));
 return <div className="shell">
 <header className="nav wrap"><button className="brand" onClick={()=>navigate('home')} aria-label="NURI Labs home"><span className="brand-mark">n<span>✳</span></span><span>NURI<span className="brand-light">LABS</span><small>LEARN • CONNECT • GROW</small></span></button>
 <nav className={`nav-links ${menu?'show':''}`} aria-label="Primary navigation"><button onClick={()=>navigate('home')}>Home</button><button onClick={()=>scroll('ecosystem')}>Our ecosystem</button><button onClick={()=>scroll('impact')}>Our approach</button></nav>
 <button className="nav-cta" onClick={()=>navigate('dashboard')}>Enter the hub <ArrowUpRight size={16}/></button><button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label={menu?'Close menu':'Open menu'}>{menu?<X/>:<Menu/>}</button></header>
 {view==='home'?<main>
 <section className="hero wrap"><div className="hero-copy"><div className="announcement"><span className="pulse"/> AN INDEPENDENT STUDENT-LED INITIATIVE</div><h1>Curiosity takes<br/>you <em>places.</em><span className="hero-spark">✳</span></h1><p className="hero-sub">One connected home for learning Korean, finding your people, and exploring what comes next.</p>
 <div className="hero-actions"><button className="button-dark" onClick={()=>navigate('dashboard')}>Explore NURI Labs <ArrowUpRight size={18}/></button><button className="button-text" onClick={()=>scroll('ecosystem')}>Meet our four products <ArrowDownRight size={17}/></button></div>
 <div className="hero-caption">— MADE FOR THE CURIOUS, EVERYWHERE.</div></div><div className="hero-art" aria-label="Illustration of connected learning journeys"><div className="art-orbit"/><div className="art-orbit orbit-two"/><div className="art-center">n<span>✳</span></div><span className="floating f-one">안녕하세요 <Heart size={14}/></span><span className="floating f-two"><BookOpen size={17}/> Learn</span><span className="floating f-three"><Globe2 size={17}/> Connect</span><span className="floating f-four">your next chapter ↗</span><div className="art-bottom">FOUR EXPERIENCES. ONE JOURNEY.</div></div></section>
 <div className="ticker">LEARN KOREAN ✳ FIND YOUR PEOPLE ✳ BUILD YOUR FUTURE ✳ LIVE THE LANGUAGE ✳ LEARN KOREAN ✳ FIND YOUR PEOPLE ✳</div>
 <section className="section wrap" id="ecosystem"><div className="section-top"><div><span className="section-label">01 / THE ECOSYSTEM</span><h2>Different paths.<br/><em>One bigger picture.</em></h2></div><p>From your first Korean phrase to your first study-abroad application, there is a place for you here.</p></div><div className="product-grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div><p className="section-note"><Sparkles size={17}/> Each product keeps its own experience. NURI Labs brings them together.</p></section>
 <section className="story-band" id="impact"><div className="wrap story-inner"><div className="story-icon"><FlaskConical size={30}/></div><div><span className="section-label">02 / WHY WE BUILD</span><h2>Learning should feel like<br/><em>opening doors.</em></h2></div><div><p>NURI Labs is an independent student-led educational technology initiative exploring how thoughtful software can help people learn, connect and move forward.</p><button className="light-link" onClick={()=>navigate('dashboard')}>Step into the hub <ArrowUpRight size={18}/></button></div></div></section>
 <section className="closing wrap"><span className="section-label">YOUR NEXT CHAPTER STARTS HERE</span><h2>Go further,<br/><em>together.</em></h2><button className="button-dark" onClick={()=>navigate('dashboard')}>Discover your path <ArrowUpRight size={18}/></button><div className="closing-flower">✳</div></section>
 </main>:<main className="dashboard wrap"><div className="dash-title"><div><span className="section-label">WELCOME TO THE HUB</span><h1>Where to <em>today?</em></h1><p>Choose your next step. All of NURI's learning experiences, in one place.</p></div><div className="dash-symbol">✳</div></div>
 <div className="dash-banner"><div><span className="mono">YOUR NURI JOURNEY</span><h2>Explore something new.</h2><p>Start with a word, a story, a video or a new connection.</p></div><Compass size={78} strokeWidth={1}/></div>
 <div className="dash-toolbar"><h2>Explore the ecosystem <span>04</span></h2><div className="filters" aria-label="Filter products">{['All','Language','Study abroad'].map(f=><button key={f} onClick={()=>setFilter(f)} className={filter===f?'selected':''}>{f}</button>)}</div></div>
 <div className="product-grid">{visible.map(p=><ProductCard key={p.id} product={p}/>)}</div><div className="passport"><Globe2 size={31}/><div><span className="section-label">UP NEXT / LEARNING PASSPORT</span><h3>One learning journey, across every product.</h3><p>Shared progress and unified sign-in are planned for a later release. This hub does not access or combine existing account data.</p></div><span className="passport-status">PLANNED</span></div></main>}
 <footer className="footer"><div className="wrap footer-inner"><button className="brand" onClick={()=>navigate('home')}><span className="brand-mark">n<span>✳</span></span><span>NURI<span className="brand-light">LABS</span><small>LEARN • CONNECT • GROW</small></span></button><p>Made with curiosity. Built for possibility.</p><span>© {new Date().getFullYear()} NURI Labs</span></div></footer></div>;
}
