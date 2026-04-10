import React, { useEffect, useMemo, useState } from 'react'

const CountdownTimer = ({ targetDate }) => {
  const targetMs = useMemo(() => {
    const d = targetDate instanceof Date ? targetDate : new Date(targetDate)
    return d.getTime()
  }, [targetDate])

  const getTimeLeft = () => {
    const distance = targetMs - Date.now()
    if (distance <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
      expired: false,
    }
  }

  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetMs])

  if (timeLeft.expired) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
        Deal ended
      </div>
    )
  }

  const blocks = [
    { val: timeLeft.days, label: 'DAY' },
    { val: timeLeft.hours, label: 'HRS' },
    { val: timeLeft.minutes, label: 'MIN' },
    { val: timeLeft.seconds, label: 'SEC' },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2">
      {blocks.map((item, i) => (
        <React.Fragment key={item.label}>
          {i > 0 && <span className="text-[#ff5f8f] font-bold text-lg">:</span>}
          <div className="flex min-w-[56px] flex-col items-center justify-center rounded-xl bg-gray-950 px-3 py-2 text-white">
            <span className="text-xl font-bold leading-none">
              {String(item.val).padStart(2, '0')}
            </span>
            <span className="mt-0.5 text-[10px] text-gray-400">{item.label}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default CountdownTimer