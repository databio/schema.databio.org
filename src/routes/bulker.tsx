import { useEffect, useState } from 'react';
import jsYaml from 'js-yaml';
import data from '../../list.json'; 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Select from 'react-select';
import { useNavigate, useLocation } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


interface YamlData {
  data: string;
}
interface YamlDescData {
  description: string;
}
interface YamlURLData {
  url: string;
}
interface YamlPathData {
  path: string;
}
interface YamlTitleData {
  title: string;
}


const options = Object.entries(data)
  .filter(([key]) => key.startsWith('bulker/'))
  .map(([key, value]) => ({
    label: key.replace('bulker/', ''),
    value: key.replace('bulker/', ''),
    url: value.url,
    description: value.description
  }));

const TemplateList = () => {
  const history = useNavigate();
  const location = useLocation();
  const [yamlData, setYamlData] = useState<YamlData | null>(null);
  const [yamlDescData, setYamlDescData] = useState<YamlDescData | null>(null);
  const [yamlURLData, setYamlURLData] = useState<YamlURLData | null>(null);
  const [yamlPathData, setYamlPathData] = useState<YamlPathData | null>(null);
  const [yamlTitleData, setYamlTitleData] = useState<YamlTitleData | null>(null);

  const loadDataFromHash = async (hash: string) => {
    const selectedOption = options.find(option => `#/${option.value}` === hash);
    if (selectedOption) {
      try {
        const fullUrl = `https://schema.databio.org/${selectedOption.url}`;
        const response = await fetch(fullUrl);
        const yamlContent = await response.text();
        const parsedYaml = jsYaml.load(yamlContent) as YamlData;
        const urlYaml = jsYaml.load(fullUrl) as YamlURLData;
        setYamlData(parsedYaml);
        setYamlDescData({ description: selectedOption.description });
        setYamlURLData(urlYaml);
        setYamlPathData({ path: selectedOption.url });
        setYamlTitleData({ title: selectedOption.label });
        history(`#/${selectedOption.value}`);
      } catch (error) {
        console.error('Error loading YAML file:', error);
      }
    }
  };

  // Load data based on initial hash on page load
  useEffect(() => {
    loadDataFromHash(location.hash);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash]);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = async (selectedOption: any) => {
    try {
      const fullUrl = `https://schema.databio.org/${selectedOption.url}`;
      const response = await fetch(fullUrl);
      const yamlContent = await response.text();
      const parsedYaml = jsYaml.load(yamlContent) as YamlData;
      const urlYaml = jsYaml.load(fullUrl) as YamlURLData;
      setYamlData(parsedYaml);
      setYamlDescData(selectedOption.description);
      setYamlURLData(urlYaml);
      setYamlPathData(selectedOption.url);
      setYamlTitleData(selectedOption.label);
      history(`#/${selectedOption.value}`);
    } catch (error) {
      console.error('Error loading YAML file:', error);
    }
  };

  const yamlString = JSON.stringify(yamlData, null, 2);
  const yamlDescString = JSON.stringify(yamlDescData, null, 2).replace(/"/g, '').replace(/{/g, '').replace(/}/g, '').replace(/description./g, ''); 
  const yamlURLString = JSON.stringify(yamlURLData, null, 2).replace(/"/g, '');
  const yamlPathString = JSON.stringify(yamlPathData, null, 2).replace(/"/g, '').replace(/{/g, '').replace(/}/g, '').replace(/path:/g, ''); 
  const yamlTitleString = JSON.stringify(yamlTitleData, null, 2).replace(/"/g, '').replace(/{/g, '').replace(/}/g, '').replace(/title:/g, ''); 

  return (
    <div>
      <div>
        <h1>Bulker schemas</h1>
        <h3>Search below to find schemas that belong to bulker</h3>
      </div>
      <div>
        <Select
          options={options}
          onChange={handleChange}
          value={options.find(option => `#${option.value}` === location.hash)}
        />
      </div>
      <div className="mt-3">
          {yamlString !== 'null' && ( 
            <>
              <div className="fw-bold mt-2">
                <Breadcrumb>
                  <Breadcrumb.Item href="/schemas">Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="https://ayobi.github.io/schemas/#/bulker/">bulker</Breadcrumb.Item>
                  <Breadcrumb.Item active>{yamlTitleString}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <h2>Schema title: {yamlTitleString}</h2>
              <span className="label">Description: </span>{yamlDescString} <br />
              <span className="label">Relative Path: </span>{yamlPathString} <br />
              <span className="label">API Endpoint: </span>
              <a href={yamlURLString} target="_blank" rel="noopener noreferrer">
                {yamlURLString}
              </a><br /> <br />
              <a
                href={yamlURLString}
                target="_blank"
                rel="noopener noreferrer"
                download="filename.yaml"
              >
                <Button variant="success">Download Schema</Button>  
              </a>
              <h2>Schema content </h2>
              <SyntaxHighlighter language="yaml" style={coldarkCold} showLineNumbers={true}>
                {yamlString}
              </SyntaxHighlighter>
            </>
          )}
      </div>
    </div>
  );
};

export default TemplateList;
