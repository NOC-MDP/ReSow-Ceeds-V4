// This file defines which layers are shown in side panel in CEEDS tool
// category sets layer name that is displayed
// layerSelector defines which layers in map styles make up the data layer e.g. base layer and highlighted layer
// the words specified can be a substring of the layer name e.g. seagrass and seagrass-highlighted
// visible sets if the layer is loaded by default
export  const dataLayers = [{
                                category: "Seagrass",
                                layerSelector: /seagrass/,
                                visible: true
                            },
                            {
                                category: "Labels",
                                layerSelector: /label|place|poi/,
                                visible: true
                            },
                            {
                                category: "Roads",
                                layerSelector: /bridge|road|tunnel/,
                                visible: true
                            },
                            {
                                category: "Buildings",
                                layerSelector: /building/,
                                visible: true
                            },
                            {
                                category: "Parks",
                                layerSelector: /park/,
                                visible: true
                            },
                            {
                                category: "Water",
                                layerSelector: /water/,
                                visible: true
                            },
                            {
                                category: "Background",
                                layerSelector: /background/,
                                visible: true
                            },
                            {
                                category: "GEBCO",
                                layerSelector: /gebco/,
                                visible: false
                            }
                                ];
