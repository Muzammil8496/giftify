import React, { useState, useEffect } from 'react'

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now
      
      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex gap-4 text-center">
      <div className="bg-gray-900 text-white rounded-lg px-4 py-2 min-w-[70px]">
        <div className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
        <div className="text-xs">Days</div>
      </div>
      <div className="bg-gray-900 text-white rounded-lg px-4 py-2 min-w-[70px]">
        <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
        <div className="text-xs">Hours</div>
      </div>
      <div className="bg-gray-900 text-white rounded-lg px-4 py-2 min-w-[70px]">
        <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
        <div className="text-xs">Mins</div>
      </div>
      <div className="bg-gray-900 text-white rounded-lg px-4 py-2 min-w-[70px]">
        <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
        <div className="text-xs">Secs</div>
      </div>
    </div>
  )
}

export default CountdownTimer