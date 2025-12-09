import "./Home.css";
//import Header from "../components/Header/Header.tsx";

//Window components
import Header from "@/components/Layout/Header/Header.tsx";
import AboutMe from "@/components/Layout/About-Me/AboutMe.tsx";
import Cert from "@/components/Layout/Cert/Cert.tsx";
import Exp from "@/components/Layout/Experience/Experience.tsx";
import AppDrawer from "@/components/Layout/AppDrawer/AppDrawer.tsx";
import Resume from "@/components/Layout/PDFViewer/PDFViewer.tsx";
import Calendar from "@/components/Layout/Calendar/Calendar.tsx";
import IFrame from "@/components/Layout/IFrames/IFramesCert.tsx";
import Wallpaper from "@/assets/wallpaper-1.png";

import { useRef, useState, useEffect } from "react";
import wm from "@/hooks/windowM.tsx";


export default function Home() {
  const { onClickWindows } = wm();
  const [compAttri, setCompAttri] = useState<Record<string, {
    isClose: boolean;
    isMax: boolean;
    isMinz: boolean;
    pWidth: number;
    pHeight: number;
    pY: number;
    pX: number;
    //isFocus:boolean;
    zIndex: number;
  }>>({});
  const activezIndex = useRef(1);
  const winRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [isLoadApps, setLoadApps] = useState<boolean>(false);
  const sections = [
    { key: "about", Component: AboutMe, defaultX: 26, defaultY: 18, pWidth: 0, pHeight: 0 },
    { key: "cert", Component: Cert, defaultX: 26, defaultY: 542, pWidth: 0, pHeight: 0 },
    { key: "experience", Component: Exp, defaultX: 535, defaultY: 0, pWidth: 0, pHeight: 0 },
    { key: "resume", Component: Resume },
    { key: "calendar", Component: Calendar },//change me!!!!!
    { key: "iframe", Component: IFrame },
  ]
  const offset = window.innerHeight * 0.022;
  const maxHeight = window.innerHeight * 0.38;
  const maxWidth = window.innerWidth * 0.2;

  useEffect(() => {
    //setLoadApps?.(true);
    setCompAttri((prev) => ({
      'about':      { ...prev['about'],      pX: 26,  pY: 18,  isMinz:false, isClose:false,pWidth: maxWidth, pHeight: maxHeight },
      'cert':       { ...prev['cert'],       pX: 26,  pY: 542, isMinz:false, isClose:false,pWidth: maxWidth, pHeight: maxHeight },
      'experience': { ...prev['experience'], pX: 535, pY: 0,   isMinz:false, isClose: false},
      'resume':     { ...prev['resume'],     pX: 800, pY: 25,  isMinz:false, isClose: true },
      'calendar':     { ...prev['calendar'], pX: 800, pY: 25,  isMinz:false, isClose: true,pWidth:window.innerWidth * 0.3,pHeight:window.innerHeight * 0.5},
      'iframe':     { ...prev['iframe'], pX: 800, pY: 25,  isMinz:false, isClose: true,pWidth:window.innerWidth * 0.3,pHeight:window.innerHeight * 0.5}
    }));

    setLoadApps?.(true);

  }, [])

  //const boxRef = useRef<HTMLDivElement>({}); 
  const handleOnMin = (windowEl: HTMLDivElement | null, key?: string, isMinz?: boolean) => {
    if (!windowEl || !key) return;
    // Save previous size/pos (for restore)
    const rect = windowEl.getBoundingClientRect();
    //console.log(isMinz)
    if(compAttri[key].isMax){
      setCompAttri(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          //pHeight: rect.height,
          //pWidth: rect.width,
          //pX: rect.x,
          //pY: rect.y - offset,
          isMinz: isMinz ?? false,
        },
      }));
    }else {
      setCompAttri(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          pHeight: rect.height,
          pWidth: rect.width,
          pX: rect.x,
          pY: rect.y - offset,
          isMinz: isMinz ?? false,
        },
      }));

    }

    windowEl.style.transition = "transform .35s ease, width .35s ease, height .35s ease";


    requestAnimationFrame(() => {
      windowEl.style.width = "0";
      windowEl.style.height = "0";
      windowEl.style.transform = `translate3d(50vw,90vh,0)`;

    });
    const removeTransition = () => {
      windowEl.style.transition = "none";  // remove animation
      windowEl.removeEventListener("transitionend", removeTransition);
    };

    windowEl.addEventListener("transitionend", removeTransition);
  }

  const handleOnClose = (key?: string, isCloseB?: boolean) => {
    if (!key) return;
    const windowEl = winRefs.current[key];
    if (!windowEl) return;
    const rect = windowEl.getBoundingClientRect();
    if(compAttri[key].isMax){
      setCompAttri((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          isClose: isCloseB ?? true
        }
      }));
    }else {
      setCompAttri((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          pWidth: rect.width,
          pHeight: rect.height,
          pY: rect.y - offset,
          pX: rect.x,
          isClose: isCloseB ?? true
        }
      }));
    }

  };

  const handleOnMax = (windowEl: HTMLDivElement | null, key?: string, isMaxB?: boolean) => {
    if (!key || !windowEl) return;
    setCompAttri((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        isMax: isMaxB ?? true,
      }
    }));
    // Apply max styling
    if (isMaxB) {

      const rect = windowEl.getBoundingClientRect();
      //console.log("Max: " + rect.x + "-" + rect.y);
      setCompAttri((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          pWidth: rect.width,
          pHeight: rect.height,
          pY: rect.y - offset,
          pX: rect.x
        }
      }));

      requestAnimationFrame(() => {
        windowEl.style.transform = `translate(0px, 0px)`;
        windowEl.style.width = "100%";
        windowEl.style.height = "100%";
      });

    } else {

      windowEl.style.width = compAttri[key].pWidth + "px";
      windowEl.style.height = compAttri[key].pHeight + "px";
      const offsetX = compAttri[key].pX; const offsetY = compAttri[key].pY;
      //console.log(offsetX+"-"+offsetY);
      windowEl.style.transform = `translate(${offsetX}px,${offsetY}px)`;
    }
  };

  const handleAppClose = (key?: string) => {
    if (!key) return;

    activezIndex.current = activezIndex.current + 1;

    setCompAttri((prev) => {
      const item = prev[key];
      if (!item) return prev;

      // CLOSE BEHAVIOR
      const isCloseB = !item.isClose;
      if (!isCloseB) {
        return {
          ...prev,
          [key]: {
            ...item,
            isClose: isCloseB,
            zIndex: activezIndex.current
          }
        };
      }

      // MINIMIZE / RESTORE BEHAVIOR
      const windowEl = winRefs.current[key];
      if (!windowEl) return prev;

      windowEl.style.transition = "transform .35s ease, width .35s ease, height .35s ease";
      let newItemz = item.isMinz;
      //console.log(item.isMinz);
      if (item.isMinz) {
        // RESTORE
        newItemz = !item.isMinz;
        requestAnimationFrame(() => {
          if(item.isMax){
            windowEl.style.width  = "100%";
            windowEl.style.height = "100%";
            windowEl.style.transform = "translate(0px,0px)";
          }else {
            windowEl.style.width = item.pWidth + "px";
            windowEl.style.height = item.pHeight + "px";
            windowEl.style.transform = `translate(${item.pX}px, ${item.pY}px)`;

          }

        });
      }

      const removeTransition = () => {
        windowEl.style.transition = "none";
        windowEl.removeEventListener("transitionend", removeTransition);
      };
      windowEl.addEventListener("transitionend", removeTransition);
      // Return NEW state
      return {
        ...prev,
        [key]: {
          ...item,
          isMinz: newItemz,
          zIndex: activezIndex.current
        }
      };
    });
  };
  const img = new Image();
  img.src = Wallpaper;
  img.onload = () => {
    const loadingScreen = document.getElementById('loadingScreen');
    if(!loadingScreen) return;
    loadingScreen.classList.add('hidden');
    
    // Remove from DOM after fade
    setTimeout(() => {
      loadingScreen.remove();
    }, 500);
  };

  return (
    <>
      <div className="loading-screen" id="loadingScreen">
        <div className="sticks">
          <div className="stick-one"></div>
          <div className="stick-two"></div>
          <div className="stick-three"></div>
          <div className="stick-two"></div>
          <div className="stick-one"></div>
        </div>
        <h2>Loading...</h2>
      </div>
      <div className="main-background" onMouseDown={(e)=> e.preventDefault()}>
        <Header />
        <div className="desktop">
          {sections.map(({ key, Component,
          }) => {

            if (compAttri[key]?.isClose) return null;
            if (!isLoadApps) return null;
            else return (
              <div
                className={`win-container ${key} blur-bg `}
                key={key}
                ref={(el) => { winRefs.current[key] = el }}
                style={{ 
                  transform: `translate(${!compAttri[key].isMax ? compAttri[key].pX : '0'}px,${!compAttri[key].isMax ? compAttri[key].pY : '0'}px)`, 
                  width:  `${!compAttri[key].isMax ? compAttri[key].pWidth+'px' : '100%'}`, 
                  height: `${!compAttri[key].isMax ? compAttri[key].pHeight+"px" : '100%'}`, 
                  zIndex: compAttri[key].zIndex 
                }}
                onMouseDown={(e) => {
                  activezIndex.current = activezIndex.current + 1;
                  e.preventDefault();
                  winRefs.current[key]!.style.zIndex = activezIndex.current.toString();
                  onClickWindows(e, winRefs.current[key], key)
                }}
              >
                <Component
                  isMax={compAttri[key].isMax}
                  isMinz={compAttri[key].isMinz}
                  sendMinz={(isMinz?: boolean) => handleOnMin(winRefs.current[key], key, isMinz ?? false)}
                  sendCloseB={(isClose?: boolean) => handleOnClose(key, isClose ?? false)}
                  sendMaxB={(isMax?: boolean) => handleOnMax(winRefs.current[key], key, isMax ?? false)} />
              </div>
            );
          })}
        </div>
        <AppDrawer keyApp={handleAppClose} />
      </div>
    </>
  );
}
