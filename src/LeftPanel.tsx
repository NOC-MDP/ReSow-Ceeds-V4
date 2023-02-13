import * as React from 'react';
import {useContext} from 'react';
import {Button,Switch,Divider,SimpleGrid,Text,Paper} from '@mantine/core';
import { IconDownload} from '@tabler/icons';
import AppContext from './AppContext';
import area from '@turf/area';
function StyleControls(props) {
  const {visibility, setVisibility,categories } = useContext(AppContext)


  const handleVisibilityChange = (e) => {
    setVisibility({...visibility, [e.target.name]: e.target.checked})
  }
  let polygonArea = 0;
  for (const polygon of props.polygons) {
    polygonArea += area(polygon);
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
      {<div>
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
            disabled
            compact 
            left 
            leftIcon={<IconDownload size={14} />} 
            variant="filled"
            
            my="5px" 
            mx="25px"
          >
            Download Data
          </Button>
        </SimpleGrid>
      </div>}
      <div>
        <Divider
            label="Polygon Info"
            labelProps={{fz:"md",fw:700}}
            labelPosition="center"
            size="lg"
            my="5px"
            mx="5px"
        />
        <SimpleGrid cols={1} verticalSpacing="5px" mx="5px">
          <div>
            <Text mx="5px">Polygon Area: {(Math.round(polygonArea/1000000))} sq km </Text>
          </div>
        </SimpleGrid>
      </div>
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
