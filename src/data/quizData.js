export const quizBank = {
  beginner: [
    {
      id: 'q_b1',
      question: 'Which of the following is considered an Infrastructure as a Service (IaaS) offering in AWS?',
      options: [
        'AWS Elastic Beanstalk',
        'Amazon EC2 (Elastic Compute Cloud)',
        'Amazon Simple Storage Service (S3)',
        'AWS Lambda'
      ],
      correctAnswer: 1,
      explanation: 'Amazon EC2 provides raw virtual servers (CPU, RAM, OS, networking) where you manage the OS, updates, and software stack, making it a classic Infrastructure as a Service (IaaS) model.',
      tamilExplanation: 'Amazon EC2 என்பது IaaS வகையைச் சேர்ந்தது, ஏனெனில் இதில் OS, ரேம் மற்றும் மென்பொருட்களை நாமே முழுமையாக நிர்வகிக்கிறோம்.'
    },
    {
      id: 'q_b2',
      question: 'What is the primary difference between an AWS Region and an Availability Zone (AZ)?',
      options: [
        'An AWS Region is a single data center; an AZ is a cluster of regions.',
        'An AWS Region is a geographical area containing two or more isolated Availability Zones (AZs).',
        'Regions are only for government accounts, while AZs are for public accounts.',
        'There is no difference; they are interchangeable terms.'
      ],
      correctAnswer: 1,
      explanation: 'An AWS Region is a physical geographical location in the world (e.g., ap-south-1 Mumbai) that contains multiple, physically isolated, and redundant data centers called Availability Zones.',
      tamilExplanation: 'Region என்பது ஒரு குறிப்பிட்ட புவியியல் பகுதி (நகரம்), அதற்குள் ஒன்றுக்கு மேற்பட்ட தனித்தனி டேட்டா சென்டர்கள் (AZ) இருக்கும்.'
    },
    {
      id: 'q_b3',
      question: 'Which AWS service allows you to store files (objects) and provides 99.999999999% (11 9s) of durability?',
      options: [
        'Amazon EBS',
        'Amazon S3',
        'Amazon EFS',
        'AWS Storage Gateway'
      ],
      correctAnswer: 1,
      explanation: 'Amazon S3 (Simple Storage Service) is an object storage system designed for 11 9s of data durability by automatically replicating files across at least 3 Availability Zones.',
      tamilExplanation: 'Amazon S3 என்பது 11 9s ஆயுள் திறன் கொண்ட ஆப்ஜெக்ட் ஸ்டோரேஜ் சேவையாகும்.'
    },
    {
      id: 'q_b4',
      question: 'In AWS IAM, what should you attach to a User or Role to define their permissions?',
      options: [
        'IAM Policy (JSON document)',
        'Security Group Rule',
        'NACL table',
        'Route Table entry'
      ],
      correctAnswer: 0,
      explanation: 'IAM Policies are JSON documents that explicitly define permissions using Effect (Allow/Deny), Action (e.g. s3:GetObject), and Resource (ARN).',
      tamilExplanation: 'IAM பாலிசி என்பது அனுமதிகளை வரையறுக்கும் JSON ஆவணம் ஆகும்.'
    },
    {
      id: 'q_b5',
      question: 'What is the AWS recommended best practice regarding the Root User of your AWS account?',
      options: [
        'Use it for all daily administrative tasks because it has full access.',
        'Share the root password with all senior developers.',
        'Lock away the root credentials, enable MFA, and create dedicated IAM admin users for daily tasks.',
        'Delete the root user completely from the account.'
      ],
      correctAnswer: 2,
      explanation: 'The root user has unrestricted access to everything, including account closure and billing. AWS strictly recommends enabling MFA and locking away root credentials, using dedicated IAM users for day-to-day operations.',
      tamilExplanation: 'Root கணக்கிற்கு MFA பாதுகாப்பு அமைத்து, அன்றாட வேலைகளுக்கு IAM பயனர்களை மட்டுமே பயன்படுத்த வேண்டும்.'
    },
    {
      id: 'q_b6',
      question: 'Which AWS pricing tier allows you to use selected services for free up to 12 months after signing up?',
      options: [
        'Always Free',
        '12-Month Free Tier',
        'Enterprise Discount Program',
        'Spot Instances'
      ],
      correctAnswer: 1,
      explanation: 'The AWS 12-Month Free Tier provides free monthly quotas (e.g., 750 hours of EC2 t2.micro, 5 GB of S3 storage) for the first year after account creation.',
      tamilExplanation: '12-Month Free Tier மூலம் கணக்கு தொடங்கிய முதல் ஒரு வருடத்திற்கு குறிப்பிட்ட சேவைகளை இலவசமாகப் பயன்படுத்தலாம்.'
    },
    {
      id: 'q_b7',
      question: 'What is an Amazon Machine Image (AMI)?',
      options: [
        'A photo gallery uploaded to Amazon S3.',
        'A template that contains the software configuration (operating system, application server, and applications) required to launch an EC2 instance.',
        'A physical hardware CPU chip manufactured by Amazon.',
        'A billing receipt sent by AWS at the end of each month.'
      ],
      correctAnswer: 1,
      explanation: 'An AMI is a master image/template packaged with an operating system and pre-installed software used to instantiate new EC2 virtual machines quickly.',
      tamilExplanation: 'AMI என்பது ஒரு புதிய EC2 சர்வரைத் தொடங்கத் தேவையான OS மற்றும் மென்பொருள் அடங்கிய டெம்ப்ளேட் ஆகும்.'
    }
  ],
  intermediate: [
    {
      id: 'q_i1',
      question: 'How do AWS Security Groups differ from Network Access Control Lists (NACLs)?',
      options: [
        'Security Groups operate at the subnet level; NACLs operate at the instance level.',
        'Security Groups are stateful (return traffic is automatically allowed); NACLs are stateless (both inbound and outbound rules must be explicitly defined).',
        'NACLs support Allow rules only, while Security Groups support Deny rules.',
        'Security Groups can only inspect UDP packets.'
      ],
      correctAnswer: 1,
      explanation: 'Security Groups are stateful firewalls at the EC2 instance level (if traffic enters on port 80, the return response is automatically allowed). NACLs are stateless firewalls at the subnet level where you must explicitly write outbound rules.',
      tamilExplanation: 'Security Groups என்பது Stateful (பதில் தானாக செல்லும்), ஆனால் NACL என்பது Stateless (வரவு மற்றும் செலவு விதிகள் இரண்டையும் தனியாக எழுத வேண்டும்).'
    },
    {
      id: 'q_i2',
      question: 'A company wants a high-availability MySQL database on AWS with automatic failover in case of a disaster. Which Amazon RDS feature should they enable?',
      options: [
        'Read Replicas',
        'Multi-AZ Deployment',
        'Cross-Region Read Replica',
        'DynamoDB Accelerator (DAX)'
      ],
      correctAnswer: 1,
      explanation: 'RDS Multi-AZ creates a synchronous standby replica in a second Availability Zone. If the primary database fails, AWS automatically fails over to the standby with zero data loss.',
      tamilExplanation: 'RDS Multi-AZ மூலம் ஒரு டேட்டா சென்டர் செயலிழந்தாலும் மற்றொரு AZ-ல் உள்ள ஸ்டேண்ட்பை டேட்டாபேஸுக்கு தானாக மாறிவிடும்.'
    },
    {
      id: 'q_i3',
      question: 'Which service enables an EC2 instance residing in a Private Subnet to safely download software updates from the internet without allowing inbound internet connections?',
      options: [
        'Internet Gateway (IGW)',
        'NAT Gateway',
        'VPC Peering',
        'Transit Gateway'
      ],
      correctAnswer: 1,
      explanation: 'A NAT (Network Address Translation) Gateway sits in a Public Subnet and translates private IP requests to outbound public traffic, blocking any inbound connections from initiating from the internet.',
      tamilExplanation: 'NAT Gateway மூலம் பிரைவேட் சப்நெட்டில் உள்ள சர்வர்கள் இணையத்திலிருந்து அப்டேட்களைப் பெறலாம், ஆனால் வெளிநபர்கள் உள்ளே நுழைய முடியாது.'
    },
    {
      id: 'q_i4',
      question: 'What is the maximum execution time limit for an AWS Lambda function invocation?',
      options: [
        '5 minutes',
        '15 minutes',
        '1 hour',
        'Unlimited'
      ],
      correctAnswer: 1,
      explanation: 'AWS Lambda functions can execute for a maximum duration of 15 minutes (900 seconds) per invocation. For longer-running tasks, AWS ECS/Fargate or AWS Batch is recommended.',
      tamilExplanation: 'AWS Lambda அதிகபட்சமாக 15 நிமிடங்கள் மட்டுமே இயங்கும். அதற்கு மேல் இயங்க Fargate அல்லது EC2 பயன்படுத்த வேண்டும்.'
    },
    {
      id: 'q_i5',
      question: 'Which AWS service is best suited for distributing HTTP/HTTPS web traffic based on URL request paths (e.g., routing /api to one target group and /images to another)?',
      options: [
        'Network Load Balancer (NLB)',
        'Application Load Balancer (ALB)',
        'Classic Load Balancer (CLB)',
        'AWS Direct Connect'
      ],
      correctAnswer: 1,
      explanation: 'Application Load Balancer (ALB) operates at Layer 7 (Application layer) and supports path-based routing, host-based routing, and HTTP headers inspection.',
      tamilExplanation: 'ALB என்பது Layer 7 லோட் பேலன்சர் ஆகும். இது /api மற்றும் /images போன்ற URL பாதைகளைக் கொண்டு டிராஃபிக்கை பிரித்து அனுப்பும்.'
    }
  ],
  advanced: [
    {
      id: 'q_a1',
      question: 'You need to store 50 TB of enterprise financial records for 7 years to meet government compliance. The files are almost never accessed, but must be preserved without any possibility of deletion. Which solution is most cost-effective and secure?',
      options: [
        'Amazon EBS gp3 with delete termination disabled',
        'Amazon S3 Glacier Flexible Retrieval with S3 Object Lock in Compliance Mode',
        'Amazon RDS with automated daily snapshots',
        'Amazon DynamoDB with Point-in-Time Recovery enabled'
      ],
      correctAnswer: 1,
      explanation: 'S3 Glacier Flexible Retrieval provides extremely low storage costs ($0.0036/GB/month), and S3 Object Lock in Compliance Mode prevents files from being overwritten or deleted by ANY user (including AWS root) during the retention period.',
      tamilExplanation: 'S3 Glacier மிகவும் குறைந்த செலவில் காப்பகப்படுத்த உதவும், Object Lock Compliance Mode யாராலும் கோப்புகளை அழிக்க முடியாதபடி பாதுகாக்கும்.'
    },
    {
      id: 'q_a2',
      question: 'How does AWS KMS (Key Management Service) implement Envelope Encryption?',
      options: [
        'By encrypting the plaintext data directly using the AWS Root master certificate.',
        'A Customer Master Key (CMK) protects and encrypts a plaintext Data Key, which in turn encrypts the actual data payload.',
        'By mailing physical cryptographic envelopes between AWS data centers.',
        'By storing encryption keys inside an open-source Docker container.'
      ],
      correctAnswer: 1,
      explanation: 'Envelope Encryption encrypts plaintext data with a unique Data Key. The Data Key itself is then encrypted using a top-level KMS Key (CMK). This optimizes performance by not sending large data payloads across the network to KMS.',
      tamilExplanation: 'Envelope Encryption முறையில் டேட்டா கீ மூலம் கோப்புகள் என்க்ரிப்ட் செய்யப்பட்டு, அந்த டேட்டா கீ-யை KMS மாஸ்டர் கீ பாதுகாக்கிறது.'
    },
    {
      id: 'q_a3',
      question: 'An application experiences sudden 10x traffic surges within 30 seconds. EC2 Auto Scaling is taking 4 minutes to spin up new instances and warm up, resulting in 504 gateway timeouts. What architecture optimization best solves this?',
      options: [
        'Switch from ALB to an unmanaged proxy server on a single t2.nano instance.',
        'Implement Amazon CloudFront caching + AWS Lambda with Provisioned Concurrency, or enable EC2 Warm Pools with pre-initialized instances.',
        'Disable CloudWatch alarms entirely.',
        'Increase the EC2 instance volume from EBS gp3 to magnetic tape.'
      ],
      correctAnswer: 1,
      explanation: 'CloudFront absorbs static/API cache requests at the edge, while AWS Lambda with Provisioned Concurrency or EC2 Warm Pools eliminates instance initialization and cold start latency for sudden surges.',
      tamilExplanation: 'CloudFront மூலம் கேச்சிங் செய்து, EC2 Warm Pools அல்லது Lambda Provisioned Concurrency மூலம் உடனடி டிராஃபிக் உயர்வை சமாளிக்கலாம்.'
    }
  ]
};

export const topicPracticeQuestions = {
  ec2: [
    {
      id: 'prac_ec2_1',
      question: 'What happens to the data stored on an EC2 Instance Store volume when you STOP the instance?',
      options: [
        'The data remains completely intact and accessible upon start.',
        'The data is permanently lost because Instance Store is ephemeral physical storage.',
        'AWS automatically migrates the data to Amazon S3.',
        'The volume converts into an EBS volume automatically.'
      ],
      correctAnswer: 1,
      hint: 'Instance store is tied to the physical host hardware!',
      tamilHint: 'Instance store என்பது தற்காலிக நினைவகம் ஆகும்.',
      explanation: 'Instance Store volumes are physically attached to the host computer. When an instance is stopped or terminated, the host is released and all data is lost. Use EBS for persistent data.'
    },
    {
      id: 'prac_ec2_2',
      question: 'Which EC2 pricing model offers up to 90% discount off On-Demand prices for workloads that can tolerate unexpected interruptions?',
      options: [
        'Reserved Instances',
        'Spot Instances',
        'Dedicated Hosts',
        'On-Demand Instances'
      ],
      correctAnswer: 1,
      hint: 'These use unused AWS excess capacity.',
      tamilHint: 'AWS-ன் உபரி திறனை மிகக் குறைந்த விலையில் பயன்படுத்தும் மாடல்.',
      explanation: 'Spot Instances let you take advantage of spare AWS compute capacity at steep discounts (up to 90%), but AWS can reclaim them with a 2-minute notice.'
    },
    {
      id: 'prac_ec2_3',
      question: 'What is the role of EC2 User Data?',
      options: [
        'Stores the user password in plain text.',
        'A script that runs automatically with root privileges during the very first boot of the instance.',
        'A list of IAM users permitted to log into the machine.',
        'A CloudWatch metric for user login sessions.'
      ],
      correctAnswer: 1,
      hint: 'It is commonly used to install Apache or Docker when launching.',
      tamilHint: 'சர்வர் முதன்முதலில் தொடங்கும் போது தானாகவே இயங்கும் ஸ்கிரிப்ட்.',
      explanation: 'User Data scripts automate bootstrapping, such as installing web servers, updating packages, and cloning git repositories upon initial boot.'
    }
  ],
  s3: [
    {
      id: 'prac_s3_1',
      question: 'Are Amazon S3 bucket names globally unique or region-specific?',
      options: [
        'Region-specific (two accounts in different regions can have the same bucket name)',
        'Globally unique across all AWS accounts worldwide',
        'Unique only within a single AWS Availability Zone',
        'Unique only within your personal AWS account'
      ],
      correctAnswer: 1,
      hint: 'S3 buckets have public DNS endpoints.',
      tamilHint: 'உலகில் உள்ள அனைத்து AWS கணக்குகளிலும் பக்கெட் பெயர் தனித்துவமாக இருக்க வேண்டும்.',
      explanation: 'Because every S3 bucket is accessible via a unique DNS address (e.g. bucketname.s3.amazonaws.com), bucket names must be globally unique across all AWS customers.'
    },
    {
      id: 'prac_s3_2',
      question: 'Which S3 storage class is best suited for data with unknown or changing access patterns without operational overhead or retrieval fees?',
      options: [
        'S3 Standard',
        'S3 Glacier Deep Archive',
        'S3 Intelligent-Tiering',
        'S3 One Zone-IA'
      ],
      correctAnswer: 2,
      hint: 'It automatically moves objects between frequent and infrequent tiers.',
      tamilHint: 'பயன்பாட்டுக்கு ஏற்ப தானாகவே ஸ்டோரேஜ் கிளாஸை மாற்றும் AI வசதி.',
      explanation: 'S3 Intelligent-Tiering monitors access patterns and automatically moves data between frequent and infrequent access tiers to optimize cost with zero retrieval fees.'
    }
  ],
  iam: [
    {
      id: 'prac_iam_1',
      question: 'How should an application running on an EC2 instance securely access an S3 bucket?',
      options: [
        'Hardcode the AWS root user access key and secret key into the application source code.',
        'Assign an IAM Role with an S3 policy to the EC2 Instance Profile.',
        'Make the S3 bucket publicly readable and writable by everyone.',
        'Email the AWS security team to whitelist the EC2 public IP.'
      ],
      correctAnswer: 1,
      hint: 'Never hardcode credentials! Use temporary credentials.',
      tamilHint: 'எப்போதுமே பாஸ்வேர்டை கோடில் எழுதக்கூடாது; IAM Role பயன்படுத்த வேண்டும்.',
      explanation: 'Attaching an IAM Role to an EC2 instance provides temporary rotating credentials via the instance metadata service (IMDS), eliminating hardcoded keys.'
    }
  ],
  vpc: [
    {
      id: 'prac_vpc_1',
      question: 'What makes a VPC subnet "Public"?',
      options: [
        'It has an IP address starting with 192.168.',
        'Its route table has a route to an Internet Gateway (0.0.0.0/0 -> igw-xxxx).',
        'It is deployed in us-east-1.',
        'It has no Security Groups attached.'
      ],
      correctAnswer: 1,
      hint: 'Check the default destination in its route table.',
      tamilHint: 'சப்நெட்டின் ரூட் டேபிளில் Internet Gateway இணைக்கப்பட்டிருக்க வேண்டும்.',
      explanation: 'A subnet is considered public if its associated route table directs default traffic (0.0.0.0/0) to an Internet Gateway (IGW).'
    }
  ],
  lambda: [
    {
      id: 'prac_lambda_1',
      question: 'What is a "Cold Start" in AWS Lambda?',
      options: [
        'Running code in a server located in Antarctica.',
        'The initialization latency when Lambda creates a new execution container environment for the first request.',
        'When the code fails due to an uncaught syntax error.',
        'When a Lambda function runs without an internet connection.'
      ],
      correctAnswer: 1,
      hint: 'Downloading code + starting runtime environment.',
      tamilHint: 'புதிய கண்டெய்னர் உருவாகி முதல் கோரிக்கையை இயக்கும் போது ஏற்படும் சிறிய தாமதம்.',
      explanation: 'A cold start is the brief setup time taken by AWS to spin up a new container sandbox, initialize runtime, and load function dependencies upon receiving the first request.'
    }
  ]
};
