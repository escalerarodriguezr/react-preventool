import {useEffect, useRef} from "react";

interface ContentDescriptionProps{
    description:string|null
}
export const ContentDescription = (
    {description}:ContentDescriptionProps
) => {
    const renderDescription = useRef<any>();
    useEffect(()=>{
        if(description != null){
            renderDescription.current.innerHTML = description;
        }
    },[description])
    return(
        <>
            <div ref={renderDescription} className="mb-3"></div>
        </>
    )

}