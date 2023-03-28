# CEEDS Tool Version 4

## Description
This is the repository contains the CEEDS tool code. Specifically the web application
and documentation on how to build and update the system. It does not hold the data of the ReSOW project 
or the backend used to host the data. The backend is provided via a third party project, details of how
to setup and install are in the documentation [here](https://noc-mdp.github.io/ReSow-Ceeds-V4/).

## Requirements
CEEDS requires the following to be installed:

- Git
- NPM

It is currently only tested and supported on Debian 11. These requirements can be installed as follows:

```shell
sudo apt install git npm
```

## Usage

To run CEEDS, you need a [Mapbox token](http://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens). You can set it as `REACT_APP_MAPBOX_TOKE` in `.env`.

Then clone the repository, install the dependencies using node package manager and start

```bash
git clone https://github.com/NOC-MDP/ReSow-Ceeds-V4.git
npm i
npm run start
```
