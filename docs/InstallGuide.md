---
layout: default
title: Install Guide
---
# Install Guide for ReSOW CEEDS tool (technical guide)
This guide shows the basic steps to install the CEEDS tool, it is not fully comprehensive
and so far only tested on Debian 11

## Requirements

The host linux system (CEEDS is currently built on Debian 11) has the following requirements:
    
    - NPM
    - systemd
    - go 1.17+ (do not use go in the debian apt repository)
    - git
    - mapbox API

## Setup/Install CEEDS

To install CEEDS the project needs to be cloned from the github repository.

````
$ git clone https://github.com/noc-mdp/ReSow-Ceeds-V4
````
### Setup React Frontend
To set up the react front end use NPM to install the required dependancies
`````
$ npm install
`````
For developement use the web app can be started 
````
$ npm start
````
The web app should be availble on 

````
localhost:8080
````

### Setup MbTileserver
The backend uses mbtileserver this is a vector tile server written in go. 
The tileserver needs to be built as follows

````
$ go install github.com/consbio/mbtileserver@latest
````
<mark> NOTE: the binary will be saved to the user home directory in go/bin. </mark>

Create a tileset directory next to the tileserver binary 
(passing a tileset path is an option when starting if a different location is desired)
and save the mbtiles datasets into it (see Creating Datasets Guide)




### Setup NginX reverse proxy server

### Create Systemd services

