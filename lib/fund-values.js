function compareDates(a, b) {
    const dateA = new Date(a[0])
    const dateB = new Date(b[0])

    if(dateA < dateB){
        return -1
    }
    return 1
}

export function processFundValues(list, fund) {
    if(list.length === 0 || !fund){
        return []
    }

    let result = []

    for(let i = 0; i < list.length; i++){
        if(list[i]["fundValueFields"][fund]){
            result.push(
                [list[i]["fundValueFields"].date, list[i]["fundValueFields"][fund]]
            )
        }
    }
    result.sort(compareDates)
    return result

}
