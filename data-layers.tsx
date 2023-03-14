// This file defines which layers are shown in side panel in CEEDS tool
// category sets layer name that is displayed
// layerSelector defines which layers in map styles make up the data layer e.g. base layer and highlighted layer
// the words specified can be a substring of the layer name e.g. seagrass and seagrass-highlighted
// visible sets if the layer is loaded by default
export  const dataLayers = [{
                                category: "Seagrass Distribution",
                                layerSelector: /seagrass/,
                                visible: false,
                                data: true
                            },
                            {
                                category: "Labels",
                                layerSelector: /label|place|poi/,
                                visible: true,
                                data: false
                            },
                            {
                                category: "Seagrass Potential",
                                layerSelector: /seagrasp/,
                                visible: true,
                                data: true
                            },
                            {
                                category: "Roads",
                                layerSelector: /bridge|road|tunnel/,
                                visible: true,
                                data: false
                            },
                            {
                                category: "Buildings",
                                layerSelector: /building/,
                                visible: true,
                                data: false
                            },
                            {
                                category: "Parks",
                                layerSelector: /park/,
                                visible: true,
                                data: false
                            },
                            {
                                category: "Water",
                                layerSelector: /water/,
                                visible: true,
                                data: false
                            },
                            {
                                category: "Background",
                                layerSelector: /background/,
                                visible: true,
                                data: false
                            },
                            {
                                category: "GEBCO Bathymetry",
                                layerSelector: /gebco/,
                                visible: false,
                                data: true
                            }
                                ];
