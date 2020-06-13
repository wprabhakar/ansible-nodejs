## Objective:
1. There is a Devops pipeline where it saves configuration files/parameters in repo like Git.
2. Automation tools like Jenkins/Ansible need to continuously check the changes in repo and
pickup the change in config file.
3. Based on the configuration, automation tool needs to check if ngnix is already running in
AWS cloud or not.
4. Use Existing AWS Vm :- Install nginx on the instance and then apply the new changes in
ngnix config based on repo changes.

## Solution
<img src="./docs/Solution.svg">

## Setup Details

####  Login to Ansible Server  
#####  setup git, nginx, nodejs, pm2 and the ansible-nodejs application
#####

##
 ```sh
  # install git & nginx
  sudo yum install -y git nginx
  # install nodejs
  npm config set registry http://registry.npmjs.org/
  curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
  sudo yum clean all && sudo yum makecache fast
  sudo yum install -y gcc-c++ make
  sudo yum install -y nodejs
  # download the ansible-nodejs application
  git clone https://github.com/wprabhakar/ansible-nodejs
  cd ansible-nodejs
  # setup dependencies
  npm install
  # Setup routing of requests to NodeJS application
  sudo cp nginx-setup/nginx.conf /etc/nginx/nginx.conf
  # Ensure that both nginx & nodejs are started when the system boots up.
  sudo ./startAtBoot.sh
```

#### Setup AnsibleServer's public key on WebServer
##### Generate SSH key in Ansible Server
##
 ```sh
  ssh-keygen -t rsa
  # manually copy the public key ( ~/.ssh/ida_rsa.pub ) to WebServer
  sudo reboot
  
  # login again and ensure that nginx & nodejs applications are running
  service nginx status
  pm2 logs
```
#### Login to WebServer
##
 ```sh
   cat <your_public_key_file> >> ~/.ssh/authorized_keys
```
   
