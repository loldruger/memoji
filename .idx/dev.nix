# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "unstable"; # or "stable-25.05"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    # Add firebase-tools for Firebase CLI
    pkgs.firebase-tools
  ];

  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [];
    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          # Use 'firebase serve' which officially supports the --port flag.
          # This is the simplest and most reliable way.
          command = [
            "firebase"
            "serve"
            "--only"
            "hosting"
            "--project"
            "memojii"
            "--port"
            "$PORT"
          ];
          manager = "web";
        };
      };
    };
  };
}
