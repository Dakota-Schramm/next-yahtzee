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

variable "public_subnet_ids" {
  description = "IDs of public subnet EC2 will be available in"
  type        = list(string)
}

variable "environment" {
  description = "Environment name used for resource tags"
  type        = string
  default     = "Yahtzee"
}

variable "vpc_id" {
  description = "ID of VPC that EC2 will be in"
  type        = string
}
