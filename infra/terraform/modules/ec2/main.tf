# Register the image that will be used for this resource
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]  # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Register key to allow for ssh access into EC2
resource "aws_key_pair" "ssh-key" {
  key_name   = "ssh-key"
  public_key = var.ssh_public_key
}

# allow incoming web traffic and only our ip address for ssh
# allow all outgoing traffic (?)
resource "aws_security_group" "web" {
  name   = "web-server"
  vpc_id = var.vpc_id

  ingress {
    description      = "SSH"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks = [var.local_ssh_ip]  # Restrict to your IP
  }

  ingress {
    description = "App"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "yahtzee_app" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.ec2_instance_type
  vpc_security_group_ids      = [aws_security_group.web.id]
  associate_public_ip_address = true
  count                       = length(var.azs)
  availability_zone           = element(var.azs, count.index)
  subnet_id                   = element(var.public_subnet_ids, count.index)
  key_name                    = "ssh-key"

  tags = {
    Name = "${var.environment} EC2 Instance"
  }
}

# register a consistent IP address for the service so restarts don't require
# reregistering the new IP address
resource "aws_eip" "app_eip" {
  count    = length(var.azs)
  instance = aws_instance.yahtzee_app[count.index].id
  domain   = "vpc"

  tags = {
    Name = "${var.environment} Elastic IP"
  }
}
