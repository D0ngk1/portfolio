import "./Home.css";
//import Header from "../components/Header/Header.tsx";
import Header   from      "@/components/Layout/Header/Header.tsx";
import AboutMe  from      "@/components/Layout/About-Me/AboutMe.tsx";
import Cert     from      "@/components/Layout/Cert/Cert.tsx";
import Exp      from      "@/components/Layout/Experience/Experience.tsx";
import AppDrawer from     "@/components/Layout/AppDrawer/AppDrawer.tsx";
import Resume from "@/components/Layout/PDFViewer/PDFViewer.tsx";


import {useRef,useState,useEffect} from "react";
import wm from "@/hooks/windowM.tsx";



export default function Home(){
  const {onClickWindows} = wm();
  const [compAttri, setCompAttri] = useState<Record<string, {
    isClose:boolean; 
    isMax:boolean;
    pWidth:number;
    pHeight:number;
    pY:number;
    pX:number
  }>>({});
  const activezIndex = useRef(1);
  const winRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [isLoadApps,setLoadApps] = useState<boolean>(false);
  const sections = [
    { key: "about",       Component: AboutMe , defaultX:26, defaultY:18 , pWidth:0, pHeight:0},
    { key: "cert",        Component: Cert    , defaultX:26 , defaultY:542, pWidth:0, pHeight:0},
    { key: "experience",  Component: Exp    , defaultX:535 , defaultY:0, pWidth:0, pHeight:0},
    { key: "resume",      Component: Resume   },
  ]

  useEffect(() => {
    setCompAttri((prev)=> ({
      ...prev,
      "resume":{...prev["resume"],isClose:true}
    }));
    setLoadApps?.(true);
  },[])
  
   const handleOnClose = (key?: string, isCloseB?: boolean) => {
     if (!key) return ;
    setCompAttri((prev) => ({
      ...prev,
      [key]: {...prev[key],isClose: isCloseB ?? false}
    }));
  };

  const handleOnMax = (windowEl: HTMLDivElement | null, key?: string, isMaxB?: boolean) => {
    console.log(isMaxB);
    if (!key || !windowEl) return ; 
    setCompAttri((prev) => ({
      ...prev,
      [key]: {...prev[key],
        isMax: isMaxB ?? true,
      }
    }));
    // Apply max styling
    if(isMaxB){

      const rect = windowEl.getBoundingClientRect();
      console.log(rect.x+"-"+rect.y);
      setCompAttri((prev) => ({
        ...prev,
        [key]: {...prev[key],
          pWidth: rect.width,
          pHeight: rect.height,
          pY:rect.y-53,
          pX:rect.x
        }
      }));
      windowEl.style.width = "100%";
      windowEl.style.height ="100%";
      requestAnimationFrame(() => {
        windowEl.style.transform = `translate(0px, 0px)`
      });

    }else {

      windowEl.style.width =  compAttri[key].pWidth+"px";
      windowEl.style.height =  compAttri[key].pHeight+"px";
      const offsetX = compAttri[key].pX; const offsetY = compAttri[key].pY;
      console.log(offsetX+"-"+offsetY);
      windowEl.style.transform = `translate(${offsetX}px,${offsetY}px)`;

    }
  };


 

  const handleApp = (key?:string) => {
    if(!key) return;
    const isCloseB = !compAttri[key]?.isClose;
    setCompAttri((prev) => ({
      ...prev,
      [key]: {...prev[key],isClose:isCloseB}
    }));

  } 

  return (
    <>
      <div className="main-background">
        <Header />
        <div className="desktop">
            {sections.map(({ key, Component, 

            }) => {

            if (compAttri[key]?.isClose) return null;
            if(!isLoadApps) return null;
            else return (
              <div
                className={`win-container ${key} blur-bg`}
                key={key}
                ref={(el) => {winRefs.current[key] = el}}

                onMouseDown={(e) => {
                  activezIndex.current++;
                  e.preventDefault();
                  winRefs.current[key]!.style.zIndex = activezIndex.current.toString();
                  onClickWindows(e,winRefs.current[key]) 
                }}
              >
                <Component sendCloseB={(isClose?:boolean) => handleOnClose(key,isClose ?? false)} 
                sendMaxB={(isMax?:boolean)=> handleOnMax(winRefs.current[key],key,isMax ??false)}/>
              </div>
            );
          })}
         

        </div>
        <AppDrawer onClose={handleApp}/>       
      </div>
      
    </>
  );
}
