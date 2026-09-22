'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Film, GraduationCap, Headphones, Sparkles } from 'lucide-react';

type WorldId = 'hallium' | 'video' | 'drama' | 'kmate';
type Scene = {
 id: WorldId;
 number: string;
 small: string;
 title: string;
 italic: string;
 spoken: string;
 thought: string;
 transition: string;
 product: string;
 tag: string;
};

const moments: Scene[] = [
 {
  id:'hallium',number:'01',small:'THE FIRST WORD',title:'It begins with',italic:'hello.',
  spoken:'안녕하세요',
  thought:'A word that once looked unfamiliar starts to mean something. Then another word. Then a sentence. One day, you have something you actually want to say.',
  transition:'That first word deserves somewhere to grow.',
  product:'Hallium',tag:'A LANGUAGE YOU CAN MAKE YOUR OWN',
 },
 {
  id:'video',number:'02',small:'THE FIRST TIME YOU HEAR IT',title:'Then a voice',italic:'brings it to life.',
  spoken:'들려요?',
  thought:'You hear Korean outside the lesson. It is quicker, softer, less predictable. You replay the moment. Suddenly you catch the phrase. The screen did not change; your understanding did.',
  transition:'Because a language was always meant to be heard.',
  product:'Haneul Video Lab',tag:'REAL MOMENTS. REAL LISTENING.',
 },
 {
  id:'drama',number:'03',small:'THE FIRST STORY THAT STAYS',title:'Then it starts to',italic:'feel like something.',
  spoken:'우리 같이 갈래요?',
  thought:'A character pauses before answering. Two simple lines carry an entire feeling. You pick a reply, notice the tone, and remember the words—not because you memorized them, but because you were there for the moment.',
  transition:'Because stories give words somewhere to belong.',
  product:'K-Drama Interactive',tag:'LEARN INSIDE THE SCENE.',
 },
 {
  id:'kmate',number:'04',small:'THE FIRST STEP TOWARD A DREAM',title:'And “someday”',italic:'becomes a plan.',
  spoken:'한국으로',
  thought:'Maybe Korea is more than a place you see on a screen. There are universities to understand, application routes to check, interviews to prepare for and people on a similar journey. A dream still takes work—but it no longer has to begin as a thousand scattered tabs.',
  transition:'Because the next chapter should feel possible to begin.',
  product:'KMate',tag:'TURN THE DREAM INTO A NEXT STEP.',
 }
];

function WorldMark({id}:{id:WorldId}){
 return <span className={'sf-worldmark sf-worldmark-'+id} aria-hidden="true">{id==='hallium'?'한':id==='video'?'늘':id==='drama'?'극':'K'}</span>;
}

function SceneArtwork({scene}:{scene:Scene}){
 if(scene.id==='hallium')return <div className="sf-image sf-image-hallium" aria-hidden="true">
   <span className="sf-image-corner">A SMALL BEGINNING</span><span className="sf-hallium-daisy">✿</span>
   <div className="sf-word-note"><small>YOUR FIRST LITTLE WORD</small><strong lang="ko">안녕하세요</strong><em>hello.</em><span>one word at a time ♡</span></div>
   <span className="sf-art-footer">SAY IT OUT LOUD / KEEP GOING</span>
  </div>;
 if(scene.id==='video')return <div className="sf-image sf-image-video" aria-hidden="true">
   <span className="sf-image-corner">A MOMENT WORTH REPLAYING</span>
   <div className="sf-video-window"><span className="sf-video-sun"/><span className="sf-video-hill a"/><span className="sf-video-hill b"/><div className="sf-video-play"><Headphones size={28}/></div><span className="sf-video-caption" lang="ko">오늘 날씨가 정말 좋아요!</span></div>
   <div className="sf-wave">{Array.from({length:28},(_,i)=><span key={i} style={{height:(8+(i*13%31))+'px'}} />)}</div><span className="sf-art-footer">LISTEN / NOTICE / LISTEN AGAIN</span>
  </div>;
 if(scene.id==='drama')return <div className="sf-image sf-image-drama" aria-hidden="true">
   <span className="sf-image-corner">A SCENE YOU CARRY WITH YOU</span><span className="sf-drama-moon">☾</span><div className="sf-drama-floor"/><div className="sf-drama-person left"/><div className="sf-drama-person right"/>
   <div className="sf-drama-talk"><small>THE MOMENT BEFORE AN ANSWER</small><strong lang="ko">우리 같이 갈래요?</strong><span>Shall we go together?</span></div>
   <span className="sf-art-footer">EVERY STORY HAS A NEXT LINE</span>
  </div>;
 return <div className="sf-image sf-image-kmate" aria-hidden="true">
   <span className="sf-image-corner">A DESTINATION BECOMES A DIRECTION</span><div className="sf-kmate-rings"><i/><i/><i/></div><span className="sf-kmate-spark">✳</span>
   <div className="sf-kmate-ticket"><div className="sf-kmate-ticket-top">NURI / TOWARD KOREA <GraduationCap size={20}/></div><span className="sf-kmate-ticket-name">Your next<br/><em>chapter.</em></span><div className="sf-kmate-ticket-foot"><span>START HERE</span><span>✳</span><span>KEEP GOING</span></div></div>
   <span className="sf-art-footer">ONE NEXT STEP / THEN ANOTHER</span>
  </div>;
}

export default function StoryFlow({onOpen,onExplore}:{onOpen:(id:WorldId)=>void;onExplore:()=>void}){
 const [index,setIndex]=useState(0);
 const [visited,setVisited]=useState<number[]>([0]);
 const current=moments[index];
 const choose=(next:number)=>{
  if(next<0||next>=moments.length)return;
  setIndex(next);
  setVisited(v=>v.includes(next)?v:[...v,next]);
 };
 const advance=()=>choose((index+1)%moments.length);
 return <section className="sf" id="our-story">
  <div className="sf-prologue"><div className="na-wrap sf-prologue-inner">
   <div className="sf-prologue-top"><span className="sf-dot"/> THE STORY WE ARE BUILDING <span>THE NURI NOTEBOOK / 001</span></div>
   <div className="sf-prologue-center"><span className="sf-paper-star" aria-hidden="true">✳</span><h2>Big things rarely begin<br/>with something <em>big.</em></h2>
   <p>Sometimes they begin with a word. A scene. A question you keep returning to. A place you hope to see one day.</p>
   <p className="sf-prologue-last">NURI Labs is a home for what happens <strong>after that first spark.</strong></p></div>
   <div className="sf-prologue-bottom"><span>ONE CURIOUS MOMENT LEADS TO ANOTHER</span><span>↓ SCROLL INTO THE STORY</span></div>
  </div></div>

  <div className="sf-journey na-wrap"><div className="sf-intro"><span>THE THREAD THAT CONNECTS US / 04 MOMENTS</span><h2>Follow the little<br/><em>things that grow.</em></h2><p>Not four separate origin speeches. One evolving experience—each world picks up the thread from the one before it.</p></div>
   <div className={'sf-story-stage sf-stage-'+current.id}>
    <div className="sf-stage-head"><span><i/> NURI / {current.small}</span><span>{current.number} <b>/ 04</b></span></div>
    <div className="sf-story-grid" key={current.id}>
     <div className="sf-story-text"><span className="sf-stage-label">A MOMENT IN THE NURI UNIVERSE</span><h3>{current.title}<br/><em>{current.italic}</em></h3>
       <div className="sf-story-ko" lang="ko">{current.spoken}</div><p>{current.thought}</p>
       <div className="sf-transition"><Sparkles size={19}/><span>{current.transition}</span></div>
       <button type="button" className="sf-open" onClick={()=>onOpen(current.id)}>Explore {current.product} <ArrowUpRight size={18}/></button>
     </div><SceneArtwork scene={current}/></div>
    <div className="sf-stage-bottom"><span>{current.tag}</span><div className="sf-stage-buttons"><button type="button" aria-label="Previous story moment" disabled={index===0} onClick={()=>choose(index-1)}><ArrowLeft size={18}/></button><button type="button" aria-label={index===moments.length-1?'Return to first story moment':'Next story moment'} onClick={advance}><ArrowRight size={18}/></button></div></div>
   </div>
   <nav className="sf-timeline" aria-label="Choose a moment in the NURI story">{moments.map((moment,i)=><button type="button" key={moment.id} aria-pressed={index===i} onClick={()=>choose(i)} className={'sf-step'+(i===index?' active':'')+(visited.includes(i)?' visited':'')}><span className="sf-step-dot">{visited.includes(i)?<span>✳</span>:moment.number}</span><span className="sf-step-text"><small>{moment.number} / {moment.small}</small><strong>{moment.product}</strong></span><ArrowUpRight size={16}/></button>)}</nav>
   <p className="sf-stage-hint">Choose a moment or use the arrows to continue. Each visual is an original concept, not a live product screen.</p>
  </div>

  <div className="sf-last"><div className="na-wrap sf-last-grid">
    <div className="sf-last-symbol" aria-hidden="true"><div className="sf-last-lines"/><span>n<i>✳</i></span><b>YOUR STORY<br/>IS STILL OPEN.</b></div>
    <div className="sf-last-copy"><span>THE NURI IDEA / NEVER A FINISH LINE</span>
     <h2>You don’t need to know<br/>where every path leads.<br/><em>Just follow the one that calls you.</em></h2>
     <p>Learn a little Korean. Find a story. Meet someone on the same journey. Take the next step toward Korea. You can start anywhere, and you can always begin again.</p>
     <button type="button" onClick={onExplore}>Back to your universe <ArrowUpRight size={18}/></button>
    </div>
   </div></div>
 </section>;
}
