import * as React from 'react';
import {useState, useCallback, useEffect,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import Map,{NavigationControl,GeolocateControl} from 'react-map-gl';
import GeocoderControl from './geocoder-control';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import DrawControl from './draw-control';
import MapStyle from './mapstyle.json';
import AppContext from './AppContext';
import {dataLayers} from './data-layers';
import {ExportToCsv} from 'export-to-csv';
import bbox from '@turf/bbox'
import {lineString} from '@turf/helpers'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKE;

export default function App() {
  /**
   * layers states are updated asynchronously and so do not use the setState function.
   */
  const [mapStyle, setMapStyle] = useState(MapStyle);
  const [layers, setLayers] = useState(mapStyle.layers);
  const [Record2, setRecord2] = useState(null);
  const [cursor, setCursor] = useState<string>('');
  const [interactiveLayerIds, setInteractiveLayerIds] = useState(null);
  const [features, setFeatures] = useState({});
  const mapRef = useRef()
    
  const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'My Awesome CSV',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

  const csvExporter = new ExportToCsv(options);
  
  /**
   *   build required objects from imported datalayer file this defines the layer selectors
   *   and initial visible layers as well as the categories that define the layer sets 
   *   (i.e more than one map layer can be part of a single data layer)
   */
  const categories = []
  const layerSelector = {};
  const visibleLayers = {};
  dataLayers.filter(function (el){
    categories.push(el.category);
    layerSelector[el.category]=el.layerSelector
    visibleLayers[el.category]=el.visible
  });
  
  const [visibility, setVisibility] = useState(visibleLayers);

  /**
   * effect to update the mapStyle when visibility is updated. 
   * LayerInteractiveIds are also filtered and updated based on 
   * their visibility and interactive boolean in map style file.
   */
  
  useEffect(() => {
    if(layers) {
      setMapStyle({...mapStyle, layers: layers.filter(layer => {
        return categories.every(name => visibility[name] || !layerSelector[name].test(layer.id));
      })})
    }
    const newIds = layers.reduce((filtered, layer) => {
      if(categories.every(name => visibility[name] || !layerSelector[name].test(layer.id))) {
      if(layer.interactive) 
        filtered.push(layer.id)
      }

      return filtered

    }, [])
      


    setInteractiveLayerIds(newIds);

  }, [visibility])

    /** when clicking on interactive layer, update right hand panel with feature info
      remove any feature states that may be present (remove existing highlighted features)
      if layer has "select" boolean as feature state set it to true (enables highlighted style for feature)
  */
   const onClick = useCallback(event => {
    const feature2 = event.features && event.features[0];
    if (feature2) {
      mapRef.current.removeFeatureState({source:feature2.source,sourceLayer:feature2.sourceLayer})
      setRecord2([feature2.properties]); // eslint-disable-line no-alert
      mapRef.current.setFeatureState({source:feature2.source, 
                                      sourceLayer: feature2.sourceLayer, 
                                      id: feature2.id}, 
                                      {select:true})
    }
    else{
      setRecord2(null);
    }}, [Record2]);
  
  const onMouseEnter = useCallback(() => setCursor('pointer'), []);
  const onMouseLeave = useCallback(() => setCursor(''), []);

  // Polygon updating, deleting callbacks
  const onUpdate = useCallback(e => {
        setFeatures(currFeatures => {
            const newFeatures = {...currFeatures};
            for (const f of e.features) {
                newFeatures[f.id] = f;
            }
            return newFeatures;
        });
        
        const line = lineString(e.features[0].geometry["coordinates"][0]);
        const boundaries = bbox(line)
        const SWpoint = mapRef.current.project([boundaries[0],boundaries[1]]);
        const NEpoint = mapRef.current.project([boundaries[2],boundaries[3]]);
        const features2 = [mapRef.current.queryRenderedFeatures([SWpoint,NEpoint], {layers: ["seagrass"] })]
        const csvEntries = []
        for (var i = 0; i < features2[0].length; i++){
            csvEntries.push(features2[0][i].properties)}
        csvExporter.generateCsv(csvEntries);
    }, []);

  const onDelete = useCallback(e => {
        setFeatures(currFeatures => {
            const newFeatures = {...currFeatures};
            for (const f of e.features) {
                delete newFeatures[f.id];
            }
            return newFeatures;
            
        });
    }, []);

  useEffect(() => {
  }, [mapStyle])

  useEffect(() => {
  }, [interactiveLayerIds])
    
  return (
    <AppContext.Provider value={{
      visibility,
      setVisibility,
      categories,
    }}>
      <Map
      {...visualViewport} ref={ref => mapRef.current = ref && ref.getMap()}
        initialViewState={{
          latitude: 50.7028,
          longitude: -1.5442,
          zoom: 4}}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        cursor={cursor}
        interactiveLayerIds={interactiveLayerIds}>
        <LeftPanel polygons={Object.values(features)} />
        <RightPanel Record2={Record2}/>
        <GeolocateControl position="bottom-left" />
        <NavigationControl position="bottom-left" />
        <GeocoderControl mapboxAccessToken={MAPBOX_TOKEN} position="bottom-right" />
        <DrawControl position="bottom-right"
                     displayControlsDefault={false}
                     controls={{
                            polygon: true,
                            trash: true}}
                    onCreate={onUpdate}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
        />
      </Map>
      </AppContext.Provider>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
