# NOTE:
# These variables must be defined at root level in order to be configurable


#############
# IAM variables
#############

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


variable "aws_region" {
  default = "us-east-1"
}

variable "environment" {
  default = "Yahtzee"
}
