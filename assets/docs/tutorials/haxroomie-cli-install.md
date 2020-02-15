# Introduction

This tutorial will show you how to install haxroomie-cli into a VPS running Ubuntu 18.04 LTS (probably works for Debian too).

# Prerequisites

- VPS with Ubuntu 18.04 LTS installed
- SSH access to the server
- An user to run haxroomie-cli with
  - **DO NOT RUN HAXROOMIE AS ROOT USER**

# Step 1: Make sure your system is updated

Run these in console to update the system:

```
sudo apt update
sudo apt upgrade
```

# Step 2: Install Node.js and haxroomie-cli

Haxroomie is developed with Node.js so we need to install that.

In this guide we use _nvm (Node Version Manager)_ to install Node.js but you
can use your preferred mode. Just make sure the global installation path
for npm is where user has permissions or the headless browser cannot be
installed.

Run the following commands to install _nvm, node.js and haxroomie-cli_.

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
. ~/.bashrc
nvm install 12.16
nvm use 12.16
npm install haxroomie-cli -g
```

# Step 3: Install dependencies for the Chrome browser

You can try running haxroomie-cli already, but it will probably fail if you have not previously installed Chrome using the Ubuntu package manager etc. Chrome requires some system libraries to run.

You can install the Chrome dependencies with:

```
sudo apt install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

# Step 4: Install `screen`

GNU screen is a full-screen window manager. It basically allows haxroomie-cli to keep running when you disconnect from your SSH session. Without it haxroomie-cli and all your rooms close when you disconnect.

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

# Step 5: Configuring haxroomie

Haxroomie uses a config file to define how many and what kind of rooms you want to run.
When you start haxroomie a default one will be created in `~/.haxroomie/config.js`
(`~` means your users home directory).

See [this page](https://morko.github.io/haxroomie/tutorial-haxroomie-cli-config.html)
for guide about the configuration file. For example configuration files see
[this page](https://github.com/morko/haxroomie/tree/master/packages/haxroomie-cli/examples/configs).

If you do not like to edit the config file in the console, you can create/edit the config with your preferred editor and then upload the file with your preferred SFTP client e.g. [FileZilla](https://filezilla-project.org/).

# Step 6: Start haxroomie

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
