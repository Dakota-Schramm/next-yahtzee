locals {
  aws_region = "us-east-1"
  environment = "Yahtzee"
}

module "ec2" {
  source = "./modules/ec2"

  azs               = ["${local.aws_region}a"]
  vpc_id            = module.networking.vpc_id
  public_subnet_ids = module.networking.public_subnet_ids
  ssh_public_key    = var.ssh_public_key
  local_ssh_ip      = var.local_ssh_ip
  environment       = local.environment
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
