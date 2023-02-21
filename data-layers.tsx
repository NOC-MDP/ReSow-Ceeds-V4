// This file defines which layers are shown in side panel in CEEDS tool
// category sets layer name that is displayed
// layerSelector defines which layers in map styles make up the data layer e.g. base layer and highlighted layer
// the words specified can be a substring of the layer name e.g. seagrass and seagrass-highlighted
// visible sets if the layer is loaded by default
export  const dataLayers = [{
                                category: "Seagrass",
                                layerSelector: /seagrass/,
                                visible: true,
                                data: true
                            },
                            {
                                category: "Labels",
                                layerSelector: /label|place|poi/,
                                visible: true,
                                data: false
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
                                category: "GEBCO",
                                layerSelector: /gebco/,
                                visible: false,
                                data: true
                            }
                                ];
