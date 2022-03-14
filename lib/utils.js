export function sorterBoardMember(a, b) {
    let x = a.boardMemberFields.displayOrder
    let y = b.boardMemberFields.displayOrder

    if(x < y){
        return -1
    }

    return 1
}

export function sorterFundManagerBoardMember(a, b) {
    let x = a.fundManagerBoardMemberFields.displayOrder
    let y = b.fundManagerBoardMemberFields.displayOrder

    if(x < y){
        return -1
    }

    return 1
}



export function sorterDistributor(a, b) {
    let x = a.distributorFields.displayOrder
    let y = b.distributorFields.displayOrder

    if(x < y){
        return -1
    }

    return 1
}


export function sorterFAQs(a, b) {
    let x = a.faqFields?.displayOrder
    let y = b.faqFields?.displayOrder

    if(x < y){
        return -1
    }

    return 1
}


export function formatISODate(d){
    /*
    Expects Date object
     */

    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2)
}