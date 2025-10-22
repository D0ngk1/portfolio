import "./AboutMe.css";
import Windows from "@/components/UI/Windows.tsx";
/*interface SectionProps {
  onClick?: () => void;
  style?: React.CSSProperties;
}*/
export default function AboutMe() {
  return (
    <div className="about-me" >
      <Windows backgroundColor='green' title='About Me'/>
    </div>
    
  );
}
