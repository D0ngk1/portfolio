import "./AboutMe.css";
import Windows from "@/components/UI/Windows.tsx";
import selfie from "@/assets/profile-picture.png";
import githubIcon from "@/assets/github-light.png";
/*interface SectionProps {
  onClick?: () => void;
  style?: React.CSSProperties;
}*/
export default function AboutMe() {
  return (
    <div className="about-me" >
      <Windows  title='About Me'/>
      <div className="content">
        <div className="profile"><img className="profile-picture" src={selfie} alt="daryl"/></div>
        <div className="about-name">Daryl G. Guzman</div>
        <div className="job-title">Software Engineer | IT Specialist</div>
        <div className="education">BS in Computer Science</div>
        <div className="links-containers">
          <div className="github-icon"><img src={githubIcon} className="github-img" alt="github icon" /></div>
        </div>
      </div>
    </div>
    
  );
}
