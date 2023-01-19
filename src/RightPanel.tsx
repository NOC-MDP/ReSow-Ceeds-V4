import * as React from 'react';
import {Text,Table,Card} from '@mantine/core';

function MetaData({Record2}){
if(Record2==null){
  return(
    <div className="meta-panel" >
    <Card shadow="md" radius="md" withBorder>
      <Card.Section>
        <Text fz="lg" fw={700} ta="center">No Feature Selected</Text>
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
      <Card shadow="md" radius="md" withBorder>
        <Card.Section>
          <Text fz="lg" fw={700} ta="center">Feature Information</Text> 
          <Table verticalSpacing="xs">
            <thead>
            {keyValuePairs.map(([key, val]) => (<tr key={key}><td>{<Text fw={700}>{key}:</Text>}<Text> {val}</Text></td></tr>))}    
            </thead>
          </Table>
        </Card.Section>
    </Card>
    </div>
    )
}};
export default React.memo(MetaData);