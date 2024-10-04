import { IcalculateEnterprisePrice } from "@/types"

export const utils = {
    calculateEnterprisePrice: ({ eventCount, monthlyPrice, annualPrice, baseEventsLimit, eventCostPerMillion = 19, isAnnual = false }: IcalculateEnterprisePrice) => {
        // if (!enterprisePlan) return '0'

        const events = eventCount
        const basePrice = monthlyPrice
        const baseEvents = baseEventsLimit
        // const eventCostPerMillion = eventCostPerMillion || 19

        const eventsOverBase = Math.max(0, events - baseEvents)
        const extraMillions = eventsOverBase / 1_000_000
        const totalPrice = basePrice + extraMillions * eventCostPerMillion

        if (isAnnual) {
             annualPrice = totalPrice * 12 * 0.8 || annualPrice
            return `${annualPrice.toFixed(0)}`
        }

        return `${totalPrice.toFixed(0)}`
    },
    
    getNextPayDate: (isAnnual: boolean) => {
        const today = new Date();
        const nextPayDate = isAnnual 
            ? new Date(today.setFullYear(today.getFullYear() + 1)) 
            : new Date(today.setDate(today.getDate() + 30));
        return nextPayDate;
    }
}