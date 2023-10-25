import {useEffect, useRef} from "react";

interface ActivityDescriptionProps{
    activityDescription:string|null
}
export const ActivityDescription = ({activityDescription}:ActivityDescriptionProps) => {
    const renderDescription = useRef<any>();
    useEffect(()=>{
        if(activityDescription != null){
            renderDescription.current.innerHTML = activityDescription;
        }
    },[activityDescription])
    return(
        <>
            <div ref={renderDescription} className="mb-3"></div>
        </>
    )
}