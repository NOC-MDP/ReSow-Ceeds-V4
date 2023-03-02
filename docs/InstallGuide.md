---
layout: default
title: Install Guide
---
# Install Guide for ReSOW CEEDS tool (technical guide)
This guide shows the basic steps to install the CEEDS tool, it is not fully comprehensive
and so far only tested on Debian 11 and other distributions may need more dependencies installed
e.g. systemd

---
## Requirements

The host linux system (CEEDS is currently built on Debian 11) has the following requirements:
    
    - NPM
    - go 1.17+ 
    - git
    - mapbox API token

> **NOTE: do not use the go available in the debian apt repository 
use install instructions [here](https://go.dev/doc/install)**

---
## Setup/Install CEEDS

To install CEEDS the project needs to be cloned from the github repository.

````shell
$ git clone https://github.com/noc-mdp/ReSow-Ceeds-V4
````
### Setup React Frontend
To set up the react front end use NPM to install the required dependencies
`````shell
$ npm install
`````
For development use the web app can be started 
````shell
$ npm start
````
The web app should be available on 

````http request
http://localhost:8080
````
### Setup MbTileserver
The backend uses mbtileserver this is a vector tile server written in go. 
The tileserver needs to be built as follows

````shell
$ go install github.com/consbio/mbtileserver@latest
````
> **NOTE: the binary will be saved to the user home directory in /home/$USER/go/bin.**

Create a tileset directory next to the tileserver binary 
(passing a tileset path is an option when starting if a different location is desired)
and save the mbtiles datasets into it (see Creating Datasets Guide)




### Setup NginX reverse proxy server

### Create Systemd services

