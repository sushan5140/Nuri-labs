'use client';

import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, Check, Compass, Film, GraduationCap, Headphones, MessageCircle, Play, Sparkles } from 'lucide-react';

type ChapterId = 'kmate' | 'hallium' | 'video' | 'drama';
type Chapter = {
 id: ChapterId;
 index: string;
 label: string;
 name: string;
 question: string;
 title: string;
 italic: string;
 first: string;
 second: string;
 moment: string;
 detail: string;
};

const chapters: Chapter[] = [
 {
  id:'kmate',index:'01',label:'THE DREAM',name:'KMate',
  question:'The destination was clear. The instructions were not.',
  title:'A dream of Korea',italic:'should not begin in confusion.',
  first:'A scholarship applicant can have an embassy notice open in one tab, university requirements in another, last year’s PDF in a third and a dozen different answers in a group chat. Everyone is trying to help. It is still difficult to know which rule actually applies.',
  second:'KMate was built around that exact problem: a place to understand your GKS route, organize your application, prepare for interviews and find applicants who are walking a similar path—while keeping official rules separate from community experience.',
  moment:'From “Where do I even start?” to “I know what comes next.”',
  detail:'APPLICATION ROUTES / SOURCES / PREPARATION / PEOPLE'
 },
 {
  id:'hallium',index:'02',label:'THE VOICE',name:'Hallium',
  question:'Knowing the word is not the same as saying it.',
  title:'A language becomes real',italic:'when it becomes yours.',
  first:'You can collect vocabulary, finish a grammar lesson and still freeze when you want to say something simple to another person. Learning Korean should not end at getting the answer right on a screen.',
  second:'Hallium gives everyday Korean a place to grow—from a word and a grammar pattern to a sentence you understand and a conversation you are ready to have. The idea is not to rush toward fluency, but to make each little step feel usable.',
  moment:'From a word you studied to something you can actually say.',
  detail:'WORDS / GRAMMAR / CONVERSATION / CONNECTION'
 },
 {
  id:'video',index:'03',label:'THE MOMENT',name:'Haneul Video Lab',
  question:'Real Korean does not wait for you to read the subtitle.',
  title:'Then the language',italic:'starts moving.',
  first:'A sentence can be perfectly clear in a notebook and almost unrecognizable when someone says it naturally. Speed, tone and context change everything. Watching more is not always the same as understanding more.',
  second:'Haneul Video Lab turns real video moments into learning moments. Guess before the meaning appears. Listen again. Replay a line. Notice the words inside it. The scene becomes more than something you watched; it becomes something you understood.',
  moment:'From “That sounded familiar” to “I heard what they meant.”',
  detail:'LISTEN / GUESS / REPLAY / UNDERSTAND'
 },
 {
  id:'drama',index:'04',label:'THE FEELING',name:'K-Drama Interactive',
  question:'Some lines stay with you long after the scene ends.',
  title:'What if you could',italic:'step inside the story?',
  first:'There is a difference between reading a translation and feeling why someone said a line at that exact moment. A hesitant answer, a small invitation, a change of tone—the meaning often lives in the scene as much as in the words.',
  second:'K-Drama Interactive makes the viewer part of the exchange. Explore a scene, choose a response, put dialogue back together and let the story give Korean a reason to stick. The language is no longer only explained; it becomes something you take part in.',
  moment:'From watching the moment to finding your own words in it.',
  detail:'SCENES / CHOICES / DIALOGUE / MEMORY'
 }
];

function ChapterArt({id}:{id:ChapterId}){
 if(id==='kmate')return <div className="ns-artwork ns-artwork-kmate" aria-hidden="true">
   <span className="ns-art-caption">THE NEXT CHAPTER / KOREA</span>
   <div className="ns-kmate-orbit"><span className="ns-kmate-routes">GKS-U<br/>GKS-G</span><span className="ns-kmate-orbit-dot one"/><span className="ns-kmate-orbit-dot two"/><span className="ns-kmate-orbit-dot three"/></div>
   <div className="ns-kmate-paper"><div className="ns-paper-top"><GraduationCap size={19}/> YOUR APPLICATION</div><div className="ns-paper-line"><Check size={14}/> Find your route</div><div className="ns-paper-line"><Check size={14}/> Know your documents</div><div className="ns-paper-line"><Check size={14}/> Prepare together</div><span className="ns-paper-seal">✳</span></div>
   <span className="ns-art-bottom">NOT ANOTHER TAB. A PLACE TO BEGIN.</span>
  </div>;
 if(id==='hallium')return <div className="ns-artwork ns-artwork-hallium" aria-hidden="true">
   <span className="ns-art-caption">LITTLE WORDS / BIGGER WORLDS</span><div className="ns-hallium-flower">✿</div>
   <div className="ns-hallium-note"><small>THE WORD YOU KEEP</small><strong lang="ko">함께</strong><span>ham-kke</span><b>together.</b><i>♡</i></div>
   <div className="ns-hallium-bubble">A sentence for the<br/>person next to you. <MessageCircle size={19}/></div>
   <span className="ns-art-bottom">ONE WORD BECOMES A CONVERSATION.</span>
  </div>;
 if(id==='video')return <div className="ns-artwork ns-artwork-video" aria-hidden="true">
   <span className="ns-art-caption">LISTEN CLOSER / LOOK AGAIN</span><div className="ns-film-frame"><span className="ns-film-sun"/><span className="ns-film-hill one"/><span className="ns-film-hill two"/><span className="ns-film-play"><Play size={26} fill="currentColor"/></span><div className="ns-film-sub" lang="ko">오늘 날씨가 정말 좋아요!</div></div>
   <div className="ns-film-track">{Array.from({length:25},(_,i)=><span key={i} style={{height:(8+(i*11%29))+'px'}}/>)}</div>
   <div className="ns-film-tap"><Headphones size={16}/> REPLAY THE MOMENT <ArrowRight size={14}/></div>
   <span className="ns-art-bottom">NOT JUST WATCHING. REALLY HEARING.</span>
  </div>;
 return <div className="ns-artwork ns-artwork-drama" aria-hidden="true">
   <span className="ns-art-caption">THE SCENE IS WAITING FOR YOU</span><div className="ns-drama-moon">☾</div>
   <div className="ns-drama-floor"/><div className="ns-drama-person one"/><div className="ns-drama-person two"/>
   <div className="ns-drama-dialogue"><small>THE NEXT LINE IS YOURS</small><strong lang="ko">우리 같이 갈래요?</strong><span>Shall we go together?</span></div>
   <span className="ns-art-bottom">THE STORY MAKES THE WORDS STAY.</span>
  </div>;
}

export default function Storybook({onOpen,onExplore}:{onOpen:(id:ChapterId)=>void;onExplore:()=>void}){
 const [active,setActive]=useState<ChapterId>('kmate');
 useEffect(()=>{
  if(typeof IntersectionObserver==='undefined')return;
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)setActive(entry.target.id.replace('story-','') as ChapterId)}},{rootMargin:'-20% 0px -57% 0px',threshold:0});
  chapters.forEach(ch=>{const el=document.getElementById('story-'+ch.id);if(el)observer.observe(el)});
  return()=>observer.disconnect();
 },[]);
 const jump=(id:ChapterId)=>{setActive(id);document.getElementById('story-'+id)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'})};
 return <section id="our-story" className="ns">
  <div className="ns-opening"><div className="na-wrap ns-opening-grid"><div className="ns-opening-copy"><span className="ns-label"><span/> THE STORY OF NURI LABS</span><h2>Four questions.<br/>One <em>stubborn idea.</em></h2><p className="ns-opening-first">What if the things that make learning difficult could become the very reason to build something better?</p><p>Scholarship rules scattered across pages. A word you knew but could not say. A sentence that disappeared when someone spoke. A scene you felt without quite understanding it.</p><p>Different moments, same wish: <strong>make the next step feel a little less distant.</strong> That is the idea behind NURI Labs—and the four worlds growing within it.</p><button type="button" onClick={()=>jump('kmate')}>Read the four chapters <ArrowDownRight size={17}/></button></div><div className="ns-opening-art" aria-hidden="true"><div className="ns-opening-orbit"><i>01</i><i>02</i><i>03</i><i>04</i></div><div className="ns-opening-core"><span>n</span><b>✳</b></div><span className="ns-opening-sticker top">learn.</span><span className="ns-opening-sticker middle">connect.</span><span className="ns-opening-sticker bottom">go further.</span><div className="ns-opening-foot">FOUR WORLDS, ONE REASON TO BEGIN.</div></div></div></div>
  <div className="ns-chapters na-wrap"><div className="ns-chapter-layout"><nav className="ns-chapter-nav" aria-label="Explore the stories behind NURI products"><span>THE CHAPTERS</span>{chapters.map(c=><button type="button" key={c.id} className={active===c.id?'active':''} onClick={()=>jump(c.id)} aria-current={active===c.id?'step':undefined}><small>{c.index}</small><strong>{c.name}</strong><span>{c.label}</span></button>)}<p>Scroll through the stories, or choose one to read.</p></nav><div className="ns-chapter-list">{chapters.map(c=><article key={c.id} id={'story-'+c.id} className={'ns-chapter ns-chapter-'+c.id}><div className="ns-chapter-head"><span>{c.index} / {c.label}</span><span>THE WHY BEHIND {c.name.toUpperCase()}</span></div><div className="ns-chapter-main"><div className="ns-chapter-copy"><p className="ns-chapter-question">“{c.question}”</p><h3>{c.title}<br/><em>{c.italic}</em></h3><p>{c.first}</p><p>{c.second}</p><div className="ns-chapter-turn"><Sparkles size={18}/><strong>{c.moment}</strong></div><button className="ns-chapter-cta" type="button" onClick={()=>onOpen(c.id)}>Step into {c.name} <ArrowUpRight size={17}/></button></div><ChapterArt id={c.id}/></div><div className="ns-chapter-bottom"><span>{c.detail}</span><span>CHAPTER {c.index} / 04</span></div></article>)}</div></div></div>
  <div className="ns-outro"><div className="na-wrap ns-outro-inner"><div><span>THE THREAD BETWEEN THEM</span><h2>A dream becomes a plan.<br/>A word becomes a sentence.<br/>A sentence becomes a scene.<br/><em>A scene becomes yours.</em></h2><p>NURI Labs is the place where those journeys meet. You do not have to begin with everything. Just begin with the part that matters to you.</p><button type="button" onClick={onExplore}>Find your world <ArrowUpRight size={18}/></button></div><div className="ns-outro-flower" aria-hidden="true">✳</div></div></div>
 </section>;
}
