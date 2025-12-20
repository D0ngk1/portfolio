import { useRef } from "react";

export default function useWindowDrag() {
  //------------------------ Dragging states--------------------------
  const activeWindow = useRef<HTMLDivElement | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const keyRef = useRef<String | null>(null);
  //------------------------Resize states

  const isResizing = useRef(false);
  //const resizeDir = useRef<{ right?: boolean; bottom?: boolean; corner?: boolean }>({});
  const startSize = useRef({ w: 0, h: 0 });
  const startPos = useRef({ x: 0, y: 0 });
  const marginTop = window.innerHeight * 0.022;


  //---------------When CLicked on main-windows
  const onClickWindows = (
    e: React.MouseEvent<HTMLDivElement>,
    windowEl: HTMLDivElement | null, key: string
  ) => {
    if (!windowEl) return;
    keyRef.current = key;
    // Only drag if click is in `.title`
    const isTitle = (e.target as HTMLElement).closest(".title");
    const isResize = (e.target as HTMLElement).closest(".resize-btn");


    //-------------------startDrag-----------------------
    if (isTitle) {

      const rect = windowEl.getBoundingClientRect();

      activeWindow.current = windowEl;
      isDragging.current = true;

      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", stopAll);
    } //-------------------startResize-----------------------
    else if (isResize) {
      const rect = windowEl.getBoundingClientRect();
      activeWindow.current = windowEl;
      isResizing.current = true;

      startSize.current = { w: rect.width, h: rect.height };
      startPos.current = { x: e.clientX, y: e.clientY };
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", stopAll);
      //document.addEventListener("mousemove", onMove);
      //document.addEventListener("mouseup", stopAll);
    }
    else return;
  };



  const onMove = (e: MouseEvent) => {
    if (isDragging.current && activeWindow.current) dragMove(e);
    if (isResizing.current && activeWindow.current) resizeMove(e);
  };
  const resizeMove = (e: MouseEvent) => {
    if (!isResizing.current || !activeWindow.current) return;
    let maxHeight = 0; let maxWidth = 0;
    const isPhone = window.innerWidth <= 500;
    if (keyRef.current !== 'experience') {
      maxHeight = window.innerHeight * 0.38;
      maxWidth = !isPhone ? window.innerWidth * 0.2 : window.innerWidth * 0.8;
    } else {
      maxHeight = window.innerHeight * 0.7;
      maxWidth = isPhone ? window.innerWidth * 0.55 : window.innerWidth * 0.8;

    }
    const newWidth = startSize.current.w + (e.clientX - startPos.current.x);
    const newHeight = startSize.current.h + (e.clientY - startPos.current.y);

    activeWindow.current.style.width = Math.max(maxWidth, newWidth) + "px";
    activeWindow.current.style.height = Math.max(maxHeight, newHeight) + "px";
  };

  const dragMove = (e: MouseEvent) => {
    if (!isDragging.current || !activeWindow.current) return;

    const x = e.clientX - dragOffset.current.x;
    let y = e.clientY - dragOffset.current.y - marginTop;

    if (y < 0) y = 0;

    requestAnimationFrame(() => {
      if (!activeWindow.current) return; // <--- guard
      activeWindow.current.style.transform = `translate(${x}px, ${y}px)`;
    });
  };

  const stopAll = () => {
    isDragging.current = false;
    isResizing.current = false;

    //document.removeEventListener("mousemove", onMove);
    //document.removeEventListener("mouseup", stopAll);
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", stopAll);
    activeWindow.current = null;
  };
  return { onClickWindows };
}


