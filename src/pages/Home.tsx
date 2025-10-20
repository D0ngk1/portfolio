import "./Home.css";
//import Header from "../components/Header/Header.tsx";
import Header from "@/components/Layout/Header/Header.tsx"
import AboutMe from "@/components/Layout/About-Me/AboutMe.tsx"
import Cert from "@/components/Layout/Cert/Cert.tsx"
import {useRef} from "react";   
export default function Home(){
  const activezIndex = useRef(1);
  //const el = useRef<HTMLDivElement>(null);
  const makeDraggable = (windowEl: HTMLDivElement | null, 
                         handleSelector: string ,
                         initialX =0 ,
                         initialY =0 , ) => {
  
    if (!windowEl) return;
    const handle = windowEl.querySelector(handleSelector) as HTMLDivElement | null;
    if (!handle) return;  
    let isDragging = false;
    let startX = 0, startY = 0;
    let currentX = 0, currentY = 0;
    let offsetX =initialX, offsetY = initialY;
    
    const onMouseDown = (e: MouseEvent) => {
      //activezIndex.current++;
      //windowEl.style.zIndex = activezIndex.current.toString();
      
      if (!handle) return;

      e.preventDefault();
      console.log("mouseDown");
      //setActive(activeComponent);
      isDragging = true;

      startX = e.clientX - offsetX;
      startY = e.clientY - offsetY;
      console.log("eClientx: "+startX+" | offsetY: "+ offsetY);
      console.log("eClientx: "+startX+" | offsetY: "+ offsetY);
      activezIndex.current++;
      windowEl.style.zIndex = activezIndex.current.toString();

      document.addEventListener("mousemove",onMouseMove);
      document.addEventListener("mouseup",onMouseUp);

    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;

      if (currentY < 0) currentY = 0;

      requestAnimationFrame(() => {
        windowEl.style.transform = `translate(${currentX}px, ${currentY}px)`
      });

      offsetY = currentY;
      offsetX = currentX;
    };

    const onMouseUp = () => {
      isDragging = false;
      console.log("mouseup!");
      //console.log(windowEl.style);
      //windowEl.style.top = offsetX+"px";

      //console.log(windowEl.style.top);
      //windowEl.style.left = offsetY+"px";
      document.removeEventListener("mousemove",onMouseMove);
      document.removeEventListener("mouseup",onMouseUp);
     


    };
    handle.addEventListener("mousedown",onMouseDown);
    return () => {
      handle.removeEventListener("mousedown",onMouseDown);

    };


  }

  //Track the active components
  //const [active, setActive] = useState<string>("about");
  //const active = useRef<string>("about");
  //Components
  const handleWindowClick = (windowEl: HTMLDivElement | null) => {
    if (!windowEl) return;
    activezIndex.current++;
    windowEl.style.zIndex = activezIndex.current.toString();
  }

  const sections = [
    { key: "about", Component: AboutMe , defaultX:400 , defaultY:50 },
    { key: "cert",  Component: Cert    , defaultX:0   , defaultY:0  },
    //{ key: "pro}
  ]

  
  return (
    <>
      <div className="main-background">
        <Header />
        <div className="desktop">
          {
            sections.map(({key,Component,defaultX,defaultY}) => (
              <div className={`win-container ${key}`} 
                key = {key}
                //onClick = {()=> setActive(key)}
                ref={(el) => {
                   makeDraggable(el,".title",defaultX,defaultY);
                   if (el) {
                     el.addEventListener("mousedown", () => handleWindowClick(el));
                    }
                  }
                }
                //onMouseDown = {setActive}
                //style={{zIndex:active == key ? 2 : 1}}
                >

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
