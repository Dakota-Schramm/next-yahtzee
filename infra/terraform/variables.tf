variable "app_ssh_ip" {
  description = "Your public IP for SSH access (e.g., 1.2.3.4/32)"
  type        = string
}

variable "ssh_public_key" {
  description = "Contents of your SSH public key file"
  type        = string
}
