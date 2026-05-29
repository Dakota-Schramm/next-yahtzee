# NOTE:
# These variables must be defined at root level in order to be configurable

#############
# EC2 variables
#############

variable "app_ssh_ip" {
  description = "Your IP for SSH access (e.g., 1.2.3.4/32)"
  type        = string
}

variable "ssh_public_key" {
  description = "Public SSH key to access EC2 instance"
  type        = string
}

variable "ec2_instance_type" {
  description = "The AWS instance type to use"
  type        = string
  default     = "t2.micro"
}

#############
# IAM variables
#############

variable "aws_region" {
  default = "us-east-1"
}

variable "environment" {
  default = "Yahtzee"
}
