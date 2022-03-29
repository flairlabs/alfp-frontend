require('datejs')

function compareDates(a, b) {
    const dateA = new Date(a[0])
    const dateB = new Date(b[0])

    if(dateA < dateB){
        return -1
    }
    return 1
}

function loadExistingFundValues(fund) {
    const data = require('./historical-data/2022-03-29.json')
    let __fundValues = []
    let fundValues = []
    if(data[fund]){
        __fundValues = data[fund]
    }
    for(let i = 0; i < __fundValues.length; i++){
        let fv = __fundValues[i]
        let d = Date.parse(fv[0], "yyyy-dd-MM")

        fundValues.push(
            [d, fv[1]]
        )
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
            let d = list[i]["fundValueFields"].date
            let __d = Date.parse(d, "yyyy-dd-MM")
            result.push(
                [__d, list[i]["fundValueFields"][fund]]
            )
        }
    }
    result.sort(compareDates)
    return result

}
