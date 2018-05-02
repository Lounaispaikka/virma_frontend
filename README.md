# Virma frontend
This repository contains frontend source code for Virma application. Application is hosted at https://virma.lounaistieto.fi.

# Getting started

## Prerequisities
Project base is based on https://github.com/charto/charto repository with heavy modifications. Most notable packages from this repository are phopshor widgets, charto-leaflet, cbuild to name a few.
Project uses System.js module loader which is used for importing JavaScript to the DOM. TypeScript is used as the main language through the application, therefore React components and some other files are written as .ts or .tsx files.

Frontend is made primarily with React framework with mobx state management. Other used frameworks are Leaflet & React-bootstrap.

## Installing
Basic instructions for installing backend & frontend are explained here.

### Frontend
```
1. npm install
2. cd bundler

npm install
cd ..

3. npm run build
4. npm run bundle
5. npm start
6. By default running at http://localhost:8080
```

### Backend
```
1. npm install
2. npm start (or npm run start-dev)
3. By default running at http://localhost:8081
```

# Development
Development can be done locally by first configuring necessary config files to pointing a locally, VM or server run database (PostgreSQL + PostGIS). Config changes are needed for frontend & backend. In frontend by modifying /src/config.ts and in backend /config.js.

Mapproxy dependency can be avoided by using publicly avaible tileservice (e.g. Kapsi).

By default sending email locally is not possible and will need some kind of VM to run the backend on.

During development, it is not necessary to build & bundle the application everytime making to modifications to the application. System.js will automatically build the application when page is refreshed. However, if the application is already built, it is necessary to remove bundle.js file from /dist/bundle.js in order to run the application with the latest changes.

Adding new npm packages may require manual labor for setting them up for System.js & TypeScript:
1. Install package normally and add typings:
```
npm install --save leaflet @types/leaflet
```
2. Add package manually to config-npm.js file (copy from other examples)
3. Make sure that install was successfull by running npm run build & npm run bundle
4. If error messages are shown at console, some other packages may need to be installed manually (error messages are complaining about missing package/s)

Building application on Windows needs different running scripts than in Linux (Package.json)
- Windows:
  - build -> "tsc -p src NUL: || echo"
- Linux:
  - build -> "tsc -p src > /dev/null || true"

# Deployment
Deployment instructions are based on the current deployment. Different technologies can be used. When moving new bundle to the server, it is also necessary to move static assets seperately (css, .jpg, .json files).

### Ubuntu 16.04
- Default configuration. Remember to open ports for (Sendmail, Nginx & PostgreSQL)

### PostgreSQL + PostGIS
- Default installation.

### Nginx
```
sudo apt-get nginx
```

### Certbot (Let's Encrypt) (for Nginx installation)
```
1. sudo apt-get update
2. sudo apt-get install software-properties-common
3. sudo add-apt-repository ppa:certbot/certbot
4. sudo apt-get update
5. sudo apt-get isntall python-certbot nginx
6. sudo certbot --nginx (asks for email address)
7. sudo certbot renew --dry-run

Nginx /etc/nginx/sites-enabled/default should look something after Certbot like this...

server {
  listen 80 default_server;
  listen [::]:80 default_server;

  listen 443 ssl;
  ssl_certificate <path-to-certificate>;
  ssl_certificate_key <path-to-cerfiticate-key>;

  include <letsencrypt-configs>
  ssl_dhparam <letsencrypt-configs>

  root <path-to-frontend>
  index index.html

  server_name <app-dns>

  location / {
    if ($ssl_protocol = "") {
      rewrite ^ https://$server_name$request_uri?;

      proxy_http_version 1.1.;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy-set_header Host $host;
      proxy_cache_bypass $http_upgrade;

      try_files $uri $uri/ =404;
    }
  }

  location /api {
    proxy_pass http://127.0.0.1:<backend_port>;
  }

  location /service {
    proxy_pass http://127.0.0.1:<frontend_port>;
  }
}
```

### Sendmail
```
1. sudo apt-get install sendmail
2. sudo sendmailconfig (set custom config)
3. service sendmail restart
4. Test mail can be send with following command -> echo "My test email" | /usr/sbin/sendmail my-email@address.com
```

### Install Mapproxy
In order to install Mapproxy files mapproxy.yaml & seed.yaml are needed.

```
1. sudo aptitude install python-imaging python-yaml libproj-dev
2. easy_install pip
3. pip install MapProxy
4. Put Mapproxy on

mapproxy-util serve-develop -b 0.0.0.0 mapproxy.yaml

5. Load tiles (mapproxy has to be on while loading tiles)

mapproxy-seed -f mapproxy.yaml -s seed.yaml --progress-file .mapproxy_seed_progress
```

### Install Frontend
- Install as instructed above. If you are using nginx configure it to it.

### Install Backend
- Install as instructed above.

### Automatic reloads for services

#### Backend
```
1. cd /etc/systemd/system
2. systemctl virma_backend
3. vi virma_backend.service (content below)
4. sudo systemctl enable virma_backend.service

[Unit]
Description=Node.js virma_backend server

[Service]
PIDFile=/tmp/virma_backend.pid
User=ubuntu
Group=ubuntu
Restart=always
KillSignal=SIGQUIT
WorkingDirectory=/opt/virma_backend/
ExecStart=/usr/bin/npm start

[Install]
WantedBy=multi-user.target
```

#### Mapproxy
```
1. cd /etc/systemd/system
2. systemctl mapproxy
3. vi mapproxy.service (content below)
4. sudo systemctl enable mapproxy.service

[Unit]
Description=mapproxy server

[Service]
PIDFile=/tmp/mapproxy.pid
User=ubuntu
Group=ubuntu
Restart=always
KillSignal=SIGQUIT
WorkingDirectory=/opt/mapproxy/
ExecStart=/usr/local/bin/mapproxy-util serve-develop -b 0.0.0.0 mapproxy.yaml

[Install]
WantedBy=multi-user.target
```

# Repository structure

```
.
|-- bin                       Express server used for hosting static content
|-- bundler                   Contains https://github.com/charto/cbuild bundler for building application
|-- css                       Application stylesheets
|-- src
|   |-- components            Contains all of the React components
|   |   |-- layers            Feature related components
|   |   |-- modals            Modal related components (adminTools, featureModals, loginModals, utilModals etc.)
|   |-- model
|   |   |-- formConfig        Contains all configuration needed for making slight modifications for form content
|   |   |-- layerConfig       Contains all classes assigned for each layer feature type
|   |   |-- messageConfig     Contains notification messages and info modal content
|   |   |-- models            Contains mobx state management
|   |-- App.tsx               Initialize Phosphor widgets
|   |-- AppLayout.ts          Create app widgets
|   |-- config.ts             API, Backgroundmap urls
|   |-- ReactWidget.ts        Creating React component to be rendered inside Phosphor widget
|   |-- tsconfig.json         TypeScript config
|-- vendor                    Folder consists manually loaded npm packages created by https://github.com/jjrv
|-- config-base.js            System.js configuration file
|-- config-npm.js             System.js configuration file for mapping npm packages
|-- config.js                 System.js configutation file
|-- package.json              Configure npm package & scripts
|-- .jpg & .json files        Static files
```

# License
Virma is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT)
