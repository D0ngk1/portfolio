import "./Cert.css";
import Windows from "@/components/UI/Windows.tsx";
interface SectionProps {
  onClick?: () => void;
  style?: React.CSSProperties;
}
export default function Cert({onClick,style}: SectionProps){
  return (
    <div className="cert" onClick={onClick} style ={style}>
      <Windows backgroundColor='black'/>
    </div>
    
  );
}
