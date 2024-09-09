import { useState, useRef } from "react"
import ShowContent from './showContent.jsx'
import DayCanva  from './DayCanva.jsx'
const DaysNames =["Hora","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]
const MounthName = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
const times = length => Array.from({length},(_,i)=>i)

const  ReturnWeekCalendar=({daysPeerMounth,dateInfo,SetDetailSession,SetLogStatus,SessionData,SessionAction}) => {
    const[showContent,SetshowContent]=useState(false)
    const content = useRef({})
    function GetContent(Id){
      const NewContent = daysPeerMounth.find(element => element.Id === Id)
      content.current = NewContent
      SetshowContent(true)
    }
  
    function handleLog(Id){
      const {Year, Mounth, Date, sesionInfo}= daysPeerMounth.find(element => element.Id === Id)
      SessionData.current = {Year, Mounth, Date, sesionInfo}
      SessionAction.current = 'Create'
      SetLogStatus(true)
    }
    return(
      <>
      <nav className='Calendar'>
        <div className="DayNames-container">
            <div className="info-Calendar">
              <header>{''.concat(MounthName[dateInfo.Mounth],' de ',dateInfo.Year)}</header>
              </div>
              
            <div className="info-Calendar">
            {
                DaysNames.map(dayName =>{
                  return(
                    <span
                    key={dayName}>
                      {dayName}
                    </span>
                  )
                })
              }
            </div>
        </div>
        <div className="weekCalendar-container">
            <span className="day-week-container">
                {
                    times(16).map(i =>{
                        return times(4).map(k=>{
                            return(
                                <div className="nav-conatiner week">
                                    <span 
                                    className='Date-Info'
                                    key={`${7+i}:${(15*k).toString().padStart(2,'0')}`}>
                                        <small>
                                            {`${7+i}:${(15*k).toString().padStart(2,'0')}`}
                                        </small>
                                    </span>
                                </div>
                                

                            )
                        })
                    })
                }  
            </span>
          {
            daysPeerMounth.map(day =>{
              return(
                <>
                  <span
                    className="day-week-container"
                    key={day.Id+'-week'}
                    style={day.isToday ? {background: '#0099cc44'}:{}} title={`${day.Date} de ${MounthName[day.Mounth]} del ${day.Year}`}
                    onClick={() => GetContent(day.Id)}>
                    <nav 
                      key={''.concat(day.Id,'-Nav')}
                      className='Add-Session week'
                      onClick={()=>handleLog(day.Id)}
                      hidden={day.Feriado!=="Ninguno" || day.Mounth!==dateInfo.Mounth}
                      style= {{position: "absolute"}}>
                        <span>{`${day.Date}-${MounthName[day.Mounth]}`}</span>
                      <img 
                      key={''.concat(day.Id,'-img')}
                      src="./public/new_calendar.svg" alt="Nuevo" />
                    </nav>
                    <DayCanva 
                    sesionInfo= {day.sesionInfo}
                    />
                  </span>
                </> 
              )
            })
          }
        </div>
      </nav>
      {showContent && <ShowContent
      SetshowContent= {SetshowContent}
      content = {content.current}
      />}
      </> 
    )
}

export default ReturnWeekCalendar