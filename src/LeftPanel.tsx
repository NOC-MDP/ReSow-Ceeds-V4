import * as React from 'react';
import {useContext} from 'react';
import {Button,Switch,Divider,SimpleGrid,Text,Paper} from '@mantine/core';
import { IconInfoCircle, IconPlus} from '@tabler/icons';
import AppContext from './AppContext';

function StyleControls() {
  const {visibility, setVisibility,categories } = useContext(AppContext)

  const handleVisibilityChange = (e) => {
    setVisibility({...visibility, [e.target.name]: e.target.checked})
  }

  return (
    <div className="control-panel">
    <Paper shadow="md" radius="sm" mx="5px">
      <Text fz="xl" fw={700} ta="center" mt="5px" pt="5px" mb="1px" lh="1">CEEDS Tool</Text>
      <Text fz="md" c="dimmed" ta="center" mt="1px" lh="1">Version 4</Text>
      <Divider
        label="Layer Selection"
        labelProps={{fz:"md",fw:700}}
        labelPosition="center"
        size="lg"
        my="5px"
        mx="5px"
      />
      {categories.map(name => (
        <div key={name} className="input">
          <SimpleGrid cols={1} mx="5px">
            <div>
              <Switch
                styles={{body: {width:32}}}
                labelPosition="right" 
                size="md"
                my="5px" 
                mx="5px"
                label={name} 
                name={name}
                checked={visibility[name]} 
                onChange={handleVisibilityChange}>
              </Switch>
            </div>
          </SimpleGrid>
        </div>
      ))}
      {/* <div>
        <Divider
          label="Options"
          labelProps={{fz:"md",fw:700}}
          labelPosition="center"
          size="lg"
          my="5px"
          mx="5px"
        />
        <SimpleGrid cols={1} verticalSpacing="2px"> 
          <Button
            compact 
            left 
            leftIcon={<IconInfoCircle size={14} />} 
            variant="filled" 
            my="5px" 
            mx="25px"
          >
            Feature Info
          </Button>
          <Button
            compact
            left 
            leftIcon={<IconPlus size={14} />} 
            variant="outline" 
            my="5px" 
            mx="25px"
          >
            Add WMS
          </Button>
        </SimpleGrid>
      </div> */}
      <div>
        <Divider
          label="Sources"
          labelProps={{fz:"md",fw:700}}
          labelPosition="center"
          size="lg"
          my="5px"
          mx="5px"
        />
        <SimpleGrid cols={1} verticalSpacing="5px" mx="5px">
          <div>
            <Text mx="5px">Data:{' '} <a href="http://localhost:8000/services/out">CEEDS</a></Text>
          </div>
          <div>
            <Text mb="5px"mx="5px">Map:{' '} <a href="https://www.mapbox.com/maps">Mapbox</a></Text>
          </div>
        </SimpleGrid>
      </div>
      </Paper>
    </div>
  );
}

export default React.memo(StyleControls);
