# Read Me

## Ansible

### Development

- Start local ubuntu container by cding to `infra/docker` and running `docker compose up -d --build`

## Terraform

- Login to aws using `aws login`

Before terraform apply:

1. Edit infra/terraform/terraform.tfvars — fill in your real IP (curl -s ifconfig.me) and SSH
public key (cat ~/.ssh/id_ed25519.pub)
2. Generate an SSH key if you don't have one: ssh-keygen -t ed25519 -C "yahtzee-ec2" -f
~/.ssh/id_ed25519

Deploy sequence:

# Provision EC2

cd infra/terraform
terraform init && terraform plan && terraform apply

# Deploy the app

cd ../ansible
ansible-playbook playbooks/webservers.yml \
  -i inventories/production/inventory.ini \
  --private-key ~/.ssh/id_ed25519

Then open http://<elastic-ip>/ in a browser.
