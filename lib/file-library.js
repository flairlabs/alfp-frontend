function compare(a, b) {
    if (!a.fileLibraryTaxonomyFields.order) {
        return -1;
    }
    if (!b.fileLibraryTaxonomyFields.order) {
        return 1;
    }
    if (a.fileLibraryTaxonomyFields.order < b.fileLibraryTaxonomyFields.order)
        return -1;
    if (a.fileLibraryTaxonomyFields.order > b.fileLibraryTaxonomyFields.order)
        return 1;
    return 0;
}

export function prepFileLibraryItemGroups(fileLibraryItems) {
    let nodes;
    nodes = fileLibraryItems.sort(compare);
    return nodes
}

export function getFundFactSheets(items) {
    let result = []
    for (let i = 0; i < items.length; i++) {
        if (items[i].slug === "fund-fact-sheet") {
            result = items[i].fileLibraryItems.nodes
        }
    }
    return result
}

export function filterFundFactSheet(items, year = "", month = "", fund = "") {
    let filterFund = fund !== ""
    let filterMonth = month !== ""
    let filterYear = year !== ""
    let result = []

    if (!filterFund && !filterYear && !filterMonth) {
        return items
    }

    for (let i = 0; i < items.length; i++) {
        let candidate = items[i]
        let candidateFound = false
        if (filterYear) {
            candidateFound = candidate.fileLibraryItem.year.toString() === year.toString();
        }
        if (filterMonth) {
            candidateFound = candidate.fileLibraryItem.month.toString() === month.toString();
        }
        if (filterFund) {
            let f = candidate.fileLibraryItem.fund
            if (f && f.length > 0) {
                candidateFound = f[0].id === fund;
            }
        }

        if (candidateFound) {
            result.push(candidate)
        }
    }

    return result
}

export function filterAnnualReport(items, year = "") {
    let filterYear = year !== ""
    let result = []

    if (!filterYear) {
        return items
    }

    for (let i = 0; i < items.length; i++) {
        let candidate = items[i]

        if (candidate.fileLibraryItem.year.toString() === year.toString()) {
            result.push(candidate)
        }
    }
    return result
}

export function filterAnnualGeneralMeeting(items, year, fund) {
    let filterFund = fund !== ""
    let filterYear = year !== ""
    let result = []

    if (!filterFund && !filterYear) {
        return items
    }

    for (let i = 0; i < items.length; i++) {
        let candidate = items[i]
        let candidateFound = false
        if (filterYear) {
            candidateFound = candidate.fileLibraryItem.year.toString() === year.toString();
        }
        if (filterFund) {
            let f = candidate.fileLibraryItem.fund
            if (f && f.length > 0) {
                candidateFound = f[0].id === fund;
            }
        }

        if (candidateFound) {
            result.push(candidate)
        }
    }

    return result
}


export function prepOtherFiles(items) {
    let untagged = []

    let years = {}
    for(let i = 0; i < items.length; i++){

        let item = items[i]
        let meta = item?.fileLibraryItem

        if(meta){
            if(meta.year){
                let y = meta.year
                let m = meta?.month
                if(years[y]){
                    if(m){
                        if(years[y][m]){
                            years[y][m].push(item)
                        }else{
                            years[y][m] = [item]
                        }
                    }else{
                        if(years[y]["untagged"]){
                            years[y]["untagged"].push(item)
                        }else{
                            years[y]["untagged"] = [item]
                        }

                    }
                }else{
                    if(m){
                        years[y] = []
                        years[y][m] = [item]
                    }else{
                        years[y] = {
                            "untagged": [item]
                        }
                    }
                }
            }else{
                untagged.push(item)
            }
        }

    }
    const result = {
        untagged: untagged,
        byYear: years
    }
    return result
}
