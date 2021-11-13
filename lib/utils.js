export function sorterBoardMember(a, b) {
    let x = a.boardMemberFields.displayOrder
    let y = b.boardMemberFields.displayOrder

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
