output "elastic_ips" {
  description = "Stable public IPs for all EC2 instances"
  value       = aws_eip.app_eip[*].public_ip
}
