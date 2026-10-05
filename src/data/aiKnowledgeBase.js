/**
 * CloudMentor AI Knowledge Base & Natural Language Processor
 * Handles bilingual (English & Tamil) responses, real-world analogies,
 * code/CLI snippets, and suggested follow-ups.
 */

export const predefinedQuestions = [
  "What is Cloud Computing?",
  "What is Amazon Web Services (AWS)?",
  "What is Amazon EC2?",
  "What is Amazon S3?",
  "What is AWS IAM?",
  "Difference between EC2 and Lambda?",
  "How does Amazon VPC work?",
  "What is Amazon RDS vs DynamoDB?",
  "Explain in Tamil: What is S3?",
  "How to host a static website on AWS?"
];

export const cloudKnowledgeBase = {
  cloud_computing: {
    patterns: ['what is cloud', 'cloud computing', 'explain cloud', 'define cloud', 'கிளவுட் என்றால் என்ன'],
    title: 'Cloud Computing Explained',
    tamilTitle: 'கிளவுட் கம்ப்யூட்டிங் விளக்கம்',
    simpleSummary: 'Cloud computing is the on-demand delivery of computing power, database storage, applications, and other IT resources through the internet with pay-as-you-go pricing.',
    tamilSummary: 'கிளவுட் கம்ப்யூட்டிங் என்பது சொந்தமாக சர்வர்கள் வாங்காமல், இணையம் (Internet) வழியாக தேவையான கணினித்திறன் மற்றும் சேமிப்பிடத்தை வாடகைக்கு எடுத்துப் பயன்படுத்தும் தொழில்நுட்பமாகும்.',
    realWorldAnalogy: 'Think of Cloud Computing like household electricity. Instead of building your own power generator at home, you simply plug your appliances into the wall outlet and pay only for the electricity units you consume at the end of the month.',
    tamilAnalogy: 'சொந்தமாக ஜெனரேட்டர் வாங்கி பராமரிப்பதற்கு பதிலாக, தேவைப்படும் மின்சாரத்தை மட்டும் சுவிட்ச் போட்டு பயன்படுத்தி மாதாந்திர பில் கட்டுவது போல இது செயல்படுகிறது.',
    stepByStep: [
      '1. No Upfront Hardware: You do not need to buy expensive servers or build cooling data centers.',
      '2. Instant Provisioning: You can launch 1 or 1,000 servers in just a few mouse clicks within seconds.',
      '3. Flexible Scaling: Automatically increase servers when millions of users visit, and turn them off when traffic drops to save cost.',
      '4. Global Reach: Deploy your web application to users in America, Europe, or India in minutes.'
    ],
    tamilSteps: [
      '1. ஆரம்ப செலவு இல்லை: லட்சக்கணக்கில் செலவழித்து சர்வர்கள் வாங்க வேண்டிய அவசியமில்லை.',
      '2. சில நொடிகளில் தொடக்கம்: மவுஸ் கிளிக் மூலம் ஒரு சில விநாடிகளில் சர்வர்களை உருவாக்கலாம்.',
      '3. தேவைக்கேற்ப விரிவாக்கம்: பண்டிகை காலங்களில் பயனர்கள் கூடும் போது சர்வர்களை அதிகரிக்கலாம்.',
      '4. உலகளாவிய அணுகல்: உங்கள் இணையதளத்தை உலகின் எந்த மூலையிலும் உள்ள பயனர்களுக்கும் உடனே கொண்டு சேர்க்கலாம்.'
    ],
    codeSnippet: '# Cloud CLI: Launching a server in seconds using AWS CLI\naws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t2.micro',
    suggestedFollowUps: [
      'What are the 3 cloud service models (IaaS, PaaS, SaaS)?',
      'What is AWS and why is it popular?',
      'Explain Cloud Computing in Tamil'
    ]
  },

  aws_intro: {
    patterns: ['what is aws', 'amazon web services', 'about aws', 'why aws'],
    title: 'Amazon Web Services (AWS)',
    tamilTitle: 'Amazon Web Services (AWS) அறிமுகம்',
    simpleSummary: 'Amazon Web Services (AWS) is the world\'s most comprehensive and broadly adopted cloud platform, offering over 200 fully featured services from data centers globally.',
    tamilSummary: 'AWS என்பது உலகின் முன்னணி கிளவுட் சேவை நிறுவனமாகும். இது அமேசான் நிறுவனத்தால் வழங்கப்பட்டு, 200-க்கும் மேற்பட்ட கிளவுட் சேவைகளை வழங்குகிறது.',
    realWorldAnalogy: 'Imagine a gigantic digital supermarket where instead of groceries, the shelves are stocked with pre-built computing tools, databases, artificial intelligence models, and storage drives that you can pick and rent instantly.',
    tamilAnalogy: 'இது ஒரு பிரம்மாண்டமான டிஜிட்டல் பல்பொருள் அங்காடி போன்றது. அங்கு தேவையான கணினி சேவைகள், டேட்டாபேஸ்கள் மற்றும் AI கருவிகள் ரெடியாக இருக்கும், தேவையானதை நாம் வாடகைக்கு எடுக்கலாம்.',
    stepByStep: [
      '1. Market Leader: Over 32% of all cloud infrastructure worldwide runs on AWS.',
      '2. Global Infrastructure: Divided into Regions (cities like Mumbai) and Availability Zones (fault-tolerant data centers).',
      '3. Free Tier for Students: AWS offers a 12-Month Free Tier with free EC2, S3, and RDS hours for practice.',
      '4. Trusted by Top Brands: Netflix, Spotify, Airbnb, and NASA run their core tech on AWS.'
    ],
    tamilSteps: [
      '1. உலக அளவில் நம்பர் 1: உலக கிளவுட் சந்தையில் 32%-க்கும் அதிகமான பயன்பாடுகளைக் கொண்டுள்ளது.',
      '2. உலகளாவிய நெட்வொர்க்: பல நாடுகளில் Region மற்றும் Availability Zones எனப்படும் பாதுகாப்பான டேட்டா சென்டர்கள் உள்ளன.',
      '3. மாணவர்களுக்கான இலவசம்: 12 மாத இலவச சலுகை மூலம் கட்டணமின்றி பயிற்சி பெறலாம்.'
    ],
    codeSnippet: '# Check AWS identity & region setup\naws sts get-caller-identity',
    suggestedFollowUps: [
      'What is Amazon EC2?',
      'What is Amazon S3?',
      'How to open a free AWS account?'
    ]
  },

  ec2: {
    patterns: ['what is ec2', 'amazon ec2', 'elastic compute cloud', 'explain ec2', 'ec2 instance', 'ஈசி2'],
    title: 'Amazon EC2 (Elastic Compute Cloud)',
    tamilTitle: 'Amazon EC2 - விர்ச்சுவல் சர்வர்கள்',
    simpleSummary: 'Amazon EC2 is a web service that provides secure, resizable compute capacity (virtual servers) in the cloud. You can configure CPU, RAM, storage, and operating system without touching physical machines.',
    tamilSummary: 'Amazon EC2 என்பது கிளவுடில் வாடகைக்கு எடுக்கப்படும் விர்ச்சுவல் சர்வர்கள் (கணினிகள்) ஆகும். இதில் உங்கள் இணையதளங்கள் மற்றும் செயலிகளை 24 மணி நேரமும் இயக்கலாம்.',
    realWorldAnalogy: 'Renting an EC2 instance is like renting a fully furnished apartment. You decide how many rooms (CPU cores) and square footage (RAM) you need, pay monthly or hourly rent, and move out anytime with zero long-term commitment.',
    tamilAnalogy: 'சொந்தமாக வீடு வாங்குவதற்கு பதிலாக, தேவையான வசதிகளுடன் வாடகைக்கு வீடு எடுத்து தங்கி, தேவை முடிந்ததும் காலி செய்வது போல EC2 இயங்குகிறது.',
    stepByStep: [
      '1. Choose an AMI (Amazon Machine Image): Select Linux, Ubuntu, or Windows.',
      '2. Select Instance Type: E.g., t2.micro (1 vCPU, 1 GB RAM - Free Tier eligible).',
      '3. Key Pair: Create an SSH key (.pem) to log into your server securely.',
      '4. Security Group: Open Port 80 for web traffic and Port 22 for SSH terminal access.',
      '5. Connect: Access your server using terminal command `ssh -i key.pem ubuntu@public_ip`.'
    ],
    tamilSteps: [
      '1. OS தேர்வு: Ubuntu அல்லது Linux ஆப்பரேட்டிங் சிஸ்டத்தை தேர்வு செய்யுங்கள்.',
      '2. வகை தேர்வு: மாணவர்களுக்கு இலவசமான t2.micro-வை தேர்வு செய்யலாம்.',
      '3. Key Pair: சர்வருக்குள் நுழைய பாதுகாப்பு சாவியை (.pem) பதிவிறக்குங்கள்.',
      '4. Security Group: இணையதளத்திற்கு Port 80 மற்றும் SSH-க்கு Port 22 திறக்க வேண்டும்.'
    ],
    codeSnippet: '# Connect to your EC2 instance from local terminal\nchmod 400 my-key.pem\nssh -i my-key.pem ubuntu@54.123.45.67',
    suggestedFollowUps: [
      'Difference between EC2 and Lambda?',
      'What is an EC2 Security Group?',
      'How to host a website on EC2?'
    ]
  },

  s3: {
    patterns: ['what is s3', 'amazon s3', 'simple storage service', 'explain s3', 's3 bucket', 'எஸ்3'],
    title: 'Amazon S3 (Simple Storage Service)',
    tamilTitle: 'Amazon S3 - இணைய ஆப்ஜெக்ட் ஸ்டோரேஜ்',
    simpleSummary: 'Amazon S3 is an object storage service built to store and retrieve any amount of data from anywhere on the internet. It provides industry-leading 99.999999999% (11 9s) durability.',
    tamilSummary: 'Amazon S3 என்பது இணையத்தில் கோப்புகள், புகைப்படங்கள், ஆவணங்கள் மற்றும் வீடியோக்களை பாதுகாப்பாக சேமிக்க உதவும் வரம்பற்ற டிஜிட்டல் லாக்கர் ஆகும்.',
    realWorldAnalogy: 'Think of S3 as an infinite, indestructible Dropbox or Google Drive. You create folders called "Buckets" and drop in files called "Objects". Each file automatically gets a web URL link!',
    tamilAnalogy: 'இது கூகுள் டிரைவ் போன்ற ஒரு எல்லையற்ற சேமிப்பிடம். இதில் நாம் உருவாக்கும் கோப்புறைகள் "Buckets" என்றும், கோப்புகள் "Objects" என்றும் அழைக்கப்படுகின்றன.',
    stepByStep: [
      '1. Buckets: Containers for storing objects. Bucket names must be globally unique across all AWS accounts worldwide.',
      '2. Objects: Files up to 5 TB in size, stored with metadata and an optional unique URL.',
      '3. Storage Classes: S3 Standard (fast access), S3 Intelligent-Tiering (auto cost-saving), S3 Glacier (cheap deep archiving).',
      '4. Static Web Hosting: You can host an entire HTML/CSS/JS frontend on S3 without launching a server!'
    ],
    tamilSteps: [
      '1. Bucket: கோப்புகளை சேமிக்கும் தொட்டி; இதன் பெயர் உலகில் உள்ள அனைவரிலும் தனித்துவமாக இருக்க வேண்டும்.',
      '2. Object: நாம் பதிவேற்றும் கோப்புகள் (புகைப்படங்கள், ஆவணங்கள்).',
      '3. Static Web Hosting: சர்வர் இல்லாமலேயே உங்கள் வெப்சைட்டை S3 மூலம் ஆன்லைனில் கொண்டு வரலாம்.'
    ],
    codeSnippet: '# Copy local file to S3 bucket\naws s3 cp photo.jpg s3://my-unique-bucket-name/photo.jpg\n# Make website bucket public\naws s3 website s3://my-unique-bucket-name/ --index-document index.html',
    suggestedFollowUps: [
      'What is S3 Static Website Hosting?',
      'What is the difference between S3 and EBS?',
      'Explain S3 Storage Classes'
    ]
  },

  iam: {
    patterns: ['what is iam', 'aws iam', 'identity and access', 'iam role', 'iam policy'],
    title: 'AWS IAM (Identity and Access Management)',
    tamilTitle: 'AWS IAM - அடையாள மற்றும் அணுகல் மேலாண்மை',
    simpleSummary: 'AWS IAM lets you securely manage access to AWS services and resources. You can create users, groups, and roles, and use JSON permissions policies to allow or deny specific actions.',
    tamilSummary: 'AWS IAM என்பது உங்கள் கிளவுட் கணக்கில் யார் எந்தெந்த சேவைகளைப் பயன்படுத்தலாம் என்பதை கட்டுப்படுத்தும் பாதுகாப்பு அமைப்பாகும்.',
    realWorldAnalogy: 'IAM is like the security desk at a corporate headquarters. An IAM User is an employee ID card, an IAM Group is a department (like Finance), an IAM Policy is the rulebook of allowed doors, and an IAM Role is a visitor VIP badge.',
    tamilAnalogy: 'ஒரு பெரிய அலுவலகத்தின் பாதுகாப்பு அதிகாரி போன்றது. எந்த ஊழியர் எந்த அறைக்கு செல்லலாம், யார் யாரை சந்திக்கலாம் என்பதை தீர்மானிப்பது போல IAM செயல்படுகிறது.',
    stepByStep: [
      '1. Principle of Least Privilege: Always grant only the minimum permissions required to perform a job.',
      '2. Never use Root User: Use the root account only to set up MFA and initial IAM administrator users.',
      '3. IAM Roles: Provide temporary, automatically rotating credentials to services like EC2 or Lambda (no hardcoded passwords!).',
      '4. IAM Policy JSON: Contains Effect (Allow/Deny), Action (e.g., s3:PutObject), and Resource (ARN).'
    ],
    tamilSteps: [
      '1. குறைந்தபட்ச அனுமதி: ஒருவருக்கு என்ன வேலை தேவையோ அதற்கு மட்டுமே அனுமதி வழங்க வேண்டும்.',
      '2. Root கணக்கை பாதுகாக்க: MFA என்ற இரண்டு அடுக்கு பாதுகாப்பை அமைத்து தினசரி பயன்பாட்டிற்கு IAM பயனரை உருவாக்க வேண்டும்.',
      '3. IAM Role: EC2 மற்றும் Lambda சேவைகளுக்கு தற்காலிக பாதுகாப்பான அணுகலை வழங்குகிறது.'
    ],
    codeSnippet: '{\n  "Version": "2012-10-17",\n  "Statement": [{\n    "Effect": "Allow",\n    "Action": "s3:GetObject",\n    "Resource": "arn:aws:s3:::my-bucket/*"\n  }]\n}',
    suggestedFollowUps: [
      'What is the difference between IAM User and IAM Role?',
      'Why is MFA critical in AWS?',
      'How to create an IAM Policy?'
    ]
  },

  ec2_vs_lambda: {
    patterns: ['ec2 vs lambda', 'difference between ec2 and lambda', 'lambda vs ec2', 'when to use ec2 vs lambda'],
    title: 'Amazon EC2 vs AWS Lambda (Server vs Serverless)',
    tamilTitle: 'EC2 மற்றும் Lambda இடையிலான ஒப்பீடு',
    simpleSummary: 'EC2 gives you full control over a virtual server that runs continuously 24/7 (you pay for the uptime). Lambda runs code only when triggered by events (you pay only for the milliseconds of execution time).',
    tamilSummary: 'EC2 என்பது 24 மணி நேரமும் தொடர்ந்து இயங்கும் விர்ச்சுவல் சர்வர்; Lambda என்பது தேவைப்படும் நிகழ்வுகளின் போது மட்டும் இயங்கி, இயங்கும் விநாடிகளுக்கு மட்டும் கட்டணம் செலுத்தும் சர்வர்லெஸ் முறை.',
    realWorldAnalogy: 'EC2 is like renting a car for a month: you pay rent 24 hours a day even while the car is parked in your garage. AWS Lambda is like booking an Uber cab: you only pay for the exact distance and minutes you are riding.',
    tamilAnalogy: 'EC2 என்பது வாடகைக்கு கார் எடுத்து பார்க்கிங்கில் நிறுத்தினாலும் பணம் கட்டுவது போன்றது. Lambda என்பது ஓலா/ஊபர் புக் செய்து செல்லும் தூரத்திற்கு மட்டும் கட்டணம் கொடுப்பது போன்றது.',
    stepByStep: [
      '1. Server Management: EC2 requires OS updates, security patches, and capacity planning. Lambda requires ZERO server management.',
      '2. Cost Model: EC2 costs money every second it is turned on. Lambda costs $0 when idle, and gives 1,000,000 free requests per month!',
      '3. Execution Limits: EC2 can run for years without interruption. Lambda has a strict maximum runtime limit of 15 minutes per request.',
      '4. When to pick EC2: Long-running web applications, custom software stacks, gaming servers.',
      '5. When to pick Lambda: Event-driven jobs, image resizing, webhooks, REST microservices with API Gateway.'
    ],
    tamilSteps: [
      '1. சர்வர் பராமரிப்பு: EC2-ல் நாமே எல்லாவற்றையும் கவனிக்க வேண்டும். Lambda-வில் கோட் மட்டும் எழுதினால் போதும்.',
      '2. கட்டணம்: EC2 சர்வர் ஆன்-ல் இருக்கும் வரை பணம் வசூலிக்கும். Lambda செயலற்று இருக்கும் போது ஒரு பைசா கூட செலவாகாது.',
      '3. அதிகபட்ச நேரம்: Lambda அதிகபட்சமாக 15 நிமிடங்கள் மட்டுமே இயங்கும்; EC2 எத்தனை மாதங்கள் வேண்டுமானாலும் தொடர்ந்து இயங்கும்.'
    ],
    codeSnippet: '// Simple AWS Lambda Node.js handler\nexports.handler = async (event) => {\n  return {\n    statusCode: 200,\n    body: JSON.stringify({ message: "Hello from Serverless Lambda!" })\n  };\n};',
    suggestedFollowUps: [
      'What are the triggers for AWS Lambda?',
      'What is AWS Fargate?',
      'How to build a Serverless REST API?'
    ]
  },

  vpc: {
    patterns: ['what is vpc', 'amazon vpc', 'virtual private cloud', 'explain vpc', 'subnets'],
    title: 'Amazon VPC (Virtual Private Cloud)',
    tamilTitle: 'Amazon VPC - பிரத்யேக கிளவுட் நெட்வொர்க்',
    simpleSummary: 'Amazon VPC is your own isolated private network inside the AWS cloud. You control IP address ranges, subnets, route tables, and network gateways.',
    tamilSummary: 'Amazon VPC என்பது AWS கிளவுடில் உங்களுக்கு என ஒதுக்கப்படும் தனிப்பட்ட விர்ச்சுவல் நெட்வொர்க் ஆகும். இதில் உங்கள் சர்வர்களை வெளியுலக பாதுகாப்பிற்கு ஏற்ப அமைக்கலாம்.',
    realWorldAnalogy: 'A VPC is like a private gated residential township. The public subnet is the visitor clubhouse and parking lot right by the highway, while the private subnet is the secured family villas inside where external delivery drivers cannot enter without permission.',
    tamilAnalogy: 'VPC என்பது ஒரு பாதுகாப்பு வேலி போடப்பட்ட உங்கள் சொந்த குடியிருப்பு போன்றது. முன் வாசல் (Public Subnet) பொதுமக்களுக்கும், உள் பகுதி (Private Subnet) குடும்ப உறுப்பினர்களுக்கும் ஒதுக்கப்பட்டுள்ளது.',
    stepByStep: [
      '1. CIDR Block: Define your IP address pool (e.g. 10.0.0.0/16 has 65,536 private IPs).',
      '2. Public Subnet: Connected to an Internet Gateway (IGW) so web browsers can reach your web servers.',
      '3. Private Subnet: Has no direct internet route—perfect for safeguarding SQL databases.',
      '4. NAT Gateway: Allows private instances to download security updates without exposing them to inbound hackers.'
    ],
    tamilSteps: [
      '1. CIDR IP ரேஞ்ச்: உங்கள் நெட்வொர்க்கிற்கான IP முகவரிகளை தேர்வு செய்தல்.',
      '2. Public Subnet: வெளி உலக இணையத்துடன் தொடர்பு கொள்ள உதவும் பகுதி.',
      '3. Private Subnet: இணைய தொடர்பு இல்லாத பாதுகாப்பான டேட்டாபேஸ் பகுதி.',
      '4. NAT Gateway: பாதுகாப்பான சர்வர்கள் மட்டும் வெளியே சென்று அப்டேட்களைப் பெற உதவும் வழி.'
    ],
    codeSnippet: '# Create a custom VPC with AWS CLI\naws ec2 create-vpc --cidr-block 10.0.0.0/16',
    suggestedFollowUps: [
      'What is an Internet Gateway vs NAT Gateway?',
      'What is the difference between Security Groups and NACLs?',
      'How does a 3-tier VPC architecture work?'
    ]
  },

  static_website: {
    patterns: ['deploy website', 'static website', 'host website', 's3 website', 'வெப்சைட் ஹோஸ்டிங்'],
    title: 'Hosting a Static Website on AWS',
    tamilTitle: 'AWS-ல் ஸ்டாடிக் இணையதளம் ஹோஸ்ட் செய்வது எப்படி?',
    simpleSummary: 'You can host a lightning-fast, high-availability website on AWS using Amazon S3 for storage and Amazon CloudFront for global HTTPS delivery, costing pennies per month.',
    tamilSummary: 'Amazon S3 மற்றும் CloudFront உதவியுடன் சர்வர் பராமரிப்பு இன்றி மிகக் குறைந்த செலவில் (அல்லது இலவசமாக) இணையதளத்தை ஹோஸ்ட் செய்யலாம்.',
    realWorldAnalogy: 'Instead of renting a physical server and paying electricity 24/7 just to show a brochure, you place your HTML brochure in a global automated vending machine that dispenses copies anywhere in milliseconds.',
    tamilAnalogy: 'ஒரு பெரிய கடையை வாடகைக்கு எடுப்பதற்கு பதிலாக, தானியங்கி வெண்டிங் மெஷின் மூலம் துண்டு பிரசுரங்களை வழங்குவது போன்றது.',
    stepByStep: [
      'Step 1: Create an S3 bucket with your website name.',
      'Step 2: Upload index.html, styles.css, script.js, and image assets.',
      'Step 3: Enable "Static website hosting" in bucket properties.',
      'Step 4: Attach a public read bucket policy.',
      'Step 5: Create an Amazon CloudFront distribution for custom domain HTTPS and worldwide caching.'
    ],
    tamilSteps: [
      'படி 1: உங்கள் பெயரில் ஒரு புதிய S3 பக்கெட்டை உருவாக்குங்கள்.',
      'படி 2: index.html, style.css மற்றும் படங்களை பதிவேற்றுங்கள்.',
      'படி 3: Bucket Properties-ல் சென்று "Static website hosting"-ஐ எனேபிள் செய்யுங்கள்.',
      'படி 4: மக்கள் பார்ப்பதற்கு ஏதுவாக Public Read அனுமதியை வழங்குங்கள்.'
    ],
    codeSnippet: 'aws s3 sync ./my-website-folder s3://my-cloud-portfolio-bucket/ --acl public-read',
    suggestedFollowUps: [
      'How to connect a custom domain using Route 53?',
      'How to add free SSL HTTPS with CloudFront?',
      'What is the difference between static and dynamic websites?'
    ]
  }
};

/**
 * Intelligent response generator with Tamil/English translation support
 */
export const queryCloudMentorAI = (userPrompt, language = 'English') => {
  const cleanPrompt = userPrompt.toLowerCase().trim();
  const isTamilRequested = language === 'Tamil' || cleanPrompt.includes('tamil') || cleanPrompt.includes('தமிழில்');

  // Search match in knowledge base
  let matchedEntry = null;
  for (const key in cloudKnowledgeBase) {
    const entry = cloudKnowledgeBase[key];
    const matchFound = entry.patterns.some(pattern => cleanPrompt.includes(pattern));
    if (matchFound) {
      matchedEntry = entry;
      break;
    }
  }

  if (matchedEntry) {
    if (isTamilRequested) {
      return {
        title: matchedEntry.tamilTitle || matchedEntry.title,
        summary: matchedEntry.tamilSummary || matchedEntry.simpleSummary,
        analogy: matchedEntry.tamilAnalogy || matchedEntry.realWorldAnalogy,
        steps: matchedEntry.tamilSteps || matchedEntry.stepByStep,
        codeSnippet: matchedEntry.codeSnippet,
        suggestedFollowUps: matchedEntry.suggestedFollowUps,
        language: 'Tamil'
      };
    } else {
      return {
        title: matchedEntry.title,
        summary: matchedEntry.simpleSummary,
        analogy: matchedEntry.realWorldAnalogy,
        steps: matchedEntry.stepByStep,
        codeSnippet: matchedEntry.codeSnippet,
        suggestedFollowUps: matchedEntry.suggestedFollowUps,
        language: 'English'
      };
    }
  }

  // Generative / Fallback response for unmapped questions
  if (isTamilRequested) {
    return {
      title: 'CloudMentor AI விளக்கம்',
      summary: `உங்கள் கேள்வி: "${userPrompt}" பற்றி எளிமையாக விளக்குகிறேன். கிளவுட் கம்ப்யூட்டிங் மற்றும் AWS-ல் உள்ள பெரும்பாலான சேவைகள் எளிதாகப் புரிந்து கொள்ளக்கூடியவை.`,
      analogy: 'ஒரு பெரிய நிறுவனத்திற்கு தேவையான அனைத்து மென்பொருள், வன்பொருள் மற்றும் பாதுகாப்பு கட்டமைப்புகளை AWS நமக்கு ரெடிமேடாக குறைந்த வாடகையில் வழங்குகிறது.',
      steps: [
        '1. அடிப்படைகளை புரிந்துகொள்ளுங்கள்: Region, Availability Zones மற்றும் Free Tier.',
        '2. முக்கியமான சேவைகள்: EC2 (கணினி), S3 (சேமிப்பு), IAM (பாதுகாப்பு), RDS (டேட்டாபேஸ்).',
        '3. நேரடி பயிற்சி: வெறும் தியரி மட்டும் படிக்காமல் AWS Console-ல் சிறிய இணையதளங்களை உருவாக்கிப் பாருங்கள்.'
      ],
      codeSnippet: '# AWS CLI அடிப்படை கட்டளை\naws --version',
      suggestedFollowUps: [
        'What is Amazon EC2?',
        'What is Amazon S3?',
        'Show me the Cloud Learning Roadmap'
      ],
      language: 'Tamil'
    };
  }

  return {
    title: 'CloudMentor AI Answer',
    summary: `Great question about "${userPrompt}"! In cloud computing and AWS, the core philosophy is breaking down complex physical infrastructure into simple, automated, pay-as-you-go building blocks.`,
    analogy: 'Think of AWS services like LEGO blocks. You have compute blocks (EC2/Lambda), storage blocks (S3), and networking blocks (VPC). You assemble only what your application needs, and take it apart when done without wasting money.',
    steps: [
      '1. Step 1: Learn the core building block services (IAM, EC2, S3, and VPC).',
      '2. Step 2: Combine them using real-world architectures (e.g. EC2 behind ALB with an S3 static frontend).',
      '3. Step 3: Practice with quizzes and hands-on projects to solidify your knowledge for interviews.'
    ],
    codeSnippet: '# Explore AWS regions and credentials\naws ec2 describe-regions --output table',
    suggestedFollowUps: [
      'What is Amazon EC2?',
      'What is Amazon S3?',
      'What is AWS IAM?',
      'Give me an AWS project suggestion'
    ],
    language: 'English'
  };
};
