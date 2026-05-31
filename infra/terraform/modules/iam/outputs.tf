output "iam_user_name" {
  description = "Name of the IAM user"
  value       = aws_iam_user.fine_grained_user.name
}

output "access_key_id" {
  description = "Access key ID for the IAM user"
  value       = aws_iam_access_key.access_key.id
  sensitive   = true
}

output "secret_access_key" {
  description = "Secret access key for the IAM user"
  value       = aws_iam_access_key.access_key.secret
  sensitive   = true
}
