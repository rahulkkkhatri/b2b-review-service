aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 869547439523.dkr.ecr.ap-south-1.amazonaws.com

docker build -t prod-zalon-review-service-repository . -f Dockerfile.prod

docker tag prod-zalon-review-service-repository:latest 869547439523.dkr.ecr.ap-south-1.amazonaws.com/prod-zalon-review-service-repository:latest
docker push 869547439523.dkr.ecr.ap-south-1.amazonaws.com/prod-zalon-review-service-repository:latest
