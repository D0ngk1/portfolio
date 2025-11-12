import "./Home.css";
//import Header from "../components/Header/Header.tsx";
import Header   from      "@/components/Layout/Header/Header.tsx";
import AboutMe  from      "@/components/Layout/About-Me/AboutMe.tsx";
import Cert     from      "@/components/Layout/Cert/Cert.tsx";
import Exp      from      "@/components/Layout/Experience/Experience.tsx";
import AppDrawer from     "@/components/Layout/AppDrawer/AppDrawer.tsx";


import {windowManager} from "@/lib/windowManager";
import {useRef,useState} from "react";

export default function Home(){
  const [closedSections, setClosedSections] = useState<Record<string, boolean>>({});
  const activezIndex = useRef(1);
    const sections = [
    { key: "about",       Component: AboutMe , defaultX:26, defaultY:18 , pWidth:0, pHeight:0},
    { key: "cert",        Component: Cert    , defaultX:26 , defaultY:542, pWidth:0, pHeight:0},
    { key: "experience",  Component: Exp    , defaultX:535 , defaultY:0, pWidth:0, pHeight:0},
    //{ key: "pro}
  ] 
  const handleWindowClick = (windowEl: HTMLDivElement | null) => {
    if (!windowEl) return;
    activezIndex.current++;
    windowEl.style.zIndex = activezIndex.current.toString();
  }
   const handleOnClose = (key: string, isClose: boolean) => {
    setClosedSections((prev) => ({
      ...prev,
      [key]: isClose,
    }));
  };

  const handleApp = (key) => {
    const isClose = !closedSections[key];
    setClosedSections((prev) => ({
      ...prev,
      [key]: isClose,
    }));
//    console.log(isClose);
  } 

  return (
    <>
      <div className="main-background">
        <Header />
        <div className="desktop">
            {sections.map(({ key, Component, defaultX, defaultY, pWidth, pHeight }) => {
            const winRef = useRef<HTMLDivElement>(null);
            windowManager( winRef, { handleSelector: ".title", initialX:defaultX, initialY:defaultY, pWidth, pHeight });
            if (closedSections[key]) return null;
            return (
              <div
                className={`win-container ${key} blur-bg`}
                key={key}
                ref={winRef}
                onMouseDown={() => handleWindowClick(winRef.current)}
              >
                <Component sendCloseB={(isClose) => handleOnClose(key,isClose)} />
              </div>
            );
          })}
         

        </div>
        <AppDrawer onClose={handleApp}/>       
      </div>
      
    </>
  );
}
