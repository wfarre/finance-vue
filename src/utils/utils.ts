export const formatMoneyAmount = (amount:number):string => {
    const stringAmount = String(amount)
    if(stringAmount.includes("-")){
        return "-$"+stringAmount.split("-")[1]
    }
    return "+$"+stringAmount
}

export const formatDate = (date:string):string => {
    const getDate = new Date(date)
    return getDate.toLocaleDateString("en-US", {
        day:"numeric",
        month:"short",
        year:'numeric'
    });
    
}