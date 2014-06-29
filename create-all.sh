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
		tail -10000 fake-product-qn.json | nc -q 500 localhost 3401
		tail -10000 fake-customer-qn.json | nc -q 500 localhost 3402

		tail -10000 fake-product-fta.json | nc -q 500 localhost 3411
		tail -10000 fake-customer-fta.json | nc -q 500 localhost 3412

		tail -10000 fake-product-snrf.json | nc -q 500 localhost 3421
		tail -10000 fake-customer-snrf.json | nc -q 500 localhost 3422

		;;
	n)
		echo "Bye"
		;;
esac	
