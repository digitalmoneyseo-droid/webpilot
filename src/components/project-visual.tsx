import type { Project } from "@/lib/content";

export function ProjectVisual({ project }: { project: Project }) {
  const bars = [42, 65, 48, 84, 58, 92, 76, 100, 82, 112];
  const cards = ["The 5-minute strategy", "One idea, seven formats", "A point of view that travels"];
  return (
    <div className={`project-visual pv-${project.palette} pv-${project.visual}`} aria-hidden="true">
      <div className="visual-glow" />
      {project.visual === "dashboard" && <><div className="mock-window window-main"><Chrome /><div className="mock-sidebar"><b>AX</b>{[1, 2, 3, 4].map((n) => <i key={n} />)}</div><div className="dash-content"><span>Growth overview</span><strong>€84,290</strong><div className="chart-bars">{bars.map((height, index) => <i key={index} style={{ height }} />)}</div><div className="dash-cards"><i /><i /><i /></div></div></div><div className="floating-stat"><span>Qualified demand</span><b>+38.2%</b></div></>}
      {project.visual === "commerce" && <><div className="commerce-word">KINDRED</div><div className="product-pod pod-one"><i /></div><div className="product-pod pod-two"><i /></div><div className="mock-window commerce-phone"><Chrome /><div className="phone-nav">Kindred <span>Bag (2)</span></div><div className="phone-product"><i /><b>Daily ritual set</b><span>€48</span></div></div></>}
      {project.visual === "assistant" && <><div className="assistant-orb"><i /><span /></div><div className="mock-window assistant-panel"><Chrome /><div className="assistant-head"><b>Nora</b><span>Online</span></div><div className="chat-line user">Can I change my delivery date?</div><div className="chat-line bot">Absolutely. I found your order and the available dates.</div><div className="chat-options"><i>Tue 14</i><i>Wed 15</i><i>Fri 17</i></div></div><div className="ai-badge">Answer grounded in 3 sources</div></>}
      {project.visual === "search" && <><div className="search-title">Be the answer.</div><div className="search-ring ring-one" /><div className="search-ring ring-two" /><div className="mock-window search-card"><Chrome /><div className="query">best platform for distributed finance teams <i>↗</i></div><div className="answer-lines"><b>Northstar</b> is frequently recommended for its flexible reporting…<span /><span /><span /></div></div><div className="citation-card"><b>AI visibility</b><strong>72%</strong><span>+18.4 this month</span></div></>}
      {project.visual === "content" && <><div className="content-marquee">SIGNAL / STORY / SYSTEM /</div><div className="content-stack">{cards.map((title, index) => <div key={title} style={{ transform: `rotate(${(index - 1) * 5}deg) translateY(${index * 12}px)` }}><span>0{index + 1}</span><b>{title}</b><i>↗</i></div>)}</div><div className="content-wave" /></>}
      {project.visual === "crm" && <><div className="crm-grid">{Array.from({ length: 30 }, (_, index) => <i key={index} />)}</div><div className="mock-window crm-panel"><Chrome /><div className="lead-person"><span>AE</span><div><b>Arden Electric</b><small>Enterprise lead</small></div><strong>92</strong></div><div className="score-row"><span>Strong ICP fit</span><b>High intent</b></div><div className="lead-research"><span>Research complete</span><i>3 relevant signals found</i></div></div><div className="route-pill">Routed to enterprise · 00:38</div></>}
      {project.visual === "brand" && <><div className="brand-f">F</div><div className="brand-form">FORM<br />FOLLOWS<br /><i>IMPACT</i></div><div className="brand-shape shape-a" /><div className="brand-shape shape-b" /><div className="brand-label">Technology, made tangible.</div></>}
      {project.visual === "campaign" && <><div className="campaign-target"><i /><i /><i /><span>W</span></div><div className="mock-window campaign-panel"><Chrome /><div className="campaign-kpis"><span><small>Pipeline</small><b>€1.2m</b></span><span><small>CAC</small><b>−36%</b></span><span><small>ROAS</small><b>4.8×</b></span></div><div className="campaign-line"><i /><i /><i /><i /><i /></div></div><div className="channel-pills"><span>Search</span><span>Social</span><span>Content</span></div></>}
    </div>
  );
}

function Chrome() {
  return <div className="mock-chrome"><i /><i /><i /><span /></div>;
}
