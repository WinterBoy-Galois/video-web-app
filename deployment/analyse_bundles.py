
import json, sys, re
from jsmin import jsmin

GROUP_SELECTORS = [
	'(\/node_modules\/[^\/]*\/)',
	'(\/bower_modules\/[^\/]*\/)',
	'(\/projects\/[^\/]*\/)',
	'(\/projects\/[^\/]*\/style\/)',
	'(\/projects\/[^\/]*\/*\/style\/)'
]

# load modules
with open('projects/player_stats.json') as data_file:    
    data = json.load(data_file)
modules = data['modules']

#
# grouping helper
#
def get_group(string):
	found = 'misc'
	for item in GROUP_SELECTORS:
		m = re.findall(item, string)
		if len(m):
			found = m[len(m)-1]
	return found

	
#
# simulate gzip and minifiy
#
total_size = 0
for m in modules:
	print m['identifier']
	try:
		s = jsmin(m.get('source', ''))
		m['processed_size'] = sys.getsizeof(s)
	except:
		s = m.get('source', '')

	s = s.encode('utf8')
	s = s.encode('zlib')

	m['processed_size'] = sys.getsizeof(s)
	total_size += m['processed_size']
	



#
# sort by processed size
#
modules = sorted(modules, key=lambda i1: i1['processed_size'])

#
# Print!
#
for m in modules:
	percent = abs(m['processed_size'] * 100 / total_size)
	print "{0}% - {1} - {2} - {3}".format(percent, m['processed_size'], m['size'], m['identifier'])

print '===='
# group by folder
groups = {}
for m in modules:
	group = get_group(m['identifier'])
	groups[group] = groups.get(group,0)+m['processed_size']

for key, value in groups.iteritems():
	percent = abs(value * 100 / total_size)
	print "{0}% - {1} - {2}".format(percent, value, key)

