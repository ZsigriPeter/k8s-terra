variable "vpc_id" {
  type = string
}

variable "subnet_ids" {
  description = "The first value should be the public subnet"
  type = list(string)
}

variable "project_name" {
  type = string
}

variable "aws_region" {
  type = string
}

variable "configure_kubectl" {
  type = bool
  default = true
}

variable "cluster_name" {
  type = string
}
