/*export interface WinPos {
  //startX:number;
  //startY:number;
  x:number;
  y:number;
}*/
import "./Windows.css";
import {useState} from 'react';
interface MyComponentProps {
  title?:string;
  hideResizeBtn:boolean;
  height?:string;
  menuBar?:React.ReactNode;
  onClose?: (state:boolean) => void; 
  onMax?: (state:boolean) => void;
  //onDrag?:(pos:WinPos) =>void;
  //isMax:boolean;
}


const Windows: React.FC<MyComponentProps> = ({ title,hideResizeBtn=false,menuBar,height='30px',onClose,onMax}) => {
  const [showMax, setShowMax] = useState<boolean>(false);
  const [isClose,setisClose] = useState<boolean>(false);
  //const [isDragging,setIsDragging] = useState<boolean>(false);
  /*const startRef = useRef<WinPos>({
    startX:0,
    startY:0,
    x:0,
    y:0});
*/

  /*const posRef = useRef<WinPos>({
    //startX:0,
    //startY:0,
    x:0,
    y:0}); */

  /*useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUpGlobal);
    } else {
      window.removeEventListener('mouseup', handleMouseUpGlobal);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, [isDragging]);*/

  const onClickMax = () => {
    const maxB = !showMax;
    setShowMax(maxB);
    onMax?.(maxB);
  }
  const closeBtn = () => {
    const closeB = !isClose;
    setisClose(closeB);
    onClose?.(closeB);
    //console.log(isClose);
  }
  /*let sX = 0; let sY=0;
  const onDragClick = (e: React.MouseEvent<HTMLDivElement> ) => {
    e.preventDefault();
    setIsDragging(true);
    //const x = e.clientX - 26;const y = e.clientY-595;
    startRef.current.x = e.clientX - 26; startRef.current.y = e.clientY - 595;
    const eX = e.clientX; const eY = e.clientY;
    //posRef.current.startX =x;
    //posRef.current.startY =y;
    posRef.current.x = eX;
    posRef.current.y = eY;
    //console.log(x+"-"+y);
  }

  const onDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const sX = startRef.current.x;
    const sY = startRef.current.y;
    if (!isDragging) return;
    let x = e.clientX;let y = e.clientY;
    posRef.current.x = x-sX;
    posRef.current.y = y-sY;
    onDrag?.({...posRef.current});
  };*/


  
  return (
    <>
    <div className="main-windows">
        <div className="title">   
        <div className="menu"></div>
        <div className="title-con" style={{height: height}} > { menuBar || <h4>{title}</h4>  }</div>

        <div className="window-container">
          <div className="minimize-btn window-btn">&#128469;</div>
          <div className="maximize-btn window-btn" onClick={onClickMax}>{showMax ? '🗗' : '🗖'}</div>            
          <div className="close-btn window-btn" onClick={()=>closeBtn()}>&#x2715;</div>
        </div>
      </div>
    </div>
    <div className="resize-btn" style={{ visibility: hideResizeBtn || !showMax ? 'hidden' : 'visible' }}></div>
    </>
  );
}
export default Windows;
