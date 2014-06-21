rm fake-*.json

touch fake-product-qn.json
touch fake-product-fta.json
touch fake-product-snrf.json
touch fake-customer-qn.json
touch fake-customer-fta.json
touch fake-customer-snrf.json

node beesearch/fake-product.js qn $1
node beesearch/fake-product.js fta $1
node beesearch/fake-product.js snrf $1
node beesearch/fake-customer.js qn $1 $2
node beesearch/fake-customer.js fta $1 $2
node beesearch/fake-customer.js snrf $1 $2

wc -l fake-product-qn.json
wc -l fake-product-fta.json
wc -l fake-product-snrf.json
wc -l fake-customer-qn.json
wc -l fake-customer-fta.json
wc -l fake-customer-snrf.json

echo "Send log to Elasticsearch ? [y/n]"

read touche

case $touche in
	y)
		echo "Indexing.... please wait"
		cat fake-product-qn.json | nc localhost 3401
		cat fake-customer-qn.json | nc localhost 3402

		cat fake-product-fta.json | nc localhost 3411
		cat fake-customer-fta.json | nc localhost 3412

		cat fake-product-snrf.json | nc localhost 3421
		cat fake-customer-snrf.json | nc localhost 3422

		;;
	n)
		echo "Bye"
		;;
esac	
