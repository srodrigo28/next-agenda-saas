"use client"

import { useState } from "react"

export default function Test() {
  const [selectedHours, setSelectedHours] = useState<string[]>([])

  function toggleHour(hour: string) {
    setSelectedHours((prev) =>
      prev.includes(hour)
        ? prev.filter((h) => h !== hour)
        : [...prev, hour].sort()
    )
  }

  function generateTimeSlots(): string[] {
    const hours: string[] = []
    for (let i = 8; i < 24; i++) {
      for (let j = 0; j < 2; j++) {
        const hour = i.toString().padStart(2, "0")
        const minute = (j * 30).toString().padStart(2, "0")
        hours.push(`${hour}:${minute}`)
      }
    }
    return hours
  }

  const hours = generateTimeSlots()

  return (
    <div>
      <div className="px-10 bg-amber-200 flex items-center justify-center">
        <section className="py-4">
          <p className="mb-6 text-3xl font-bold">Selecionar os horários</p>
          <div className="grid grid-cols-5 gap-2 md:w-96 pb-3">
            {hours.map((hour) => {
              const isSelected = selectedHours.includes(hour)
              const baseClass =
                "border-2 border-green-500 cursor-pointer rounded-sm px-3 md:w-16"
              const selectedClass = isSelected ? "bg-green-500 text-white" : ""
              return (
                <button
                  key={hour}
                  onClick={() => toggleHour(hour)}
                  className={`${baseClass} ${selectedClass}`}
                >
                  {hour}
                </button>
              )
            })}
          </div>
          <button className="rounded w-full md:w-96 font-bold bg-green-600 text-white p-2 px-3">
            Concluir
          </button>
        </section>
      </div>
    </div>
  )
}
