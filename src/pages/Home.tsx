import "./Home.css";
//import Header from "../components/Header/Header.tsx";
import Header   from      "@/components/Layout/Header/Header.tsx";
import AboutMe  from      "@/components/Layout/About-Me/AboutMe.tsx";
import Cert     from      "@/components/Layout/Cert/Cert.tsx";
import Exp      from      "@/components/Layout/Experience/Experience.tsx";
import AppDrawer from     "@/components/Layout/AppDrawer/AppDrawer.tsx";


//import {windowManager} from "@/lib/windowManager";
import {useRef,useState} from "react";
//import type {WinPos} from "@/components/UI/Windows.tsx";


export default function Home(){
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
  const sections = [
    { key: "about",       Component: AboutMe , defaultX:26, defaultY:18 , pWidth:0, pHeight:0},
    { key: "cert",        Component: Cert    , defaultX:26 , defaultY:542, pWidth:0, pHeight:0},
    { key: "experience",  Component: Exp    , defaultX:535 , defaultY:0, pWidth:0, pHeight:0},
    //{ key: "pro}
  ]
  // Store drag offsets
  const dragOffset = useRef<{x: number, y: number}>({x:0, y:0});
  const activeWindow = useRef<HTMLDivElement | null>(null);
  const activeKey = useRef<string | null>(null);
  const isDraggingRef = useRef(false);

  const handleWindowClick = (e: React.MouseEvent<HTMLDivElement>,windowEl: HTMLDivElement | null,key?:string) => {
    e.preventDefault();
    if (!windowEl) return;
    activezIndex.current++;
    windowEl.style.zIndex = activezIndex.current.toString(); 

    //const drag = (e.currentTarget as HTMLDivElement).querySelector(".title") as HTMLDivElement;
   // const drag = windowEl.querySelector(".title") as HTMLDivElement || null;
    const isTitle = (e.target as HTMLElement).closest(".title");
    if (!isTitle) return; // <---- STOP: Not clicking title bar

    //if(!drag || !key) return;
    //Dragging
    const rect = windowEl.getBoundingClientRect();
    // Mark this as the active window
    activeWindow.current = windowEl;
    activeKey.current = key;
    isDraggingRef.current = true;
    //
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top};
    setCompAttri((prev) => ({
      ...prev,
      [key]: {...prev[key],isDragging:true}
    }))

    document.addEventListener("mousemove", onMoveDrag as any);
    document.addEventListener("mouseup",onUpDrag as any);
  }
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
      //windowEl.style.transform = "translate(0px, 0px)";
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
      //windowEl.style.transform = "translate(0px, 0px)";
    }else {

      windowEl.style.width =  compAttri[key].pWidth+"px";
      windowEl.style.height =  compAttri[key].pHeight+"px";
      const offsetX = compAttri[key].pX; const offsetY = compAttri[key].pY;
      console.log(offsetX+"-"+offsetY);
      windowEl.style.transform = `translate(${offsetX}px,${offsetY}px)`;

    }
  };


  //const handleOnMax = ()

  const handleApp = (key?:string) => {
    if(!key) return;
    const isCloseB = !compAttri[key]?.isClose;
    setCompAttri((prev) => ({
      ...prev,
      [key]: {...prev[key],isClose:isCloseB}
    }));
//    console.log(isClose;
  } 

  /*Dragging 
  const onClickDrag = (e: React.MouseEvent<HTMLDivElement> ,windowEl: HTMLDivElement | null, key?: string) => {
    e.preventDefault();
    if (!key || !windowEl) return;
    const rect = windowEl.getBoundingClientRect();
    // Mark this as the active window
    activeWindow.current = windowEl;
    activeKey.current = key;
    isDraggingRef.current = true;
    //
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top};
    setCompAttri((prev) => ({
      ...prev,
      [key]: {...prev[key],isDragging:true}
    }))

    document.addEventListener("mousemove", onMoveDrag as any);
    document.addEventListener("mouseup",onUpDrag as any);
  }
  */
  const onMoveDrag = (e: MouseEvent
                     // windowEl: HTMLDivElement | null, key?: string
                     ) => {
    //if( !key || !windowEl || !compAttri[key] || !compAttri[key].isDragging ) return;
    if(!activeWindow.current || !activeKey.current) return;

  //const key = activeKey.current;
  const windowEl = activeWindow.current;
 
  if (!isDraggingRef.current) return;

  const offsetX = e.clientX - dragOffset.current.x;
  let offsetY = e.clientY - dragOffset.current.y-50;
/*
    const native = e.nativeEvent;
    const offsetX = e.clientX - dragOffset.current.x;
    const offsetY = e.clientY - dragOffset.current.y-50;*/

    if (offsetY < 0) offsetY = 0;

    requestAnimationFrame(()=>{
      windowEl.style.transform = `translate(${offsetX}px,${offsetY}px)`;
    })

  }
  const onUpDrag = (key?:string) => {
    if (!key) return;
    //const bool = !compAttri[key].isDragging;
    isDraggingRef.current=false;
    document.removeEventListener("mousemove", onMoveDrag as any);
    document.removeEventListener("mouseup", onUpDrag as any);
  }
  return (
    <>
      <div className="main-background">
        <Header />
        <div className="desktop">
            {sections.map(({ key, Component, 
            //defaultX, defaultY, pWidth, pHeight 
            }) => {
            //const winRef = useRef<HTMLDivElement>(null);
            //windowManager( winRef, { handleSelector: ".title", initialX:defaultX, initialY:defaultY, pWidth, pHeight });
            if (compAttri[key]?.isClose) return null;
            return (
              <div
                className={`win-container ${key} blur-bg`}
                key={key}
                ref={(el) => {winRefs.current[key] = el}}
                onMouseDown={(e) => handleWindowClick(e,winRefs.current[key],key)}
              >
              {/*<div className="drag-div" 
                onMouseDown={(e)=>onClickDrag(e,winRefs.current[key],key)}
                //onMouseMove={(e)=>onMoveDrag(e,winRefs.current[key],key)}
                //onMouseUp={()=>onUpDrag(key)}
                ></div>*/}
                <Component sendCloseB={(isClose?:boolean) => handleOnClose(key,isClose ?? false)} 
                //sendDragB={(pos:WinPos)=>handleOnDrag(pos ?? {startX:0,startY:0,x:0,y:0},winRef.current,key)} 
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
