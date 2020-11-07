 #!/usr/bin/python
 # -*- coding: utf-8 -*-

import os

from deploy_foundation import gzip_files, push_to_bucket, user_halt, is_production, require_branch, insert_timestamp, check_all_is_commited, add_release_tag, is_forcing, get_dev_subdir


# config
rootpath = os.getcwd()

# is production?
production = is_production()
if production and not is_forcing():
	require_branch("master")
	check_all_is_commited()


user_halt("Deploying to " + ("PRODUCTION" if production else "DEVELOPMENT"), is_forcing())

# open s3 connection
bucket_name = "app-prod.videopath.com" if production else "app-dev.videopath.com"
cloudfront_distribution_id = "E21AE5JQR829VY" if production else "E2BL1UPPFAOVOQ" 

# build full project
os.system("grunt")

bucket_subdir_prefix = ("" if production else get_dev_subdir())


#### builder

# get codepath
subdir = "/projects/player/dist/"
codepath = rootpath + subdir
bucket_subdir = bucket_subdir_prefix + "builder/"

# zip and push builder//player
gzip_files(codepath)
insert_timestamp(codepath + "player.html")
push_to_bucket(codepath, bucket_name, bucket_subdir, cloudfront_distribution_id)


#### app
subdir = "/projects/app/dist/"
codepath = rootpath + subdir
bucket_subdir = bucket_subdir_prefix + ""

# zip and push app
gzip_files(codepath)
insert_timestamp(codepath + "index.html")
push_to_bucket(codepath, bucket_name, bucket_subdir, cloudfront_distribution_id)


### styleguide
subdir = "/projects/shared/demo/"
codepath = rootpath + subdir
bucket_subdir = bucket_subdir_prefix + "styleguide/"
push_to_bucket(codepath, bucket_name, bucket_subdir, cloudfront_distribution_id)


# add release tag to git
if production:
	add_release_tag("Backend")
	os.system("git push --tags")

