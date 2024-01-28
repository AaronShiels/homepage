terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.34.0"
    }
  }

  backend "s3" {
    profile = "personal"
    region  = "us-west-2"

    bucket = "aaronshiels-state"
    key    = "shiels.net.au/terraform.tfstate"
  }
}
