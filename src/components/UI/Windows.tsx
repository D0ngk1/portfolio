import "./Windows.css";
import {useState} from 'react';
interface MyComponentProps {
  title?:string;
  hideResizeBtn:boolean;
  height?:string;
  menuBar?:React.ReactNode;
  //isMax:boolean;
}
const Windows: React.FC<MyComponentProps> = ({ title,hideResizeBtn=false,menuBar,height='30px'}) => {
  /*let maxWidth = 0;
  let maxHeight = 0;
    useEffect(() => {
    const parentDivRef = document.getElementById("desktop");

     //const rect = parentDivRef?.current.getBoundingClientRect();
    console.log(parentDivRef+" "+isMax);
    // maxWidth = rect.width;
    // maxHeight = rect.Height;
     console.log(maxWidth+" .--. " + maxHeight);
  }, []);
*/
  const [showMax, setShowMax] = useState<boolean>(true);

  const onClickMax = () => {
    if(showMax) setShowMax(false);
    else setShowMax(true);
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
          <div className="close-btn window-btn">&#x2715;</div>
        </div>
      </div>
    </div>
    <div className="resize-btn" style={{ visibility: hideResizeBtn || !showMax ? 'hidden' : 'visible' }}></div>
    </>
  );
}
export default Windows;
