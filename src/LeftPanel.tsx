import * as React from 'react';
import {useContext} from 'react';
import {
  Button,
  Switch,
  SimpleGrid,
  Text,
  Paper,
  Tabs,
  Space,
  Accordion, 
  Divider,
  List
} from '@mantine/core';
import {IconDownload, IconBook, IconHelp} from '@tabler/icons';
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
  let currentdate = new Date();
  let datetime = String(currentdate.getDate()).padStart(2,'0')  + "/"
      + String(currentdate.getMonth()+1).padStart(2,'0')  + "/"
      + String(currentdate.getFullYear()).padStart(4,'0')  + " at "
      + String(currentdate.getHours()).padStart(2,'0')  + ":"
      + String(currentdate.getMinutes()).padStart(2,'0')  + ":"
      + String(currentdate.getSeconds()).padStart(2,'0') ;
  let datetime2 = String(currentdate.getDate()).padStart(2,'0')  + "-"
      + String(currentdate.getMonth()+1).padStart(2,'0')  + "-"
      + String(currentdate.getFullYear()).padStart(4,'0')  + " at "
      + String(currentdate.getHours()).padStart(2,'0')  + "-"
      + String(currentdate.getMinutes()).padStart(2,'0')  + "-"
      + String(currentdate.getSeconds()).padStart(2,'0') ;
    if(csventries == null){
      alert("No Features Selected")
      return}
  for (const key in csventries){  
  const layerName = key.split("-");  
  const options = {
    fieldSeparator: ',',
    filename: layerName[0]+'_'+datetime2,
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'CEEDS Data Downloaded on '+datetime + ' for data layer '+ layerName[0],
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };
  const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(csventries[key]);
  }
}

function StyleControls() {
  const { visibility,
          setVisibility,
          setShowLedge,
          colourSwitches,
          datcats,
          layercats,
          csvleng,
          csventries,
          downloadablecats,
          legends} = useContext(AppContext)

  const handleVisibilityChange = (e) => {
    setVisibility({...visibility, [e.target.name]: e.target.checked})
    for(let i = 0; i < legends.length;i++) {
      // if target is a layer with a legend set it to show
      if (e.target.name == legends[i] && e.target.checked) {
        setShowLedge(legends[i].concat(".jpg"));
      }
      if (e.target.name == legends[i] && !e.target.checked) {
        setShowLedge(null);
      }
    }
  }
  let featureSel = 0
  for (const key in csvleng){
    featureSel = featureSel+csvleng[key]
  }
  
  
  return (
    <div className="control-panel">
    <Paper shadow="md" radius="sm" mx="5px">
      <Text fz="xl" fw={700} ta="center" mt="5px" pt="5px" mb="1px" lh="1">CEEDS Tool</Text>
      <Text fz="md" c="dimmed" ta="center" mt="1px" lh="1">Version 4.4.1</Text>
      <Tabs defaultValue="Data Layers">
        <Tabs.List>
          <Tabs.Tab value="Data Layers"> <Text fz="sm" fw={700} ta="center" mt="5px" pt="5px" mb="1px" lh="1">Data Layers</Text> </Tabs.Tab>
          <Tabs.Tab value="Map Layers"> <Text fz="sm" fw={700} ta="center" mt="5px" pt="5px" mb="1px" lh="1">Map Layers</Text> </Tabs.Tab>
        </Tabs.List>
      <Tabs.Panel value="Data Layers">
        <Space my="10px"/>
          {datcats.map(name => (
          <div key={name} className="input">
            <SimpleGrid cols={1}>
            <div>
              {
                downloadablecats.includes(name) && <Switch
                labelPosition="right" 
                color={colourSwitches[name]}
                size="sm"
                mx={"10px"}
                radius={"xl"}
                onLabel={<IconDownload size={14}/>}
                offLabel={<IconDownload size={14}/>}
                name={name}
                label={name}
                checked={visibility[name]} 
                onChange={handleVisibilityChange}>
              </Switch>
              }
              {
                  !downloadablecats.includes(name) && <Switch
                      color={colourSwitches[name]}
                      labelPosition="right"
                      size="sm"
                      mx={"10px"}
                      radius={"xl"}
                      label={name}
                      name={name}
                      checked={visibility[name]}
                      onChange={handleVisibilityChange}>
                  </Switch>
                  
              }
            <Space my="10px"/>
            </div>
            </SimpleGrid>
        </div>
      ))}
        <Space my="5px"/>
        <Divider size="sm" ></Divider>
      <div className="accordion">
        <Accordion
            variant="filled"
            radius="md"
            children={undefined} >
          <Accordion.Item value="Download">
            <Accordion.Control icon={<IconDownload/>}>
              <Text fz="sm" fw="700" mt="1px" pt="1px" mb="1px" lh="1">Download Data</Text>
            </Accordion.Control>
              <Accordion.Panel>
                <SimpleGrid cols={1} verticalSpacing="2px">
                  <Text fz="sm" mx="10px">Features inside polygon: {featureSel}</Text>
                  <Button
                    onClick={()=> Download(csventries)}  
                    disabled={featureSel<1}
                    leftIcon={<IconDownload size={14} />} 
                    variant="filled"
                    radius="md"
                    my="5px" 
                    mx="5px"
                    size="xs">
                    Download
                  </Button>
                  <Text fz="sm" c="dimmed" mx="10px">Note: enabled layers must have this icon <IconDownload size={14}/></Text>
                </SimpleGrid>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="accordion">
        <Accordion
            variant="filled"
            radius="md"
            children={undefined} >
          <Accordion.Item value="Sources">
            <Accordion.Control icon={<IconBook/>}>
              <Text fz="sm" fw="700" mt="1px" pt="1px" mb="1px" lh="1">Sources</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <SimpleGrid cols={1} verticalSpacing="5px" mx="5px">
                <div>
                  <Text>Source code:{' '} <a href="https://github.com/NOC-MDP/ReSow-Ceeds-V4">Github</a></Text>
                </div>
                <div>
                  <Text>Source data:{' '} <a href="https://139.166.145.156/services">CEEDS</a></Text>
                </div>
                <div>
                  <Text>Map source:{' '} <a href="https://www.mapbox.com/maps">Mapbox</a></Text>
                </div>
              </SimpleGrid>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="accordion">  
        <Accordion
            variant="filled"
            radius="md"
            children={undefined} >
          <Accordion.Item value="Help">
            <Accordion.Control icon={<IconHelp/>}>
              <Text fz="sm" fw="700" mt="1px" pt="1px" mb="1px" lh="1">Help</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Space my="10px"/>
              <Text fz="xl" c="dimmed" ta="center" mt="5px" pt="5px" mb="1px" lh="1">Help Info</Text>
              <Space my="10px"/>
              <Text fz="md" mx="5px" mt="5px" pt="5px" mb="1px" lh="1">Downloading features:</Text>
              <Space my="10px"/>
              <List children={undefined} size="sm" type="ordered">
                <List.Item>
                  <Text c="dimmed">Enable downloadable layer</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">Draw/delete polygon using controls on bottom right side of map</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">Open download menu above</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">Click download to get CSV file</Text>
                </List.Item>
              </List>  
              <Space my="10px"/>
              <div>
                <Text fz="md" mx="5px" mt="5px" pt="5px" mb="1px" lh="1">More Help:{' '} <a href="https://noc-mdp.github.io/ReSow-Ceeds-V4/">Github Pages</a></Text>
              </div>
              <Space my="10px"/>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>    
      </div>
      </Tabs.Panel>
      <Tabs.Panel value="Map Layers">
        <Space my="10px"/>
        <Text fz="sm" c="dimmed" mx="5px" mt="5px" pt="5px" mb="1px" lh="1">Different parts of the basemap can be enabled and disabled here.</Text>
        <Space my="20px"/>
        <Divider size="sm" ></Divider>
        <Space my="20px"/>
        <SimpleGrid cols={1}>
          {layercats.map(name => (
              <div key={name} className="input">
                  <div>
                    <Switch
                            labelPosition="right"
                            size="md"
                            mx="10px"
                            label={name}
                            name={name}
                            checked={visibility[name]}
                            onChange={handleVisibilityChange}>
                    </Switch>
                  </div>
              </div>
          ))}
          <Space my="10px"/>
        </SimpleGrid>
      </Tabs.Panel>
    </Tabs>
    </Paper>  
    </div>
  );
}

export default React.memo(StyleControls);
