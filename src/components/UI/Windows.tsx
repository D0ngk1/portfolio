import "./Windows.css";
import {useEffect,useState} from 'react';
interface MyComponentProps {
  title?:string;
  hideResizeBtn:boolean;
  isMax:boolean;
}
const Windows: React.FC<MyComponentProps> = ({ title,hideResizeBtn=false,isMax=false}) => {
  let maxWidth = 0;
  let maxHeight = 0;
  const [showMax, setShowMax] = useState<boolean>(true);
  useEffect(() => {
    const parentDivRef = document.getElementById("desktop");

     //const rect = parentDivRef?.current.getBoundingClientRect();
    console.log(parentDivRef+" "+isMax);
    // maxWidth = rect.width;
    // maxHeight = rect.Height;
     console.log(maxWidth+" .--. " + maxHeight);
  }, []);

  const onClickMax = () => {
    setShowMax(false);
  }

  
  return (
    <div className="main-windows blur-bg">
      <div className="title blur-bg">
        <div className="menu"></div>
        <div className="title-con"><h4>{title}</h4> </div>
        <div className="window-container">
          <div className="minimize-btn window-btn">&#128469;</div>
          { !showMax ? (
            <div className="restore-btn window-btn">R</div>            
          ) : (
           <div className="maximize-btn window-btn" onClick={onClickMax}>&#x1F5D6;</div>
          )}
          <div className="close-btn window-btn">&#x2715;</div>
        </div>
      </div>
      {
      (!hideResizeBtn && showMax ) && (
        <div className="resize-btn" ></div>
      )} 
    </div>
  );
}
export default Windows;
