import './App.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Bulker from './pages/bulker';
import Pep from './pages/pep';
import Pipelines from './pages/pipelines';
import Refgenie from './pages/refgenie';
import Refget from './pages/refget';


function App() {

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Lab schemas</h1>
        </div>
        <h2>About</h2>

        Here you'll find an API for databio lab schemas like bulker, pep, pipelines, refgenie, refget, etc.

        <h2>Contributing a schema</h2>

        <h4>Write a schema</h4>

        <p>First, you have to write a schema yaml file. It should follow json-schema format.</p>

        <h4>Upload your schema</h4>

        <p>After creating your schema file, you can contribute it to this repository so that you and others can more easily load it. Name your schema yaml file with the name of the schema. Schemas in the registry are divided into namespaces, which are represented as subfolders in this repository. So, place your schema into an appropriate subfolder, and then open a pull request.</p>

        <h2>Below is a list of schema categories</h2>
      </div>
      <Tabs
        defaultActiveKey="bulker"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="bulker" title="Bulker">
          <Bulker />
        </Tab>
        <Tab eventKey="pep" title="PEP">
          <Pep />
        </Tab>
        <Tab eventKey="pipelines" title="Pipelines">
          <Pipelines />
        </Tab>
        <Tab eventKey="refgenie" title="Refgenie">
          <Refgenie />
        </Tab>
        <Tab eventKey="refget" title="Refget">
          <Refget />
        </Tab>
      </Tabs>
      
    </>
  )
}

export default App



