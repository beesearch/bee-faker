rm fake-*.json

touch fake-customer-qn.json
touch fake-customer-fta.json
touch fake-customer-snrf.json
touch fake-order-qn.json
touch fake-order-fta.json
touch fake-order-snrf.json
touch fake-product-qn.json
touch fake-product-fta.json
touch fake-product-snrf.json

node beesearch/fake-customer.js qn 10
node beesearch/fake-customer.js fta 10
node beesearch/fake-customer.js snrf 10
node beesearch/fake-order.js qn 10
node beesearch/fake-order.js fta 10
node beesearch/fake-order.js snrf 10
node beesearch/fake-product.js qn 10
node beesearch/fake-product.js fta 10
node beesearch/fake-product.js snrf 10

wc -l fake-customer-qn.json
wc -l fake-customer-fta.json
wc -l fake-customer-snrf.json
wc -l fake-order-qn.json
wc -l fake-order-fta.json
wc -l fake-order-snrf.json
wc -l fake-product-qn.json
wc -l fake-product-fta.json
wc -l fake-product-snrf.json