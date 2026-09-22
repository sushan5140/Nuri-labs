'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Bookmark,
  Check, CheckCircle2, ChevronLeft, ChevronRight, Compass, ExternalLink,
  Film, Globe2, GraduationCap, Headphones, Heart, Menu, MessageCircle,
  Play, RotateCcw, Search, Sparkles, Volume2, WandSparkles, X,
} from 'lucide-react';
import { products, type Product } from '@/lib/products';

type Filter = 'All' | 'Learn Korean' | 'Study in Korea' | 'Saved';
const icons: Record<string, string> = { hallium: '한', kmate: 'K', video: '늘', drama: '극' };
const hue: Record<string, string> = { hallium: 'rose', kmate: 'violet', video: 'aqua', drama: 'sun' };
const prompts = [
  { ko:'천천히 가도 괜찮아요.', clue:'How would you say this in English?', choices:["It’s okay to go slowly.", 'The weather is beautiful.', 'Let’s meet tomorrow.'], correct:0, note:'천천히 means “slowly.” 괜찮아요 means “it is okay.”' },
  { ko:'오늘 날씨가 정말 좋아요.', clue:'Choose the closest meaning.', choices:['I love this movie.', 'The weather is really nice today.', 'Where are you going?'], correct:1, note:'오늘 = today · 날씨 = weather · 정말 = really.' },
  { ko:'우리 같이 갈래요?', clue:'What is the speaker asking?', choices:['Are you hungry?', 'Did you study?', 'Shall we go together?'], correct:2, note:'같이 means “together”; 갈래요? is a friendly invitation.' },
];

function Logo({onClick}:{onClick:()=>void}){
  return <button type="button" onClick={onClick} className="nl-logo" aria-label="NURI Labs home">
    <span className="nl-logo-mark"><span>n</span><i>✳</i></span>
    <span className="nl-logo-word">nuri<span>labs</span><small>LEARN • CONNECT • CREATE</small></span>
  </button>;
}

function ProductScene({product,large=false}:{product:Product,large?:boolean}){
  return <div className={'nl-scene nl-scene-'+hue[product.id]+(large?' nl-scene-large':'')} aria-label={'Illustrative '+product.name+' preview'}>
    {product.id==='hallium'&&<div className="nl-hallium-ui">
      <div className="nl-scene-eyebrow"><span className="nl-dot"/> YOUR LITTLE KOREAN SPACE <Heart size={15}/></div>
      <div className="nl-hangul-hero">오늘도 <span>한 걸음.</span></div>
      <div className="nl-hangul-trans">One step today, too.</div>
      <div className="nl-learning-chip"><span>01</span><div><b>Start with a word</b><small>Grow into a conversation</small></div><ArrowUpRight size={18}/></div>
      <span className="nl-scene-deco nl-deco-hallium">♡</span>
    </div>}
    {product.id==='kmate'&&<div className="nl-kmate-ui">
      <div className="nl-scene-eyebrow"><GraduationCap size={16}/> YOUR NEXT CHAPTER <span>GKS</span></div>
      <div className="nl-kmate-map"><span className="nl-place-dot p1"/><span className="nl-place-dot p2"/><span className="nl-place-dot p3"/><span className="nl-map-route"/><span className="nl-kmate-star">✳</span></div>
      <div className="nl-kmate-bottom"><div className="nl-avatar-stack"><span>수</span><span>지</span><span>+ </span></div><div><strong>Find your people.</strong><small>Prepare together for Korea.</small></div></div>
    </div>}
    {product.id==='video'&&<div className="nl-video-ui">
      <div className="nl-scene-eyebrow"><Headphones size={15}/> HANEUL / VIDEO LAB <span>LISTEN & LEARN</span></div>
      <div className="nl-video-frame"><div className="nl-video-sky"/><div className="nl-video-hill h1"/><div className="nl-video-hill h2"/><span className="nl-play"><Play size={22} fill="currentColor"/></span><span className="nl-video-badge">SCENE 01</span></div>
      <div className="nl-video-caption"><span>오늘 날씨가 정말 좋아요!</span><small>The weather is really nice today.</small></div>
      <div className="nl-waveform" aria-hidden="true">{Array.from({length:23},(_,i)=><i key={i} style={{height:(10+(i*13%25))+'px'}}/>)}</div>
    </div>}
    {product.id==='drama'&&<div className="nl-drama-ui">
      <div className="nl-scene-eyebrow"><Film size={16}/> K-DRAMA INTERACTIVE <span>EP. 01</span></div>
      <div className="nl-drama-scene"><span className="nl-drama-moon">☾</span><div className="nl-drama-person p1"/><div className="nl-drama-person p2"/><div className="nl-drama-bubble">우리 같이 갈래요?<small>Shall we go together?</small></div></div>
      <div className="nl-drama-choices"><span>What happens next?</span><b>Choose the dialogue <ArrowRight size={14}/></b></div>
    </div>}
  </div>;
}

function ProductTile({product,onOpen,isSaved,onToggle}:{product:Product,onOpen:(p:Product)=>void,isSaved:boolean,onToggle:(id:string)=>void}){
  return <article className={'nl-tile nl-tile-'+hue[product.id]}>
    <div className="nl-tile-top"><span>{product.number} / {product.category}</span><button type="button" className={'nl-save'+(isSaved?' is-saved':'')} aria-pressed={isSaved} aria-label={(isSaved?'Unsave ':'Save ')+product.name} title={isSaved?'Remove saved product':'Save product'} onClick={()=>onToggle(product.id)}><Bookmark size={18} fill={isSaved?'currentColor':'none'}/></button></div>
    <button className="nl-tile-preview" type="button" onClick={()=>onOpen(product)} aria-label={'Preview '+product.name}><ProductScene product={product}/><span className="nl-preview-peek">Take a closer look <ArrowUpRight size={16}/></span></button>
    <div className="nl-tile-info"><div><span className="nl-eyebrow">{product.kicker}</span><h3>{product.name}</h3><p>{product.description}</p></div><button type="button" className="nl-tile-arrow" onClick={()=>onOpen(product)} aria-label={'Explore '+product.name}><ArrowUpRight size={23}/></button></div>
    <div className="nl-tile-tags">{product.features.map(x=><span key={x}>{x}</span>)}</div>
  </article>;
}

function Demo(){
  const [index,setIndex]=useState(0),[answer,setAnswer]=useState<number|null>(null);
  const p=prompts[index],done=answer!==null;
  const next=()=>{setAnswer(null);setIndex(i=>(i+1)%prompts.length)};
  return <section className="nl-playground" id="try"><div className="nl-wrap nl-playground-grid">
    <div className="nl-playground-copy"><span className="nl-label nl-label-light">03 / DON'T JUST LOOK AROUND</span><div className="nl-playground-sticker">✳ <span>TRY A LITTLE LEARNING</span></div><h2>Come curious.<br/><em>Leave knowing</em><br/>something new.</h2><p>A tiny taste of what we're building. Try this Korean meaning challenge right here—no account, no pressure.</p><div className="nl-lab-dots" aria-hidden="true"><span/><span/><span/></div></div>
    <div className="nl-quiz"><div className="nl-quiz-top"><span><span className="nl-dot"/> NURI MINI LAB</span><span>0{index+1} / 03</span></div><div className="nl-quiz-content" key={index}><span className="nl-quiz-type">KOREAN IN CONTEXT · BEGINNER</span><div className="nl-quiz-ko" lang="ko">{p.ko}</div><p>{p.clue}</p><div className="nl-quiz-options">{p.choices.map((c,i)=><button type="button" key={c} className={done?(i===p.correct?'correct':i===answer?'wrong':'muted'):''} disabled={done} onClick={()=>setAnswer(i)}><span>{String.fromCharCode(65+i)}</span>{c}{done&&i===p.correct&&<Check size={18}/>}</button>)}</div>
    {done&&<div className={'nl-feedback'+(answer===p.correct?' good':'')} role="status">{answer===p.correct?<CheckCircle2 size={19}/>:<Sparkles size={19}/>}<div><b>{answer===p.correct?'You got it!':'That’s part of learning.'}</b><small>{p.note}</small></div></div>}</div><div className="nl-quiz-foot"><span>This is a standalone sample, not saved progress.</span>{done?<button type="button" onClick={next}>Next phrase <ArrowRight size={17}/></button>:<span className="nl-quiz-wait">Choose an answer ↑</span>}</div></div>
  </div></section>;
}

const paths=[
  {name:'I want to learn Korean',sub:'Start with the basics',icon:BookOpen,copy:'Build your vocabulary with Hallium, then hear the words come alive in Haneul Video Lab.',ids:['hallium','video']},
  {name:'I love K-dramas',sub:'Learn inside the story',icon:Film,copy:'Explore expressions in K-Drama Interactive and strengthen your listening with Haneul Video Lab.',ids:['drama','video']},
  {name:'I want to study in Korea',sub:'Find people and prepare',icon:GraduationCap,copy:'Begin with KMate for GKS preparation and Hallium for Korean-language foundations.',ids:['kmate','hallium']}
];
function PathExplorer({onOpen}:{onOpen:(p:Product)=>void}){
  const [selected,setSelected]=useState(0),p=paths[selected];
  return <section className="nl-journey" id="journey"><div className="nl-wrap nl-journey-grid"><div><span className="nl-label">04 / FIND YOUR WAY</span><h2>There's no one<br/>way to <em>begin.</em></h2><p>Tell NURI what you're curious about. We'll show you a starting point across the ecosystem.</p><div className="nl-journey-fleur" aria-hidden="true">✿</div></div><div className="nl-path-app"><span className="nl-path-top">WHAT'S YOUR NEXT CHAPTER? <Compass size={19}/></span><div className="nl-path-buttons">{paths.map((x,i)=>{const Icon=x.icon;return <button key={x.name} type="button" className={selected===i?'active':''} aria-pressed={selected===i} onClick={()=>setSelected(i)}><span className="nl-path-icon"><Icon size={20}/></span><span><strong>{x.name}</strong><small>{x.sub}</small></span><ArrowUpRight size={18}/></button>})}</div><div className="nl-path-result" key={selected}><span>YOUR STARTING POINT / 0{selected+1}</span><p>{p.copy}</p><div>{products.filter(x=>p.ids.includes(x.id)).map(x=><button type="button" key={x.id} onClick={()=>onOpen(x)}><span className={'nl-small-glyph nl-'+hue[x.id]}>{icons[x.id]}</span>{x.name}<ArrowUpRight size={16}/></button>)}</div></div></div></div></section>;
}

function Details({product,onClose}:{product:Product|null,onClose:()=>void}){
  const closeRef=useRef<HTMLButtonElement>(null);
  useEffect(()=>{if(!product)return;const active=document.activeElement as HTMLElement|null;const prev=document.body.style.overflow;document.body.style.overflow='hidden';closeRef.current?.focus();const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose();if(e.key!=='Tab')return;const focusables=Array.from(document.querySelectorAll<HTMLElement>('.nl-modal button:not(:disabled),.nl-modal a[href]'));if(!focusables.length)return;const f=focusables[0],l=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===f){e.preventDefault();l.focus()}else if(!e.shiftKey&&document.activeElement===l){e.preventDefault();f.focus()}};window.addEventListener('keydown',onKey);return()=>{document.body.style.overflow=prev;window.removeEventListener('keydown',onKey);active?.focus()}},[product,onClose]);
  if(!product)return null;
  return <div className="nl-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><section className={'nl-modal nl-modal-'+hue[product.id]} role="dialog" aria-modal="true" aria-labelledby="nl-modal-title" aria-describedby="nl-modal-desc"><div className="nl-modal-top"><span>INSIDE THE ECOSYSTEM / {product.number}</span><button type="button" aria-label="Close product preview" ref={closeRef} onClick={onClose}><X size={20}/></button></div><div className="nl-modal-grid"><div className="nl-modal-copy"><div className={'nl-small-glyph nl-'+hue[product.id]}>{icons[product.id]}</div><span className="nl-eyebrow">{product.category}</span><h2 id="nl-modal-title">{product.name}<span>.</span></h2><strong>{product.kicker}</strong><p id="nl-modal-desc">{product.description}</p><div className="nl-modal-features">{product.features.map(x=><span key={x}><Check size={15}/>{x}</span>)}</div>{product.href?<a href={product.href} target="_blank" rel="noopener noreferrer" className="nl-primary">Open {product.name} <ExternalLink size={17}/></a>:<span className="nl-link-pending">Official product link coming soon.</span>}</div><ProductScene product={product} large/></div><p className="nl-modal-disclaimer">Preview visuals are illustrative. Your existing product account and learning data stay in their original app.</p></section></div>;
}

export default function Flagship(){
  const [page,setPage]=useState<'home'|'hub'>('home'),[menu,setMenu]=useState(false),[featured,setFeatured]=useState(0),[dialog,setDialog]=useState<Product|null>(null),[saved,setSaved]=useState<string[]>([]),[filter,setFilter]=useState<Filter>('All'),[search,setSearch]=useState('');
  const searchRef=useRef<HTMLInputElement>(null);
  useEffect(()=>{try{const v=JSON.parse(localStorage.getItem('nuri.saved-products')||'[]');if(Array.isArray(v))setSaved(v.filter((id:unknown):id is string=>typeof id==='string'))}catch{}const sync=()=>setPage(location.hash==='#hub'?'hub':'home');sync();addEventListener('popstate',sync);addEventListener('hashchange',sync);return()=>{removeEventListener('popstate',sync);removeEventListener('hashchange',sync)}},[]);
  useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(e.key==='/'&&page==='hub'&&!dialog&&!(e.target instanceof HTMLInputElement)&&!(e.target instanceof HTMLTextAreaElement)){e.preventDefault();searchRef.current?.focus()}};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[page,dialog]);
  const toggle=(id:string)=>setSaved(prev=>{const next=prev.includes(id)?prev.filter(x=>x!==id):[...prev,id];try{localStorage.setItem('nuri.saved-products',JSON.stringify(next))}catch{}return next});
  const navigate=(to:'home'|'hub')=>{if(to!==page)history.pushState({},'',to==='hub'?'#hub':location.pathname+location.search);setPage(to);setMenu(false);window.scrollTo({top:0,behavior:'smooth'})};
  const jump=(to:string)=>{navigate('home');setTimeout(()=>document.getElementById(to)?.scrollIntoView({behavior:'smooth'}),60)};
  const visible=useMemo(()=>products.filter(p=>(filter==='All'||(filter==='Saved'&&saved.includes(p.id))||(filter==='Learn Korean'&&p.id!=='kmate')||(filter==='Study in Korea'&&p.id==='kmate'))&&[p.name,p.description,p.category,...p.features].join(' ').toLowerCase().includes(search.trim().toLowerCase())),[filter,saved,search]);
  const current=products[featured];
  return <div className="nl"><a className="nl-skip" href="#nl-main">Skip to content</a><header className="nl-header"><div className="nl-wrap nl-header-inner"><Logo onClick={()=>navigate('home')}/><nav className={'nl-nav'+(menu?' is-open':'')} aria-label="Primary navigation"><button className={page==='home'?'active':''} onClick={()=>navigate('home')}>Home</button><button onClick={()=>jump('explore')}>Explore</button><button onClick={()=>jump('try')}>Try NURI</button><button onClick={()=>jump('journey')}>Find your path</button></nav><button className="nl-header-cta" onClick={()=>navigate('hub')}>Enter the hub <ArrowUpRight size={17}/></button><button className="nl-menu" aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div></header>
    {page==='home'?<main id="nl-main">
      <section className="nl-hero"><div className="nl-wrap nl-hero-grid"><div className="nl-hero-copy"><div className="nl-intro"><Sparkles size={14}/> THE NURI UNIVERSE · MADE TO EXPLORE</div><h1>One little spark.<br/><em>A world of</em><br/><span>possibilities.</span></h1><p>Learn the language. Get lost in a story. Find your people. Discover the Korea that feels like yours—all in one colorful little universe.</p><div className="nl-hero-actions"><button className="nl-primary" onClick={()=>navigate('hub')}>Explore the universe <ArrowUpRight size={18}/></button><button className="nl-link" onClick={()=>jump('explore')}>Meet the four spaces <ArrowDown size={18}/></button></div><div className="nl-hero-foot"><span className="nl-orbit-glyph">✳</span> FOUR PRODUCTS / INFINITE STARTING POINTS</div></div>
      <div className="nl-featured" aria-label="Interactive product showcase"><div className="nl-featured-top"><span><i/> EXPLORE A LITTLE FURTHER</span><span>0{featured+1} — 04</span></div><div className="nl-featured-card" key={current.id}><div className="nl-featured-card-top"><span className={'nl-small-glyph nl-'+hue[current.id]}>{icons[current.id]}</span><span>{current.name}</span><button onClick={()=>setDialog(current)} aria-label={'Preview '+current.name}><ArrowUpRight size={18}/></button></div><ProductScene product={current} large/><div className="nl-featured-bottom"><div><span>NOW EXPLORING</span><h3>{current.kicker}</h3></div><button onClick={()=>setDialog(current)}>Take a peek <ArrowRight size={16}/></button></div></div><div className="nl-featured-controls"><div role="group" aria-label="Choose a product">{products.map((p,i)=><button type="button" key={p.id} onClick={()=>setFeatured(i)} aria-pressed={featured===i} className={featured===i?'active':''}><span className={'nl-small-glyph nl-'+hue[p.id]}>{icons[p.id]}</span><span>{p.id==='drama'?'Drama':p.name}</span></button>)}</div><div className="nl-featured-arrows"><button aria-label="Previous product" onClick={()=>setFeatured(n=>(n+3)%4)}><ChevronLeft size={20}/></button><button aria-label="Next product" onClick={()=>setFeatured(n=>(n+1)%4)}><ChevronRight size={20}/></button></div></div></div></div><div className="nl-hero-sprinkle s1">✿</div><div className="nl-hero-sprinkle s2">✳</div></section>
      <div className="nl-ribbon"><div>한 걸음씩 <span>✳</span> LEARN A LITTLE <span>✳</span> FIND YOUR PEOPLE <span>✳</span> GO A LITTLE FURTHER <span>✳</span> 한 걸음씩 <span>✳</span> LEARN A LITTLE <span>✳</span> FIND YOUR PEOPLE <span>✳</span> GO A LITTLE FURTHER <span>✳</span></div></div>
      <section className="nl-explore nl-wrap" id="explore"><div className="nl-heading-row"><div><span className="nl-label">01 / YOUR FOUR SPACES</span><h2>A place for <em>every</em><br/>kind of curiosity<span className="nl-period">.</span></h2></div><p>Not four ordinary links. Four different ways to learn, connect and find your own next chapter.</p></div><div className="nl-product-grid">{products.map(p=><ProductTile key={p.id} product={p} isSaved={saved.includes(p.id)} onOpen={setDialog} onToggle={toggle}/>)}</div><div className="nl-explore-foot"><span><Sparkles size={17}/> A growing ecosystem, not a collection of demos.</span><button onClick={()=>navigate('hub')}>Explore all in the hub <ArrowUpRight size={17}/></button></div></section>
      <section className="nl-connection"><div className="nl-wrap nl-connection-grid"><div><span className="nl-label">02 / THE MAGIC IS IN THE CONNECTION</span><h2>One journey.<br/><em>Many ways to grow.</em></h2></div><div className="nl-connection-story"><div className="nl-connection-steps"><span className="nl-step-rose">한</span><i/><span className="nl-step-aqua"><Headphones size={26}/></span><i/><span className="nl-step-sun"><Film size={25}/></span><i/><span className="nl-step-violet"><GraduationCap size={25}/></span></div><p>Start with a word in Hallium. Hear it in a Haneul video. Understand it in a drama. Meet people preparing for Korea in KMate.</p><b>Different experiences. A world that fits together.</b></div></div></section>
      <Demo/><PathExplorer onOpen={setDialog}/>
      <section className="nl-finale nl-wrap"><span className="nl-label">MADE FOR THE CURIOUS, EVERYWHERE</span><h2>Keep your<br/><em>wonder alive.</em></h2><p>NURI Labs is an independent student-led educational technology initiative building experiences around language, stories and connection.</p><button className="nl-primary" onClick={()=>navigate('hub')}>Find your next adventure <ArrowUpRight size={18}/></button><span className="nl-finale-flower">✿</span></section>
    </main>:<main id="nl-main" className="nl-hub nl-wrap"><button className="nl-back" onClick={()=>navigate('home')}><ArrowLeft size={17}/> Back to NURI Labs</button><div className="nl-hub-head"><div><span className="nl-label">YOUR NURI SPACE / EXPLORE MODE</span><h1>Where to <em>today?</em><span>✳</span></h1><p>All four worlds, one starting point. Follow whatever makes you curious.</p></div><div className="nl-hub-sticker"><Globe2 size={42}/><b>YOU BELONG<br/>HERE.</b></div></div><div className="nl-hub-banner"><div><span>✳ THE NURI UNIVERSE</span><h2>Make a little room for discovery.</h2><p>Find the experience that feels right for you.</p></div><div className="nl-hub-floating"><span>한</span><span><Film size={26}/></span><span><Headphones size={28}/></span></div></div><div className="nl-hub-toolbar"><div><span className="nl-label">FOUR WAYS IN</span><h2>Explore the ecosystem <span>04</span></h2></div><label className="nl-search"><Search size={18}/><input ref={searchRef} type="search" aria-label="Search experiences" placeholder="Search experiences..." value={search} onChange={e=>setSearch(e.target.value)}/><kbd>/</kbd></label></div><div className="nl-filters" role="group" aria-label="Filter experiences">{(['All','Learn Korean','Study in Korea','Saved'] as Filter[]).map(f=><button key={f} aria-pressed={filter===f} className={filter===f?'active':''} onClick={()=>setFilter(f)}>{f==='Saved'&&<Bookmark size={14}/>} {f}{f==='Saved'&&saved.length?' ('+saved.length+')':''}</button>)}</div>{visible.length?<div className="nl-product-grid nl-hub-grid">{visible.map(p=><ProductTile key={p.id} product={p} onOpen={setDialog} isSaved={saved.includes(p.id)} onToggle={toggle}/>)}</div>:<div className="nl-empty"><Search size={29}/><h3>No matching spaces—yet.</h3><p>Try another search or return to the full universe.</p><button onClick={()=>{setSearch('');setFilter('All')}}><RotateCcw size={16}/> Clear filters</button></div>}<div className="nl-passport"><div className="nl-passport-icon"><Compass size={32}/></div><div><span>COMING LATER / NURI LEARNING PASSPORT</span><h3>Your journey, connected.</h3><p>Cross-product progress and shared sign-in are not live yet. Stars are saved only in this browser—your existing accounts remain independent.</p></div><span className="nl-passport-tag">PLANNED</span></div></main>}
    <footer className="nl-footer"><div className="nl-wrap nl-footer-inner"><Logo onClick={()=>navigate('home')}/><p>Made with curiosity. Built for possibility.</p><span>© 2026 NURI Labs</span></div></footer><Details product={dialog} onClose={()=>setDialog(null)}/></div>;
}
