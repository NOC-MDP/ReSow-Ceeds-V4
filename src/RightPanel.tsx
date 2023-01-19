import * as React from 'react';
import {Text,Table,Card} from '@mantine/core';

function MetaData({Record2}){
if(Record2==null){
  return(
    <div className="meta-panel" >
    <Card shadow="md" radius="sm">
      <Card.Section>
        <Text fz="lg" fw={700} ta="center" mx="5px">No Feature Selected</Text>
      </Card.Section>
    </Card>
    </div>   
  )
}
else{
  const keyValuePairs = Record2
  .reduce((pairs, obj) => [...pairs, Object.entries(obj)], [])
  .flat();
return (
    <div className="meta-panel" >
      <Card shadow="md" radius="sm" withBorder>
        <Card.Section>
          <Text fz="lg" fw={700} ta="center" mx="5px">Feature Information</Text> 
          <Table>
            {keyValuePairs.map(([key, val]) => (<tr key={key}><td >{<Text lh="1" mx="5px" mt="5px" fw={700}>{key}:</Text>}<Text mt="1px" lh="1" mx="5px"> {val}</Text></td></tr>))}    
          </Table>
        </Card.Section>
    </Card>
    </div>
    )
}};
export default React.memo(MetaData);