import { useEffect, useState } from 'react'
import { fetchRequet } from './utils/requestManeger.js'
import Month from './Month.jsx'
import  PanelInfo  from './Panel.jsx'
import ExtraInfo from './ExtraInfo.jsx'
function App() {
  const [CalendarType, SetCalendarType] = useState('Month')
  const [CalendarDay, SetCalendarDay] = useState({})
  const [extraInfo, SetExtraInfo] = useState({})
  useEffect(() => {
    let Route
    if (CalendarType === 'Month') Route = 'Dayspeermounth'
    if (CalendarType === 'Week') Route = 'Dayspeerweek/7'
    fetchRequet({ReqType: 'GET', ReqRoute: Route}).then((data) => {
      SetCalendarDay(data)
    })
  },[])

  return (
    <>
    <main>
      {CalendarDay.DaysPeerMounth &&
        <PanelInfo
        CalendarInfo={CalendarType}
        PanelInfo={ CalendarDay }
        SetCalendarDay={SetCalendarDay}
        />}
      { CalendarDay.DaysPeerMounth && 
      <Month
      CalendarDay={CalendarDay}
      SetExtraInfo= {SetExtraInfo}
      />
      }

      {extraInfo.SessionsToShow && 
      <ExtraInfo
        SessionsToShow={extraInfo.SessionsToShow}
        DayInfo={extraInfo.DayInfo}
      />
      }
    </main>
      
    </>
  )
}

export default App
