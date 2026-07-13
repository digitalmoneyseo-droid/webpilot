import type { Project } from "@/lib/content";

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div className={`project-visual pv-${project.palette} pv-${project.visual}${compact ? " is-compact" : ""}`} aria-hidden="true">
      <div className="visual-glow" />
      {project.visual === "dashboard" && <Dashboard />}
      {project.visual === "commerce" && <Commerce />}
      {project.visual === "assistant" && <Assistant />}
      {project.visual === "search" && <Search />}
      {project.visual === "content" && <Content />}
      {project.visual === "crm" && <Crm />}
      {project.visual === "brand" && <Brand />}
      {project.visual === "campaign" && <Campaign />}
    </div>
  );
}

function Window({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mock-window ${className}`}><div className="mock-chrome"><i /><i /><i /><span /></div>{children}</div>;
}

function Dashboard() {
  return <><Window className="window-main"><div className="mock-sidebar"><b>AX</b>{[1,2,3,4].map(i => <i key={i} />)}</div><div className="dash-content"><span>Growth overview</span><strong>€84,290</strong><div className="chart-bars">{[42,65,48,84,58,92,76,100,82,112].map((h,i)=><i key={i} style={{height:`${h}px`}} />)}</div><div className="dash-cards"><i /><i /><i /></div></div></Window><div className="floating-stat"><span>Qualified demand</span><b>+38.2%</b></div></>;
}
function Commerce() {
  return <><div className="commerce-word">KINDRED</div><div className="product-pod pod-one"><i /></div><div className="product-pod pod-two"><i /></div><Window className="commerce-phone"><div className="phone-nav">Kindred <span>Bag (2)</span></div><div className="phone-product"><i /><b>Daily ritual set</b><span>€48</span></div></Window></>;
}
function Assistant() {
  return <><div className="assistant-orb"><i /><span /></div><Window className="assistant-panel"><div className="assistant-head"><b>Nora</b><span>Online</span></div><div className="chat-line user">Can I change my delivery date?</div><div className="chat-line bot">Absolutely. I found your order and the available dates.</div><div className="chat-options"><i>Tue 14</i><i>Wed 15</i><i>Fri 17</i></div></Window><div className="ai-badge">Answer grounded in 3 sources</div></>;
}
function Search() {
  return <><div className="search-title">Be the answer.</div><div className="search-ring ring-one"/><div className="search-ring ring-two"/><Window className="search-card"><div className="query">best platform for distributed finance teams <i>↗</i></div><div className="answer-lines"><b>Northstar</b> is frequently recommended for its flexible reporting…<span/><span/><span/></div></Window><div className="citation-card"><b>AI visibility</b><strong>72%</strong><span>+18.4 this month</span></div></>;
}
function Content() {
  return <><div className="content-marquee">SIGNAL / STORY / SYSTEM /</div><div className="content-stack">{["The 5-minute strategy", "One idea, seven formats", "A point of view that travels"].map((t,i)=><div key={t} style={{transform:`rotate(${(i-1)*5}deg) translateY(${i*12}px)`}}><span>0{i+1}</span><b>{t}</b><i>↗</i></div>)}</div><div className="content-wave" /></>;
}
function Crm() {
  return <><div className="crm-grid">{Array.from({length:30},(_,i)=><i key={i}/>)}</div><Window className="crm-panel"><div className="lead-person"><span>AE</span><div><b>Arden Electric</b><small>Enterprise lead</small></div><strong>92</strong></div><div className="score-row"><span>Strong ICP fit</span><b>High intent</b></div><div className="lead-research"><span>Research complete</span><i>3 relevant signals found</i></div></Window><div className="route-pill">Routed to enterprise · 00:38</div></>;
}
function Brand() {
  return <><div className="brand-f">F</div><div className="brand-form">FORM<br/>FOLLOWS<br/><i>IMPACT</i></div><div className="brand-shape shape-a"/><div className="brand-shape shape-b"/><div className="brand-label">Technology, made tangible.</div></>;
}
function Campaign() {
  return <><div className="campaign-target"><i/><i/><i/><span>W</span></div><Window className="campaign-panel"><div className="campaign-kpis"><span><small>Pipeline</small><b>€1.2m</b></span><span><small>CAC</small><b>−36%</b></span><span><small>ROAS</small><b>4.8×</b></span></div><div className="campaign-line"><i/><i/><i/><i/><i/></div></Window><div className="channel-pills"><span>Search</span><span>Social</span><span>Content</span></div></>;
}

