
export default function ExtraInfo({ SessionsToShow, DayInfo }) {
    return(
        <section>
            {
                SessionsToShow.map(session => {
                    return(
                        <div key={DayInfo.Id} className="extrainfo-container">
                            <span key={`ExtraInfo-${DayInfo.Id}`}>
                                <div><small>{DayInfo.Date}</small></div>
                                <p>{`${session.Asunto}`}</p>
                                <img src="../public/plus.svg" alt="Delete session"/>
                            </span>
                        </div>

                    )
                })
            }
        </section>
    )
}