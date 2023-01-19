import * as React from 'react';
import {useContext} from 'react';
import {Button,Switch,Divider,SimpleGrid,Text} from '@mantine/core';
import { IconInfoCircle, IconPlus} from '@tabler/icons';
import AppContext from './AppContext';

function StyleControls() {
  const { color, setColor, visibility, setVisibility,categories } = useContext(AppContext)

  const handleVisibilityChange = (e) => {
    setVisibility({...visibility, [e.target.name]: e.target.checked})
  }

  const handleColorChange = (e) => {
    setColor({...color, [e.target.name]: e.target.checked})
  }

  return (
    <div className="control-panel">
      <Text fz="xl" fw={700} ta="center">CEEDS Tool Version 4</Text>
      <Divider
        label="Enable/Disable Layers"
        labelProps={{fz:"md",fw:700}}
        labelPosition="center"
        size="lg"
        my="5px"
      />
      {categories.map(name => (
        <div key={name} className="input">
          <SimpleGrid cols={2}>
            <div>
              <Switch
                styles={{body: {width:32}}}
                labelPosition="right" 
                size="md"
                my="5px" 
                label={name} 
                name={name}
                checked={visibility[name]} 
                onChange={handleVisibilityChange}>
              </Switch>
            </div>
            <div>
              <input
                type="color"
                value={color[name]}
                disabled={!visibility[name]}
                name={name}
                onChange={handleColorChange}
              />
            </div>
          </SimpleGrid>
        </div>
      ))}
      <div>
        <Divider
          label="Options"
          labelProps={{fz:"md",fw:700}}
          labelPosition="center"
          size="lg"
          my="5px"
        />
        <SimpleGrid cols={2} verticalSpacing="2px"> 
          <Button
            compact 
            left 
            leftIcon={<IconInfoCircle size={14} />} 
            variant="filled" 
            my="2px" 
            mx="2px"
          >
            Feature Info
          </Button>
          <Button
            compact
            left 
            leftIcon={<IconPlus size={14} />} 
            variant="outline" 
            my="2px" 
            mx="2px"
          >
            Add WMS
          </Button>
        </SimpleGrid>
      </div>
      <div>
        <Divider
          label="Sources"
          labelProps={{fz:"md",fw:700}}
          labelPosition="center"
          size="lg"
          my="5px"
        />
        <SimpleGrid cols={1} verticalSpacing="2px">
          <div>
            Seagrass source:{' '} <a href="http://localhost:8000/services/out">CEEDS mbtileserver</a>
          </div>
          <div>
            Map source:{' '} <a href="https://www.mapbox.com/maps">Mapbox Streets</a>
          </div>
        </SimpleGrid>
      </div>
    </div>
  );
}

export default React.memo(StyleControls);
