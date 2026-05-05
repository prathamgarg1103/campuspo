import urllib.request
import json

overpass_url = 'http://overpass-api.de/api/interpreter'
overpass_query = '''
[out:json];
area["name"="Thapar Institute of Engineering and Technology"]->.searchArea;
(
  node(area.searchArea);
  way(area.searchArea);
  relation(area.searchArea);
);
out center;
'''

try:
    req = urllib.request.Request(overpass_url, data=overpass_query.encode('utf-8'))
    response = urllib.request.urlopen(req)
    data = json.loads(response.read())

    for element in data['elements']:
        if 'tags' in element and 'name' in element['tags']:
            name = element['tags']['name']
            lat = element.get('lat', element.get('center', {}).get('lat'))
            lon = element.get('lon', element.get('center', {}).get('lon'))
            print(f'{name}: {lat}, {lon}')
except Exception as e:
    print(f"Error: {e}")
