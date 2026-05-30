output "app_ip" {
  description = "Elastic IP — use this in the Ansible production inventory"
  value       = module.ec2.elastic_ip
}
