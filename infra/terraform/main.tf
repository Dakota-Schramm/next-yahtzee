module "iam" {
  source = "./modules/iam"

  user_name = var.user_name
  filename  = var.filename
}

module "networking" {
  source = "./modules/networking"

  vpc_cidr             = var.vpc_cidr
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  azs                  = local.azs
  environment          = var.environment
}

provider "aws" {
  region = var.aws_region
}
