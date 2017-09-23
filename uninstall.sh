#!/bin/bash

# Uninstall dependendencies
# apt-get remove -y

sudo rm -rf /data/plugins/miscellanea/volumio_bubbleupnp_server/
sudo /opt/bin/ipkg remove  bubbleupnpserver-installer

echo "Done"
echo "pluginuninstallend"
