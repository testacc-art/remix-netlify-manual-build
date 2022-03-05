#!/bin/bash
set -eoux pipefail

build_dir="build/remix/production"

rm -rf "$build_dir"
rm -rf public/build

# tailwind
rm -f app/index.css
pnpm run tailwind

# default "node-cjs" build
BUILD_MODE=production pnpx remix build

# run esbuild again manually to bundle node_modules
# (skip `mysql` which appears in https://github.com/knex/knex/blob/3616791ac2a6d17d55b29feed6a503a793d7c488/lib/dialects/mysql/index.js#L23)
pnpx esbuild "$build_dir/index.js" --bundle --platform=node "--outfile=$build_dir/index-bundle.js" --external:mysql

# zip it as a prebuilt netlify function
mkdir -p "$build_dir/netlify"
zip -j "$build_dir/netlify/index-bundle.zip" "$build_dir/index-bundle.js"
