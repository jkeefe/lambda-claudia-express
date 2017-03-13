# Running Express apps in AWS Lambda

This is a simple example that shows how to deploy an existing [Express](http://expressjs.com/) application, with minimal changes, to AWS Lambda. [Based on and copied from example code](https://github.com/claudiajs/example-projects/tree/master/express-app-lambda) from the original Claudia repo and the [Running Express Apps in AWS Lambda](https://claudiajs.com/tutorials/serverless-express.html) tutorial.

## Installing dependencies

Get the npm package manager up and running with what we'll need:

```
npm init --yes
npm install claudia --save --dev
npm install express --save
```

## Make the Express app.

Mine's usually called `server.js`. [Here's](./server.js) an example.

## Creating a Lambda proxy wrapper

We’ll need a Lambda function to host the Express application, and send data between the app and the API Gateway. The `aws-serverless-express` module knows how to translate between API Gateway requests and Express requests and responses, so we’ll use that. Claudia has a convenient command to generate the wrapper function, so you don’t have to write it manually.

Make sure you’re using Claudia 2.1.0 or later, then execute this command line in your project directory (here `server` is the name of the main Express application module). I'm also adding my existing lambda IAM role, `lambda_basic_execution`. 

`claudia generate-serverless-express-proxy --express-module server --role lambda_basic_execution`

This will add `aws-serverless-express` to your project dependencies, and create the file containing your Lambda function. By default, the file will be called `lambda.js`. You can change the file name using `--proxy-module-name <module name>`

## Deploying to AWS

We can now deploy the Lambda function to AWS, and create the proxy API. With Claudia 2.0, you can create proxy APIs easily – just add the `--deploy-proxy-api` option while creating the function. For `--handler`, use the module name that you just generated (so `lambda` by default) and add `.handler`.

`claudia create --handler lambda.handler --deploy-proxy-api --region us-west-2`

The command will send your app to Lambda and print out a URL where you can access it. That’s pretty much it.

## More information and limitations

Be sure to see these important details in the [Running Express Apps in AWS Lambda](https://claudiajs.com/tutorials/serverless-express.html) tutorial.

