---
layout: default
title: Creating Datasets
---
# Adding data to CEEDS Tool
The CEEDS Tool uses a tile-server that stores dataset as tile-sets. These are in the mbtiles format. So any data that needs to be imported must be converted to this format.

## Converting Datasets to compatible tile-sets
Luckily QGIS has the option to export data as an mbtiles file so if the desired data can be imported into QGIS it will likely be possible to export as an mbtiles file. Below the process is documented for common GIS data formats.

### shpfile 

    - Open QGIS and create new project
    - Set openstreet map as base layer
    - import shpfile and check it plots correctly
    - export as mbtiles file (right click layer, export set mbtiles as format)

### raster

    - Open QGIS and create new project
    - Set openstreet map as base layer
    - import raster and check it plots correctly
    - export as mbtiles file (processing toolbox, raster tools, generate XYZ tiles (MBTiles))
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

This will show is the systemd service is running and the last few lines of the stdout which should show the server starting finding the new tile-sets and running on https://0.0.0.0:8000

