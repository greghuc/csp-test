#!/usr/bin/env bash

# Bootstrap vanilla vagrant vm

# Used as shell prompt
PROJECT=vagrant-csp

NODE_VERSION=0.10.29

# Get latest package listings
apt-get -y update

# Useful to have
apt-get install -y build-essential git curl

# Remove packages that are no longer needed
apt-get autoremove -y

# Remove local package files, to keep size down
apt-get clean


# Install nvm
NVM_ROOT=/opt/nvm
NVM_SCRIPT=/etc/profile.d/nvm.sh
if [ -d "$NVM_ROOT" ];
then
    echo -e "\nnvm is already installed - updating"
    pushd .
    cd $NVM_ROOT
    git pull
    popd
else
    git clone https://github.com/creationix/nvm.git $NVM_ROOT
cat > $NVM_SCRIPT <<EOL
source $NVM_ROOT/nvm.sh
EOL
fi
source $NVM_SCRIPT


# Install node
nvm install $NODE_VERSION
nvm alias default $NODE_VERSION


# Set command line prompt
echo "PS1='$PROJECT:\W\$ '" >> /home/vagrant/.bash_profile


cd /vagrant

echo ""
echo "========="
echo "== Box =="
echo "========="
echo "Processors: $(grep 'model name' /proc/cpuinfo | wc -l)"
echo "Memory:     $(grep MemTotal /proc/meminfo | sed -re 's/^MemTotal:\s+//g')"

echo ""
echo "========"
echo "== OS =="
echo "========"
echo "$(lsb_release -a)"

echo ""
echo "=========="
echo "== Node =="
echo "=========="
echo "$(node --version)"