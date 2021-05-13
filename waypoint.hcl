project = "modelcanvas"

# An application to deploy.
app "web" {
    labels = {
        "service" = "modelcanvas",
        "env" = "PROD" 
    }
    # Build specifies how an application should be deployed. In this case,
    # we'll build using a Dockerfile and keeping it in a local registry.
    build {
        use "pack" {}

        # Uncomment below to use a remote docker registry to push your built images.
        #
        # registry {
        #   use "docker" {
        #     image = "registry.example.com/image"
        #     tag   = "latest"
        #   }
        # }

    }

    # Deploy to Docker
    deploy {
        use "docker" {}
    }
}