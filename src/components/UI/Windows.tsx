import "./Windows.css";
import {useState} from 'react';
interface MyComponentProps {
  title?:string;
  hideResizeBtn:boolean;
  height?:string;
  menuBar?:React.ReactNode;
  onClose?: (state:boolean) => void; 
  //isMax:boolean;
}
const Windows: React.FC<MyComponentProps> = ({ title,hideResizeBtn=false,menuBar,height='30px',onClose}) => {
  const [showMax, setShowMax] = useState<boolean>(true);
  const [isClose,setisClose] = useState<boolean>(false);
  const onClickMax = () => {
    if(showMax) setShowMax(false);
    else setShowMax(true);
  }
  const closeBtn = () => {
    const closeB = !isClose;
    setisClose(closeB);
    onClose(closeB);
    //console.log(isClose);
  }

  
  return (
    <>
    <div className="main-windows">
      <div className="title">
        <div className="menu"></div>
        <div className="title-con" style={{height: height}} > { menuBar || <h4>{title}</h4>  }</div>

        <div className="window-container">
          <div className="minimize-btn window-btn">&#128469;</div>
          <div className="maximize-btn window-btn" onClick={onClickMax}>{!showMax ? '🗗' : '🗖'}</div>            
          <div className="close-btn window-btn" onClick={()=>closeBtn()}>&#x2715;</div>
        </div>
      </div>
    </div>
    <div className="resize-btn" style={{ visibility: hideResizeBtn || !showMax ? 'hidden' : 'visible' }}></div>
    </>
  );
}
export default Windows;
