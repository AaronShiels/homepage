locals {
  domain_name     = "shiels.net.au"
  domain_name_www = "www.${local.domain_name}"
}

resource "aws_route53_zone" "this" {
  name = local.domain_name
}

resource "aws_route53domains_registered_domain" "this" {
  domain_name = local.domain_name

  admin_privacy      = false
  registrant_privacy = false
  tech_privacy       = false
  transfer_lock      = false

  dynamic "name_server" {
    for_each = sort(aws_route53_zone.this.name_servers)

    content {
      name = name_server.value
    }
  }

  lifecycle {
    ignore_changes = [admin_contact, registrant_contact, tech_contact]
  }
}

resource "aws_route53_record" "a" {
  name    = local.domain_name
  zone_id = aws_route53_zone.this.id
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.this.domain_name
    zone_id                = aws_cloudfront_distribution.this.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "cname_www" {
  name    = local.domain_name_www
  zone_id = aws_route53_zone.this.id
  type    = "CNAME"
  ttl     = "300"
  records = [local.domain_name]
}

resource "aws_route53_record" "ns_subdomain" {
  for_each = data.aws_route53_zone.subdomain

  name    = each.value.name
  type    = "NS"
  ttl     = 172800
  zone_id = aws_route53_zone.this.zone_id

  records = each.value.name_servers
}

resource "aws_acm_certificate" "this" {
  domain_name               = local.domain_name
  subject_alternative_names = [local.domain_name_www]
  validation_method         = "DNS"

  provider = aws.certificate
}

resource "aws_route53_record" "validation" {
  for_each = {
    for dvo in aws_acm_certificate.this.domain_validation_options : dvo.domain_name => {
      name    = dvo.resource_record_name
      record  = dvo.resource_record_value
      type    = dvo.resource_record_type
      zone_id = aws_route53_zone.this.zone_id
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = each.value.zone_id
}

resource "aws_acm_certificate_validation" "this" {
  certificate_arn         = aws_acm_certificate.this.arn
  validation_record_fqdns = [for record in aws_route53_record.validation : record.fqdn]

  provider = aws.certificate
}

resource "aws_cloudfront_distribution" "this" {
  enabled             = true
  is_ipv6_enabled     = true
  aliases             = [local.domain_name, local.domain_name_www]
  default_root_object = "index.html"

  origin {
    origin_id   = aws_s3_bucket.this.bucket_domain_name
    domain_name = aws_s3_bucket.this.bucket_regional_domain_name

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.this.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    viewer_protocol_policy = "redirect-to-https"
    target_origin_id       = aws_s3_bucket.this.bucket_domain_name
    cache_policy_id        = data.aws_cloudfront_cache_policy.caching_optimized.id
  }

  ordered_cache_behavior {
    path_pattern           = "/index.html"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    viewer_protocol_policy = "redirect-to-https"
    target_origin_id       = aws_s3_bucket.this.bucket_domain_name
    cache_policy_id        = data.aws_cloudfront_cache_policy.caching_disabled.id
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.this.arn
    ssl_support_method  = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

resource "aws_cloudfront_origin_access_identity" "this" {}

resource "aws_s3_bucket" "this" {
  bucket = local.domain_name
}

resource "aws_s3_bucket_acl" "this" {
  bucket = aws_s3_bucket.this.id
  acl    = "private"

  depends_on = [aws_s3_bucket_ownership_controls.this]
}

resource "aws_s3_bucket_ownership_controls" "this" {
  bucket = aws_s3_bucket.this.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_policy" "this" {
  bucket = aws_s3_bucket.this.id
  policy = data.aws_iam_policy_document.bucket_read.json
}

resource "aws_s3_object" "this" {
  for_each = fileset("${path.module}/dist", "**")

  bucket       = aws_s3_bucket.this.id
  key          = each.value
  source       = "${path.module}/dist/${each.value}"
  content_type = endswith(each.value, ".html") ? "text/html" : endswith(each.value, ".js") ? "text/javascript" : endswith(each.value, ".css") ? "text/css" : endswith(each.value, ".png") ? "image/png" : "text/plain"
  etag         = filemd5("${path.module}/dist/${each.value}")
}
