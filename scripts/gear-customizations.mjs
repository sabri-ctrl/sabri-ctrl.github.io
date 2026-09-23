function gearSvg(size, teeth, spokes) {
  const center = size / 2;
  const outside = center - 3;
  const root = outside - size / 20;
  const ring = root * 0.78;
  const hub = root * 0.28;
  const step = (Math.PI * 2) / teeth;
  const points = [];

  for (let tooth = 0; tooth < teeth; tooth += 1) {
    const angle = tooth * step;
    for (const [offset, radius] of [
      [-0.5, root],
      [-0.35, root],
      [-0.24, outside],
      [0.24, outside],
      [0.35, root],
      [0.5, root],
    ]) {
      const x = center + Math.cos(angle + offset * step) * radius;
      const y = center + Math.sin(angle + offset * step) * radius;
      points.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
    }
  }

  const outline = `M ${points.join(" L ")} Z`;
  const spokeLines = Array.from({ length: spokes }, (_, index) => {
    const angle = (index / spokes) * Math.PI * 2;
    const x1 = center + Math.cos(angle) * hub;
    const y1 = center + Math.sin(angle) * hub;
    const x2 = center + Math.cos(angle) * ring;
    const y2 = center + Math.sin(angle) * ring;
    return `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}"/>`;
  }).join("");

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${outline}"/><circle cx="${center}" cy="${center}" r="${ring.toFixed(2)}"/><circle cx="${center}" cy="${center}" r="${hub.toFixed(2)}"/>${spokeLines}</svg>`;
}

const largeGear = gearSvg(440, 20, 6);
const smallGear = gearSvg(220, 10, 4);

const gearMarkup =
  `<div class="meshing-gears"><div class="meshing-gears__large" data-mesh-gear="large">${largeGear}</div>` +
  `<div class="meshing-gears__small" data-mesh-gear="small">${smallGear}</div></div>`;

const component = `function C(){d.useEffect(()=>{
  const large=document.querySelector('[data-mesh-gear="large"]');
  const small=document.querySelector('[data-mesh-gear="small"]');
  if(!large||!small||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  let angle=0,velocity=6,previous=performance.now(),lastScroll=window.scrollY,frame;
  const onScroll=()=>{
    const change=window.scrollY-lastScroll;
    lastScroll=window.scrollY;
    if(change!==0)velocity=Math.max(-160,Math.min(160,change*0.4+Math.sign(change)*12));
  };
  const animate=now=>{
    const elapsed=Math.min((now-previous)/1000,0.05);
    previous=now;
    velocity+=(6-velocity)*(1-Math.exp(-elapsed/0.65));
    angle+=velocity*elapsed;
    large.style.transform='rotate('+angle+'deg)';
    small.style.transform='rotate('+(18-angle*2)+'deg)';
    frame=requestAnimationFrame(animate);
  };
  window.addEventListener('scroll',onScroll,{passive:true});
  frame=requestAnimationFrame(animate);
  return()=>{window.removeEventListener('scroll',onScroll);cancelAnimationFrame(frame)};
},[]);return e.jsxs("div",{className:"pointer-events-none fixed inset-0 -z-10 overflow-hidden text-primary",children:[e.jsxs("div",{className:"meshing-gears",children:[e.jsx("div",{className:"meshing-gears__large","data-mesh-gear":"large",dangerouslySetInnerHTML:{__html:${JSON.stringify(largeGear)}}}),e.jsx("div",{className:"meshing-gears__small","data-mesh-gear":"small",dangerouslySetInnerHTML:{__html:${JSON.stringify(smallGear)}}})]}),e.jsx("div",{className:"absolute top-[40%] -left-32 opacity-[0.05] gear-spin-reverse",children:e.jsx(g,{size:380})}),e.jsx("div",{className:"absolute -bottom-40 right-1/3 opacity-[0.05] gear-spin-slow",children:e.jsx(g,{size:420})}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background/80"})]})}`;

export function addMeshingGearsToHtml(html) {
  if (html.includes('data-mesh-gear="large"')) return html;

  const oldGear = '<div class="absolute -top-40 -right-40 opacity-[0.06] gear-spin-slow">';
  const nextGear = '<div class="absolute top-[40%] -left-32 opacity-[0.05] gear-spin-reverse">';
  const start = html.indexOf(oldGear);
  const end = html.indexOf(nextGear, start);
  if (start < 0 || end < 0) throw new Error("Could not locate the top-right gear in index.html");

  return `${html.slice(0, start)}${gearMarkup}${html.slice(end)}`;
}

export function addMeshingGearsToAppScript(source) {
  if (source.includes('data-mesh-gear":"large"')) return source;

  const start = source.indexOf("function C(){");
  const end = source.indexOf("const w=", start);
  if (start < 0 || end < 0) throw new Error("Could not locate the compiled background component");

  return `${source.slice(0, start)}${component}${source.slice(end)}`;
}

export function addMeshingGearsToCss(css) {
  if (css.includes(".meshing-gears__large{")) return css;

  return `${css}\n/* Quiet, scroll-responsive top-right gear pair. */\n` +
    `.meshing-gears{position:absolute;inset:0;opacity:.06}` +
    `.meshing-gears__large,.meshing-gears__small{position:absolute;transform-origin:center;will-change:transform}` +
    `.meshing-gears__large{width:440px;height:440px;top:-90px;right:130px}` +
    `.meshing-gears__small{width:220px;height:220px;top:20px;right:-54px;transform:rotate(18deg)}` +
    `.meshing-gears svg{display:block;width:100%;height:100%}` +
    `@media(max-width:640px){.meshing-gears__large{width:360px;height:360px;top:-105px;right:80px}.meshing-gears__small{width:180px;height:180px;top:-15px;right:-73px}}`;
}
