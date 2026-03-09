# AWS S3 Setup with IAM User, Policy, VPC and Security Group

## Overview

This guide explains how to:

- Create an IAM User
- Create and attach an S3 policy
- Create an S3 bucket
- Configure a VPC
- Create Security Groups
- Test S3 access using AWS CLI

---

# 1. Create an IAM User

1. Log in to the AWS Console
2. Navigate to **IAM**
3. Click **Users**
4. Click **Create user**

### User Configuration

Username:

```
s3-access-user
```

Access type:

- Programmatic access (for AWS CLI)
- AWS Console access (optional)

Click **Next**

---

# 2. Create Custom IAM Policy

Go to:

```
IAM → Policies → Create Policy
```

Select **JSON** and paste the following policy.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListBucket",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": "arn:aws:s3:::thilanka-test-s3-bucket-03-09"
    },
    {
      "Sid": "ObjectPermissions",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::thilanka-test-s3-bucket-03-09/*"
    }
  ]
}
```

Policy name:

```
S3BucketAccessPolicy
```

Click **Create Policy**

---

# 3. Attach Policy to IAM User

1. Go to **IAM → Users**
2. Select the user `s3-access-user`
3. Click **Add Permissions**
4. Choose:

```
Attach policies directly
```

5. Select:

```
S3BucketAccessPolicy
```

6. Click **Add permissions**

---

# 4. Create an S3 Bucket

Navigate to:

```
AWS Console → S3 → Create Bucket
```

Configuration:

Bucket Name:

```
thilanka-test-s3-bucket-03-09
```

Region:

```
ap-south-1
```

Settings:

- Keep **Block Public Access enabled**
- Enable **Versioning** (optional)

Click **Create Bucket**

---

# 5. Create VPC

Navigate to:

```
VPC → Create VPC
```

Configuration:

Name:

```
dev-vpc
```

IPv4 CIDR block:

```
10.0.0.0/16
```

Click **Create VPC**

---

# 6. Create Subnets

Inside the VPC create the following subnets.

### Public Subnet

```
10.0.1.0/24
```

### Private Subnet

```
10.0.2.0/24
```

---

# 7. Create Security Group

Navigate to:

```
VPC → Security Groups → Create Security Group
```

Name:

```
web-sg
```

Attach to:

```
dev-vpc
```

### Inbound Rules

| Type | Port | Source |
|-----|-----|------|
| SSH | 22 | My IP |
| HTTP | 80 | 0.0.0.0/0 |
| HTTPS | 443 | 0.0.0.0/0 |

Click **Create**

---

# 8. Attach Security Group to EC2

Navigate to:

```
EC2 → Instances
```

1. Select your instance
2. Click:

```
Actions → Security → Change Security Groups
```

3. Attach:

```
web-sg
```

---

# 9. Configure AWS CLI

Install AWS CLI and run:

```bash
aws configure
```

Enter:

```
AWS Access Key
AWS Secret Key
Region
Output format
```

---

# 10. Test S3 Access

### List bucket

```bash
aws s3 ls s3://thilanka-test-s3-bucket-03-09
```

### Upload file

```bash
aws s3 cp test.txt s3://thilanka-test-s3-bucket-03-09/
```

### Download file

```bash
aws s3 cp s3://thilanka-test-s3-bucket-03-09/test.txt .
```

### Delete file

```bash
aws s3 rm s3://thilanka-test-s3-bucket-03-09/test.txt
```

---

# Project Structure Example

```
aws-s3-setup/
│
├── README.md
├── iam-policy.json
└── setup-guide.md
```

---

# DevOps Best Practice

For production environments consider infrastructure automation tools such as:

- Terraform
- AWS CloudFormation

This ensures reproducible and scalable infrastructure deployments.