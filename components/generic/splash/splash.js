export default function Splash({srcFull, srcMobile = null}) {
    return (
        <>
            {srcFull ? (
                <div className="my-2">
                    <img src={srcFull} className="w-max"/>
                </div>
            ) : ""}
        </>
    )
}
