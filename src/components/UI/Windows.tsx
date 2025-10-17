import "./Windows.css";
interface MyComponentProps {
  backgroundColor?:string;
}
const Windows: React.FC<MyComponentProps> = ({ backgroundColor }) => {
  return (
    <div className="main-windows" style={{ backgroundColor:backgroundColor }}>
      <div className="pane"></div>

    </div>
  );
}
export default Windows;
