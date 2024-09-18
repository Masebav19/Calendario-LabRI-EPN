import { useState } from 'react';
import './Panel.css'
import { MONTHNAME, MONTHLITTLENAME } from "./utils/constants";
export default function PanelInfo ({CalendarInfo, PanelInfo,SetCalendarDay}) {
    const[PSessionInfo, SetPSessionInfo] = useState({})
    function handleInfo({DayId, SessionId}) {
        const DaySelected = PanelInfo.DaysPeerMounth.find(day => day.Id === DayId)
        const SessionSelected = DaySelected.sesionInfo.find(session => session.Id === SessionId)
        SetPSessionInfo({day: DaySelected, Session: SessionSelected})
    }
    console.log(PSessionInfo)
    return(
        <div className="Panel-container">
            <h3>{`${MONTHNAME[PanelInfo.dateInfo.Mounth]}-${PanelInfo.dateInfo.Year}`}</h3>
            <section>
                    {
                        PanelInfo.DaysPeerMounth.map(day => {
                            return day.sesionInfo.map(sessionInfo => {
                                return(
                                    <>
                                        <span key={day.Id}>
                                        <small>{`${sessionInfo.Hora_inicial}-${sessionInfo.Hora_final}`}</small>
                                        <p onClick={() => handleInfo({DayId: day.Id, SessionId: sessionInfo.Id})}>{`${sessionInfo.Asunto}`}</p>
                                        <img src="../public/delete.svg" alt="Delete session"/>
                                        
                                        </span>
                                    </>
                                        
                                )
                            })
                        })
                    }
            </section>
            {PSessionInfo.day && <section>
                <article>
                    <ul>
                        <li>Asunto: {PSessionInfo.Session.Asunto}</li>
                        <li>Horario: {`${PSessionInfo.Session.Hora_inicial}-${PSessionInfo.Session.Hora_final}`}</li>
                        <li>Responsable: {PSessionInfo.Session.Responsable}</li>
                        <li>Fecha: {`${PSessionInfo.day.Date}-${MONTHLITTLENAME[PSessionInfo.day.Mounth]}-${PSessionInfo.day.Year}`}</li>
                    </ul>
                </article>
            </section>}
        </div>
    )
}