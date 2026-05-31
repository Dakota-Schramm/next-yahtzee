output "app_ip" {
  description = "Elastic IPs — use these in the Ansible production inventory"
  value       = module.ec2.elastic_ips
}
