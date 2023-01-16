import * as React from 'react';
import {Text,Table} from '@mantine/core';

function MetaData({Record2}){
if(Record2==null){
  return(
    <div className="meta-panel">
      <Text fz="lg" fw={700} ta="center">No Feature Selected</Text> 
    </div>
  )
}
else{
  const keyValuePairs = Record2
  .reduce((pairs, obj) => [...pairs, Object.entries(obj)], [])
  .flat();
return (
    <div className="meta-panel">
      <Text fz="lg" fw={700} ta="center">Feature Information</Text> 
      <Table>
        <thead>
          {keyValuePairs.map(([key, val]) => (<tr key={key}><td>{<Text fw={700}>{key}:</Text>} {val}</td></tr>))}    
        </thead>
    </Table>
    </div>)
}};
export default React.memo(MetaData);