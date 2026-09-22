'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Bookmark, Check, CheckCircle2, ChevronLeft, ChevronRight, Compass, ExternalLink, Film, GraduationCap, Headphones, Heart, Menu, Play, RotateCcw, Search, Sparkles, WandSparkles, X } from 'lucide-react';
import { products, type Product } from '@/lib/products';
import Storybook from './storybook';

type WorldId='hallium'|'kmate'|'video'|'drama';
type View='home'|'hub';
const order:WorldId[]=['hallium','video','drama','kmate'];
const world:Record<WorldId,{label:string;short:string;note:string;emoji:string;number:string}>={
 hallium:{label:'Language companion',short:'Find your words',note:'Speak a little more confidently each day.',emoji:'한',number:'01'},
 video:{label:'Korean in context',short:'Hear the real world',note:'The language comes alive between the lines.',emoji:'늘',number:'02'},
 drama:{label:'Stories you live',short:'Step into the scene',note:'Feel the meaning before looking it up.',emoji:'극',number:'03'},
 kmate:{label:'Your Korea journey',short:'Meet your people',note:'Get ready for the opportunities ahead.',emoji:'K',number:'04'}
};
const entries=order.map(id=>products.find(p=>p.id===id)!).filter(Boolean);
const sampleWords=[
 {ko:'설레다',sound:'seol-le-da',en:'to feel fluttery or excited',note:'The feeling before something you are looking forward to.'},
 {ko:'천천히',sound:'cheon-cheon-hi',en:'slowly',note:'A reminder that you can take your time.'},
 {ko:'함께',sound:'ham-kke',en:'together',note:'Better with the people around you.'}
];
const actions=['Explore application routes','Organize preparation milestones','Practice interview questions','Meet fellow applicants'];

function Mark(){return <span className="na-mark" aria-hidden="true">n<span>✳</span></span>}
function Branch({id}:{id:WorldId}){return <span className={'na-branch na-'+id} aria-hidden="true">{world[id].emoji}</span>}
function Launcher({p,small=false}:{p:Product,small?:boolean}){
 return p.href?<a className={small?'na-launch mini':'na-launch'} href={p.href} target="_blank" rel="noopener noreferrer">Open {p.name}<ExternalLink size={small?14:17}/></a>:<span className="na-soon">Official link coming soon</span>;
}

function Atlas({active,onChoose,onExplore}:{active:WorldId,onChoose:(id:WorldId)=>void,onExplore:()=>void}){
 return <div id="universe" className={'na-atlas active-'+active}>
  <div className="na-atlas-top"><span><i/> AN INTERACTIVE UNIVERSE</span><span>EXPLORE / 04 WORLDS</span></div>
  <div className="na-atlas-stage">
   <svg className="na-atlas-lines" viewBox="0 0 640 470" aria-hidden="true" preserveAspectRatio="none"><path d="M320 230 C252 140 180 131 121 110"/><path d="M320 230 C397 146 480 138 536 104"/><path d="M320 230 C405 316 483 337 534 368"/><path d="M320 230 C238 308 180 330 117 360"/></svg>
   <div className="na-atlas-core"><span className="na-core-glow"/> <Mark/><small>THE NURI<br/>UNIVERSE</small></div>
   {order.map((id,i)=><button key={id} className={'na-planet na-planet-'+id+(active===id?' selected':'')} type="button" aria-pressed={active===id} aria-label={'Explore '+(entries.find(p=>p.id===id)?.name||id)} onClick={()=>onChoose(id)}>
    <span className="na-planet-number">0{i+1}</span><Branch id={id}/><strong>{id==='video'?'Haneul Video Lab':id==='drama'?'K-Drama':id==='kmate'?'KMate':'Hallium'}</strong><small>{world[id].short}</small><ArrowUpRight className="na-planet-arrow" size={15}/>
   </button>)}
   <span className="na-map-word one" aria-hidden="true">배우다</span><span className="na-map-word two" aria-hidden="true">discover</span><span className="na-map-word three" aria-hidden="true">✽</span>
  </div>
  <div className="na-atlas-footer"><span>SELECTED: {entries.find(p=>p.id===active)?.name} · {world[active].short}</span><button type="button" onClick={onExplore}>Enter this world <ArrowDownRight size={17}/></button></div>
 </div>;
}

function HalliumLive(){
 const [index,setIndex]=useState(0),[flipped,setFlipped]=useState(false);const w=sampleWords[index];
 return <div className="na-live-card na-hallium-live"><div className="na-live-eyebrow"><span>01 / WORD GARDEN</span><span><Heart size={13}/> SAMPLE LESSON</span></div>
 <div className="na-word-area"><div className="na-korean-ring">✿</div><span className="na-translation-label">{flipped?'MEANING REVEALED':'YOUR WORD OF THE MOMENT'}</span><strong lang="ko">{w.ko}</strong><span className="na-pronunciation">{w.sound}</span><div className={'na-meaning'+(flipped?' shown':'')}>{flipped?<><b>{w.en}</b><small>{w.note}</small></>:<span>Tap to discover what it means.</span>}</div></div>
 <div className="na-live-foot"><span className="na-live-counter">0{index+1} / 03</span><button type="button" onClick={()=>setFlipped(v=>!v)}>{flipped?'Hide meaning':'Reveal meaning'} <Sparkles size={16}/></button><button type="button" className="na-round" aria-label="Next Korean word" onClick={()=>{setIndex(v=>(v+1)%sampleWords.length);setFlipped(false)}}><ArrowRight size={19}/></button></div></div>;
}
function VideoLive(){
 const [reveal,setReveal]=useState(false),[words,setWords]=useState(false);
 return <div className="na-live-card na-video-live"><div className="na-live-eyebrow"><span>02 / HEAR IT IN CONTEXT</span><span>SCENE EXERCISE</span></div><div className="na-scene-view"><span className="na-sun"/><span className="na-cloud c1"/><span className="na-cloud c2"/><span className="na-hill h1"/><span className="na-hill h2"/><div className="na-scene-clapper"><Film size={16}/> A lovely afternoon</div><div className="na-scene-play"><Play size={23} fill="currentColor"/></div></div><div className="na-scene-caption"><small>WHAT DID THE SPEAKER MEAN?</small><strong lang="ko">오늘 날씨가 정말 좋아요!</strong>{reveal?<p>“The weather is really nice today!”</p>:<p className="na-placeholder">Make a guess before revealing the meaning.</p>}{words&&<div className="na-word-breakdown">오늘 · today <span/> 날씨 · weather <span/> 정말 · really</div>}</div><div className="na-live-foot"><span className="na-live-counter">SAMPLE / NOT A VIDEO PLAYER</span><button type="button" onClick={()=>setWords(v=>!v)}>{words?'Hide words':'Break it down'}</button><button type="button" onClick={()=>setReveal(v=>!v)}>{reveal?'Hide meaning':'Reveal meaning'} <ArrowRight size={16}/></button></div></div>;
}
function DramaLive(){
 const [choice,setChoice]=useState<number|null>(null);
 return <div className="na-live-card na-drama-live"><div className="na-live-eyebrow"><span>03 / INSIDE THE STORY</span><span>CHOICE-BASED SAMPLE</span></div><div className="na-drama-view"><div className="na-moon">☾</div><div className="na-person one"/><div className="na-person two"/><span className="na-drama-caption" lang="ko">{choice===null?'우리 같이 갈래요?':choice===0?'좋아요, 같이 가요!':'다음에 같이 가요!'}</span><small className="na-scene-label">YOUR NEXT LINE</small></div><div className="na-dialogue"><span>{choice===null?'What would you say back?':'Your dialogue choice'}</span><p>{choice===null?'“Shall we go together?”':choice===0?'“Sure, let’s go together!”':'“Let’s go together next time!”'}</p><div className="na-choices"><button className={choice===0?'picked':''} onClick={()=>setChoice(0)}>좋아요! <small>Sounds good!</small></button><button className={choice===1?'picked':''} onClick={()=>setChoice(1)}>다음에요. <small>Maybe next time.</small></button></div></div><div className="na-live-foot"><span className="na-live-counter">ILLUSTRATIVE SCENE</span><button type="button" onClick={()=>setChoice(null)}><RotateCcw size={15}/> Play again</button></div></div>;
}
function KMateLive(){
 const [checked,setChecked]=useState<number[]>([]);
 return <div className="na-live-card na-kmate-live"><div className="na-live-eyebrow"><span>04 / YOUR KOREA BOARD</span><span><GraduationCap size={15}/> EXPLORE THE POSSIBILITIES</span></div><div className="na-kmate-intro"><span>GKS JOURNEY / SAMPLE</span><h3>Your next chapter<br/><em>starts with a plan.</em></h3><p>Try organizing a few ways to get started.</p></div><div className="na-kmate-actions">{actions.map((a,i)=><button key={a} className={checked.includes(i)?'done':''} type="button" aria-pressed={checked.includes(i)} onClick={()=>setChecked(prev=>prev.includes(i)?prev.filter(n=>n!==i):[...prev,i])}><span>{checked.includes(i)?<Check size={17}/>:String(i+1).padStart(2,'0')}</span>{a}<ArrowUpRight size={16}/></button>)}</div><div className="na-live-foot"><span className="na-live-counter">SAMPLE BOARD · {checked.length} / 4 EXPLORED</span><button type="button" onClick={()=>setChecked([])}><RotateCcw size={15}/> Reset</button></div></div>;
}
function WorldPortal({active,onChoose,onClose,onSave,saved}:{active:WorldId|null,onChoose:(id:WorldId)=>void,onClose:()=>void,onSave:(id:string)=>void,saved:string[]}){
 const close=useRef<HTMLButtonElement>(null);
 useEffect(()=>{
  if(!active)return;
  const previous=document.activeElement as HTMLElement|null, old=document.body.style.overflow;
  document.body.style.overflow='hidden';
  close.current?.focus();
  const onKey=(e:KeyboardEvent)=>{
   if(e.key==='Escape'){e.preventDefault();onClose()}
   if(e.key!=='Tab')return;
   const items=Array.from(document.querySelectorAll<HTMLElement>('.na-portal button:not(:disabled),.na-portal a[href]'));
   if(!items.length)return;
   const first=items[0],last=items[items.length-1];
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  };
  window.addEventListener('keydown',onKey);
  return()=>{document.body.style.overflow=old;window.removeEventListener('keydown',onKey);previous?.focus()};
 },[active,onClose]);
 if(!active)return null;
 const p=entries.find(x=>x.id===active)!;
 return <div className="na-portal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
  <section role="dialog" aria-modal="true" aria-labelledby="na-portal-title" aria-describedby="na-portal-description" className={'na-portal na-portal-'+active}>
   <div className="na-portal-top"><span><Sparkles size={16}/> ONE UNIVERSE / WORLD {world[active].number}</span><button ref={close} type="button" onClick={onClose} aria-label="Close world"><X size={20}/></button></div>
   <div className="na-portal-nav" role="group" aria-label="Switch NURI worlds">{order.map(id=><button key={id} type="button" aria-pressed={id===active} className={id===active?'active':''} onClick={()=>onChoose(id)}><Branch id={id}/><span>{entries.find(p=>p.id===id)?.name}</span></button>)}</div>
   <div className="na-portal-grid">
    <div className="na-portal-intro">
     <Branch id={active}/><span className="na-kicker">WORLD {world[active].number} / {world[active].label.toUpperCase()}</span>
     <h2 id="na-portal-title">{p.name}<span>.</span></h2>
     <strong>{world[active].short}</strong>
     <p id="na-portal-description">{p.description}</p>
     <div className="na-portal-features">{p.features.map(feature=><span key={feature}><Check size={13}/>{feature}</span>)}</div>
     <div className="na-portal-actions"><button type="button" onClick={()=>onSave(active)} className={saved.includes(active)?'na-keep is-saved':'na-keep'} aria-pressed={saved.includes(active)}><Bookmark size={16} fill={saved.includes(active)?'currentColor':'none'}/>{saved.includes(active)?'Saved for later':'Save for later'}</button><Launcher p={p}/></div>
    </div>
    <div key={active} className="na-portal-live">{active==='hallium'?<HalliumLive/>:active==='video'?<VideoLive/>:active==='drama'?<DramaLive/>:<KMateLive/>}</div>
   </div>
   <p className="na-portal-note">Interactive concept preview only. Your actual account and progress stay in the original application.</p>
  </section>
 </div>;
}

const trails=[
 {title:'Learn your first Korean phrases',body:'Begin with a word, then recognize it in the real world.',ids:['hallium','video']},
 {title:'Follow the stories you love',body:'Hear dialogue, make a choice and understand what it means.',ids:['drama','video','hallium']},
 {title:'Plan your route to Korea',body:'Connect with applicants and build a Korean-learning foundation.',ids:['kmate','hallium']}
];
function Trail({onPick}:{onPick:(id:WorldId)=>void}){
 const [index,setIndex]=useState(0);const p=trails[index];
 return <section className="na-trail" id="journey"><div className="na-wrap na-trail-layout"><div className="na-trail-copy"><span className="na-kicker">03 / FIND YOUR STARTING POINT</span><h2>Everyone begins<br/><em>somewhere.</em></h2><p>Find a route that feels like yours. NURI connects the experiences without making you follow a single path.</p><div className="na-trail-stamp">✳</div></div><div className="na-trail-board"><div className="na-trail-board-top">CHOOSE A DIRECTION <Compass size={18}/></div>{trails.map((t,i)=><button type="button" key={t.title} className={'na-trail-choice'+(index===i?' active':'')} aria-pressed={index===i} onClick={()=>setIndex(i)}><span>0{i+1}</span><b>{t.title}</b><ArrowRight size={17}/></button>)}<div className="na-trail-result" key={index}><span>YOUR NURI ROUTE</span><p>{p.body}</p><div className="na-trail-stations">{p.ids.map((id,i)=><button type="button" key={id} onClick={()=>onPick(id as WorldId)}><span>{String(i+1).padStart(2,'0')}</span><Branch id={id as WorldId}/><b>{entries.find(e=>e.id===id)?.name}</b><ArrowUpRight size={15}/></button>)}</div></div></div></div></section>;
}
export default function NuriAtlas(){
 const [active,setActive]=useState<WorldId>('hallium'),[portal,setPortal]=useState<WorldId|null>(null),[view,setView]=useState<View>('home'),[saved,setSaved]=useState<string[]>([]),[menu,setMenu]=useState(false),[filter,setFilter]=useState('All'),[query,setQuery]=useState('');const searchRef=useRef<HTMLInputElement>(null);
 useEffect(()=>{try{const v=JSON.parse(localStorage.getItem('nuri.saved-products')||'[]');if(Array.isArray(v))setSaved(v.filter((x:unknown):x is string=>typeof x==='string'))}catch{}const sync=()=>setView(location.hash==='#hub'?'hub':'home');sync();addEventListener('popstate',sync);addEventListener('hashchange',sync);return()=>{removeEventListener('popstate',sync);removeEventListener('hashchange',sync)}},[]);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='/'&&view==='hub'&&!(e.target instanceof HTMLInputElement)&&!(e.target instanceof HTMLTextAreaElement)){e.preventDefault();searchRef.current?.focus()}};addEventListener('keydown',key);return()=>removeEventListener('keydown',key)},[view]);
 const openWorld=(id:WorldId)=>{setActive(id);setPortal(id);setMenu(false)};
 const toggleSaved=(id:string)=>setSaved(prev=>{const next=prev.includes(id)?prev.filter(x=>x!==id):[...prev,id];try{localStorage.setItem('nuri.saved-products',JSON.stringify(next))}catch{}return next});
 const navigate=(v:View)=>{if(v!==view)history.pushState({},'',v==='hub'?'#hub':location.pathname+location.search);setView(v);setMenu(false);window.scrollTo({top:0,behavior:'smooth'})};
 const scroll=(section:string)=>{navigate('home');setTimeout(()=>document.getElementById(section)?.scrollIntoView({behavior:'smooth'}),55)};
 const visible=useMemo(()=>entries.filter(p=>(filter==='All'||filter==='Saved'&&saved.includes(p.id)||filter==='Language'&&p.id!=='kmate'||filter==='Study abroad'&&p.id==='kmate')&&[p.name,p.description,...p.features].join(' ').toLowerCase().includes(query.toLowerCase().trim())),[filter,saved,query]);
 return <div className="na"><a className="na-skip" href="#main">Skip to content</a><header className="na-header"><div className="na-wrap na-header-inner"><button type="button" className="na-brand" onClick={()=>navigate('home')} aria-label="NURI Labs home"><Mark/><span>nuri<b>labs</b><small>LEARN. CONNECT. GROW.</small></span></button><nav className={'na-nav'+(menu?' open':'')} aria-label="Main navigation"><button onClick={()=>navigate('home')} className={view==='home'?'current':''}>Home</button><button onClick={()=>scroll('universe')}>One universe</button><button onClick={()=>scroll('journey')}>Find your path</button><button onClick={()=>scroll('our-story')}>Our story</button></nav><button className="na-header-cta" onClick={()=>navigate('hub')}>Enter the hub <ArrowUpRight size={17}/></button><button className="na-menu" aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu} onClick={()=>setMenu(v=>!v)}>{menu?<X/>:<Menu/>}</button></div></header>
 {view==='home'?<main id="main"><section className="na-hero"><div className="na-wrap na-hero-grid"><div className="na-hero-copy"><div className="na-hero-chip"><Sparkles size={15}/> AN INDEPENDENT STUDENT-LED INITIATIVE</div><h1>More than<br/>a place to <em>learn.</em><span className="na-hero-flower">✳</span></h1><p>Four ways to explore Korean, stories, friendships and your future. One universe built for the endlessly curious.</p><div className="na-hero-actions"><button type="button" onClick={()=>openWorld(active)} className="na-button">Find your first spark <ArrowUpRight size={19}/></button><button type="button" className="na-text-button" onClick={()=>scroll('universe')}>Meet our worlds <ArrowDownRight size={18}/></button></div><div className="na-hero-social"><span className="na-social-icons"><Branch id="hallium"/><Branch id="video"/><Branch id="drama"/><Branch id="kmate"/></span><span>Different paths.<br/>One bigger picture.</span></div></div><Atlas active={active} onChoose={setActive} onExplore={()=>openWorld(active)}/></div><div className="na-hero-side">MAKE SPACE FOR WONDER / 여정</div></section>
 <div className="na-ticker"><span>LEARN SOMETHING NEW ✳ FIND YOUR PEOPLE ✳ GET LOST IN A STORY ✳ BUILD YOUR NEXT CHAPTER ✳ LEARN SOMETHING NEW ✳ FIND YOUR PEOPLE ✳ GET LOST IN A STORY ✳ BUILD YOUR NEXT CHAPTER ✳ </span></div><Trail onPick={openWorld}/><Storybook onOpen={openWorld} onExplore={()=>scroll('universe')}/></main>
 :<main className="na-hub na-wrap" id="main"><button type="button" className="na-back" onClick={()=>navigate('home')}><ArrowLeft size={17}/> Back to NURI Labs</button><div className="na-hub-title"><span className="na-kicker">WELCOME TO YOUR NURI SPACE</span><h1>Choose your <em>next chapter.</em></h1><p>Pick a world, save it for later or try the sample experience before opening the original app.</p></div><div className="na-hub-hero"><span>✳ THE NURI UNIVERSE / FOUR OPEN DOORS</span><b>Where curiosity takes you next is up to you.</b><div>{order.map(id=><button key={id} onClick={()=>openWorld(id)} aria-label={'Try '+entries.find(p=>p.id===id)?.name}><Branch id={id}/></button>)}</div></div><div className="na-hub-toolbar"><h2>Explore the ecosystem <small>04</small></h2><label className="na-search"><Search size={18}/><input ref={searchRef} type="search" placeholder="Search experiences..." aria-label="Search experiences" value={query} onChange={e=>setQuery(e.target.value)}/><kbd>/</kbd></label></div><div className="na-filters" role="group" aria-label="Filter products">{['All','Language','Study abroad','Saved'].map(f=><button type="button" key={f} aria-pressed={filter===f} className={filter===f?'active':''} onClick={()=>setFilter(f)}>{f==='Saved'&&<Bookmark size={14}/>} {f}{f==='Saved'?' ('+saved.length+')':''}</button>)}</div>{visible.length?<div className="na-hub-grid">{visible.map(p=><article key={p.id} className={'na-hub-tile na-hub-'+p.id}><div className="na-hub-tile-head"><Branch id={p.id as WorldId}/><button type="button" onClick={()=>toggleSaved(p.id)} aria-label={(saved.includes(p.id)?'Unsave ':'Save ')+p.name} aria-pressed={saved.includes(p.id)}><Bookmark size={17} fill={saved.includes(p.id)?'currentColor':'none'}/></button></div><h3>{p.name}</h3><p>{p.description}</p><div className="na-hub-tile-tags">{p.features.map(x=><span key={x}>{x}</span>)}</div><div className="na-hub-tile-actions"><button type="button" onClick={()=>openWorld(p.id as WorldId)}>Try sample <ArrowUpRight size={16}/></button><Launcher p={p} small/></div></article>)}</div>:<div className="na-empty"><Search size={28}/><h3>No matching worlds.</h3><p>Try a different search or browse all four.</p><button onClick={()=>{setQuery('');setFilter('All')}}><RotateCcw size={15}/> Clear filters</button></div>}<div className="na-hub-note"><Sparkles size={21}/><div><b>Your NURI Learning Passport is still a future idea.</b><p>Saved worlds stay only in this browser. We haven't linked Google accounts, progress or data from the existing products.</p></div></div></main>}
 <WorldPortal active={portal} onChoose={setActive} onClose={()=>setPortal(null)} onSave={toggleSaved} saved={saved}/><footer className="na-footer"><div className="na-wrap"><span><Mark/> NURI LABS</span><p>Made with curiosity. Built for possibility.</p><small>© 2026 NURI Labs</small></div></footer></div>;
}
