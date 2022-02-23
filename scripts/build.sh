#!/bin/bash
set -eoux pipefail

build_dir="build/remix/production"

rm -rf "$build_dir"
rm -rf public/build

# default "node-cjs" build
BUILD_MODE=production pnpx remix build

# run esbuild again manually to bundle node_modules
pnpx esbuild "$build_dir/index.js" --bundle --platform=node "--outfile=$build_dir/index-bundle.js"

# zip it as a prebuilt netlify function
mkdir -p "$build_dir/netlify"
zip -j "$build_dir/netlify/index-bundle.zip" "$build_dir/index-bundle.js"
