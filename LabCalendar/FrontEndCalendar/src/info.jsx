function Info({SessionInfo,SetDetailSession,SessionAction,SetLogStatus}){
    function handleResetInfo(){
        SetDetailSession({})
    }
    function handleDelete(){
        SessionAction.current = 'Delete'
        SetLogStatus(true)
    }
    return(
        <>
            <div className="info-button">
                <span className="Close-button" onClick={handleResetInfo}>
                    <img src="../public/close.svg" alt="Close" />
                </span>
                <span className="delete-button" onClick={handleDelete}>
                    <img src="../public/delete.svg" alt="Close" />
                </span>
            </div>
            
            <ul className="List-Session-Info">
                <li>Asunto: {SessionInfo.Asunto}</li>
                <li>Anfitrion: {SessionInfo.Responsable}</li>
                <li>Fecha de Inicio: {`${SessionInfo.Year}-${SessionInfo.Month}-${SessionInfo.Date}`}</li>
                {SessionInfo.Periodicidad !== "Ninguno" && 
                <li>Repetir: {SessionInfo.Periodicidad}</li>}
                <li>Correo anfitrio: {SessionInfo.Correo_responsable} </li>
                <li>Desde {SessionInfo.Hora_inicial} hasta {SessionInfo.Hora_final}</li>
            </ul>
        </>
    )
}

export default Info