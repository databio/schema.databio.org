# schema.databio.org

Welcome to lab schema repository. The schemas are hosted on github pages. 

## Accessing a schema

You can access schemas at the URLS: https://schema.databio.org/File.yaml.  For example: https://schema.databio.org/pep/2.0.0.yaml

This corresponds to the indicated folder in this repo.

## Contributing a schema

### Write a schema 

First, you have to write a schema yaml file. It should follow json-schema format.

### Upload your schema

After creating your schema file, you can contribute it to this repository so that you and others can more easily load it.  Name your schema yaml file with the name of the schema. Schemas in the registry are divided into namespaces, which are represented as subfolders in this repository. So, place your schema into an appropriate subfolder, and then open a pull request.

## Dev for react v2

This will change in the future, but for now:

- source schemas are found in the `/schemas` subfolder. Edit there.
- `index_contents.py` will create all the API endpoints and copy the schemas themselves into `/public`, so they will be served by react
- run `npm run bulid` to create the `/dist` folder from the source in `/src` (and `/public`).
- run `mv dist docs` since github pages wants to host from `/docs` only. (hack!)
- Host the site on github pages from the `docs` folder

TODO:
- [ ] re-automate the index_contents.py action (it's broken)
- [ ] automate the above build steps
- [ ] fix the breadcrumbs so they just update search params instead of triggering page refresh

