# SSL Setup with Let's Encrypt (Certbot) on AWS EC2

This guide explains how to generate a free SSL certificate for the domain:

```
luxuryevents.thilanka.abrdns.com
```

using **Let's Encrypt Certbot** on an Ubuntu EC2 instance.

---

# 1. Install Certbot

Update packages and install Snap:

```bash
sudo apt update
sudo apt install snapd -y
```

Install Certbot:

```bash
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
```

Create a symbolic link:

```bash
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

Verify installation:

```bash
certbot --version
```

---

# 2. Check EC2 Public IP

Certbot requires your domain to point to your server.

Get the public IP:

```bash
curl ifconfig.me
```

Example output:

```
13.xxx.xxx.xxx
```

---

# 3. Configure DNS Record

Login to your DNS provider (ClouDNS).

Create or update an **A Record**:

| Type | Host         | Value         |
| ---- | ------------ | ------------- |
| A    | luxuryevents | EC2_PUBLIC_IP |

Example:

```
luxuryevents.thilanka.abrdns.com → 13.xxx.xxx.xxx
```

Remove any record pointing to:

```
dynamic-dns.cloudns.net
```

---

# 4. Verify DNS

Check DNS propagation:

```bash
ping luxuryevents.thilanka.abrdns.com
```

or

```bash
dig luxuryevents.thilanka.abrdns.com
```

Expected result:

```
13.xxx.xxx.xxx
```

---

# 5. Stop Services Using Port 80

Certbot standalone needs port **80**.

If Nginx is running:

```bash
sudo systemctl stop nginx
```

If Node.js app is running:

```bash
sudo lsof -i :80
```

Stop the service if necessary.

---

# 6. Generate SSL Certificate

Run the following command:

```bash
sudo certbot certonly --standalone \
-d luxuryevents.thilanka.abrdns.com \
--email thilankamuthumal98@gmail.com \
--agree-tos
```

If prompted about EFF emails:

```
(Y)es/(N)o
```

You can choose **N**.

---

# 7. Certificate Location

Certificates will be stored at:

```
/etc/letsencrypt/live/luxuryevents.thilanka.abrdns.com/
```

Files:

```
fullchain.pem
privkey.pem
```

---

# 8. Test Auto-Renewal

Let's Encrypt certificates expire every **90 days**.

Test renewal:

```bash
sudo certbot renew --dry-run
```

---

# 9. Restart Services

Start Nginx again:

```bash
sudo systemctl start nginx
```

---

# Notes

* Ensure **port 80 and 443 are open** in AWS Security Group.
* DNS must point to the **EC2 public IP**.
* Certificates auto-renew using Certbot.

---

# Useful Commands

Check certificate:

```bash
sudo certbot certificates
```

Manual renewal:

```bash
sudo certbot renew
```
