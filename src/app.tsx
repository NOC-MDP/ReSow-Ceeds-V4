import * as React from 'react';
import {useState, useCallback, useEffect,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import Map,{NavigationControl,GeolocateControl} from 'react-map-gl';
import GeocoderControl from './geocoder-control';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import DrawControl from './draw-control';
import MapStyle from '../mapstyle.json';
import AppContext from './AppContext';
import {dataLayers} from '../data-layers';
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
  const [featureState, setFeatureState] = useState(null);
  const [cursor, setCursor] = useState<string>('');
  const [interactiveLayerIds, setInteractiveLayerIds] = useState(null);
  const [downloadableLayerIds, setDownloadableLayerIds] = useState(null);
  const [downloadablecats, setDownloadableCats] = useState(null);
  const [features, setFeatures] = useState({});
  const [csventries, setCSVentries] = useState(null)
  const [csvleng, setCSVleng] = useState(0)  
  const mapRef = useRef()
  
  /**
   *   build required objects from imported datalayer file this defines the layer selectors
   *   and initial visible layers as well as the categories that define the layer sets 
   *   (i.e more than one map layer can be part of a single data layer)
   */
  const datcats = []
  const layercats = []  
  const layerSelector = {};
  const visibleLayers = {};
  dataLayers.filter(function (el){
      if(el.data == true){
          datcats.push(el.category);
      }
      else{
          layercats.push(el.category)
      }
    layerSelector[el.category]=el.layerSelector
    visibleLayers[el.category]=el.visible
    
  });
  const allcats = datcats.concat(layercats) 
  const [visibility, setVisibility] = useState(visibleLayers);

  /**
   * effect to update the mapStyle when visibility is updated. 
   * LayerInteractiveIds are also filtered and updated based on 
   * their visibility and interactive boolean in map style file.
   */
  
  useEffect(() => {
    if(layers) {
      setMapStyle({...mapStyle, layers: layers.filter(layer => {
        return allcats.every(name => visibility[name] || !layerSelector[name].test(layer.id));
      })})
    }
    const newIds = layers.reduce((filtered, layer) => {
      if(allcats.every(name => visibility[name] || !layerSelector[name].test(layer.id))) {
        if(layer.interactive) 
            filtered.push(layer.id)
      }
      return filtered
    }, [])
    const newIds2 = layers.reduce((filtered2, layer) => {
        if(allcats.every(name => visibility[name] || !layerSelector[name].test(layer.id))) {
            if (layer.downloadable)
                filtered2.push(layer.id)
        }
          return filtered2
      }, [])
      // TODO check how robust this is....
      const newIds3 = layers.reduce((filtered3, layer) => {
          if(allcats.every(name2 => visibility[name2] || !layerSelector[name2].test(layer.id))) {
              if (layer.downloadable)
                for (let i in layerSelector){
                    if(layerSelector[i].source.includes(layer.id)) {
                        filtered3.push(i)
                    }
                }
          }
          return filtered3
      }, [])
    setInteractiveLayerIds(newIds);
    setDownloadableLayerIds(newIds2);
    setDownloadableCats(newIds3)
  }, [visibility])

    /** when clicking on interactive layer, update right hand panel with feature info
      remove any feature states that may be present (remove existing highlighted features)
      if layer has "select" boolean as feature state set it to true (enables highlighted style for feature)
  */
   const onClick = useCallback(event => {
    if (featureState != null) {
            mapRef.current.setFeatureState({source:featureState.source,
                                                    sourceLayer: featureState.sourceLayer,
                                                    id: featureState.id}, {select:false})}
    const feature2 = event.features && event.features[0];
    if (feature2) {
        setRecord2([feature2.properties]);
        setFeatureState(feature2)// eslint-disable-line no-alert
        mapRef.current.setFeatureState({source:feature2.source, 
                                                sourceLayer: feature2.sourceLayer, 
                                                id: feature2.id}, {select:true})
    }
    else{
      setRecord2(null);
    }}, [Record2]);
  
  const onMouseEnter = useCallback(() => setCursor('pointer'), []);
  const onMouseLeave = useCallback(() => setCursor(''), []);

  // Polygon updating, deleting callbacks
  const onUpdate = useCallback(e => {
        if (downloadableLayerIds.length > 1){
            alert("There are "+downloadableLayerIds.length+" layers enabled please only enable 1")
            return
        }
        setFeatures(currFeatures => {
            const newFeatures = {...currFeatures};
            for (const f of e.features) {
                newFeatures[f.id] = f;
            }
            return newFeatures;
        });
        // filter out rendered features by converting polygon coords into a line, then a bbox then corner points
        // then feed into guery and then loop through cutting properties and adding to new array
        // THEN generating that as a CSV phew! might be a better way
        const line = lineString(e.features[0].geometry["coordinates"][0]);
        const boundaries = bbox(line)
        const SWpoint = mapRef.current.project([boundaries[0],boundaries[1]]);
        const NEpoint = mapRef.current.project([boundaries[2],boundaries[3]]);
        const features2 = [mapRef.current.queryRenderedFeatures([SWpoint,NEpoint], {layers: downloadableLayerIds })]
        const csvEntries = []
        for (var i = 0; i < features2[0].length; i++){
            csvEntries.push(features2[0][i].properties)}
        setCSVentries(csvEntries)
        setCSVleng(csvEntries.length)
        
    }, [downloadableLayerIds]);

  const onDelete = useCallback(e => {
        setFeatures(currFeatures => {
            const newFeatures = {...currFeatures};
            for (const f of e.features) {
                delete newFeatures[f.id];
            }
            return newFeatures;
            
        });
      setCSVleng(0)
    }, []);

  useEffect(() => {
  }, [mapStyle])

  useEffect(() => {
  }, [interactiveLayerIds])

  useEffect(() => {
    }, [downloadableLayerIds])
  
  useEffect(() => {
    }, [downloadablecats])
    
  useEffect(() => {
    }, [csventries])

  useEffect(() => {
    }, [csvleng])
    
    return (
    <AppContext.Provider value={{
      visibility,
      setVisibility,
      datcats,
      layercats,
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
        <LeftPanel csvleng={csvleng} csventries={csventries} downloadable={downloadablecats}/>
        <RightPanel Record2={Record2}/>
        <GeocoderControl mapboxAccessToken={MAPBOX_TOKEN} position="bottom-right" />
        <GeolocateControl position="bottom-right" />
        <NavigationControl position="bottom-right" />
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
