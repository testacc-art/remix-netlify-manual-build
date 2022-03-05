# remix-netlify-manual-build

```sh
pnpm install

pnpm run dev  # start remix app
pnpm run tsc:dev  # type check

pnpm run lint

pnpm run build
pnpm run deploy

# netlify initial setup
netlify sites:create --name remix-netlify-manual-build-hiro18181
netlify link --name remix-netlify-manual-build-hiro18181

# database setup
docker-compse up
pnpm run db:reset
pnpx knex migrate:latest

# migration on production
pnpx knex --knexfile knexfile.production.js migrate:latest
```

## references

- https://github.com/remix-run/remix/blob/acb7ff919e8636d65019784d802d18b0d6c57d01/examples/basic/README.md
- https://github.com/remix-run/remix/blob/5b8a0ce0aa0201aa2402fc41405ffbe89605963b/packages/create-remix/templates/netlify/README.md
- https://github.com/hi-ogawa/data-url-maker
