export default function Splash( {srcFull, srcMobile=null} ){
    return (
        <div className="sm:py-2 md:py-4">
            <img src={srcFull} className="w-max" />
        </div>
    )
}
