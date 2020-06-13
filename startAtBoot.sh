cp nginx-setup/nginx /etc/init.d/.
chmod +x /etc/init.d/nginx
sudo npm install pm2 -g
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemv -u ec2-user --hp /home/ec2-user
pm2 start index.js --name="cicd-server"
pm2 save


