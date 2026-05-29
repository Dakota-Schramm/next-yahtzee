module "iam" {
  source = "./modules/iam"

  user_name = "Yahtzee_Developer"
}

module "networking" {
  source = "./modules/networking"

  azs                  = local.azs
  environment          = var.environment
}

provider "aws" {
  region = var.aws_region
}
