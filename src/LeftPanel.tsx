import * as React from 'react';
import {useContext} from 'react';
import {Button, Switch, Divider, SimpleGrid, Text, Paper, Tabs, Space} from '@mantine/core';
import {IconDownload} from '@tabler/icons';
import AppContext from './AppContext';
import {ExportToCsv} from 'export-to-csv';

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
        <Divider
          label="Download"
          labelProps={{fz:"md",fw:700}}
          labelPosition="center"
          size="lg"
          my="5px"
          mx="5px"
        />
        <SimpleGrid cols={1} verticalSpacing="2px">
          <Text fz="sm" fw="700" mx="10px" ta="center">Features in polygon: {featureSel}</Text>
          <Button
            onClick={()=> Download(props.csventries)}  
            disabled={featureSel<1}
            leftIcon={<IconDownload size={14} />} 
            variant="filled"
            my="5px" 
            mx="5px"
            size="xs">
            Download
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
          mx="5px"
        />
        <SimpleGrid cols={1} verticalSpacing="5px" mx="5px">
          <div>
            <Text mx="5px">Source Code:{' '} <a href="https://github.com/NOC-MDP/ReSow-Ceeds-V4">CEEDS</a></Text>
          </div>
          <div>
            <Text mb="5px"mx="5px">Map:{' '} <a href="https://www.mapbox.com/maps">Mapbox</a></Text>
          </div>
        </SimpleGrid>
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
