from boto.s3.connection import S3Connection

conn = S3Connection()
in_bucket = conn.get_bucket("vp-video-cdn")
backup_bucket = conn.get_bucket("misc.videopath.com")

for key in in_bucket.list():
	print key.name
	#key.set_acl('public-read') 
	

	backup_key = backup_bucket.get_key(key.name)
	#if ( backup_key ):
	# 	print "skipping: " + key.name
	# 	continue

	print "copying: " + key.name

	# if copy successfull, delete in in bucket
	result = key.copy(backup_bucket, "videos/" + key.name)
	result.set_acl('public-read') 
	print "  done"

	#if result:
	#	key.delete()