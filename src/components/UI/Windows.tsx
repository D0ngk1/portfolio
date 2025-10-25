import "./Windows.css";
interface MyComponentProps {
  title?:string;
}
const Windows: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <div className="main-windows blur-bg">
      <div className="title blur-bg">
        <div className="menu"></div>
        <div className="title-con">{title}</div>
        <div className="window-container">
          <div className="minimize-btn window-btn">&#128469;</div>
          <div className="maximize-btn window-btn">&#x1F5D6;</div>
          <div className="close-btn window-btn">&#x2715;</div>
        </div>
      </div>
      <div className="resize-btn"></div>
    </div>
  );
}
export default Windows;
