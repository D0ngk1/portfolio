import "./Home.css";
//import Header from "../components/Header/Header.tsx";
import Header from "@/components/Layout/Header/Header.tsx"
import AboutMe from "@/components/Layout/About-Me/AboutMe.tsx"
import Cert from "@/components/Layout/Cert/Cert.tsx"
import {windowManager} from "@/lib/windowManager";
import {useRef} from "react";   
export default function Home(){
  const activezIndex = useRef(1);
    const sections = [
    { key: "about", Component: AboutMe , defaultX:26, defaultY:18 , pWidth:0, pHeight:0},
    { key: "cert",  Component: Cert    , defaultX:26 , defaultY:542, pWidth:0, pHeight:0},
    //{ key: "pro}
  ]
  const handleWindowClick = (windowEl: HTMLDivElement | null) => {
    if (!windowEl) return;
    activezIndex.current++;
    windowEl.style.zIndex = activezIndex.current.toString();
  }


  
  return (
    <>
      <div className="main-background">
        <Header />
        <div className="desktop">
            {sections.map(({ key, Component, defaultX, defaultY, pWidth, pHeight }) => {
            const winRef = useRef<HTMLDivElement>(null);
            windowManager( winRef, { handleSelector: ".title", initialX:defaultX, initialY:defaultY, pWidth, pHeight });

            return (
              <div
                className={`win-container ${key}`}
                key={key}
                ref={winRef}
                onMouseDown={() => handleWindowClick(winRef.current)}
              >
                <Component />
              </div>
            );
          })}

        </div>
        
      </div>
      
    </>
  );
}
