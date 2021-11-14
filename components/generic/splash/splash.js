export default function Splash( {srcFull, srcMobile=null} ){
    return (
        <div className="my-2">
            <img src={srcFull} className="w-max" />
        </div>
    )
}
