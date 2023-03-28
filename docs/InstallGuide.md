---
layout: default
title: Installation Guide
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

> **NOTE: do not use the go available in the Debian apt repository use install instructions [here](https://go.dev/doc/install)**

---
## Setup/Install CEEDS
To install CEEDS the project needs to be cloned from the GitHub repository.

````shell
$ git clone https://github.com/noc-mdp/ReSow-Ceeds-V4
````
### Setup React Front-end
To set up the react front end use NPM to install the required dependencies
`````shell
$ npm install
`````
For development use the web app can be started 
````shell
$ npm start
````
The web app should be available on 

````
http://localhost:8080
````
To keep the service going once the terminal window is closed please refer to the systemd services section.

### Setup MbTileserver
The back-end uses mbtileserver this is a vector tile server written in go. 
The tileserver needs to be built as follows

````shell
$ go install github.com/consbio/mbtileserver@latest
````
> **NOTE: the binary will be saved to the user home directory in /home/$USER/go/bin.**

Create a tileset directory next to the tileserver binary 
(passing a tileset path is an option when starting if a different location is desired)
and save the mbtiles datasets into it (see Creating Datasets Guide)

To start the server just run the binary in /home/$USER/go/bin:
```shell
$ ./mbtileserver
```
If a HTTPS service is desired and a certificate has been generated then the following will start
mbtileserver in HTTPS mode and compatible with the nginx configuration.

```shell
$ ./mbtileserver -c /etc/ssl/certs/selfsigned.crt -k /etc/ssl/private/selfsigned.key -p 8000
```
To keep the server going once the terminal window is closed then please refer to the systemd services
section.

### Setup nginx reverse proxy server
Running NPM start directly is not suitable for production instances, it is sensible to use 
a reverse proxy server to help load balance and protect the identity of the CEEDS Tool server.
To do this nginx needs to be installed:

```shell
$ sudo apt install nginx
```
Then the server needs to be configured, by writing a server block in an nginx configuration file. 
This should be located in /etc/nginx/sites-available.

```shell
$ sudo nano /etc/nginx/sites-available/CEEDS
```
Add the following to the file.
```
server {
listen 80;
server_name 139.166.145.156;
return 302 https://$server_name$request_uri;
}
server {

        listen 443 ssl;
        ssl_certificate /etc/ssl/certs/selfsigned.crt;
        ssl_certificate_key /etc/ssl/private/selfsigned.key;
        ssl_dhparam /etc/nginx/dhparam.pem;

location / {
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-Host $server_name;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_pass http://localhost:8080;
}
location /services {
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Host $server_name;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass https://0.0.0.0:8000;
    }
}
```
This sets up an https reverse proxy for CEEDS web app and the mbtileserver. This requires an SSL certificate
to be generated.

> **Note: Some parts of the file may need editing (server address port numbers etc) depending on the configuration
> of the host webserver react app and tileserver.**

The configuration needs to be enabled as follows:

```shell
$ sudo ln -s /etc/nginx/sites-availble/CEEDS /etc/nginx/sites-enabled
```
Check the configuration is valid:
```shell
$ sudo nginx -t
```
And resolve any errors, e.g. common errors are forgetting the ; at the end of lines

Then restart nginx so it will read the new configuration:
```shell
$ sudo systemctl restart nginx
```
Finally nginx requires access through the firewall (disabled by default)
```shell
$ sudo ufw allow `Nginx Full`
```

### Generating self signed SSL certificate
The above configuration will not work unless a SSL certificate is in place, ideally a signed certificate
from let's encrypt or similar will be used but for testing/demo/IP address then a self signed can be used.

First create the certificate
```shell
$ openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/selfsigned.key -out /etc/ssl/certs/selfsigned.crt
```
For additional security generate Diffie-Hellman group (this takes a long time)
```shell
$ openssl dhparam -out /etc/nginx/dhparam.pem 4096
```
Restart nginx
```shell
$ sudo systemctl restart nginx
```
Check status
```shell
$ sudo systemctl status nginx
```
CEEDS should now be running and accessible on the server_name listed in the server block 

### Create systemd services
the web app and tileserver are managed by systemd this will start both as services at boot with the
required parameters and restart if they happen to fail. The CEEDS repository contains the two services
in the services subfolder. These need to moved to the systemd system folder and enabled as follows.

```shell
$ sudo cp /home/$USER/ReSow-Ceeds-V4/services/*. service /etc/systemd/system/
$ sudo systemctl start CEEDS 
$ sudo systemctl start mbtile
```
Enable them so they will start up when computer boots
```shell
$ sudo systemctl enable CEEDS 
$ sudo systemctl enable mbtile
```
Finally check their status to see they started correctly
```shell
$ sudo systemctl status CEEDS 
$ sudo systemctl status mbtile
```
The CEEDS Tool should now be ready and available online. 

---
### Troubleshooting

To be continued.....