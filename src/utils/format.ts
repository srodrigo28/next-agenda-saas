export function formatPhone(value: string){
    const cleanedValue = value.replace(/\D/g, '')

    if(cleanedValue.length > 11){
        return value.slice(0, 15)
    }

    //Aplicar a mascara
    const formattedValue = cleanedValue
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d{4,5})(\d{4})$/, '$1-$2')
    
    return formattedValue
}

export function extractPhoneNumber(phone: string){
    const phoneValue = phone.replace(/[\(\)\s-]/g, "")
    
    return phoneValue
}

export function formatCurrency(value: number | string) {
  // Garante que seja número
  const number = typeof value === "string"
    ? parseFloat(value.replace(/[^\d.-]/g, ""))
    : value

  if (isNaN(number)) return "R$ 0,00"

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

/** Convertendo valores
 * - Converte valor do campo (BRL) 
 * - @param {string} amount - para centavos
 * - @returns {number} - inteiro para gravar no campo
 * - @example convertRealToCentes("10") // return: 10000
 * - Valor em centavos = Valor em reais * 100
 * - Valor em reais = Valor em centavos / 100
 */
export function convertRealToCentes(amount: string){
  const numericPrice = parseFloat(amount.replace(/\./g, '').replace(',', '.'))
  const priceInCents = Math.round(numericPrice * 100)

  console.log(numericPrice)

  return priceInCents

}

export function formatDate(date: Date | string, showTime: boolean = false) {
  const parsedDate = typeof date === "string" ? new Date(date) : date

  if (isNaN(parsedDate.getTime())) return "Data inválida"

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...(showTime && {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }

  return parsedDate.toLocaleDateString("pt-BR", options)
}
