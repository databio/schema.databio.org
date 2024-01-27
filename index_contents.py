import glob
import json
import os
import shutil
import yaml

def read_yaml_description(file_path):
    """
    Extract the schema description from the yaml file
    """
    with open(file_path, 'r') as file:
        data = yaml.safe_load(file)
        description = data.get('description')
        return description


# List of all schemas
files_list = glob.glob("schemas/**/*.yaml", recursive=True)

tpls = {}
schema_metadata = {}
for f in files_list:
    print(f)
    f_split = f.split("/")
    basename, ext = os.path.splitext(f)
    f_split = basename.split("/")
    f_split
    namespace = f_split[1]
    tpl_name = f_split[-1]
    description = read_yaml_description(f)
    url = os.path.relpath(f, "schemas/")
    if namespace not in schema_metadata:
        schema_metadata[namespace] = {}
    
    schema_metadata[namespace][tpl_name] = {
        "namespace": namespace,
        "schema": f_split[-1],
        "url": url,
        "description": description
    }

    tpls[basename] = {
        "project": namespace,
        "url": url,
        "description": description
    }
    new_file = f"public/{url}"
    os.makedirs(os.path.dirname(new_file), exist_ok=True)
    shutil.copyfile(f, new_file)


print(json.dumps(schema_metadata, indent=4))
print("Namespaces: ", list(schema_metadata.keys()))

# Namespaces list
with open("public/namespaces.json", "w") as outfile:
    json.dump(list(schema_metadata.keys()), outfile, indent=4)

# Schema list for each namespace
for namespace in schema_metadata:
    with open(f"public/{namespace}/schemas.json", "w") as outfile:
        json.dump(schema_metadata[namespace], outfile, indent=4)

# List of all schemas
with open("public/list.json", "w") as outfile:
    json.dump(tpls, outfile, indent=4)

