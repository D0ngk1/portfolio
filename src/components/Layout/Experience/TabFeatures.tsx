import { proj } from "@/components/Layout/Experience/TabProjects.tsx";
import { useRef, useState, useEffect } from 'react';

//Images
import NetworkingImg from "@/assets/skills/networking.png";
import SecurityImg from "@/assets/skills/cybersecurity.png";
import ProgrammingImg from "@/assets/skills/dev.png";
import FrontendImg from "@/assets/skills/frontend.png";
import Backend from "@/assets/skills/backend.png";
import TroubleshootingImg from "@/assets/skills/troubleshooting.png";
import LinuxImg from "@/assets/skills/linux.png";
import OOPImg from "@/assets/skills/programming.png";
import RootCImg from "@/assets/skills/root-cause.png";

import Arrow from "@/assets/arrow.png";



const feat = [
  { name: 'Software Engineer',Description:'' ,shortDesc: '1.5 years of Experience', image: '' },
  ...proj.slice(0, -1)
  /*{ id: 1, name: 'Software Engineer', Description:'', shortDesc:'1.5 years', image:'' },
  ...proj.slice(0, -1).map((p, i) => ({
    ...p,
    id: i + 2,  // ensures ALL proj items have unique IDs
  }))*/
];
const extFeat = [
  ...feat,
  ...feat
  //...feat.map((f, i) => ({ ...f, id: f.id + feat.length }))
]
const skills = [
  {name: 'Networking',img:NetworkingImg},
  {name: 'Programming',img:ProgrammingImg},
  {name: 'OOP',img:OOPImg},
  {name: 'Backend',img:Backend},
  {name: 'Frontend',img:FrontendImg},
  {name: 'IT Security',img:SecurityImg},
  {name: 'Unix/Linux',img:LinuxImg},
  //{name: 'Windows'},
  {name: 'Troubleshooting',img:TroubleshootingImg},
  {name: 'Root Cause Analysis',img:RootCImg},
  //{name: ''},
  //{name: 'Frontend'},
]
const TabFeatures = () => {
  const recentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(4);
  const throttleRef = useRef(false);

  const throttledNext = () => {
    if (throttleRef.current) return; // ignore if still cooling down

    throttleRef.current = true;
    setActiveIndex((prev) => prev + 1);

    // unlock after 350ms (match your scroll animation)
    setTimeout(() => {
      throttleRef.current = false;
    }, 500);
  };

  const throttledPrev = () => {
    if (throttleRef.current) return; // ignore if still cooling down

    throttleRef.current = true;
    setActiveIndex((prev) => prev - 1);

    // unlock after 350ms (match your scroll animation)
    setTimeout(() => {
      throttleRef.current = false;
    }, 500);
  };


  useEffect(() => {
    const container = recentRef.current;
    if (!container) return;

    const item = container.children[activeIndex] as HTMLElement;
    if (!item) return;
    const containerWidth = container.clientWidth;
    const itemWidth = item.clientWidth;
    const itemLeft = item.offsetLeft;

    const scrollTo = itemLeft - containerWidth / 2 + itemWidth / 2;
    container.scrollTo({ left: scrollTo, behavior: "smooth" });

    const timeout = setTimeout(() => {
    //If we moved to the left clone
    if (activeIndex === 2 ) {
      setActiveIndex(7);
      const lItem = container.children[extFeat.length-3] as HTMLElement;
      const lastItem = lItem.offsetLeft;
      const lastItemWidth = lItem.clientWidth;
      container.scrollTo({
        left: lastItem - container.clientWidth / 2 + lastItemWidth / 2,
        behavior: "auto",
      });
    }
     //If we moved to the right clone
    else if (activeIndex === 8) {
      setActiveIndex(3);
      const fItem = container.children[3] as HTMLElement;
      const firstItem = fItem.offsetLeft;
      const firstItemWidth = fItem.clientWidth;
      // jump to first real item
      container.scrollTo({
        left:
          firstItem - container.clientWidth / 2 + firstItemWidth / 2,
        behavior: "auto",
      });
    }
    }, 500);
    return () => clearTimeout(timeout);
  }, [activeIndex]);
  return (
    <>
      <div className="feat-container">
        <div className="feat-intro display-flex-center"><h1>A Developer equipped with Cybersecurity and IT skills.</h1></div>
        <div className="feat-proj-wrapper">
          <h2 className="feat-label">Featured</h2>
          <div className="recent-feat-container display-flex-row" ref={recentRef}> 
            {
              extFeat.map((name, i) => {
              return (
                <div style={{ ...(name.image ? { backgroundImage: `url(${name.image})` } : {}) }} className={`flex-shrink-0 recent-feat feat-${name.name.replace(/\s+/g, '-').toLowerCase()}`}
                  key={i}
                  //onClick={()=>setActiveIndex(i)}
                >
                <div className="feat-desc">
                  <h1>{name.name}</h1>
                  <p>{name.shortDesc}</p>
                </div>
              </div>
              )
            })}
            
            <div className="left-slide slide-btn" onClick={throttledPrev}><img className='left-arrow' src={Arrow} alt="left arrow" /></div>
            <div className="right-slide slide-btn" onClick={throttledNext}><img className='right-arrow' src={Arrow} alt="right arrow" /></div>
          </div>
        </div>
        <div className="feat-skill-wrapper">
          <h2 className="feat-skill-label feat-label">Skills</h2>
          <div className="feat-skill-content  flex-wrap">
            {skills.map(({name,img},i) =>  ( 
            <div className="container-skill-items" key={i}>
              <div className="feat-skill-items" 
              >{img && (<img src={img} alt="" /> )}</div>
            <h4 className="title-feat-skill">{name}</h4>
            </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TabFeatures;
