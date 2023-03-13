import * as React from 'react';
import {Image} from '@mantine/core'

function Legend({show}){
    if(show){
    return(
        <div className="legend-panel">
            <Image maw={240} 
                   mx={"Auto"} 
                   radius={"md"}
                   height={400} 
                   fit="contain"
                   src={"../assets/gebco_depth_colour_key_vertical.jpg"}/>
        </div>
    )
}}
export default React.memo(Legend);