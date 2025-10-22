import "./Windows.css";
interface MyComponentProps {
  backgroundColor?:string;
  title?:string;
}
const Windows: React.FC<MyComponentProps> = ({ backgroundColor,title }) => {
  return (
    <div className="main-windows" style={{ backgroundColor:backgroundColor }}>
      <div className="title">{title}</div>
      <div className="resize-btn"></div>
    </div>
  );
}
export default Windows;
