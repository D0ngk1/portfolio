import { proj } from "@/components/Layout/Experience/TabProjects.tsx";
import { useRef, useState, useEffect } from 'react';
const feat = [
  { name: 'Software Engineer', description: '1.5 years of Experience', image: '' },
  ...proj,
];
const TabFeatures = () => {
  const recentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const centerItem = (index: number) => {
    const container = recentRef.current;
    if (!container) return;

    const item = container.children[index] as HTMLElement;
    if (!item) return;
    const containerWidth = container.clientWidth;
    const itemWidth = item.clientWidth;
    const itemLeft = item.offsetLeft;

    const scrollTo = itemLeft - containerWidth / 2 + itemWidth / 2;
    container.scrollTo({ left: scrollTo, behavior: "smooth" });
  };
  useEffect(() => {
    centerItem(activeIndex);

  }, [activeIndex]);
  return (
    <>
      <div className="feat-container">
        <div className="recent-feat-container" ref={recentRef}>
          {feat.map((name, i) => {
            if (name.name !== 'Dictionary') return (
              <div style={{ ...(name.image ? { backgroundImage: `url(${name.image})` } : {}) }} className={`recent-feat feat-${name.name.replace(/\s+/g, '-').toLowerCase()}`}
                key={i}
              >
                <h1>{name.name}</h1>
              </div>
            )
          })}
          {activeIndex != 0 && (<div className="left-slide slide-btn" onClick={() => {
            const index = activeIndex;
            if (index > 0) setActiveIndex(index - 1)
          }}></div>)}
          {activeIndex != 3 && (<div className="right-slide slide-btn" onClick={() => {
            const index = activeIndex;
            if (index < 3) setActiveIndex(index + 1)
          }}></div>)}
        </div>
      </div>
    </>
  );
}

export default TabFeatures;
