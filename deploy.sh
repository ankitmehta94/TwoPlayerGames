aws s3 rm s3://breviz.tech
echo "deleted"
cp docs/index.html docs/error.html
aws s3 cp docs s3://breviz.tech/ --recursive
echo "uploaded"