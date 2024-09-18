import { DAYSNAMES } from "./utils/constants"
import DayInfo from "./DayInfo"
import './Month.css'
export default function Month ({ CalendarDay }) {

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
                        key={dayCalendar.Id}
                        dayInfo={dayCalendar}
                        dateInfo={CalendarDay.dateInfo}
                        />
                    )
                   })
                }
            </div>
        </>
    )
}