locals {
  aws_region = "us-east-1"
  environment = "Yahtzee"
}

module "iam" {
  source = "./modules/iam"

  user_name = "${local.environment}_Developer"
}

module "networking" {
  source = "./modules/networking"

  azs                  = ["${local.aws_region}a"]
  environment          = local.environment
}

provider "aws" {
  region = local.aws_region
}
