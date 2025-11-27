import { proj } from "@/components/Layout/Experience/TabProjects.tsx";
import { useRef, useState, useEffect } from 'react';
const feat = [
  { name: 'Software Engineer', description: '1.5 years of Experience', image: '' },
  ...proj.slice(0, -1),
];
const extFeat = [
  ...feat,
  ...feat,
]
const skills = [
  {name: 'Networking'},
  {name: 'Programming'},
  {name: 'OOP'},
  {name: 'Backed'},
  {name: 'Frontend'},
  {name: 'IT Security'},
  {name: 'Unix/Linux'},
  {name: 'Windows'},
  {name: 'Troubleshooting'},
  {name: 'Root Cause Analysis'},
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
    }, 450);
  };

  const throttledPrev = () => {
    if (throttleRef.current) return; // ignore if still cooling down

    throttleRef.current = true;
    setActiveIndex((prev) => prev - 1);

    // unlock after 350ms (match your scroll animation)
    setTimeout(() => {
      throttleRef.current = false;
    }, 450);
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
    if (activeIndex === 1 ) {
      setActiveIndex(5);
      const lItem = container.children[extFeat.length-3] as HTMLElement;
      const lastItem = lItem.offsetLeft;
      const lastItemWidth = lItem.clientWidth;
      container.scrollTo({
        left: lastItem - container.clientWidth / 2 + lastItemWidth / 2,
        behavior: "auto",
      });
    }
     //If we moved to the right clone
    else if (activeIndex === 6) {
      setActiveIndex(2);
      const fItem = container.children[2] as HTMLElement;
      const firstItem = fItem.offsetLeft;
      const firstItemWidth = fItem.clientWidth;
      // jump to first real item
      container.scrollTo({
        left:
          firstItem - container.clientWidth / 2 + firstItemWidth / 2,
        behavior: "auto",
      });
    }
    }, 450);
    return () => clearTimeout(timeout);
  }, [activeIndex]);
  return (
    <>
      <div className="feat-container">
        <div className="feat-intro display-flex-center"><h1>A tech enthusiast equipped with strong programming, cybersecurity and IT skills.</h1></div>
        <div className="feat-proj-wrapper">
          <h2 className="feat-label">Featured</h2>
          <div className="recent-feat-container display-flex-row" ref={recentRef}> 
            {extFeat.map((name, i) => {
              if (name.name !== 'Dictionary') return (
                <div style={{ ...(name.image ? { backgroundImage: `url(${name.image})` } : {}) }} className={`flex-shrink-0 recent-feat feat-${name.name.replace(/\s+/g, '-').toLowerCase()}`}
                  key={i}
                >
                  <h1>{name.name}</h1>
                </div>
              )
            })}
            <div className="left-slide slide-btn" onClick={throttledPrev}></div>
            <div className="right-slide slide-btn" onClick={throttledNext}></div>
          </div>
        </div>
        <div className="feat-skill-wrapper">
          <h2 className="feat-skill-label feat-label">Skills</h2>
          <div className="feat-skill-content  flex-wrap">
            {skills.map(({name},i) =>  ( 
              <div className="feat-skill-items" key={i}>{name}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TabFeatures;
