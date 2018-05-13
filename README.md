# BubbleUPnP Server Installer for Volumio
It's a helper tool that installs *BubbleUPnP Server* directly on *Volumio* system.

Can be used to stream Tidal and Qobuz (using MDP). All you need is *OpenHome* renderer application like Linn Kazoo, Lumin etc. 
 
*BubbleUPnP Server* is using port *58050* by default. Please open *[YOUR VOLUMIO IP]:58050* site in your browser to access *BubbleUPnP Server* configuration page.

***Note:*** *BubbleUPnP Server* needs some time to start. Before using it, please wait a moment after plugin activation or *Volumio* system startup. 

***Note:*** Plugin supports devices with *armv7 processor* - tested and used on *Raspberry Pi 3*.


## To install
Before intalling the dev version, REMOVE, if exists, the plugin from your system using the webUI plugins page.

Due to a [Volumio decision](https://volumio.org/forum/require-plugins-uploaded-plugins-repo-t8116-10.html), now third party or dev plugin can only be install through SSH. Here is how:

### 1. Enable SSH and connect to Volumio

For security reasons, SSH is disabled by default on all versions after 2.199 (except first boot). It can be however enabled very easily.

Navigate to the DEV ui by pointing your browser to http://VOLUMIOIP/DEV or http://volumio.local/DEV . Find the SSH section, and click enable. From now on your SSH will be permanently enabled.

Now you can connect to Volumio with username `volumio` and password `volumio`.

```
ssh volumio@volumio.local
```

If you changed the name of your device, replace the second volumio by it or use its IP address. 

### 2. Download and install the plugin

Type the following commands to download and install plugin:

```
wget https://github.com/dgrzeszczak/Volumio-BubbleUPnP-Server/raw/master/volumio_bubbleupnp_server.zip
mkdir ./volumio_bubbleupnp_server
miniunzip volumio_bubbleupnp_server.zip -d ./volumio_bubbleupnp_server
cd ./volumio_bubbleupnp_server
volumio plugin install
```

Install process could take up to 10 minutes.

### 3. Start using it

Please open `volumio.local:58050` site in your browser to access BubbleUPnP Server configuration page.
