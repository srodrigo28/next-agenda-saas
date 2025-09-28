export function isToday(date: Date){
    const now = new Date();

    return(
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate()  === now.getDate()
    )
}

export function isSlotInThePast(slotTime: string){
    // 10:00
    const [slotHour, slotMinute] = slotTime.split(":").map(Number)

    const now = new Date()
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if(slotHour < currentHour) {
        return true; // TRUE A HORA JÁ PASSOU
    }else if( slotHour === currentHour && slotMinute <= currentMinute){
        return true;
    }

    return false;
}

/** Doc isSlotSequenceAvailable
 * @param startSlot  Primeiro horário disponivel
 * @param requiredSlots Quantidade de slots necessários
 * @param allSlots Todos horários da empresa
 * @param blockedSlots HOrários bloqueads
 */
export function isSlotSequenceAvailable(
    startSlot: string, //> Primeiro horário disponivel
    requiredSlots: number, //> Quantidade de slots necessários
    allSlots: string[], //> Todos horários da empresa
    blockedSlots: string[]  //> HOrários bloqueads
){

    const startIndex = allSlots.indexOf(startSlot)
    
    if(startIndex === -1 || startIndex + requiredSlots > allSlots.length) {
        return false;
    }

    for( let i = startIndex; i < startIndex + requiredSlots; i++ ) {
        const slotTime = allSlots[i]

        if(blockedSlots.includes(slotTime)){
            return false;
        }
    }

    return true;
}