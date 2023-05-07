import { useEffect, useState } from 'react'

function Countdown(props) {
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    const getTimeUntil = (deadline) => {
        const time = Date.parse(deadline) - Date.parse(new Date());
        setSeconds(Math.floor((time/1000) % 60));
        setMinutes(Math.floor((time/1000/60) % 60));
        setHours(Math.floor((time/(1000*60*60)% 24)));
        setDays(Math.floor((time/(1000*60*60*24))));
    }

    useEffect(() => {
        getTimeUntil(props.deadline);
    });

    useEffect(() => {
        setInterval(() => getTimeUntil(props.deadline), 1000)
    }, [props.deadline]);

    const leading0 = (num) => {
        if (num < 0) {
            return '00'
        } else {
            return num < 10 ? '0' + num : num
        } 
    }

return (
    <div className="cd" align="right">
        <span className="cd_days">{leading0(days)} 日 &nbsp;</span>
        <span className="cd_hours">{leading0(hours)} 小時 &nbsp;</span>
        <span className="cd_minutes">{leading0(minutes)} 分鐘 &nbsp;</span>
        <span className="cd_seconds">{leading0(seconds)} 秒</span>
    </div>
    )
}

export default Countdown