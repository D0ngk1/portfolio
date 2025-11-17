
  //const el = useRef<HTMLDivElement>(null);
import {useEffect} from "react";
interface wmOptions {
  handleSelector:string;
  initialX?: number;
  initialY?:number;
  pWidth?:number;
  pHeight?:number;
}

export const windowManager = (
                       ref: React.RefObject<HTMLDivElement | null>, 
                       { handleSelector,
                         initialX =0 ,
                         initialY =0}:wmOptions ) => {

    useEffect( () => {
    const windowEl = ref.current;
    if (!windowEl) return;
    const handle = windowEl.querySelector(handleSelector) as HTMLDivElement | null;
    const handleResizeBtn = windowEl.querySelector(".resize-btn") as HTMLDivElement | null;

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
      console.log("Resize!");

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
    
    //const onClickRestoreBtn = () =
    handle.addEventListener("mousedown",onMouseDown);
    handleResizeBtn?.addEventListener("mousedown",onMouseDownResize);
   
    return () => {
      handle.removeEventListener("mousedown",onMouseDown);
      handleResizeBtn?.removeEventListener("mousedown",onMouseDownResize); 
    };
  },[ref]);

};

//Track the active components
//const [active, setActive] = useState<string>("about");
//const active = useRef<string>("about");
//Components


