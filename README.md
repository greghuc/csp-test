# README

This project tests the effect of Chrome's [Content Security Policy](https://w3c.github.io/webappsec/specs/content-security-policy) implementation on extensions. Specically, can a Chrome extension inject remote scripts, styles and iframes into a web-page, if the page's CSP does not explicitly whitelist the remote origin used?

The project consists of:
* a website with a stringent CSP: default-src 'none';
* a Chrome extension that injects remote-src elements into the current webpage (on button click). 

The Chrome browser can be tested by:
* installing the extension
* opening the project website at: http://localhost:6001
* clicking the extension button to initiate element injection.

The following cases are tested:
* Direct element injection from extension:
  * Remote script: <script src="http://assets.someremoteorigin.com:6001/test.js"
  * Remote css: <link rel="stylesheet" href="http://assets.someremoteorigin.com:6001/test.css"
  * Remote iframe: <iframe src="http://assets.someremoteorigin.com:6001/test.html"
* Transitive element injection: the extension injects a remote script, which then itself loads:
  * Remote script: <script src="http://assets.someremoteorigin.com:6001/transitive/test.js"
  * Remove css: <link rel="stylesheet" href="http://assets.someremoteorigin.com:6001/transitive/test.css"
  * Remote iframe: <iframe src="http://assets.someremoteorigin.com:6001/transitive/test.html"
  
## Results for 2014-08-14

Chrome was tested for official and canary builds:
* Official: 36.0.1985.143
* Canary: 38.0.2123.0 canary (64-bit)

Both builds showed the same behaviour:
* Direct element injection from extension:
  * [SUCCESS] Remote script: <script src="http://assets.someremoteorigin.com:6001/test.js"
  * [SUCCESS] Remote css: <link rel="stylesheet" href="http://assets.someremoteorigin.com:6001/test.css"
  * [FAILURE] Remote iframe: <iframe src="http://assets.someremoteorigin.com:6001/test.html"
* Transitive element injection: the extension injects a remote script, which then itself loads:
  * [FAILURE] Remote script: <script src="http://assets.someremoteorigin.com:6001/transitive/test.js"
  * [FAILURE] Remove css: <link rel="stylesheet" href="http://assets.someremoteorigin.com:6001/transitive/test.css"
  * [FAILURE] Remote iframe: <iframe src="http://assets.someremoteorigin.com:6001/transitive/test.html"
  
So both builds are busted for injection of:
* remote iframes
* remote scripts, css and iframes, if loaded transitively by extension-injected remote script

## Project setup

Project setup on a local machine is simple:
* Make assets.someremoteorigin.com an alias for localhost (so can pretend localhost is a remote origin)
* Start up CSP-stringent website (runs in virtual machine, but is accessible at: http://localhost:6001)
* Install the Chrome extension (stored in extension dir)

### Make assets.someremoteorigin.com an alias for localhost

```
# Add to /etc/hosts the line: 127.0.0.1 assets.someremoteorigin.com  
# One-liner:
sudo bash -c "echo '127.0.0.1       assets.someremoteorigin.com' >> /etc/hosts"
```

### Start up CSP-stringent website

```
# Install the vm management software: VirtualBox and Vagrant
# VirtualBox: https://www.virtualbox.org/wiki/Downloads
# Vagrant: http://www.vagrantup.com/downloads-archive.html
# VirtualBox 4.2.24 and Vagrant 1.6.3 work together

# Grab this project
git clone https://github.com/greghuc/csp-test.git
cd csp-test

# Run commands to bootstrap the vm
vagrant up
# Now wait some time whilst the vm bootstraps..

# Run commands to setup the website
# Start by logging into the vm
vagrant ssh
cd /vagrant
npm install

# Run the website
npm run web-server
# It's accessible via Chrome at: http://localhost:6001
# Uses port forwarding

# And to stop things..
Ctrl-C the server
exit
# To stop the vm
vagrant halt

# To restart the website
vagrant up
cd /vagrant
npm run web-server
```

### Install the Chrome extension 
```
# Open Chrome 'Extensions' menu, then 'Load unpackaged extension'
# And select extension dir
```

## Testing Chrome
```
# Start Chrome, and open http://localhost:6001
# Open the Chrome console, to check for errors
# Click the extension top-right 'Hello' button to initiate remote element injection
# Review the console for errors, and check if expected changes happened on webpage

```