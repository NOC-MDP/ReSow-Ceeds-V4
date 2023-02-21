import * as React from 'react';
import {Text,Table,Paper,ScrollArea} from '@mantine/core';

function MetaData({Record2}){
if(Record2==null){
  return(
    <div className="meta-panel" >
    <Paper shadow="md" radius="md">
            <Text fz="lg" fw={700} ta="center" mx="5px">No Feature Selected</Text>
    </Paper>
    </div>   
  )
}
else{
  const keyValuePairs = Record2
  .reduce((pairs, obj) => [...pairs, Object.entries(obj)], [])
  .flat();
return (
    <div className="meta-panel" >
      <Paper shadow="md" radius="md" withBorder>
          <Text fz="lg" fw={700} ta="center" mx="5px">Feature Information</Text>
            <ScrollArea style={{ height: "60vh" }} type="auto">
              <Table>
                <thead>
                  {keyValuePairs.map(([key, val]) => (<tr key={key}>
                                                        <td><Text lh="1" mx="5px" mt="5px" fw={700}>{key}:</Text>
                                                            <Text mt="1px" lh="1" mx="5px"> {val}</Text>
                                                        </td>
                                                      </tr>))}    
                </thead>
              </Table>
            </ScrollArea>    
    </Paper>
    </div>
    )
}};
export default React.memo(MetaData);