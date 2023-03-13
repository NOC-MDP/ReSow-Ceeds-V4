import * as React from 'react';
import {Image} from '@mantine/core'

function Legend({show}){
    if(show!=null){
    return(
        <div className="legend-panel">
            <Image maw={240} 
                   mx={"Auto"} 
                   radius={"md"}
                   height={400} 
                   fit="contain"
                   src={"../assets/".concat(show)}/>
        </div>
    )
}}
export default React.memo(Legend);