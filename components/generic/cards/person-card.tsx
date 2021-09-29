type PersonCardData = {
    name: string,
    position: string,
    imgFull: string,
    imgMobile: string,
    url: string,
    content: string
}

export default function PersonCard(personData:PersonCardData) {
    let img = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    let content = "Nunc id cursus metus aliquam eleifend. Sit amet venenatis urna cursus eget. Bibendum neque egestas congue quisque egestas diam."
    if(personData.imgFull){
       img = personData.imgFull
    }
    if(personData.content){
        content = personData.content
    }
    return (
        <>
            <div
                className="w-full flex flex-row flex-wrap p-3 antialiased">
                <div className="md:w-1/6 w-full">
                    <img className="antialiased"
                         src={img} />
                </div>
                <div className="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
                    <div
                        className="w-full text-gray-700 font-semibold relative pt-3 md:pt-0">
                        <h3 className="text-right leading-tight">{personData.name}</h3>
                        <h4 className="text-normal text-right  text-gray-300">
                                            <span
                                                className="border-b border-dashed border-gray-500 pb-1">{personData.position}</span>
                        </h4>

                        <p className="my-3 font-normal">{content}</p>

                    </div>
                </div>
            </div>
        </>
    )
}
