echo "########################################"
echo " DELETE csv FILE "
echo "########################################"
rm fake-*.csv

echo "########################################"
echo " CREATE EMPTY csv FILE "
echo "########################################"
touch fake-customer-qn.csv
touch fake-customer-fta.csv
touch fake-customer-snrf.csv

touch fake-contact-qn.csv
touch fake-contact-fta.csv
touch fake-contact-snrf.csv

touch fake-order-qn.csv
touch fake-order-fta.csv
touch fake-order-snrf.csv

touch fake-orderLine-qn.csv
touch fake-orderLine-fta.csv
touch fake-orderLine-snrf.csv

echo "########################################"
echo " GENERATE DATA "
echo "########################################"
node beesearch/fake-customer-flat.js qn $1 $2
#node beesearch/fake-customer-flat.js fta $1 $2
#node beesearch/fake-customer-flat.js snrf $1 $2


echo "########################################"
echo " CHECK WORLD COUNT "
echo "########################################"
wc -l fake-customer-qn.csv
wc -l fake-customer-fta.csv
wc -l fake-customer-snrf.csv

wc -l fake-contact-qn.csv
wc -l fake-contact-fta.csv
wc -l fake-contact-snrf.csv

wc -l fake-order-qn.csv
wc -l fake-order-fta.csv
wc -l fake-order-snrf.csv

wc -l fake-orderLine-qn.csv
wc -l fake-orderLine-fta.csv
wc -l fake-orderLine-snrf.csv


echo "########################################"
echo " COPY FILE TO SPARK ? [y/n] "
echo "########################################"

read touche

case $touche in
		y)
			cp fake*.csv /Users/alex/ab-repo-scala/bee-spark/src/main/resources
			ll /Users/alex/ab-repo-scala/bee-spark/src/main/resources/*.csv
			;;
		n)
			echo "Bye"
			;;
esac