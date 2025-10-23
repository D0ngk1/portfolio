import "./Windows.css";
interface MyComponentProps {
  title?:string;
}
const Windows: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <div className="main-windows blur-bg">
      <div className="title blur-bg">{title}</div>
      <div className="resize-btn"></div>
    </div>
  );
}
export default Windows;
