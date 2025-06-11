# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "unstable"; # or "stable-25.05"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    (pkgs.podman.overrideAttrs (oldAttrs: {
      version = "5.5.1";
      src = pkgs.fetchFromGitHub {
        owner = "containers";
        repo = "podman";
        rev = "v5.5.1";
        # This is the correct hash provided by the Nix build failure message.
        hash = "sha256-/dGFDwjAAc1D88VslVDolf2YVPZ9cHUCQjdaEreQSE0=";
      };
    }))
  ];

  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [ "denoland.vscode-deno"];
    # Enable previews
    previews = {
      enable = true;
      previews = {};
    };
  };
}
