import "./Cert.css";
import Windows from "@/components/UI/Windows.tsx";
import NavPane from "@/components/UI/FileExplorer/NavPane.tsx";

//Import Images of CERT 
import APlus from  "@/assets/cert/A+-svg.svg";
import NetPlus from "@/assets/cert/Network+-svg.svg";
import SecPlus from "@/assets/cert/Security+-svg.svg";
import AzureFun from  "@/assets/cert/Azure-Fundamentals.png";
import {useState} from "react";
//Import Images of TECH STACK
import Git from "@/assets/tech-stack/git-icon.svg";
import Java from "@/assets/tech-stack/java.svg";
import JS from "@/assets/tech-stack/javascript.svg";
import MySQL from "@/assets/tech-stack/mysql.svg";
import PosgtgreSQL from "@/assets/tech-stack/postgresql.svg";
import Python from "@/assets/tech-stack/python.svg";
import React from "@/assets/tech-stack/react.svg";
import Spring from "@/assets/tech-stack/spring-icon.svg";
import TS from "@/assets/tech-stack/typescript-icon.svg";


interface CertProps{
  sendCloseB?:(isClose?:boolean) => void;
  sendMaxB?:(isMax?:boolean) => void;
  //sendDragB?:(pos:WinPos) => void;
  isMax:boolean;
  isMinz:boolean;
  sendMinz?:(isMinz?:boolean) => void;
}

interface ImageURLS {
  key:number;
  src:string;
  label:string;
  url?:string;
}

const certImageUrls = [ 
  {key:1, src:APlus,    label:"Comptia A+", url:'https://www.credly.com/earner/earned/badge/08f5dcf5-4e4a-4290-bcf3-d77c0a3b6133'},
  {key:2, src:NetPlus,  label:"Comptia Net+",url:'https://www.credly.com/earner/earned/badge/e08d711b-7114-4d27-bb60-1039e7d3d60f'},
  {key:3, src:SecPlus,  label:"Comptia Sec+", url:'https://www.credly.com/earner/earned/badge/319d953e-ec23-4a46-ab8f-8c10ae99c216'},
  {key:4, src:AzureFun, label:"Azure Fundamentals",url:'https://learn.microsoft.com/api/credentials/share/en-us/DarylGuzman-9695/F7147AA9DA704566?sharingId=81B256736F7F6ED4'},
//{key:5, src:"sdfsdfsdf", label:"Azure Fundamentals"},
];

const techImageUrls = [ 
  {key:1, src:Git,    label:"Git"},
  {key:2, src:Java,  label:"Java"},
  {key:3, src:JS,  label:"JavaScript"},
  {key:4, src:MySQL, label:"MySQL"},
  {key:5, src:PosgtgreSQL,    label:"PosgtgreSQL"},
  {key:6, src:Python,  label:"Python"},
  {key:7, src:React,  label:"React"},
  {key:8, src:Spring, label:"SpringBoot"},
  {key:9, src:TS, label:"TypeScript"},
//{key:5, src:"sdfsdfsdf", label:"Azure Fundamentals"},
];


const Cert: React.FC<CertProps> = ({sendCloseB, sendMaxB,sendMinz,isMax,isMinz}) => {
  const [activeFolder, setActiveFolder] = useState<string>('Certificate');
  const [imageURLS,setImageURLS] = useState<ImageURLS[] | null>(certImageUrls);
  
  const handleCloseBtn = (data?:boolean) => {
    sendCloseB?.(data)
  }
  const handleMaxBtn = (data?:boolean) => {
    sendMaxB?.(data);
  }
  const handleMinzBtn = (data?:boolean) => {
    sendMinz?.(data);
  }


  const handleDataFromNavPane = (data:string) => {
    setActiveFolder(data);
    if(data == 'Certificate') setImageURLS(certImageUrls);
    else if(data == 'Tech Stack')  setImageURLS(techImageUrls);
    else setImageURLS(null);
   
  }
  return (
    <div className="cert-container">
      <Windows  title={activeFolder} onMinz={handleMinzBtn} onClose={handleCloseBtn} isMax={isMax} isMinz={isMinz} onMax={handleMaxBtn}  hideResizeBtn={false}/>
      <div className="content">
          <NavPane onDataSend={handleDataFromNavPane}/>
          <div className="image-container">
            <div className="image-container-wrap">
            { imageURLS?.map(({key,src,label,url}) => (
                <a href={url} key={key} target="_blank">                         
                  <div className="img-label" >
                    <img className="imgs"  src={src} alt={`img-${key}-${label}`} />
                    <p className="lbl">{label}</p>
                  </div>
                </a> 
              ))}
            </div>
          </div>
      </div>
    </div>
    
  );
}

export default Cert;
