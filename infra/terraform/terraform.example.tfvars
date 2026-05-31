# Run: curl -s ifconfig.me   to get your current public IP
local_ssh_ip = "YOUR_IP/32"

# Run: cat ~/.ssh/id_ed25519.pub   (or id_rsa.pub)
# Generate a key if needed: ssh-keygen -t ed25519 -C "yahtzee-ec2" -f ~/.ssh/id_ed25519
ssh_public_key = "ssh-ed25519 AAAA..."
