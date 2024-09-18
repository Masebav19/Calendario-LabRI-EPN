import { DAYSNAMES } from "./utils/constants"
import DayInfo from "./DayInfo"
import './Month.css'
export default function Month ({ CalendarDay, SetExtraInfo }) {

    return(
        <>
            <div className="Month-container">
                {
                    DAYSNAMES.map(day => {
                        return(
                            <div className= "DayName"key={day}>{day}</div>
                        )
                    })
                }
                {
                   CalendarDay.DaysPeerMounth.map(dayCalendar => {
                    return(
                        <DayInfo 
                        key={`Month-${dayCalendar.Id}`}
                        dayInfo={dayCalendar}
                        dateInfo={CalendarDay.dateInfo}
                        SetExtraInfo = {SetExtraInfo}
                        />
                    )
                   })
                }
            </div>
        </>
    )
}