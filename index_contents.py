import glob
import json
import os
import yaml


def read_yaml_description(file_path):
    with open(file_path, 'r') as file:
        data = yaml.safe_load(file)
        description = data.get('description')
        return description


files_list = glob.glob("**/*.yaml", recursive=True)

tpls = {}
for f in files_list:
    # print(f)
    f_split = f.split("/")
    basename, ext = os.path.splitext(f)
    f_split = basename.split("/")
    f_split
    tpl_name = f_split[-1]
    description = read_yaml_description(f)
    tpls[tpl_name] = {
        "url": f,
        "description": description
    }

with open("list.json", "w") as outfile:
    json.dump(tpls, outfile, indent=4)
