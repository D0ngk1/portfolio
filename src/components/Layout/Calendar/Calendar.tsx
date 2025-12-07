import Windows from "@/components/UI/Windows.tsx";
import "./Calendar.css"; 
interface  CalendarProps{
  sendCloseB?: (isClose?:boolean) => void;
  sendMinz?: (isMin?:boolean) =>void;
  isMinz?:boolean;
}
const Calendar:React.FC<CalendarProps> = ({sendCloseB,sendMinz,isMinz})=> {
  const handleOnClose = (data?:boolean) => {
    sendCloseB?.(data);
  }
  const handleOnMin = (data?:boolean) => { 
    sendMinz?.(data);
  }
  return (
       <div className="calendar calendar-container" >
      <Windows  title='Calendar' hideResizeBtn={true} isMinz={isMinz} onClose={handleOnClose} onMinz={handleOnMin} disableMax={true}/>
      <div className="content">
        <h1>Coming soon!</h1>
        <h2>Under Construction</h2>
      </div>
    </div>  
  )
}
export default Calendar;
