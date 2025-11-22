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

}


const Windows: React.FC<MyComponentProps> = ({ title,hideResizeBtn=false,menuBar,height='30px',onClose,onMax}) => {
  const [showMax, setShowMax] = useState<boolean>(false);
  const [isClose,setisClose] = useState<boolean>(false);


  const onClickMax = () => {
    const maxB = !showMax;
    setShowMax(maxB);
    onMax?.(maxB);
  }
  const closeBtn = () => {
    const closeB = !isClose;
    setisClose(closeB);
    onClose?.(closeB);

  }



  
  return (
    <>
    <div className="main-windows" style={{height: height}} >
        <div className="title" style={{height: height}} >   
        <div className="menu"></div>
        <div className="title-con" style={{height: height}} > { menuBar || <h4>{title}</h4>  }</div>

        <div className="window-container">
          <div className="minimize-btn window-btn">&#128469;</div>
          <div className="maximize-btn window-btn" onClick={onClickMax}>{showMax ? '🗗' : '🗖'}</div>            
          <div className="close-btn window-btn" onClick={()=>closeBtn()}>&#x2715;</div>
        </div>
      </div>
    </div>
    <div className="resize-btn" style={{ visibility: hideResizeBtn || showMax ? 'hidden' : 'visible' }}></div>
    </>
  );
}
export default Windows;
