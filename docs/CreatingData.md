---
layout: default
title: Creating Datasets
---
# Adding data to CEEDS Tool
The CEEDS Tool uses a tile-server that stores dataset as tile-sets. These are in the mbtiles format. So any data that needs to be imported must be converted to this format.

## Converting Datasets to compatible tile-sets
Using QGIS to plot the data and ensure it is correct is a sensible starting point, it can either then be exported as a MBtiles format for rasters or as a geojson for input into Mapbox's Tippecanoe tool that will create a feature MBtiles file from the geojson with sensible zoom levels and tile ids needed for feature highlighting. 

### shpfile 

    - Open QGIS and create new project
    - Set openstreet map as base layer
    - import shpfile and check it plots correctly
    - export as geojson file (right click layer, export set geojson as format)

Then install Tippecanoe and run the following command to create the MBtiles file.

```shell
$ tippecanoe -o output.mbtiles --drop-densest-as-needed --generate-id input.geojson
```

This will output a MBtiles file that can be places in the MBtileserver tilesets folder where it will be automatically added to the server upon restart.

### raster

    - Open QGIS and create new project
    - Set openstreet map as base layer
    - import raster and check it plots correctly
    - export as mbtiles file (processing toolbox, raster tools, generate XYZ tiles (MBTiles))
> **NOTE** This has not yet been tested as of CEEDS version 4.3.2 so its possible this will need updating or rewriting once raster data has been added.

## Add to mbtileserver on CEEDS Tool Server

Save the mbtiles file in the tile-sets folder that is located on the CEEDS Tool server.
By default the mbtileserver is located at /home/$USER/go/bin and the tilesets folder will also be
located here. The mbtileserver checks this folder for tile-sets on start so it will need to be restarted 
as follows:

````shell
$ sudo systemctl restart mbtile
````
Check the server restarted properly by running:

````shell
$ sudo systemctl status mbtile
````

This will show is the systemd service is running and the last few lines of the std-out which should show the server starting finding the new tile-sets and running on https://0.0.0.0:8000

