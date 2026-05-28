# iam variables

variable "user_name" {
  description = "The name for your IAM user"
  type = string
  default = "Yahtzee_Developer"
}

variable "filename" {
  description = "The name of the file that holds IAM user credentials"
  type = string
  default = "${path.module}/.env"
}
