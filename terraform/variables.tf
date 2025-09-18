variable "region" {
  description = "Region for the provider"
  type = string
  default = "eu-central-1"
}


variable "project_name" {
  description = "This value will be used as a tag for the related AWS resources!"
  type = string
}

variable "profile" {
  description = "Selected AWS CLI profile!"
  type = string
  default = "default"
}