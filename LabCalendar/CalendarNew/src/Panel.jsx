import Month from "./Month";
import './Panel.css'
import { MONTHLITTLENAME } from "./utils/constants";
export default function PanelInfo ({CalendarInfo, PanelInfo,SetCalendarDay}) {
    function handleInfo(e) {
     
    }
    return(
        <div className="Panel-container">
            {CalendarInfo !== 'Month' &&
                <Month 
                key={'Panel-calendar'}
                CalendarDay={PanelInfo}
                />
            }
            <section>
                    {
                        PanelInfo.DaysPeerMounth.map(day => {
                            return day.sesionInfo.map(sessionInfo => {
                                return(
                                    <>
                                        <span key={day.Id}>
                                        <small>{`${sessionInfo.Hora_inicial}-${sessionInfo.Hora_final}`}</small>
                                        <p onClick={handleInfo}>{`${sessionInfo.Asunto}`}</p>
                                        <img src="../public/delete.svg" alt="Delete session"/>
                                        
                                        </span>
                                    </>
                                        
                                )
                            })
                        })
                    }
            </section>
        </div>
    )
}