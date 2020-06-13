## Objective:
1. There is a Devops pipeline where it saves configuration files/parameters in repo like Git.
2. Automation tools like Jenkins/Ansible need to continuously check the changes in repo and
pickup the change in config file.
3. Based on the configuration, automation tool needs to check if ngnix is already running in
AWS cloud or not.
4. Use Existing AWS Vm :- Install nginx on the instance and then apply the new changes in
ngnix config based on repo changes.

## Solution
<img src="https://github.com/wprabhakar/ansible-nodejs/blob/master/docs/Solution.png">

## Setup Details

####  Login to Ansible Server  
#####  setup git, nginx, nodejs, pm2 and the ansible-nodejs application
#####

##
 ```sh
  # install ansible
  sudo yum install epel-release -y
  sudo yum install ansible -y
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

#### Validating the setup
###### repo ( https://github.com/wprabhakar/ashnik ) contains nginx.conf
###### configure WebHook in the test repository to invoke  http://18.138.225.104/nginxconf_changed on push event
<img src="https://github.com/wprabhakar/ansible-nodejs/blob/master/docs/GitHubWebHookConfiguration.png">

###### edit nginx.conf and change the port to any port other than 80
###### once the deployment is complete ( 1-2 minutes ), try accessing http://3.0.201.72  ( not reachable )

###### edit nginx.conf and change the port to 80
###### once the deployment is complete ( 1-2 minutes ), try accessing http://3.0.201.72 ( reachable )
######
##### End of Validation
######




