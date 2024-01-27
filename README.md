# schema.databio.org

Welcome to the databio schema registry. This repository holds schemas that are then hosted using simple static API on GitHub pages. You can browse the API 
at https://schema.databio.org/. To get a specific schema, construct a URL like: `https://schema.databio.org/{namspace}/{schema}.yaml` -- for example, https://schema.databio.org/pep/2.0.0.yaml would give you the file found in this repository under `schemas/pep/2.0.0.yaml`.

## Contributing a schema

### Write a schema 

First, you have to write a schema yaml file. It should follow json-schema format.

### Upload your schema

After creating your schema file, you can contribute it to this repository so that you and others can more easily load it.  Name your schema yaml file with the name of the schema. Schemas in the registry are divided into namespaces, which are represented as subfolders in this repository. So, place your schema into an appropriate subfolder, and then open a pull request.

## Devopment guide

The front-end is built in React, using `vite`. Clone the repository and then start a development server with:

```
npm run dev
```

### Preparing the inputs

You need to run `index_contents.py` will create all the API endpoints and copy the schemas themselves into `/public`, so they will be served by React. This will be done by the github action for the deployed verison. For testing locally, you'll need to run it yourself. These resulting files are not checked into git since they are generated from the source schemas  found in the `/schemas` subfolder.


