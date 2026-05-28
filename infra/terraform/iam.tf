# users

resource "aws_iam_user" "fine_grained_user" {
  name = var.user_name
}

resource "aws_iam_access_key" "access_key" {
  user = aws_iam_user.fine_grained_user.name
}

resource "aws_iam_user_policy_attachment" "admin_policy_attachment" {
  user       = aws_iam_user.fine_grained_user.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

# Maybe output to env file instead??
resource "local_file" "access_key_file" {
  filename = var.filename
  content = <<-EOT
    IAM User Credentials : ${aws_iam_user.fine_grained_user.name}
    Access Key: ${aws_iam_access_key.access_key.id}
    Secret Key: ${aws_iam_access_key.access_key.secret}
  EOT
}
