 #!/usr/bin/python
 # -*- coding: utf-8 -*-

import os
from deploy_foundation import gzip_files, push_to_bucket, user_halt, is_production,require_branch,check_all_is_commited,add_release_tag,is_forcing, get_dev_subdir

# is production?
production = is_production()

# config
code_version = 3
bucket_subdir_production = "embed/" + str(code_version) + "/"
bucket_subdir_dev = get_dev_subdir() + 'embed/'
cloudfront_distribution_id = "E2IVA43H31GXID" if production else "E1IRCIQ3J1SWWC" 

# get codepath
rootpath = os.getcwd()
subdir = "/projects/embed_code/dist/"
codepath = rootpath + subdir

if production and not is_forcing():
	check_all_is_commited()
	require_branch("master")

# alert user
user_halt ("Deploying to " + ("PRODUCTION" if production else "DEVELOPMENT"), is_forcing() )

# build player project
os.system("grunt --gruntfile ./projects/embed_code/gruntfile.js")

# gzip
gzip_files(codepath)

# push to s3
bucket_name = "vp-src.videopath.com" if production else "player-dev.videopath.com"
bucket_subdir = bucket_subdir_production if production else bucket_subdir_dev
push_to_bucket(codepath, bucket_name, bucket_subdir, cloudfront_distribution_id)

if production:
	add_release_tag("Embed")
	os.system("git push --tags -o ci.skip")

