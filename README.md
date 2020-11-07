# videopath web app

[ ![Codeship Status for videopath/web-app](https://www.codeship.io/projects/0367bb20-24aa-0132-26aa-16bedb7c0277/status)](https://www.codeship.io/projects/36948)

===

## Installation

#### Prerequisites

* nodejs and npm (node package manager), install via homebrew on mac
* ruby and gem
* grunt, install via npm install -g grunt

#### Installation

	#Clone Repository
	git clone…

	#install all dependencies with install script
	./install.sh

#### Run

	#build all projects
	grunt

	#start watch on all projects and start dev webserver
	sudo grunt dev

#### Folder Structure

	#deployment scripts
	/deployment

	#testcode for certain small problems
	/tools

	#actual javascript projects
	/projects/app #web-backend as reachable via app.videopath.com
	/projects/player #code for videopath player
	/projects/embed_code #code for lightbox embedding

