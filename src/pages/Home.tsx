import "./Home.css";
//import Header from "../components/Header/Header.tsx";
import Header from "@/components/Layout/Header/Header.tsx"
import AboutMe from "@/components/Layout/About-Me/AboutMe.tsx"
import Cert from "@/components/Layout/Cert/Cert.tsx"
import {useState} from "react";   
export default function Home(){
  const makeDraggable = (windowEl: HTMLDivElement | null, handleSelector: string,
                        activeComponent: string) => {
  
    if (!windowEl) return;
    const handle = windowEl.querySelector(handleSelector) as HTMLDivElement | null;

    if(!handle) return;
    
    let isDragging = false;
    let startX = 0, startY = 0;
    let currentX = 0, currentY = 0;
    let offsetX =0, offsetY = 0;
    
    const onMouseDown = (e: MouseEvent) => {
      console.log("i am here!");
      setActive(activeComponent);
      isDragging = true;
      startX = e.clientX - offsetX;
      startY = e.clientY - offsetY;

    
     
      document.addEventListener("mousemove",onMouseMove);
      document.addEventListener("mouseup",onMouseUp);

    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;

      requestAnimationFrame(() => {
        windowEl.style.transform = `translate(${currentX}px, ${currentY}px)`
      });

      offsetY = currentY;
      offsetX = currentX;
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove",onMouseMove);
      document.removeEventListener("mouseup",onMouseUp);

    };
    
    handle.addEventListener("mousedown",onMouseDown);
    return () => {
      handle.removeEventListener("mousedown",onMouseDown);
    };


  }

  //Track the active components
  const [active, setActive] = useState<string>("about");
  //const active = useRef<string>("about");
  //Components
  const sections = [
    { key: "about", Component: AboutMe},
    { key: "cert", Component: Cert },
    //{ key: "pro}
  ]

  
  return (
    <>
      <div className="main-background">
        <Header />
        <div className="desktop">
          {
            sections.map(({key,Component}) => (
              <div className={`win-container ${key}`} 
                key = {key}
                //onClick = {()=> setActive(key)}
                ref={(el) => makeDraggable(el,".drag-container",key)}
                style={{zIndex:active == key ? 2 : 1}} 
                
                >
                <div className="drag-container" ></div>
                <div className="resize-btn"></div>
                
                <Component />
              </div>
            ))
          }
        </div>
        
      </div>
      
    </>
  );
}
