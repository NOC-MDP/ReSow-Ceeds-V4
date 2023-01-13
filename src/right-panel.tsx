import * as React from 'react';
import {Text} from '@mantine/core';

function MetaData(){

return (
    <div className="meta-panel">
      <Text fz="lg" fw={700} ta="center">Feature Data appears here</Text>
    </div>)
};
export default React.memo(MetaData);