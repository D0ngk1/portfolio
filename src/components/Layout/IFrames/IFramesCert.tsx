import Windows from "@/components/UI/Windows.tsx";
import './IFrames.css';
import {useEffect} from 'react';
interface  IFProps{
  sendCloseB?: (isClose?:boolean) => void;
  sendMinz?: (isMin?:boolean) =>void;
  isMax:boolean;
  sendMaxB?:(isMax?:boolean) => void;
  isMinz:boolean;
}
const IFramesCert:React.FC<IFProps> = ({sendCloseB,sendMaxB,sendMinz,isMinz,isMax}) => {
  const handleCloseBtn = (data?:boolean) => {
    sendCloseB?.(data)
  }
  const handleMaxBtn = (data?:boolean) => {
    sendMaxB?.(data);
  }
  const handleMinzBtn = (data?:boolean) => {
    sendMinz?.(data);
  }

  useEffect(() => {
    // re-run Credly script on mount
    const script = document.createElement("script");
    script.src = "//cdn.credly.com/assets/utilities/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // optional cleanup if needed
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="iframe-container">
      <Windows  title='Credly' onMinz={handleMinzBtn} onClose={handleCloseBtn} isMax={isMax} isMinz={isMinz} onMax={handleMaxBtn}  hideResizeBtn={false}/>
      <div className="content">
       <div className='view-cert' 
       data-iframe-width="150" data-iframe-height="270" 
       data-share-badge-id="319d953e-ec23-4a46-ab8f-8c10ae99c216" 
       data-share-badge-host="https://www.credly.com"></div>
       {/*  <script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>*/}
      </div>
    </div>

  )
}

export default IFramesCert;
