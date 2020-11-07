import json, os

try:
    json_data=open('../conf.json').read()
    conf = json.loads(json_data)
    for key in conf:
    	os.environ[key] = conf[key]
    	print conf[key]
except:
	raise
	print 'Could not load conf file'

aws_access_key_id = os.getenv('AWS_ACCESS_KEY',None)
aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY',None)

print aws_secret_access_key