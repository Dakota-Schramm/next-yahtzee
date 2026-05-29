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

resource "aws_key_pair" "ssh-key" {
  key_name   = "ssh-key"
  public_key = var.ssh_public_key
}

resource "aws_security_group" "web" {
  name   = "web-server"
  vpc_id = var.vpc_id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.app_ssh_ip]  # Restrict to your IP
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
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
  ami                         = aws_ami.ubuntu.id
  instance_type               = var.ec2_instance_type
  security_groups             = [aws_security_group.my_app.id]
  associate_public_ip_address = true
  count                       = length(var.azs)
  availability_zone           = element(var.azs, count.index)
  subnet_id                   = element(var.public_subnet_ids, count.index)
  key_name = "ssh-key"

  tags = {
    Name = "${var.environment} EC2 Instance"
  }
}
