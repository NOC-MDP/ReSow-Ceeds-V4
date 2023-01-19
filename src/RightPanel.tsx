import * as React from 'react';
import {Text,Table,Card} from '@mantine/core';

function MetaData({Record2}){
if(Record2==null){
  return(
    <div className="meta-panel" >

    </div>   
  )
}
else{
  const keyValuePairs = Record2
  .reduce((pairs, obj) => [...pairs, Object.entries(obj)], [])
  .flat();
return (
    <div className="meta-panel" >
      
    </div>
    )
}};
export default React.memo(MetaData);