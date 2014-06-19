rm fake-*.json

touch fake-product-qn.json
touch fake-product-fta.json
touch fake-product-snrf.json
touch fake-customer-qn.json
touch fake-customer-fta.json
touch fake-customer-snrf.json
touch fake-order-qn.json
touch fake-order-fta.json
touch fake-order-snrf.json

node beesearch/fake-product.js qn $1
node beesearch/fake-product.js fta $1
node beesearch/fake-product.js snrf $1
node beesearch/fake-customer.js qn $2
node beesearch/fake-customer.js fta $2
node beesearch/fake-customer.js snrf $2
node beesearch/fake-order.js qn $1
node beesearch/fake-order.js fta $1
node beesearch/fake-order.js snrf $1

wc -l fake-product-qn.json
wc -l fake-product-fta.json
wc -l fake-product-snrf.json
wc -l fake-customer-qn.json
wc -l fake-customer-fta.json
wc -l fake-customer-snrf.json
wc -l fake-order-qn.json
wc -l fake-order-fta.json
wc -l fake-order-snrf.json


echo "Envoyer vers Elasticsearch ? [y/n]"

read touche

case $touche in
	y)
		echo "Send log to elasticsearch"
		cat fake-product-qn.json | nc -q 500 localhost 3401
		cat fake-customer-qn.json | nc -q 500 localhost 3402
		cat fake-order-qn.json | nc -q 500 localhost 3403
		cat fake-product-fta.json | nc -q 500 localhost 3404
		cat fake-customer-fta.json | nc -q 500 localhost 3405
		cat fake-order-fta.json | nc -q 500 localhost 3406
		cat fake-product-snrf.json | nc -q 500 localhost 3407
		cat fake-customer-snrf.json | nc -q 500 localhost 3408
		cat fake-order-snrf.json | nc -q 500 localhost 3409
		;;
	n)
		echo "Bye"
		;;
esac	
