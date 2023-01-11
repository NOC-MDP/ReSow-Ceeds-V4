import * as React from 'react';
import {fromJS} from 'immutable';
import {useState, useEffect} from 'react';
import {Button} from '@mantine/core';
import MAP_STYLE from '../mapstyle.json';
import { IconInfoCircle, IconLayersSubtract, IconPlus, IconSettings, IconShape, IconTableExport } from '@tabler/icons';

const defaultMapStyle: any = fromJS(MAP_STYLE);
const defaultLayers = defaultMapStyle.get('layers');

const categories = ['seagrass','nat_cap'];

// Layer id patterns by category
const layerSelector = {
  seagrass: /seagrass/,
  nat_cap: /nat_cap/
};

// Layer color class by type
const colorClass = {
  line: 'line-color',
  fill: 'fill-color',
  background: 'background-color',
  symbol: 'text-color'
};

function getMapStyle({visibility, color}) {
  const layers = defaultLayers
    .filter(layer => {
      const id = layer.get('id');
      return categories.every(name => visibility[name] || !layerSelector[name].test(id));
    })
    .map(layer => {
      const id = layer.get('id');
      const type = layer.get('type');
      const category = categories.find(name => layerSelector[name].test(id));
      if (category && colorClass[type]) {
        return layer.setIn(['paint', colorClass[type]], color[category]);
      }
      return layer;
    });

  return defaultMapStyle.set('layers', layers);
}

function StyleControls(props) {
  const [visibility, setVisibility] = useState({
    seagrass: true,
    nat_cap: true,
  });

  const [color, setColor] = useState({
    seagrass_dist: '#DBE2E6',
    nat_cap: '#E6EAE9',
  });

  useEffect(() => {
    props.onChange(getMapStyle({visibility, color}));
  }, [visibility, color]);

  const onColorChange = (name, value) => {
    setColor({...color, [name]: value});
  };

  const onVisibilityChange = (name, value) => {
    setVisibility({...visibility, [name]: value});
  };
  

  return (
    <div className="control-panel">
      <h2>CEEDS Tool</h2>
      <hr />
        <h3>Enable/Disable Layers</h3>
        {categories.map(name => (
        <div key={name} className="input">
          <label>{name}</label>
          <input
            type="checkbox"
            checked={visibility[name]}
            onChange={evt => onVisibilityChange(name, evt.target.checked)}
          />
          <input
            type="color"
            value={color[name]}
            disabled={!visibility[name]}
            onChange={evt => onColorChange(name, evt.target.value)}
          />
        </div>
      ))}
        <div className="layers">
          <p>
            <Button compact fullWidth leftIcon={<IconLayersSubtract size={14} />} variant="filled" onClick={() => console.log("clicked!!!!")}> Seagrass Distribution </Button>
          </p>
          <p>
            <Button compact fullWidth leftIcon={<IconLayersSubtract size={14} />} variant="outline"> Natural Capital </Button>
          </p>
        </div>
      <hr />
      <div>
      <h3>Options</h3>
        <p>
          <Button compact fullWidth leftIcon={<IconInfoCircle size={14} />} variant="filled"> Info </Button>
        </p>
        <p>
          <Button compact fullWidth leftIcon={<IconShape size={14} />} variant="outline" > Select Area </Button>
        </p>
        <p>
          <Button compact fullWidth leftIcon={<IconPlus size={14} />} variant="outline"> Add WMS Layer </Button>
        </p>
        <p>
          <Button compact fullWidth leftIcon={<IconTableExport size={14} />} variant="outline"> Export Data</Button>
        </p>
        <p>
          <Button compact fullWidth leftIcon={<IconSettings size={14} />} variant="filled"> Settings </Button>
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

export default React.memo(StyleControls);
