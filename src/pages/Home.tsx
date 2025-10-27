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
    const handleResizeBtn = windowEl.querySelector(".resize-btn") as HTMLDivElement | null;
    const handleMaximizeBtn = windowEl.querySelector(".maximize-btn") as HTMLDivElement | null;
    //const handleMaximizeBtn = windowEl.querySelector(".restore-btn") as HTMLDivElement | null;
    if (!handle) return;  
    let isDragging = false;
    let isResizing = false;
    let startX = 0, startY = 0;
    let startWidth = 0, startHeight =0;
    let offsetX =initialX, offsetY = initialY;
    //Dragging feature start
    const onMouseDown = (e: MouseEvent) => {
      //activezIndex.current++;
      //windowEl.style.zIndex = activezIndex.current.toString();
      
      if (!handle) return;

      e.preventDefault();
      //console.log("mouseDown");
      //setActive(activeComponent);
      isDragging = true;

      startX = e.clientX - offsetX;
      startY = e.clientY - offsetY;
      /*console.log("down down --------------------");
      console.log("eClientx: "+ e.clientX +" | eClienty: "+ e.clientY);
      console.log("offsetX: "+offsetX+" | offsetY: "+ offsetY);
      console.log("startx:" + startX + " startY: "+startY);*/
      activezIndex.current++;
      windowEl.style.zIndex = activezIndex.current.toString();

      document.addEventListener("mousemove",onMouseMove);
      document.addEventListener("mouseup",onMouseUp);

    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      offsetX = e.clientX - startX;
      offsetY = e.clientY - startY;

      if (offsetY < 0) offsetY = 0;
      /*
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^");
      console.log("eClientx: "+ e.clientX +" | eClienty: "+ e.clientY);
      console.log("offsetX: "+offsetX+" | offsetY: "+ offsetY);
      console.log("startx:" + startX + " startY: "+startY);*/
      requestAnimationFrame(() => {
        windowEl.style.transform = `translate(${offsetX}px, ${offsetY}px)`
      });


    };

    const onMouseUp = () => {
      isDragging = false;
     // console.log("mouseup!");
      //console.log(windowEl.style);
      //windowEl.style.top = offsetX+"px";

      //console.log(windowEl.style.top);
      //windowEl.style.left = offsetY+"px";
      document.removeEventListener("mousemove",onMouseMove);
      document.removeEventListener("mouseup",onMouseUp);
    };
    //Dragging feature end ------------------
    //Resize feature start ---------------
    const onMouseDownResize = (e: MouseEvent) => {
      e.preventDefault();
     // console.log("resize");
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = windowEl.getBoundingClientRect();
      startWidth = rect.width;
      startHeight = rect.height;

      document.addEventListener("mousemove",onMouseMoveResize);
      document.addEventListener("mouseup",onMouseUpResize);

    };

    const onMouseMoveResize = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = startWidth + (e.clientX - startX);
      const newHeight = startHeight + (e.clientY - startY);

      windowEl.style.width   = Math.max(500, newWidth)  + "px";
      windowEl.style.height  = Math.max(500, newHeight) + "px";

    };

    const onMouseUpResize = () => {
      isResizing = false;
      document.removeEventListener("mousemove",onMouseMoveResize);
      document.removeEventListener("mouseup",onMouseUpResize);

    }
    
    //Resize feature end ----------------
    //Maximize button start ---------
    const onClickMaxBtn =()=> {
      windowEl.style.width = '100%';
      windowEl.style.height = '100%';
      offsetX =0; offsetY =0;
      requestAnimationFrame( () => {
       windowEl.style.transform = `translate(0px,0px)`;
      });
      console.log(handleMaximizeBtn);
      handleMaximizeBtn?.removeEventListener("click",onClickMaxBtn);
    }
    //const onClickRestoreBtn = () =
    handle.addEventListener("mousedown",onMouseDown);
    handleResizeBtn?.addEventListener("mousedown",onMouseDownResize);
    handleMaximizeBtn?.addEventListener("click",onClickMaxBtn);
    return () => {
      handle.removeEventListener("mousedown",onMouseDown);
      handleResizeBtn?.removeEventListener("mousedown",onMouseDownResize);
      handleMaximizeBtn?.removeEventListener("click",onClickMaxBtn);
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
    { key: "about", Component: AboutMe , defaultX:26, defaultY:18 },
    { key: "cert",  Component: Cert    , defaultX:26 , defaultY:542  },
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

                                
                <Component />
              </div>
            ))
          }
        </div>
        
      </div>
      
    </>
  );
}
