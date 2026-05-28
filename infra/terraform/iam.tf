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
resource "local_sensitive_file" "access_key_file" {
  filename        = "${path.module}/${var.filename}"
  file_permission = "0600"
  content = <<-EOT
    AWS_ACCESS_KEY_ID=${aws_iam_access_key.access_key.id}
    AWS_SECRET_ACCESS_KEY=${aws_iam_access_key.access_key.secret}
  EOT
}
