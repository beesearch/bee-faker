echo "########################################"
echo " DELETE CSV FILE "
echo "########################################"
rm fake-*.csv

echo "########################################"
echo " CREATE EMPTY CSV FILE "
echo "########################################"
touch fake-customer-qn.csv
#touch fake-customer-fta.csv
#touch fake-customer-snrf.csv
touch fake-order-qn.csv
#touch fake-order-fta.csv
#touch fake-order-snrf.csv

echo "########################################"
echo " GENERATE DATA "
echo "########################################"
node beesearch/fake-customer-flat.js qn $1
#node beesearch/fake-customer-flat.js fta $1
#node beesearch/fake-customer-flat.js snrf $1
node beesearch/fake-order-flat.js qn $1 $2
#node beesearch/fake-order-flat.js fta $1 $2
#node beesearch/fake-order-flat.js snrf $1 $2

echo "########################################"
echo " CHECK WORLD COUNT "
echo "########################################"
wc -l fake-customer-qn.csv
#wc -l fake-customer-fta.csv
#wc -l fake-customer-snrf.csv
wc -l fake-order-qn.csv
#wc -l fake-order-fta.csv
#wc -l fake-order-snrf.csv

echo "########################################"
echo " COPY FILE TO SPARK ? [y/n] "
echo "########################################"

read touche

case $touche in
		y)
			cp fake*.csv /Users/alex/ab-repo/bee-spark/src/main/resources
			;;
		n)
			echo "Bye"
			;;
esac