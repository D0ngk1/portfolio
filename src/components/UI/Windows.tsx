import "./Windows.css";
interface MyComponentProps {
  backgroundColor?:string;
}
const Windows: React.FC<MyComponentProps> = ({ backgroundColor }) => {
  return (
    <div className="main-windows" style={{ backgroundColor:backgroundColor }}>
      <div className="title"></div>
      <div className="resize-btn"></div>
    </div>
  );
}
export default Windows;
