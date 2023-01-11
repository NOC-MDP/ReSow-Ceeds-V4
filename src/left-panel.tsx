import * as React from 'react';
import {
  Button,
} from '@mantine/core';
import { IconInfoCircle, IconLayersSubtract, IconPlus, IconSettings, IconShape, IconTableExport } from '@tabler/icons';

function ControlPanel() {

  return (
    <div className="control-panel">
      <h2>CEEDS Tool</h2>
      <hr />
        <h3>Enable/Disable Layers</h3>
        <div className="layers">
          <p>
            <Button compact leftIcon={<IconLayersSubtract size={14} />} variant="filled" > Seagrass Distribution </Button>
          </p>
          <p>
            <Button compact leftIcon={<IconLayersSubtract size={14} />} variant="outline"> Natural Capital </Button>
          </p>
        </div>
      <hr />
      <div>
      <h3>Options</h3>
        <p>
          <Button compact leftIcon={<IconInfoCircle size={14} />} variant="filled"> Info </Button>
        </p>
        <p>
          <Button compact leftIcon={<IconShape size={14} />} variant="outline"> Select Area </Button>
        </p>
        <p>
          <Button compact leftIcon={<IconPlus size={14} />} variant="outline"> Add WMS Layer </Button>
        </p>
        <p>
          <Button compact leftIcon={<IconTableExport size={14} />} variant="outline"> Export Data</Button>
        </p>
        <p>
          <Button compact leftIcon={<IconSettings size={14} />} variant="filled"> Settings </Button>
        </p>  
      </div>
      <hr />
      <div>
        <p>
          Data source:{' '}
          <a href="http://localhost:8000/services/out">
          CEEDS mbtileserver
          </a>
      </p>
      </div>

    </div>
  );
}

export default React.memo(ControlPanel);
