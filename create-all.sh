echo "########################################"
echo " DELETE json FILE "
echo "########################################"
rm fake-*.json

echo "########################################"
echo " CREATE EMPTY json FILE "
echo "########################################"
touch fake-customer-qn.json
touch fake-customer-fta.json
touch fake-customer-snrf.json

touch fake-contact-qn.json
touch fake-contact-fta.json
touch fake-contact-snrf.json

touch fake-order-qn.json
touch fake-order-fta.json
touch fake-order-snrf.json

touch fake-orderLine-qn.json
touch fake-orderLine-fta.json
touch fake-orderLine-snrf.json

echo "########################################"
echo " GENERATE DATA "
echo "########################################"
node beesearch/fake-customer-flat.js qn $1 $2
#node beesearch/fake-customer-flat.js fta $1 $2
#node beesearch/fake-customer-flat.js snrf $1 $2


echo "########################################"
echo " CHECK WORLD COUNT "
echo "########################################"
wc -l fake-customer-qn.json
wc -l fake-customer-fta.json
wc -l fake-customer-snrf.json

wc -l fake-contact-qn.json
wc -l fake-contact-fta.json
wc -l fake-contact-snrf.json

wc -l fake-order-qn.json
wc -l fake-order-fta.json
wc -l fake-order-snrf.json

wc -l fake-orderLine-qn.json
wc -l fake-orderLine-fta.json
wc -l fake-orderLine-snrf.json


echo "########################################"
echo " COPY FILE TO SPARK ? [y/n] "
echo "########################################"

read touche

case $touche in
		y)
			cp fake*.json /Users/alex/ab-repo/bee-spark/src/main/resources
			ll /Users/alex/ab-repo/bee-spark/src/main/resources/*.json
			;;
		n)
			echo "Bye"
			;;
esac