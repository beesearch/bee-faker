## Delete index
```
curl -XDELETE 'http:/localhost:9200/sample'
```

## Create index
```
curl -XPOST 'http:/localhost:9200/sample'
```

## Create mapping
```
curl -XPUT 'http:/localhost:9200/sample/customer/_mapping' -d  '{
	"customer": {
		"properties": {
			"orders" : {
				"type" : "nested",
				"include_in_root": "true",
				"properties" : {
					"orderId":  {"type": "integer"},
					"name": {"type": "string"},
					"orderDescription": {"type": "string"},
					"productCategory": {"type" : "string"},
					"count":  {"type": "integer"}
				}
			}
		}
	}
}'
```

## Check mapping
```
curl -XGET 'http:/localhost:9200/sample/customer/_mapping'
```

## Insert Data
```
curl -XPOST 'http:/localhost:9200/sample/customer' -d '{
	"orders": [
	{
		"orderId": 1,
		"name": "blue",
		"orderDescription": "Chantier avenue Gillet",
		"productCategory": ["a"],
		"count": 100
		},
		{
			"orderId": 2,
			"name": "green",
			"orderDescription": "Chantier avenue Gillet",
			"productCategory": ["a","b"],
			"count": 200

			},
			{
				"orderId": 3,
				"name": "blue",
				"orderDescription": "Chantier avenue Gillet",
				"productCategory": ["a","b","c"],
				"count": 300

			}
	]
}'
```

## Enjoy facet !
```
curl -XPOST 'http:/localhost:9200/sample/customer/_search' -d '{
	"facets": {
		"terms": {
			"terms_stats": {
				"key_field": "productCategory",
				"value_field": "count"
				},
				"nested": "orders"
			}
		}
}'
```



