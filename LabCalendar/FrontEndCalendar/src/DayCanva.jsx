import { useEffect, useRef } from "react"

function DayCanva({sesionInfo}){
    const canvasRef = useRef(null)
    useEffect(()=>{
        if(sesionInfo){
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const container = canvas.parentElement;
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;
            canvas.style.width = `${containerWidth}px`;
            canvas.style.height = `${containerHeight}px`;
            // Ajuste de la resolución del canvas
            const scale = window.devicePixelRatio || 1;
            canvas.width = containerWidth * scale;
            canvas.height = containerHeight * scale;
            ctx.scale(scale, scale)
            sesionInfo.map(session=>{
                const InitialPos = session.Hora_inicial.split(':').map(value => {return Number(value)})
                const FinalPos = session.Hora_final.split(':').map(value => {return Number(value)})
                const InitialyTime = InitialPos[0]+InitialPos[1]/15
                const FianllyTime = FinalPos[0]+FinalPos[1]/15
                const y = (canvas.height/16)*(InitialyTime-7)
                const yf = (canvas.height/16)*(FianllyTime-7)
                const fillValue = yf-y
                ctx.fillStyle = '#09c'
                ctx.fillRect(0, y, canvas.width,fillValue);
                ctx.strokeStyle = 'white';
                ctx.strokeRect(0, y, canvas.width,fillValue);

                ctx.font = '10px';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                // Dibuja el texto dentro del rectángulo
                ctx.fillText(`${session.Asunto}`, 70, y+40);
                ctx.fillText(`Desde ${session.Hora_inicial} hasta ${session.Hora_inicial}`,60, y+55);
                ctx.fillText(`Anfitrion ${session.Responsable}`, 60, y+70);

            })
        }
        
    },[])

    return(
        <canvas ref={canvasRef}></canvas>
    )
}

export default DayCanva