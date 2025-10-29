import "./Cert.css";
import Windows from "@/components/UI/Windows.tsx";
import NavPane from "@/components/UI/FileExplorer/NavPane.tsx";

//Import Images 
import APlus from  "@/assets/cert/A+-svg.svg";
import NetPlus from "@/assets/cert/Network+-svg.svg";
import SecPlus from "@/assets/cert/Security+-svg.svg";
import AzureFun from  "@/assets/cert/Azure-Fundamentals.png";
import {useState} from "react";

interface CertProps{}

interface ImageURLS {
  key:number;
  src:string;
  label:string;
}
const certImageUrls = [ 
  {key:1, src:APlus,    label:"Comptia A+"},
  {key:2, src:NetPlus,  label:"Comptia Net+"},
  {key:3, src:SecPlus,  label:"Comptia Sec+"},
  {key:4, src:AzureFun, label:"Azure Fundamentals"},
//{key:5, src:"sdfsdfsdf", label:"Azure Fundamentals"},
];

const Cert: React.FC<CertProps> = () => {
  const [activeFolder, setActiveFolder] = useState<string>('Certificate');
  const [imageURLS,setImageURLS] = useState<ImageURLS[] | null>(certImageUrls);


  const handleDataFromNavPane = (data:string) => {
    setActiveFolder(data);
    if(data == 'Certificate') setImageURLS(certImageUrls);
    else setImageURLS(null);
    //console.log(activeFolder);
  }
  return (
    <div className="cert-container">
      <Windows  title={activeFolder} hideResizeBtn={false} isMax={false}/>
      <div className="content">
          <NavPane onDataSend={handleDataFromNavPane}/>
          <div className="image-container">
            { imageURLS?.map(({key,src,label}) => (
              <div className="img-label" key={key}>
                <img className="imgs"  src={src} alt={`img-${key}-${label}`} width={120} />
                <p className="lbl">{label}</p>
              </div>
              ))}
          </div>
      </div>
    </div>
    
  );
}

export default Cert;
