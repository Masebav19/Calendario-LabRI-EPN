import { MONTHLITTLENAME, MONTHNAME } from "./utils/constants"
export default function DayInfo ({ dayInfo, dateInfo, SetExtraInfo }) {
    function handleExtraInfo() {
        SetExtraInfo({SessionsToShow: dayInfo.sesionInfo, DayInfo: dayInfo})
    }
    return(
        <div className="day-info-container" title={`${dayInfo.Date}-${MONTHLITTLENAME[dayInfo.Mounth]}-${dayInfo.Year}`}>
            <section className="day-info">
                <span className={dayInfo.isToday ? "Today":""}>{dayInfo.Date}</span>
                {dayInfo.Feriado === 'Ninguno' && dayInfo.Mounth === dateInfo.Mounth && <img src="../public/new_calendar.svg" alt="NewSession" title="Nueva sesión"/>}
            </section>
            {dayInfo.sesionInfo.length > 0 && dayInfo.Feriado === 'Ninguno' && 
            <section className="Session-info" onClick={() => handleExtraInfo(dayInfo.Id)}>
                <span>{dayInfo.sesionInfo.length === 1 ? dayInfo.sesionInfo[0].Asunto: `+${dayInfo.sesionInfo.length}`}</span>
            </section>
            }
            {dayInfo.Feriado !== 'Ninguno' &&
            <section className= "Holiday-info">
                <span>{dayInfo.Feriado}</span>
            </section>
            }
        </div>
    )
}