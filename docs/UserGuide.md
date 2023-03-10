---
layout: default
title: User Guide
---
# CEEDS Tool User Guide
This guide details how to use the CEEDS decision support tool. Most of the operation should be intuitive for the average user to understand but there are some functions that are likely to need explanation, (downloading data, connecting to GIS programs etc) and this document should serve as a helpful look up guide.

## CEEDS Capabilities

The CEEDS tool has the following capabilities:
    - Displays ReSOW project output in visual spatial layers
    - Can display other sources of data such as third party WMS
    - Users can enable or disable specific layers
    - Users can click on features within interactive layers to see data associated with feature
    - Able to download subsets of layers by drawing a polygon and downloading features inside
    - Use GIS program (e.g. QGIS) to connect to tile server back-end and get ReSOW data directly

> **NOTE: Third party or download-able layers can only be added by administrators following instructions in admin guide**

## How to use:
CEEDS comprises of a map base layer that takes up the whole browser window. Overlaid on this are two panels, the left containing the layer toggles and other options hidden in sub menus and the right which is not usually open unless a feature is selected. There are also various controls on the bottom right of the map screen for drawing and deleting polygons, navigating the map and searching for locations. 

### Description of User Interface

#### Map view
This displays a map of the world, by default the tool opens over NW Europe but the user can pan and zoom to anywhere in the world.

<div align="center">
<img src="assets/default-map.png" alt="Default Map of CEEDS Tool">
<p> Default Map View </p>
</div>

#### Left Panel

This is the main control for CEEDS, it contains two lists of layers data and map. By default it will show the data layers which can be toggled on and off as required, by default most are disabled when loading. The user can also select the map layers tab which allows the user to remove aspects of the base map layer, e.g. labels. This may be useful for screen shots or similar and allows some tailoring of the appearance of the map.


Under the data layers are three accordion (they collapse up) menus. By default these are closed but the user can open them as needed. The menu names are download, sources and help. Each one when opened shows some extra information. Source provides links to the source code and data source of CEEDS, help provides a short description of how to use different parts of the tool with a link to the user guide. Finally download shows a download button along with a number of features selected readout. Be default these are greyed out unless a user has drawn a polygon (please see downloading section for me details) 

<div align="center">
	<div style="display: flex; justify-content: space-evenly;">
		<div>
			<img src="assets/default-left.png" alt="Default Left Panel">
			<p> Default left panel </p>
		</div>
		<div>
			<img src="assets/extended-left.png" alt="Left panel will menus extended">
			<p>Left panel will all menus extended</p>
		</div>
	</div>
</div>

#### Right Panel

Upon opening this panel is minimised, saying no feature selected. Once a user selects a feature in an interactive layer (mouse cursor turns to pointer on hover) then the data held in that feature is populated into the right panel. The panel takes up 60% of the height of the map view and if the data held is longer than this then scroll bars appear allowing the user to scroll and see all the data held. 

<div align="center">
    <div style="display: flex; justify-content: space-evenly;">
        <div>
            <img src="assets/default-right.png" alt="Default right panel" style="height:45px;">
			<p> Default right panel</p>
        </div>
		<div>
            <img src="assets/data-right.png" alt="Right panel with example data">
			<p>Right panel with example data</p>
        </div>
	</div>
</div>
#### Drawing control

Located on the bottom right side of the map, this contains two buttons. The top one allows you to draw a polygon on the map by left clicking vertices. Double left click will complete the polygon. To delete the polygon the user can select it so it is highlighted then click the second button which will delete it. 

#### Geocoder (search)

At the bottom left there is also a search box, here the user can search for locations where the map will then pan too. It supports place names, post codes and can also find locations based on latitude and longitude. By writing in two number seperated by a comma the option to set them as lat/lon should pop up. The user can then select them to center the map on this location.

#### Navigation control

Located in the bottom left above the geocoder and below the drawing control are navigation controls, these allow the user to pan and zoom the map as they desire. There is also a pan to location control where the map can center on the users location. (they will need to provide permission)

<div align="center">
<img src="assets/controls.png" alt="Controls on bottom left of map">
<p>Controls on bottom left of map</p>
</div>

### Downloading Data as CSV file

CEEDS provides the option to download a subset of the ReSOW data. This is useful if users wish to have data for a certain area and would like to do some analysis or statistics etc. Not all data layers are download-able, if they are then they will have a download icon on their enable/disable switch. At the moment only one layer can be downloaded at a time. So ensuring the data layer they want to download is enabled and all others are disabled, the following steps are required.

1. Pan to area of interest
2. Click draw polygon button in bottom right
3. Left click around area of interest ensuring all features are within
4. Double click to complete polygon
5. Open download sub menu
6. Check the number of features to download is as expected
7. Click Download

The web browser will download a CSV of the data subset and save it in the default location (usually user downloads directory). This can be easily opened in Excel or similar. 

<div align="center">
<img src="assets/polygon.png" alt="Example of a polygon">
<p>Example of a polygon</p>
</div>

### Connect ReSOW data source to GIS programs

Ultimately the CEEDS tool may be a bit limiting to technical users who wish to do complicated geo-spatial operations/work-flows, so the option is also present to allow these users who are familiar with GIS programs/work-flows to import the ReSOW data directly into the program. This process is detailed below:

#### QGIS

1. Open new project
2. Select import new layer => vector tile
3. Fill out dialog box with:
    1. URL
    2. Name 
    3. Stuff that I have forgotten

4. Click add
5. Ignore style missing error message.....

<div align="center">
<img src="assets/example-QGIS.png" alt="Example of a data layer in QGIS">
<p>Example of a data layer in QGIS</p>
</div>

#### ArcGIS online

Not working yet, most likely needs domain name with non self signed SSL certificate

#### ArcMap

Not yet tested

