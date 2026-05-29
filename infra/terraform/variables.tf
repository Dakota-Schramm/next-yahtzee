# iam variables

variable "user_name" {
  description = "The name for your IAM user"
  type = string
  default = "Yahtzee_Developer"
}

variable "filename" {
  description = "The name of the file that holds IAM user credentials"
  type = string
  default = ".env"
}

# vpc variables
variable "aws_region" {
  default = "us-east-1"
}

variable "environment" {
  default = "Yahtzee"
}

variable "vpc_cidr" {
  default     = "10.0.0.0/16"
  description = "CIDR block of the vpc"
}

variable "public_subnet_cidrs" {
  type        = list(string)
  description = "Public Subnet CIDR values"
  default     = ["10.0.1.0/24"]
}

variable "private_subnet_cidrs" {
  type        = list(string)
  description = "Private Subnet CIDR values"
  default     = ["10.0.4.0/24"]
}
