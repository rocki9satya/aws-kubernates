module "kubernetes" {
  source = "../modules/website-config"

  project   = var.project
  #container = "drehnstrom/space-invaders:v1.0"
  container = "satya03521/space-invaders:v1.0"
}
