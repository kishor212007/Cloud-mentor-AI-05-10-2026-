export const interviewCategories = ['All', 'Basic Concepts', 'Technical Deep-Dive', 'Scenario-Based', 'Troubleshooting'];

export const interviewQuestions = [
  {
    id: 'int_1',
    category: 'Basic Concepts',
    roleLevel: 'College & Entry Level',
    question: 'What is Cloud Computing and what are its five essential characteristics defined by NIST?',
    shortExplanation: 'Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing.',
    tamilSummary: 'கிளவுட் கம்ப்யூட்டிங் என்பது இணையம் வழியாக சர்வர்கள் மற்றும் ஸ்டோரேஜை வாடகைக்கு எடுத்துப் பயன்படுத்தும் தொழில்நுட்பம்.',
    detailedAnswer: `**NIST 5 Essential Characteristics of Cloud Computing:**
1. **On-Demand Self-Service:** Users can provision compute, storage, or network resources unilaterally without human interaction with the service provider.
2. **Broad Network Access:** Capabilities are available over the internet and accessed through standard mechanisms (web browser, mobile, CLI).
3. **Resource Pooling:** Provider resources are pooled to serve multiple customers using a multi-tenant model.
4. **Rapid Elasticity:** Resources can be elastically provisioned and released to scale rapidly outward or inward based on demand.
5. **Measured Service:** Resource usage is monitored, controlled, and reported transparently (pay-per-use).`,
    tamilExplanation: `**கிளவுட் கம்ப்யூட்டிங்கின் 5 முக்கிய சிறப்பம்சங்கள்:**
1. **சுய சேவை (On-Demand):** யாரிடமும் கேட்காமல் நாமே சில நிமிடங்களில் சர்வர்களை உருவாக்கலாம்.
2. **எங்கும் அணுகலாம் (Broad Access):** இணையம் இருக்கும் எந்த சாதனத்திலிருந்தும் பயன்படுத்தலாம்.
3. **வளப் பகிர்வு (Resource Pooling):** ஒரே வன்பொருளை பல நிறுவனங்கள் பாதுகாப்பாகப் பகிர்கின்றன.
4. **நெகிழ்வுத்தன்மை (Rapid Elasticity):** தேவைக்கு ஏற்ப சர்வர்களை உடனே கூட்டலாம் அல்லது குறைக்கலாம்.
5. **அளவிடப்பட்ட கட்டணம் (Measured Service):** பயன்படுத்திய நேரத்திற்கு மட்டும் கட்டணம்.`,
    interviewerTip: 'Mentioning CapEx (saving on upfront physical hardware) vs OpEx (recurring operational expenditure) will earn bonus points!'
  },
  {
    id: 'int_2',
    category: 'Basic Concepts',
    roleLevel: 'Entry to Associate',
    question: 'Explain the difference between Amazon S3 and Amazon EBS. When would you choose one over the other?',
    shortExplanation: 'S3 is object storage accessible via web HTTP APIs; EBS is block storage mounted as a local hard drive to an EC2 instance.',
    tamilSummary: 'S3 என்பது இணையம் வழி அணுகும் ஆப்ஜெக்ட் ஸ்டோரேஜ்; EBS என்பது EC2 சர்வருடன் நேரடியாக இணைக்கப்படும் ஹார்ட் டிஸ்க் போன்றது.',
    detailedAnswer: `**Key Differences between S3 and EBS:**

| Dimension | Amazon S3 | Amazon EBS |
|---|---|---|
| **Storage Type** | Object Storage (Key-Value) | Block Storage (Raw blocks) |
| **Connection** | Independent service, accessed via REST API/HTTP | Attached directly to an EC2 instance (like a virtual hard drive) |
| **Max Size** | Virtually infinite (5TB max per object) | Up to 64 TB per volume |
| **Durability** | 99.999999999% (11 9s) across 3+ AZs | 99.8% to 99.999% within a single AZ |
| **Use Cases** | Backups, static websites, user media files, data lakes | Operating system boot disk, high-performance database files |

**Decision Rule:** If an EC2 server needs to mount a root filesystem or run a relational database with sub-millisecond IOPS, choose **EBS**. If you are storing photos, videos, or website assets accessible globally, choose **S3**.`,
    tamilExplanation: `**S3 மற்றும் EBS ஒப்பீடு:**
- **S3:** போட்டோக்கள், ஆவணங்கள், பேக்கப்களை சேமிக்கப் பயன்படுகிறது. இதற்கு EC2 சர்வர் தேவையில்லை; இணைய முகவரி வழியாக நேரடியாகப் பதிவிறக்கலாம்.
- **EBS:** இது உங்கள் லேப்டாப்பில் இருக்கும் SSD/Hard Disk போன்றது. இது ஒரு குறிப்பிட்ட EC2 சர்வருடன் மட்டும் இணைக்கப்பட்டு இயங்கும்.`,
    interviewerTip: 'Be sure to mention that EBS is locked to a single Availability Zone, whereas S3 automatically spans across multiple AZs.'
  },
  {
    id: 'int_3',
    category: 'Technical Deep-Dive',
    roleLevel: 'Cloud Engineer / Solutions Architect',
    question: 'What is the difference between an IAM Role and an IAM User? Why should you avoid hardcoding IAM Access Keys?',
    shortExplanation: 'IAM Users have permanent credentials for people; IAM Roles provide temporary short-lived credentials for AWS services or federated identities.',
    tamilSummary: 'IAM User என்பது நிரந்தர பாஸ்வேர்ட் கொண்ட மனிதர்களுக்கானது; IAM Role என்பது EC2 அல்லது Lambda-க்கு வழங்கப்படும் தற்காலிக அனுமதியாகும்.',
    detailedAnswer: `**1. IAM User:**
- Represents an individual person or dedicated service account.
- Has permanent credentials (Username/Password for Console, Access Key ID / Secret Access Key for CLI).
- High security risk if access keys are accidentally committed to public GitHub repositories!

**2. IAM Role:**
- Does **not** have permanent credentials or passwords.
- Assumed by trusted entities (like an EC2 instance, Lambda function, or cross-account admin).
- Issues **temporary, auto-rotating security credentials** via AWS STS (Security Token Service) that expire within 15 minutes to 12 hours.

**Best Practice:**
Always attach an **IAM Role** to EC2 Instance Profiles or Lambda functions. This eliminates hardcoded credentials completely, neutralizing the danger of token leaks.`,
    tamilExplanation: `**IAM User vs IAM Role:**
- IAM User-ல் உள்ள சீக்ரெட் கீ தவறுதலாக GitHub-ல் கசிந்தால் ஹேக்கர்கள் உங்கள் கணக்கை தவறாகப் பயன்படுத்தி பெரிய பில் ஏற்படுத்தலாம்.
- IAM Role பயன்படுத்தினால், AWS தானாகவே ஒவ்வொரு மணி நேரத்திற்கும் புதிய தற்காலிக சாவிகளை வழங்கி பாதுகாக்கும். இதனால் கீ கசியும் வாய்ப்பே இல்லை!`,
    interviewerTip: 'Reference AWS STS (Security Token Service) and instance metadata (IMDSv2) to show deep technical mastery.'
  },
  {
    id: 'int_4',
    category: 'Technical Deep-Dive',
    roleLevel: 'Solutions Architect',
    question: 'How do Security Groups and Network ACLs (NACLs) work together in Amazon VPC security?',
    shortExplanation: 'Security Groups are stateful instance-level firewalls with ALLOW rules only; NACLs are stateless subnet-level firewalls with both ALLOW and DENY rules evaluated in number order.',
    tamilSummary: 'Security Group என்பது சர்வர் அளவிலான ஃபயர்வால் (Stateful); NACL என்பது சப்நெட் அளவிலான முதல் அடுக்கு ஃபயர்வால் (Stateless).',
    detailedAnswer: `**Comparison Summary:**
1. **Level of Operation:**
   - NACL: Sits at the **Subnet boundary** (First line of defense).
   - Security Group: Sits at the **Network Interface (ENI) / Instance level**.
2. **Statefulness:**
   - Security Group is **Stateful**: If you allow incoming traffic on port 80, the return response traffic is automatically allowed regardless of outbound rules.
   - NACL is **Stateless**: Inbound and Outbound traffic must be explicitly allowed. If you allow inbound port 80, you must also allow outbound ephemeral ports (1024-65535) for responses!
3. **Rules:**
   - Security Group: **ALLOW rules only**. Everything else is implicitly denied.
   - NACL: Supports both **ALLOW and DENY** rules, processed in ascending numerical order (e.g., Rule 100 before Rule 200).`,
    tamilExplanation: `**முக்கிய வேறுபாடு:**
- நீங்கள் ஒரு குறிப்பிட்ட IP முகவரியை (Hacker IP) பிளாக் செய்ய விரும்பினால், Security Group-ல் முடியாது. அதற்கு **NACL-ல் DENY rule** எழுத வேண்டும்.
- Security Group-ல் அனுமதித்தால் போதும், பதில் தானாக சென்றுவிடும் (Stateful).`,
    interviewerTip: 'A favorite trick question: "Can you explicitly DENY an IP in a Security Group?" The answer is NO—you must use a Network ACL to deny specific IPs.'
  },
  {
    id: 'int_5',
    category: 'Scenario-Based',
    roleLevel: 'Senior / Solutions Architect',
    question: 'Scenario: Your company runs an e-commerce website on AWS. During a flash sale, traffic spikes 15x. The database CPU hits 100% and users experience timeout errors. How do you re-architect the system for scalability and high availability?',
    shortExplanation: 'Decouple with SQS, offload read queries to RDS Read Replicas, introduce ElastiCache (Redis) caching, and put CloudFront CDN in front.',
    tamilSummary: 'டிராஃபிக் உயர்வை சமாளிக்க: CloudFront கேச்சிங், ElastiCache (Redis), RDS Read Replica மற்றும் SQS மெசேஜ் வரிசைப்படுத்துதல்.',
    detailedAnswer: `**Architectural Solution Strategy:**
1. **Edge Caching with Amazon CloudFront:**
   - Cache static images, product catalogs, and CSS/JS at 600+ edge locations to absorb 60-80% of repetitive incoming requests.
2. **In-Memory Caching with Amazon ElastiCache (Redis):**
   - Cache frequent database queries (popular product prices, user session tokens). Redis serves reads in sub-millisecond time.
3. **Database Read/Write Splitting (RDS Read Replicas):**
   - Direct all read-heavy queries (product searches, reviews) to **RDS Read Replicas**.
   - Keep the primary database dedicated strictly to write transactions (orders, payments).
4. **Asynchronous Order Processing with Amazon SQS & Lambda:**
   - Do not process checkouts synchronously. Push purchase orders into an **Amazon SQS queue**.
   - Let background worker EC2 instances or Lambda functions consume messages from the queue at a steady rate, protecting the database from collapse.
5. **Auto Scaling & ALB:**
   - Put web servers inside an Auto Scaling Group behind an Application Load Balancer with target tracking on CPU (50%) and request count.`,
    tamilExplanation: `**நடைமுறை தீர்வு:**
1. **CloudFront CDN:** அனைத்து படங்களையும் பயனரின் உள்ளூர் நகரத்திலேயே கேச் செய்து விரைவாகக் காட்டலாம்.
2. **ElastiCache (Redis):** திரும்பத் திரும்ப கேட்கப்படும் தயாரிப்பு விவரங்களை ரேமில் சேமித்து 1 மில்லி விநாடியில் தரலாம்.
3. **Read Replica:** டேட்டாபேஸ் வாசிப்பு வேலைகளை தனி துணை டேட்டாபேஸுக்கு மாற்றுதல்.
4. **SQS Queue:** ஆர்டர்களை வரிசையில் நிறுத்தி ஒவ்வொன்றாக பாதுகாப்பாக பதிவு செய்தல்.`,
    interviewerTip: 'Always mention decoupled architecture using Amazon SQS—interviewers love seeing message queuing used for traffic smoothing.'
  },
  {
    id: 'int_6',
    category: 'Troubleshooting',
    roleLevel: 'DevOps / Cloud SysOps',
    question: 'Troubleshooting: You just launched a new EC2 Linux instance in a public subnet, but your SSH connection times out ("Connection timed out: port 22"). How do you troubleshoot step-by-step?',
    shortExplanation: 'Check: 1) Public IP assigned, 2) Security Group port 22 open, 3) Route Table has 0.0.0.0/0 to IGW, 4) NACL allows port 22, 5) Correct private key.',
    tamilSummary: 'SSH இணைப்பு வேலை செய்யவில்லை என்றால்: Security Group (Port 22), Internet Gateway ரூட், மற்றும் Public IP ஆகியவற்றை சரிபார்க்க வேண்டும்.',
    detailedAnswer: `**Systematic 5-Step Troubleshooting Checklist:**
1. **Security Group Inbound Rule:**
   - Verify that Port 22 (SSH) is allowed from your current public IP address (CIDR \`YOUR_IP/32\`).
2. **Route Table & Internet Gateway:**
   - Verify that the subnet's route table contains a route to an attached Internet Gateway: \`Destination: 0.0.0.0/0\` -> \`Target: igw-xxxx\`.
3. **Public IPv4 Address:**
   - Confirm that the EC2 instance was assigned a Public IPv4 address or an Elastic IP. (Private IP alone cannot be reached over the public internet).
4. **Network ACL (NACL):**
   - Check that the subnet NACL allows inbound TCP port 22 AND outbound ephemeral ports (1024-65535).
5. **Key Pair & Permissions:**
   - If error is "Permission Denied (publickey)", ensure your local \`.pem\` file has restricted permissions (\`chmod 400 key.pem\`) and username matches the OS (e.g., \`ec2-user\` for Amazon Linux, \`ubuntu\` for Ubuntu).`,
    tamilExplanation: `**சரிபார்க்க வேண்டிய 5 படிகள்:**
1. Security Group-ல் Port 22 அனுமதிக்கப்பட்டுள்ளதா?
2. Route Table-ல் Internet Gateway (igw) வழி உள்ளதா?
3. சர்வருக்கு Public IP உள்ளதா?
4. NACL ஃபயர்வாலில் போர்ட் 22 திறக்கப்பட்டுள்ளதா?
5. சரியான .pem கீ மற்றும் யூசர் பெயர் (ubuntu / ec2-user) பயன்படுத்தப்பட்டுள்ளதா?`,
    interviewerTip: '"Connection timed out" indicates a network/firewall blockage (SG, NACL, or Route Table). "Permission denied (publickey)" indicates network connection succeeded but authentication key failed.'
  }
];
