# Introduction

This tutorial will show you how to install haxroomie into a VPS running Ubuntu 18.04 LTS (probably works for Debian too).

# Prerequisites

- VPS with Ubuntu 18.04 LTS installed
- SSH access to the server
- An user to run haxroomie with 
  - **DO NOT RUN HAXROOMIE AS ROOT USER**
  - search how to `create linux user` if u dont know how

# Step 1: Make sure your system is updated

Run these in console to update the system:
```
sudo apt update
sudo apt upgrade
```

# Step 2: Install required dependencies

Haxroomie is developed with Node.js and is available in the npm repositories.

Installing Node.js from the default repositories in Ubuntu 18.04 gets us version 8.10.0.
Haxroomie requires a newer version.

You can get a newer version following the installation instructions below.

To install Node.js and npm:
```
cd ~
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install -y nodejs
```

# Step 3: Configure npm

Node Package Manager (npm) needs a bit of configuring before you can use it to
install haxroomie with it.

Follow 
[this guide](https://medium.com/@sifium/using-npm-install-without-sudo-2de6f8a9e1a3)
to configure your npm properly!

# Step 4: Install haxroomie

Next we use npm to install haxroomie:
```
npm install haxroomie -g
```

# Step 5: Install dependencies for the Chrome browser

You can try running haxroomie already, but it will probably fail if you have not previously installed Chrome using the Ubuntu package manager etc. Chrome requires some system libraries to run.

You can install the Chrome dependencies with:
```
sudo apt install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

# Step 6: Install `screen`

GNU screen is a full-screen window manager. It basically allows haxroomie to keep running when you disconnect from your SSH session. Without it haxroomie and all your rooms close when you disconnect.

Install screen with:
```
sudo apt install screen
```

Start a new screen session:
```
screen -S haxroomie
```

Now you are controlling the newly created screen session.

To exit the session press `Ctrl-a d`.

To resume the session execute:
```
screen -r haxroomie
```

When you connect to your server you have to resume the screen session to be able to control haxroomie again.

# Step 7: Configuring haxroomie

Haxroomie uses a config file to define how many and what kind of rooms you want to run.

You can copy one of the examples to `~/.haxroomie/config.js` to get a starting point.
If you don't, then one of the examples is copied there anyways.

e.g.
```
cp ~/haxroomie/examples/configs/1-public-room.js ./haxroomie/config.js
nano ./config.js
```

If you do not like to edit the config file in the console, you can create/edit the config with your preferred editor and then upload the file with your preferred SFTP client e.g. [FileZilla](https://filezilla-project.org/).

# Step 8: Start haxroomie

Now you are ready to run haxroomie!

To see all available command line arguments:
```
haxroomie --help
```

To start haxroomie:
```
haxroomie
```

When started you will be prompted for tokens for rooms that have the `autoStart: true` option set in their config. Obtain tokens from <https://www.haxball.com/headlesstoken>. One token is valid for only some time (30-60 minutes?).

After entering the tokens (if any) you can type `help` to see the commands that you can use to control the rooms.

