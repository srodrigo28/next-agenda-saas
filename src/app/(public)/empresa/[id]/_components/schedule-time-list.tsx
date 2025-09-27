"use client"

import { Button } from "@/components/ui/button";
import { TimeSloat } from "./schedule-content";
import { cn } from '@/lib/utils'

interface ScheduleTimeListProps{
    selectedDate: Date;
    selectedTime: string;
    requiredSlots: number;
    blockedTimes: string[];
    empresaTimes: string[];
    onSelecTime: (time: string) => void;
    availableTimeSlots: TimeSloat[];
}

export function ScheduleTimeList( { 
    selectedDate, selectedTime,
    requiredSlots, blockedTimes, 
    empresaTimes, availableTimeSlots, onSelecTime
 } : ScheduleTimeListProps ){
    return(
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            { availableTimeSlots.map((slot) => {
                return(
                    <Button 
                    key={slot.time}
                    type="button" 
                    variant="outline" 
                    onClick={ () => onSelecTime(slot.time)}
                    className={cn("h-10 select-none cursor-pointer", 
                            selectedTime === slot.time && "border-2 border-emerald-500 text-primary")}
                    >
                        {slot.time}
                    </Button>
                )
                })
            }
        </div>
    )
}