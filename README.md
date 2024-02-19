# lightning-deployment
This project repository includes multiple projects. API Server Project, Build Server Project, S3 Bucket reverse proxy, Front end Project



# How to setup project into local machine

1. Fire npm install in all folders "api-server", "build-server" and "s3-reverse-proxy"
2. Docker build the build-server and push the image to AWS ECR.


# Setup Api service
1. Add all necessary credentials to task, suck as access key, secret access key, region

# Setup Aws S3 bucket
1. Create Aws s3 bucket
2. Create new user from IAM user in AWS, give full admin access
3. Save access key , secret access key 

# Setup Aws ECR
1. Create new Repository on AWS ECR
2. Build docker image from local
3. Push docker image to Aws ECR

# Setup Aws ECS
1. Create new ECS task
2. Assign ECR image to this ECS task