import "./Cert.css";
import Windows from "@/components/UI/Windows.tsx";
import NavPane from "@/components/UI/FileExplorer/NavPane.tsx";
export default function Cert(){
  return (
    <div className="cert-container">
      <Windows  title='Certificate' hideResizeBtn={false} isMax={false}/>
      <div className="content">
          <NavPane />
      </div>
    </div>
    
  );
}
