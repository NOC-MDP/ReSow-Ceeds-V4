import * as React from 'react';
import {useContext} from 'react';
import {Button, 
        Switch, 
        Divider, 
        SimpleGrid, 
        Text, 
        Paper, 
        Tabs, 
        Space,
        Accordion} from '@mantine/core';
import {IconDownload, IconBook} from '@tabler/icons';
import AppContext from './AppContext';
import {ExportToCsv} from 'export-to-csv';

/**
 * @param csventries
 * @constructor 
 * This function will create a CSV file from the csv entries array passed to it
 * Get the current datetime and add that as a title and generate a CSV file
 * 
 */
function Download(csventries){
  var currentdate = new Date();
  var datetime = String(currentdate.getDate()).padStart(2,'0')  + "/"
      + String(currentdate.getMonth()+1).padStart(2,'0')  + "/"
      + String(currentdate.getFullYear()).padStart(4,'0')  + " at "
      + String(currentdate.getHours()).padStart(2,'0')  + ":"
      + String(currentdate.getMinutes()).padStart(2,'0')  + ":"
      + String(currentdate.getSeconds()).padStart(2,'0') ;
    if(csventries == null){
      alert("No Features Selected")
      return}
  const options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'CEEDS Seagrass Data Downloaded on '+datetime,
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };

  const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(csventries);
}

function StyleControls(props) {
  const {visibility, setVisibility,datcats,layercats } = useContext(AppContext)
  const handleVisibilityChange = (e) => {
    setVisibility({...visibility, [e.target.name]: e.target.checked})
  }
  const featureSel = props.csvleng
  
  return (
    <div className="control-panel">
    <Paper shadow="md" radius="sm" mx="5px">
      <Text fz="xl" fw={700} ta="center" mt="5px" pt="5px" mb="1px" lh="1">CEEDS Tool</Text>
      <Text fz="md" c="dimmed" ta="center" mt="1px" lh="1">Version 4.2</Text>
      <Tabs defaultValue="Data Layers">
        <Tabs.List>
          <Tabs.Tab value="Data Layers"> <Text fz="sm" fw={700} ta="center" mt="5px" pt="5px" mb="1px" lh="1">Data Layers</Text> </Tabs.Tab>
          <Tabs.Tab value="Map Layers"> <Text fz="sm" fw={700} ta="center" mt="5px" pt="5px" mb="1px" lh="1">Map Layers</Text> </Tabs.Tab>
        </Tabs.List>
      <Tabs.Panel value="Data Layers">
        <Space size="lg" my="10px" mx="5px"/>
          {datcats.map(name => (
          <div key={name} className="input">
            <SimpleGrid cols={1}>
            <div>
              {
                props.downloadable.includes(name) && <Switch
                labelPosition="right" 
                size="md"
                my="5px" 
                mx="5px"
                label={name}
                onLabel={<IconDownload size={14}/>}
                name={name}
                checked={visibility[name]} 
                onChange={handleVisibilityChange}>
              </Switch>
              }
              {
                  !props.downloadable.includes(name) && <Switch
                      labelPosition="right"
                      size="md"
                      my="5px"
                      mx="5px"
                      label={name}
                      name={name}
                      checked={visibility[name]}
                      onChange={handleVisibilityChange}>
                  </Switch>
              }
            </div>
            </SimpleGrid>
        </div>
      ))}
      <div>
        <Accordion
            variant="filled"
            radius="md"
            children={undefined} >
          <Accordion.Item value="Download">
            <Accordion.Control icon={<IconDownload/>}>
              <Text fz="sm" fw="700">Download Data</Text>
            </Accordion.Control>
            <Accordion.Panel>
        <SimpleGrid cols={1} verticalSpacing="2px">
          <Text fz="sm" mx="10px" ta="center">Features in polygon: {featureSel}</Text>
          <Button
            onClick={()=> Download(props.csventries)}  
            disabled={featureSel<1}
            leftIcon={<IconDownload size={14} />} 
            variant="filled"
            radius="md"
            my="5px" 
            mx="5px"
            size="xs">
            Download
          </Button>
        </SimpleGrid>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
      <div>
        <Accordion
            variant="filled"
            radius="md"
            children={undefined} >
          <Accordion.Item value="Sources">
            <Accordion.Control icon={<IconBook/>}>
              <Text fz="sm" fw="700">Sources</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <SimpleGrid cols={1} verticalSpacing="5px" mx="5px">
                <div>
                  <Text>Source code:{' '} <a href="https://github.com/NOC-MDP/ReSow-Ceeds-V4">Github</a></Text>
                </div>
                <div>
                  <Text>Source data:{' '} <a href="https://139.166.145.156/services/out">CEEDS</a></Text>
                </div>
                <div>
                  <Text>Map source:{' '} <a href="https://www.mapbox.com/maps">Mapbox</a></Text>
                </div>
              </SimpleGrid>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>   
      </div>
      </Tabs.Panel>
      <Tabs.Panel value="Map Layers">
          <Space size="lg" my="10px" mx="5px"/>
          {layercats.map(name => (
              <div key={name} className="input">
                <SimpleGrid cols={1}>
                  <div>
                    <Switch
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
      </Tabs.Panel>    
    </Tabs>
    </Paper>  
    </div>
  );
}

export default React.memo(StyleControls);
