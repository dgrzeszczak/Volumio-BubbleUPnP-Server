#!/bin/bash

echo "Installing volumio bubbleupnp server Dependencies"
# sudo apt-get update
# Install the required packages via apt-get
# sudo apt-get -y install

echo "Detecting cpu"
cpu=$(lscpu | awk 'FNR == 1 {print $2}')
echo "cpu: " $cpu

if [ $cpu = "armv7l" ]; then
    echo "Installing Optware-ng"
    wget -O - http://ipkg.nslu2-linux.org/optware-ng/bootstrap/buildroot-armeabihf-bootstrap.sh | sudo sh
    sudo /opt/bin/ipkg update
    echo "Installing bubbleupnpserver"
    sudo /opt/bin/ipkg install bubbleupnpserver-installer
    # by default ipkg will start the server so we can stop it
    /opt/bin/bubbleupnpserver stop
    sudo chmod a+w /opt/var/run
    sudo chown -R volumio /opt/share/bubbleupnpserver
    echo "plugininstallend"
else
    echo "Sorry, your device is not supported!"
    echo "plugininstallend"
fi

# If you need to differentiate install for armhf and i386 you can get the variable like this
#DPKG_ARCH=`dpkg --print-architecture'
# Then use it to differentiate your install

#requred to end the plugin install
#echo "plugininstallend"
