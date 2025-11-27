import { useRef } from "react";

export default function useWindowDrag() {
  //------------------------ Dragging states--------------------------
  const activeWindow = useRef<HTMLDivElement | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  //------------------------Resize states
  
  const isResizing = useRef(false);
  //const resizeDir = useRef<{ right?: boolean; bottom?: boolean; corner?: boolean }>({});
  const startSize = useRef({ w: 0, h: 0 });
  const startPos = useRef({ x: 0, y: 0 });


  //---------------When CLicked on main-windows
  const onClickWindows = (
    e: React.MouseEvent<HTMLDivElement>,
    windowEl: HTMLDivElement | null
  ) => {
    if (!windowEl) return;

    // Only drag if click is in `.title`
    const isTitle = (e.target as HTMLElement).closest(".title");
    const isResize = (e.target as HTMLElement).closest(".resize-btn");
    //-------------------startDrag-----------------------
    if (isTitle){

      const rect = windowEl.getBoundingClientRect();

      activeWindow.current = windowEl;
      isDragging.current = true;

      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", stopAll);
    } //-------------------startResize-----------------------
    else if (isResize){
      const rect = windowEl.getBoundingClientRect();
      activeWindow.current = windowEl;
      isResizing.current = true;

      startSize.current = { w: rect.width, h: rect.height };
      startPos.current = { x: e.clientX, y: e.clientY };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", stopAll);
    }
    else return;
  };

  

  const onMove = (e: MouseEvent) => {
    if (isDragging.current && activeWindow.current) dragMove(e);
    if (isResizing.current && activeWindow.current) resizeMove(e);
  };
  const resizeMove = (e: MouseEvent) => {
    if (!isResizing.current || !activeWindow.current) return;
      const newWidth = startSize.current.w + (e.clientX - startPos.current.x);
      const newHeight = startSize.current.h + (e.clientY - startPos.current.y);

       activeWindow.current.style.width = Math.max(500, newWidth)  + "px";
       activeWindow.current.style.height = Math.max(500, newHeight) + "px";
     }; 

  const dragMove = (e: MouseEvent) => {
    if (!isDragging.current || !activeWindow.current) return;

    const x = e.clientX - dragOffset.current.x;
    let y = e.clientY - dragOffset.current.y - 29;

    if (y < 0) y = 0;

    requestAnimationFrame(() => {
      if (!activeWindow.current) return; // <--- guard
      activeWindow.current.style.transform = `translate(${x}px, ${y}px)`;
    });
  };

  const stopAll = () => {
    isDragging.current = false;
    isResizing.current = false;

    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", stopAll);
    activeWindow.current = null;
  };
  return { onClickWindows };
}


