x=`find * -type f -name "*.yaml"`

echo "{"
for i in $x; do
  echo "    \"${i%.yaml}\": \"$i\","
done
echo "    \"destination\": \"schema\""
echo "}"
