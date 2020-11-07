 #!/usr/bin/python
 # -*- coding: utf-8 -*-

# walk all files and create gzip versions of css and js files
import os, json
import gzip
from boto.s3.connection import S3Connection
from boto.cloudfront import CloudFrontConnection
import sys
import time

from git import Repo

#
# gzips all files in codepath
#
def gzip_files(codepath):
    pass


def push_to_bucket(codepath, bucket_name, bucket_subdir = "", invalidate_distribution = None):

    try:
        json_data=open('../conf.json').read()
        conf = json.loads(json_data)
        for key in conf:
            os.environ[key] = conf[key]
    except:
        print 'Could not load conf file'

    # open s3 connection
    aws_access_key_id = os.getenv('AWS_ACCESS_KEY',None)
    aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY',None)
    conn = S3Connection(aws_access_key_id, aws_secret_access_key, host='s3-us-west-1.amazonaws.com', is_secure=False)
    conn_cf = CloudFrontConnection(aws_access_key_id, aws_secret_access_key)

    bucket = conn.get_bucket(bucket_name)

    # walk all files in dir and push to bucket
    paths = []
    for path, subdirs, files in os.walk(codepath):
        for name in files:
            # don't upload hidden files
            if name[0] == ".":
                continue

            pathname = os.path.join(path, name)
            keyname = bucket_subdir + pathname.replace(codepath, "")

            #
            # zip file
            #
            in_data = open(pathname, "rb").read()
            gzf = gzip.open(pathname, "wb")
            gzf.write(in_data)
            gzf.close()

            # log
            print pathname + " --> " + keyname

            # get key
            key = bucket.new_key(keyname)

            # set meta data for cache control
            max_age = "600"
            s_max_age = str(60*60*24*30) # cache for one month
            if ".htm" in keyname:
                max_age = "10" # don't cache html files
            key.set_metadata("Cache-Control", "public, max-age="+max_age + ", s-maxage=" + s_max_age)

            # set gzip metadata
            key.set_metadata("Content-Encoding", "gzip")

            key.set_contents_from_filename(pathname, policy = "public-read")
            paths.append(keyname)   

    # invalidate all paths on cloudfront
    if invalidate_distribution and invalidate_distribution != None:
        conn_cf.create_invalidation_request(invalidate_distribution, paths)




def user_halt(alert, force = False):
    print "\n\n\n\n----------------------------------------------------------------------"
    print alert
    print "----------------------------------------------------------------------\n\n\n\n"
    if not force:
        raw_input("Press Enter to continue...")

def is_production():
    if len(sys.argv) > 1 and sys.argv[1] == "PRODUCTION":
        return True
    return False

def is_forcing():
    if "force" in sys.argv:
        return True
    return False

def check_all_is_commited():
    repo = Repo('./')
    if repo.is_dirty(untracked_files=True):
        print "There are untracked or changed files in the repo. Please commit before exporting."
        sys.exit()


def add_release_tag(name):
    repo = Repo('./')
    tagname = name + "_Release_" + str(time.time())
    repo.create_tag(tagname, message='Published to Production')

def require_branch(required_branch):
    repo = Repo('./')
    branch = str(repo.active_branch)
    print branch

    if branch != required_branch:
        print "Can't deploy from branch " + branch + ". Branch " + required_branch + " is required for this."
        sys.exit()

def replace_in_file(replacements, file_name):
    string = open(file_name).read()
    for key in replacements:
        string = string.replace(key, replacements[key])
    f = open(file_name, 'w')
    f.write(string)
    f.close()

def insert_timestamp(file_name):
    replacements = {
        "{time_stamp}" : str(int(time.time()))
    }
    replace_in_file(replacements,file_name)

def get_dev_subdir():
    # try to fetch branch from codeship env vars
    branch = os.environ.get("CI_BUILD_REF_NAME")
    if not branch:
        repo = Repo('./')
        branch = str(repo.active_branch)
    return "/" + branch + "/"




