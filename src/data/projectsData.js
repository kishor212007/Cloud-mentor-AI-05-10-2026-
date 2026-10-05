export const projectSuggestions = [
  {
    id: 'proj_s3_hosting',
    title: 'Static Portfolio Website on S3 & CloudFront',
    tamilTitle: 'S3 & CloudFront-ல் இலவச போர்ட்ஃபோலியோ இணையதளம்',
    difficulty: 'Beginner',
    estimatedTime: '2-3 Hours',
    cost: 'Free Tier Eligible ($0.00)',
    objective: 'Host a modern, fast, secure (HTTPS) static resume/portfolio website globally using Amazon S3 and CloudFront CDN without managing any servers.',
    tamilObjective: 'எந்த சர்வரும் இன்றி Amazon S3 மற்றும் CloudFront மூலம் இலவசமாக உங்கள் போர்ட்ஃபோலியோ இணையதளத்தை உலகம் முழுவதும் ஹோஸ்ட் செய்தல்.',
    servicesRequired: [
      { name: 'Amazon S3', role: 'Object storage for HTML, CSS, JavaScript, and images' },
      { name: 'Amazon CloudFront', role: 'Global CDN for low latency and HTTPS SSL termination' },
      { name: 'AWS Certificate Manager (ACM)', role: 'Free public SSL/TLS certificate' },
      { name: 'Amazon Route 53 (Optional)', role: 'Custom domain DNS mapping' }
    ],
    steps: [
      {
        step: 1,
        title: 'Create & Configure S3 Bucket',
        description: 'Create an S3 bucket named after your project (e.g., "my-portfolio-2026"). Uncheck "Block all public access" or keep private if using CloudFront Origin Access Control (OAC).'
      },
      {
        step: 2,
        title: 'Upload Website Files',
        description: 'Upload your index.html, style.css, script.js, and asset images into the root of the S3 bucket.'
      },
      {
        step: 3,
        title: 'Enable Static Website Hosting',
        description: 'In S3 Bucket Properties, scroll down to "Static website hosting" -> Edit -> Enable -> specify index document as index.html.'
      },
      {
        step: 4,
        title: 'Add Bucket Policy',
        description: 'Attach a read-only bucket policy allowing s3:GetObject to Principal "*" so web visitors can read the HTML pages.'
      },
      {
        step: 5,
        title: 'Distribute Globally via CloudFront',
        description: 'Create a CloudFront distribution with your S3 bucket as the origin. Enable redirect HTTP to HTTPS.'
      }
    ],
    expectedOutput: 'A live URL (e.g., https://d111111abcdef8.cloudfront.net) displaying your personal responsive website with lightning-fast load times and a valid SSL lock icon.',
    tamilExpectedOutput: 'உலகம் முழுவதும் உள்ள எவரும் உங்கள் இணையதளத்தை அதிவேகமாக அணுகக்கூடிய ஒரு நேரடி HTTPS இணைப்பு கிடைக்கும்.',
    codeSnippet: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}`
  },
  {
    id: 'proj_ec2_nginx',
    title: 'Secure Web Server Deployment on EC2 with NGINX',
    tamilTitle: 'EC2 மற்றும் NGINX மூலம் வெப் சர்வர் உருவாக்குதல்',
    difficulty: 'Beginner',
    estimatedTime: '3-4 Hours',
    cost: 'Free Tier (t2.micro / t3.micro)',
    objective: 'Launch a Linux virtual server, configure firewall security groups, connect securely via SSH, and deploy a production-grade NGINX reverse proxy with automated User Data scripts.',
    tamilObjective: 'ஒரு லினக்ஸ் EC2 சர்வரைத் தொடங்கி, SSH மூலம் உள்நுழைந்து, NGINX வெப் சர்வரை நிறுவி இயக்குதல்.',
    servicesRequired: [
      { name: 'Amazon EC2', role: 'Ubuntu or Amazon Linux 2023 virtual machine' },
      { name: 'AWS Security Groups', role: 'Stateful firewall rules for Port 22 (SSH) and Port 80 (HTTP)' },
      { name: 'Amazon EBS', role: 'Persistent 8GB gp3 root volume' }
    ],
    steps: [
      {
        step: 1,
        title: 'Launch EC2 Instance',
        description: 'Choose Ubuntu 22.04 LTS or Amazon Linux 2023, t2.micro or t3.micro instance type, and create an RSA .pem key pair.'
      },
      {
        step: 2,
        title: 'Configure Security Group',
        description: 'Add Inbound Rule 1: SSH (Port 22) restricted to My IP. Inbound Rule 2: HTTP (Port 80) open to Anywhere (0.0.0.0/0).'
      },
      {
        step: 3,
        title: 'Automate with User Data Script',
        description: 'Paste the bootstrapping bash script in Advanced Details -> User Data to automatically install and start NGINX on boot.'
      },
      {
        step: 4,
        title: 'SSH Verification',
        description: 'Connect to your instance terminal: ssh -i my-key.pem ubuntu@EC2_PUBLIC_IP and inspect systemctl status nginx.'
      }
    ],
    expectedOutput: 'Visiting http://<EC2_PUBLIC_IP> in any web browser opens the welcoming custom HTML landing page hosted on your Linux cloud instance.',
    tamilExpectedOutput: 'உங்கள் EC2 சர்வருக்கு ஒதுக்கப்பட்ட Public IP முகவரியை பிரவுசரில் திறந்தால் உங்கள் வெப் சர்வர் பக்கம் இயங்குவதைக் காணலாம்.',
    codeSnippet: `#!/bin/bash
# EC2 User Data Bootstrap Script
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "<h1>Welcome to CloudMentor AI Server on AWS EC2!</h1>" > /var/www/html/index.html`
  },
  {
    id: 'proj_serverless_lambda',
    title: 'Serverless Image Thumbnail Generator (Lambda & S3)',
    tamilTitle: 'சர்வர்லெஸ் தானியங்கி போட்டோ ரீசைசர் (S3 + Lambda)',
    difficulty: 'Intermediate',
    estimatedTime: '4-5 Hours',
    cost: 'Free Tier (Always Free tier includes 1M Lambda invocations)',
    objective: 'Build an event-driven serverless pipeline where uploading any high-resolution image to an S3 "uploads" bucket triggers an AWS Lambda function to generate a 200x200 thumbnail and save it into a "thumbnails" bucket.',
    tamilObjective: 'S3 பக்கெட்டில் ஒரு புகைப்படம் பதிவேற்றப்பட்டவுடன், Lambda தானாகவே இயங்கி சிறிய தம்ப்நெயில் படமாக மாற்றும் திட்டம்.',
    servicesRequired: [
      { name: 'Amazon S3 (Uploads)', role: 'Source bucket triggering S3:ObjectCreated events' },
      { name: 'AWS Lambda (Python Pillow)', role: 'Event-driven compute that resizes image buffer' },
      { name: 'AWS IAM Role', role: 'Grants Lambda permissions to read source and put objects into destination' },
      { name: 'Amazon S3 (Thumbnails)', role: 'Destination bucket for processed thumbnails' }
    ],
    steps: [
      {
        step: 1,
        title: 'Create Two S3 Buckets',
        description: 'Create "my-user-images-upload" and "my-user-images-resized".'
      },
      {
        step: 2,
        title: 'Create IAM Execution Role',
        description: 'Create a role for Lambda with CloudWatchLogsFullAccess and AmazonS3FullAccess.'
      },
      {
        step: 3,
        title: 'Author Python Lambda Function',
        description: 'Write Python 3.11 code using the Pillow (PIL) library to stream the uploaded image, resize it to 200x200, and save to the resized bucket.'
      },
      {
        step: 4,
        title: 'Configure S3 Event Notification Trigger',
        description: 'In the uploads bucket, add an Event notification on "All object create events" pointing to your Lambda function ARN.'
      }
    ],
    expectedOutput: 'Whenever you drag-and-drop a 5MB wallpaper image into the uploads bucket, a 50KB thumbnail automatically appears in the resized bucket in less than 800 milliseconds!',
    tamilExpectedOutput: 'பெரிய புகைப்படத்தை அப்லோட் செய்த அடுத்த நொடியில், மறுபுறம் தானாகவே அளவிற்கேற்ற தம்ப்நெயில் தயாராகியிருக்கும்!',
    codeSnippet: `import boto3
from PIL import Image
import io

s3 = boto3.client('s3')

def lambda_handler(event, context):
    source_bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    dest_bucket = source_bucket.replace('-upload', '-resized')
    
    # Download object stream
    obj = s3.get_object(Bucket=source_bucket, Key=key)
    img = Image.open(io.BytesIO(obj['Body'].read()))
    img.thumbnail((200, 200))
    
    buffer = io.BytesIO()
    img.save(buffer, 'JPEG')
    buffer.seek(0)
    
    s3.put_object(Bucket=dest_bucket, Key=f"thumb_{key}", Body=buffer, ContentType='image/jpeg')
    return {"statusCode": 200, "body": "Resized successfully!"}`
  },
  {
    id: 'proj_serverless_api',
    title: 'Serverless REST API with API Gateway, Lambda & DynamoDB',
    tamilTitle: 'API Gateway & DynamoDB கொண்டு சர்வர்லெஸ் API உருவாக்குதல்',
    difficulty: 'Intermediate',
    estimatedTime: '4-6 Hours',
    cost: 'Always Free Tier eligible',
    objective: 'Create a fully serverless, highly scalable CRUD (Create, Read, Update, Delete) RESTful API for student registrations without running any continuous background servers.',
    tamilObjective: 'மாணவர் சேர்க்கைக்கான CRUD API-யை சர்வர் ஏதுமின்றி API Gateway மற்றும் DynamoDB மூலம் உருவாக்குதல்.',
    servicesRequired: [
      { name: 'Amazon API Gateway', role: 'Exposes HTTP/REST endpoints (/students) with validation' },
      { name: 'AWS Lambda (Node.js/Python)', role: 'Business logic handler executing CRUD operations' },
      { name: 'Amazon DynamoDB', role: 'NoSQL database table storing student JSON records' }
    ],
    steps: [
      {
        step: 1,
        title: 'Create DynamoDB Table',
        description: 'Create a table named "Students" with Partition Key "studentId" (String).'
      },
      {
        step: 2,
        title: 'Create Lambda Function with AWS SDK',
        description: 'Write a Node.js function using DynamoDB DocumentClient to handle GET, POST, and DELETE HTTP methods.'
      },
      {
        step: 3,
        title: 'Set Up Amazon API Gateway',
        description: 'Create an HTTP API or REST API, define resource /students, and route methods (GET, POST) with Lambda Proxy Integration.'
      },
      {
        step: 4,
        title: 'Deploy & Test via Postman or Curl',
        description: 'Send a POST JSON payload to test student creation, then fetch the list via GET.'
      }
    ],
    expectedOutput: 'A public endpoint (e.g., https://xyz.execute-api.ap-south-1.amazonaws.com/students) responding in single-digit milliseconds to API requests.',
    tamilExpectedOutput: 'போஸ்ட்மேன் (Postman) அல்லது பிரவுசரில் இயங்கும் ஒரு பொதுவான REST API இணைப்பு உருவாக்கப்படும்.',
    codeSnippet: `// Lambda Handler for DynamoDB CRUD
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  const method = event.httpMethod || event.requestContext?.http?.method;
  if (method === "POST") {
    const item = JSON.parse(event.body);
    await docClient.send(new PutCommand({ TableName: "Students", Item: item }));
    return { statusCode: 201, body: JSON.stringify({ message: "Created!" }) };
  }
  const data = await docClient.send(new ScanCommand({ TableName: "Students" }));
  return { statusCode: 200, body: JSON.stringify(data.Items) };
};`
  },
  {
    id: 'proj_cloudwatch_alarms',
    title: 'AWS CloudWatch & SNS Budget & Health Monitoring Alert System',
    tamilTitle: 'கிளவுட்வாட்ச் மற்றும் SNS மூலம் தானியங்கி கட்டண எச்சரிக்கை',
    difficulty: 'Beginner',
    estimatedTime: '1-2 Hours',
    cost: 'Always Free ($0.00)',
    objective: 'Set up real-time billing alarms and server health monitors that immediately dispatch SMS or email alerts to you if costs or CPU spikes cross safe limits.',
    tamilObjective: 'AWS கணக்கு பில் அதிகமானாலோ அல்லது சர்வரில் கோளாறு ஏற்பட்டாலோ உடனடியாக மொபைல் அல்லது இமெயிலுக்கு எச்சரிக்கை அனுப்பும் அமைப்பு.',
    servicesRequired: [
      { name: 'Amazon CloudWatch Metrics & Alarms', role: 'Monitors metric thresholds' },
      { name: 'Amazon SNS (Simple Notification Service)', role: 'Pub/Sub notification topic sending emails' },
      { name: 'AWS Budgets', role: 'Tracks forecasted spending against a monthly budget limit' }
    ],
    steps: [
      {
        step: 1,
        title: 'Create SNS Notification Topic',
        description: 'Create a Standard SNS topic "CloudMentor-Alerts", create an Email subscription with your personal email, and confirm the confirmation link in your inbox.'
      },
      {
        step: 2,
        title: 'Enable CloudWatch Billing Metrics',
        description: 'Navigate to CloudWatch Billing preferences and check "Receive Billing Alerts".'
      },
      {
        step: 3,
        title: 'Create EstimatedCharges Alarm',
        description: 'Set static threshold: whenever EstimatedCharges > $5.00 USD, trigger ALARM state and notify the SNS topic.'
      },
      {
        step: 4,
        title: 'Add EC2 CPU Utilization Alarm',
        description: 'Create an alarm on CPUUtilization >= 80% for 5 consecutive minutes on your running EC2 instances.'
      }
    ],
    expectedOutput: 'Automated email alerts received in your inbox whenever a server gets stressed or when your AWS spending reaches your predefined safety threshold.',
    tamilExpectedOutput: 'உங்கள் ஈமெயில் இன்பாக்ஸுக்கு உடனடியாக வரும் விழிப்புணர்வு எச்சரிக்கை மின்னஞ்சல்கள்.',
    codeSnippet: `aws cloudwatch put-metric-alarm \\
  --alarm-name "AWS-Cost-Safety-5USD" \\
  --metric-name "EstimatedCharges" \\
  --namespace "AWS/Billing" \\
  --statistic "Maximum" \\
  --period 21600 \\
  --threshold 5.0 \\
  --comparison-operator "GreaterThanThreshold" \\
  --alarm-actions "arn:aws:sns:us-east-1:123456789012:CloudMentor-Alerts"`
  }
];
