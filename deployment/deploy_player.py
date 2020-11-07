 #!/usr/bin/python
 # -*- coding: utf-8 -*-

DEPLOY_PREVIEW = None
CURRENT_PLAYER_VERSION = 6
#DEPLOY_PREVIEW = 6 # number or none

import os, sys
from deploy_foundation import gzip_files, push_to_bucket, user_halt, is_production,require_branch,check_all_is_commited,add_release_tag,is_forcing, get_dev_subdir

if CURRENT_PLAYER_VERSION == DEPLOY_PREVIEW:
	print "Configuration Error: Current version and preview are the same."
	sys.exit()

# config
player_version = DEPLOY_PREVIEW if DEPLOY_PREVIEW else CURRENT_PLAYER_VERSION
bucket_subdir_production = "player/" + str(player_version) + "/"
bucket_subdir_dev= get_dev_subdir()

# get codepath
rootpath = os.getcwd()
subdir = "/projects/player/dist/"
codepath = rootpath + subdir

# is production?
production = is_production()

# make sure repo is not dirty
if not DEPLOY_PREVIEW and production and not is_forcing():
	check_all_is_commited()
	require_branch("master")

# send info to user
user_halt ("Deploying to " + ("PRODUCTION" if production else "DEVELOPMENT"), is_forcing() )
cloudfront_distribution_id = "EMLA4OYCLIFCC" if production else "E1IRCIQ3J1SWWC"

# build player project
os.system("grunt")

# gzip files
gzip_files(codepath)

# push to s3
bucket_name = "vp-src.videopath.com" if production else "player-dev.videopath.com"

bucket_subdir = bucket_subdir_production if production else bucket_subdir_dev
push_to_bucket (codepath, bucket_name, bucket_subdir, cloudfront_distribution_id)

if DEPLOY_PREVIEW:
	add_release_tag("Player-Preview")
	os.system("git push --tags")

if production:
	add_release_tag("Player")
	os.system("git push --tags")
