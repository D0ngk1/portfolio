import "./NavPane.css";

interface ChildProps {
  onDataSend: (activeFolder: string) => void;
}
const NavPane:React.FC<ChildProps> = ({onDataSend}) => {
  let folder="";
  const handleClick = (key=3) => {
    if(key == 3) folder="Certificate";
    if(key == 1) folder="Recent";
    if(key == 2) folder="Home";
    if(key == 4) folder="Tech Stack";

    onDataSend(folder);
  }
  return (
    <div className="nav-pane">
      <div className="nav-recent nav-pane-btn"     onClick={() => handleClick(1)}>Recent</div>
      <div className="nav-home nav-pane-btn"       onClick={() => handleClick(2)}>Home</div>
      <div className="nav-cert nav-pane-btn"       onClick={() => handleClick(3 )}>Certificate</div>
      <div className="nav-tech-stack nav-pane-btn" onClick={() => handleClick(4)}>Tech Stack</div>
    </div>
  );
}
export default NavPane;
