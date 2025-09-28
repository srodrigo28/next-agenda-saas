"use client"

import { Button } from "@/components/ui/button";
import { TimeSloat } from "./schedule-content";
import { cn } from '@/lib/utils'
import { isSlotInThePast, isToday, isSlotSequenceAvailable } from './schedule-utils'

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

    const dateIsToday = isToday(selectedDate)

    return(
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            { availableTimeSlots.map((slot) => {

                const sequenceOK = isSlotSequenceAvailable(
                    slot.time,
                    requiredSlots,
                    empresaTimes,
                    blockedTimes
                )
                
                const slotIsPast = dateIsToday && isSlotInThePast(slot.time)

                const slotEnabled = slot.available && sequenceOK && !slotIsPast;
                
                
                return(
                    <Button 
                    key={slot.time}
                    type="button" 
                    variant="outline" 
                    onClick={ () => slotEnabled && onSelecTime(slot.time)}
                    className={cn("h-10 select-none cursor-pointer", 
                        selectedTime === slot.time && "border-2 border-emerald-400 text-white bg-emerald-500",
                        !slotEnabled && "opacity-50 cursor-not-allowed bg-red-400 text-slate-100"
                    )}
                        disabled={!slotEnabled}
                      
                    >
                        {slot.time}
                    </Button>
                )
                })
            }
        </div>
    )
}