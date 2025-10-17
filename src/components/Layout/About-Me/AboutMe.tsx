import "./AboutMe.css";
import Windows from "@/components/UI/Windows.tsx";
interface SectionProps {
  onClick?: () => void;
  style?: React.CSSProperties;
}
export default function AboutMe({onClick,style}: SectionProps) {
  return (
    <div className="about-me" onClick={onClick} style={style}>
      <Windows backgroundColor='green'/>
    </div>
    
  );
} 
