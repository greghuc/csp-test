Vagrant.configure('2') do |config|

  config.vm.box = 'precise64'
  config.vm.box_url = 'http://files.vagrantup.com/precise64.box'

  config.vm.provision :shell, :path => 'bin/vagrant.sh'

  # For CSP website access on localhost
  config.vm.network :forwarded_port, host: 6001, guest: 6001

end