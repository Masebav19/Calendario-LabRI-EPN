import { useEffect, useState, useRef } from 'react'
import Info from './info.jsx'
import LogPage from './LogPage.jsx'
import CreateSession from './createSession.jsx'
import DeleteSession from './deleteSession.jsx'
import ReturnCalendar from './Month.jsx'
import ReturnWeekCalendar from './Week.jsx'
import LittleWeek from './LittleWeek.jsx'

async function handleRequest(calendarType,ReqType,Data) {
  const RouteType = calendarType === "Month" ? 'Dayspeermounth':calendarType === "week7"?'Dayspeerweek/7':'Dayspeerweek/3'
  if(ReqType === 'GET'){
    const result = await fetch(`http://172.31.36.30:4001/time/${RouteType}`)
    const data = await result.json()
    return data
  }else{
    const result = await fetch(`http://172.31.36.30:4001/time/${RouteType}`,{
      method: ReqType,
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(Data)
    })
    const data = await result.json()
    return data
  }
  
}
function App() {
  const [DetailSession, SetDetailSession] = useState({})
  const [daysPeerMounth,SetDayPeerMounth] = useState(undefined)
  const [LogStatus,SetLogStatus] = useState(false)
  const [LogUser,SetLogUser] = useState({})
  const [TypeCalendar,SetTypeCalendar] = useState('Month')
  const dateInfo = useRef(undefined)
  const SessionData = useRef({})
  const SessionAction = useRef('')

  useEffect(() => {
    handleRequest(TypeCalendar,'GET',{}).then(data => {
      if(TypeCalendar === 'Month') {
        SetDayPeerMounth(data.DaysPeerMounth)
      } else{
        SetDayPeerMounth(data.DaysPeerWeek)
      }
      dateInfo.current=data.dateInfo
    })
  },[])
  useEffect(() => {
      handleRequest(TypeCalendar,'GET',{}).then(data => {
        if(TypeCalendar === 'Month') {
          SetDayPeerMounth(data.DaysPeerMounth)
        } else{
          SetDayPeerMounth(data.DaysPeerWeek)
        }
        dateInfo.current=data.dateInfo
      })   
  },[LogStatus])
  function HandleBack(){
      const Index = TypeCalendar === 'Month' ? (daysPeerMounth.length/2).toFixed(0): 0
      const year = daysPeerMounth[Index].Year
      const mount= daysPeerMounth[Index].Mounth
      const date = daysPeerMounth[Index].Date
      handleRequest(TypeCalendar,'POST',{year,mount,date,action:'Back'}).then(data => {
        if(TypeCalendar === 'Month') {
          SetDayPeerMounth(data.DaysPeerMounth)
        } else{
          SetDayPeerMounth(data.DaysPeerWeek)
        }
        dateInfo.current=data.dateInfo
      })
  }

  function HandleForward(){
    const Index = TypeCalendar === 'Month' ? (daysPeerMounth.length/2).toFixed(0): 0
    const year = daysPeerMounth[Index].Year
    const mount= daysPeerMounth[Index].Mounth
    const date = daysPeerMounth[Index].Date
    handleRequest(TypeCalendar,'POST',{year,mount,date,action:'Fordward'}).then(data => {
      if(TypeCalendar === 'Month') {
        SetDayPeerMounth(data.DaysPeerMounth)
      } else{
        SetDayPeerMounth(data.DaysPeerWeek)
      }
      dateInfo.current=data.dateInfo
    })
  }

  function handleChangeMonth(){
    if (TypeCalendar !== 'Month') {
      handleRequest('Month','GET',{}).then(data =>{
        dateInfo.current=data.dateInfo
        SetDayPeerMounth(data.DaysPeerMounth)
        SetTypeCalendar('Month')
      })
    }
  }
  function handleChangeWeek7(){
    if (TypeCalendar !== 'week7') {
      handleRequest('week7','GET',{}).then(data =>{
        dateInfo.current=data.dateInfo
        SetDayPeerMounth(data.DaysPeerWeek)
        SetTypeCalendar('week7')
      })
    }
  }
  function handleChangeWeek3(){
    if (TypeCalendar !== 'week3') {
      handleRequest('week3','GET',{}).then(data =>{
        dateInfo.current=data.dateInfo
        SetDayPeerMounth(data.DaysPeerWeek)
        SetTypeCalendar('week3')
      })
    }
  }
  function handleHome(){
    window.location.replace("http://172.31.36.30:5000")
  }
  
  return (
    <>
      <span className='Calendar-container'>
        <section className='Nav-calendar-type'>
          <nav className='calendar-type-option' onClick={handleChangeMonth}>
            <img src="./public/calendar.svg" alt="Mes" />
            <span>Mes</span>
          </nav>
          <nav className='calendar-type-option' onClick={handleChangeWeek7}>
            <img src="./public/week.svg" alt="7 Días" />
            <span>7 Días</span>
          </nav>

          <nav className='calendar-type-option' onClick={handleChangeWeek3}>
            <img src="./public/little_week.svg" alt="3 días" />
            <span>3 Días</span>
          </nav>
        </section>
          <section className='Return-date' onClick={HandleBack}>
            <img src="./public/arrow_back.svg" alt="Back" />
          </section>
          {daysPeerMounth && TypeCalendar === 'Month' && <ReturnCalendar 
          daysPeerMounth ={daysPeerMounth}
          dateInfo = {dateInfo.current}
          SetDetailSession = {SetDetailSession}
          SetLogStatus= {SetLogStatus}
          SessionData={SessionData}
          SessionAction={SessionAction}
          />}
          {daysPeerMounth && TypeCalendar === 'week7' && <ReturnWeekCalendar 
          daysPeerMounth ={daysPeerMounth}
          dateInfo = {dateInfo.current}
          SetDetailSession = {SetDetailSession}
          SetLogStatus= {SetLogStatus}
          SessionData={SessionData}
          SessionAction={SessionAction}
          />}
          {daysPeerMounth && TypeCalendar === 'week3' && <LittleWeek 
          daysPeerMounth ={daysPeerMounth}
          dateInfo = {dateInfo.current}
          SetDetailSession = {SetDetailSession}
          SetLogStatus= {SetLogStatus}
          SessionData={SessionData}
          SessionAction={SessionAction}
          />}
          <section className='Next-Date'onClick={HandleForward}>
            <img src="./public/arrow_forward.svg" alt="Forward" />
          </section>
          
        </span>
        <section
          className='Session-Info'
          key={''.concat(DetailSession.Id,'-','Details')}>
            {DetailSession.Year && <Info
            SessionInfo = {DetailSession}
            SetDetailSession = {SetDetailSession}
            SessionAction={SessionAction}
            SetLogStatus= {SetLogStatus}
            />}
        </section> 
        {LogStatus && !(LogUser.User) ? 
          <LogPage
          SetLogUser= {SetLogUser}
          SetLogStatus={SetLogStatus}
          /> : (LogStatus && LogUser.User && SessionAction.current === 'Create') ? <CreateSession
          LogUser= {LogUser}
          SetLogStatus={SetLogStatus}
          SetLogUser= {SetLogUser}
          SessionData={SessionData}
          SetDayPeerMounth={SetDayPeerMounth}
          />: (LogStatus && LogUser.User && SessionAction.current === 'Delete') && <DeleteSession
          LogUser= {LogUser}
          SetLogStatus={SetLogStatus}
          SetLogUser= {SetLogUser}
          SetDetailSession={SetDetailSession}
          SetDayPeerMounth={SetDayPeerMounth}
          SessionInfo = {DetailSession}
          />}
        <div className="return-home container" onClick={handleHome}>
          <img src="./public/home.svg" alt="Home" />
          <span>Home</span>
        </div>  
    </>
  )
}

export default App
