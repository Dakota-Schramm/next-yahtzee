module "iam" {
  source = "./modules/iam"

  user_name = var.user_name
  filename  = var.filename
}

module "networking" {
  source = "./modules/networking"

  azs                  = local.azs
  environment          = var.environment
}

provider "aws" {
  region = var.aws_region
}
