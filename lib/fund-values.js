function compareDates(a, b) {
    const dateA = new Date(a[0])
    const dateB = new Date(b[0])

    if(dateA < dateB){
        return -1
    }
    return 1
}

function loadExistingFundValues(fund) {
    const data = require('./data.json')
    let fundValues = []
    if(data[fund]){
        fundValues = data[fund]
    }
    return fundValues
}

export function processFundValues(list, fund) {
    if(list.length === 0 || !fund){
        return []
    }

    let result = loadExistingFundValues(fund)

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
