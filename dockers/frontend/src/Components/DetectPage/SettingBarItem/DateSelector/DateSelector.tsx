import './DateSelector.css'
import { v4 as uuidv4 } from 'uuid';


interface ChildProps {
  onDateSelectFunc: (param: number) => void;
  dateProps: number
}

const DateSelector: React.FC<ChildProps> = ({ dateProps, onDateSelectFunc }) => {
  const initDateListArr: number[] = Array.from({ length: 30 }, (_, index) => index + 1);

  return (
    <div>
      <div className="dateContainer" >
        {initDateListArr.map((date) => (
          <div
            key={"date" + uuidv4()}
            className={date === dateProps ? 'dateSelected' : 'dateItem'}
            onClick={() => onDateSelectFunc(date)}
          >
            {date}
          </div>
        ))}
      </div>
    </div>

  );
}



export default DateSelector