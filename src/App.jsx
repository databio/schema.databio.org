import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Select from 'react-select'

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
    const [schema, setSchema] = useState();
    const [namespace, setNamespace] = useState();
    useEffect(() => {
      setSchema(searchParams.get('schema'))
      setNamespace(searchParams.get('namespace'))
    })


    return (
        <div>
        {/* Breadcrumbs */}
        <a href="/">Home</a>  {namespace ? <> &#187; <a href={`/?namespace=${namespace}`}>{namespace}</a> </> : "" } &#187; {schema ? <>{schema}</> : "..."}

        <ViewSwitcher schema={schema} namespace={namespace} setNamespace={setNamespace} setSchema={setSchema} setSearchParams={setSearchParams}/>
        </div>
    );
};

const ViewSwitcher = (props) => {
    if (props.namespace) {
        if (props.schema) {
            return <SchemaDashboard namespace={props.namespace} schema={props.schema}/>
        } else {
            return <NamespaceDashboard namespace={props.namespace} setSchema={props.setSchema} setSearchParams={props.setSearchParams} />
        }               
    } else {
        return <SchemaSelector setNamespace={props.setNamespace} setSearchParams={props.setSearchParams}/>
    }
}

const SchemaDashboard = (props) => {
  const [schema, setSchema] = useState([]);
  useEffect(() => {
    fetch(`/${props.namespace}/${props.schema}.yaml`)
      .then(response => response.text())
      .then(data => {
        setSchema(data)
        console.log("schema:", data)
      })
  }, [])

  const divStyle = {
    'backgroundColor': '#eee',
    'padding': '10px',
    'fontSize': '0.7em',
  }

    return (
        <div>
        <h3>Schema</h3>
        <b>Description:</b> {schema.description}<br/>
        <b>Relative path:</b> {`${props.namespace}/${props.schema}.yaml`} <br/>
        <b>Endpoint:</b> https://schema.databio.org/{`${props.namespace}/${props.schema}.yaml`}<br/>
        <b>Preview (this page):</b> https://schema.databio.org/?namespace={`${props.namespace}`}&schema={`${props.schema}`}<br/>

        <a href={`/${props.namespace}/${props.schema}.yaml`}><button className="btn btn-primary my-4" >Download schema</button></a>

        <h4>Preview</h4>
        <pre style={divStyle}><code>{schema}</code></pre>
        </div>
    );
}


const NamespaceDashboard = (props) => {
  const [schemaList, setSchemaList] = useState([]);
  useEffect(() => {
    fetch(`/${props.namespace}/schemas.json`)
      .then(response => response.json())
      .then(data => {
        setSchemaList(data)
        console.log("schemaList:", Object.values(data))
      })
  }, [])

  const selectSchema = (schema) => {

    props.setSearchParams((prevParams) => { 
      prevParams.append('schema', schema)
      return prevParams
    })
    props.setSchema(schema)
  }

    return (
        <div>
        <h2>Namespace:  {props.namespace}</h2>
        <h4>Schemas</h4>
        {schemaList ? <SchemaList schemas={schemaList} selectSchema={selectSchema}/> : 
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
            }
        
        </div>
    );
}

const SchemaList = (props) => {
  const listItems = Object.values(props.schemas).map(schema => { 
    return <li key={schema.schema}>
      <a href={`/?namespace=${schema.namespace}&schema=${schema.schema}`} className="a" onClick={(e) => { e.preventDefault(); props.selectSchema(schema.schema); } }>{schema.schema}</a> -- {schema.description}  <a href={schema.url}>Download</a>
    </li>
  })
  console.log(props.schemas)
  // const listItems = ["a", "b", "c"]

    return (
        <div>
        <ul>
        {listItems}
        </ul>
        </div>
    );
}


const SchemaSelector = (props) => {
    const [namespaceList, setNamespaceList] = useState([]);
    useEffect(() => {
      fetch('/namespaces.json')
        .then(response => response.json())
        .then(data => {
          console.log("Namespaces:", data)
          const options = data.map((item) => { 
            return {"value": item, "label": item }
          })
          console.log("options:", options)
          setNamespaceList(options)
        })
    }, [])

    const selectNamespace = (selectedOption) => {
        props.setSearchParams({ 'namespace': selectedOption.value })
        props.setNamespace(selectedOption.value)

    }
    return (
      <>
        <h2>Select namespace</h2>
        
        <Select options={namespaceList} onChange={selectNamespace} />

        <hr/>

        <h2>Guide</h2>
        This is a schema registry and API. It is hosted on GitHub Pages. 
        Schemas are identified by a <i>namespace</i> and <i>schema name</i>, put together to form a <i>registry path</i>, of this form:
        
        <br/><br/>

        <pre><code>&#123;namespace&#125;/&#123;schema&#125;</code></pre>
        
        <h3>Browsing</h3>
        
        To browse existing schemas, select a namespace from the dropdown above. This will show you a list of all schemas in that namespace

        <h3>API</h3>

        To access a schema via the API, use the following URL format:
        <br/><br/>
        <pre><code>https://schema.databio.org/&#123;namespace&#125;/&#123;schema&#125;.yaml</code></pre>

        You can also get a list of schemas in a namespace via the API:

        <br/><br/>

        <pre><code>https://schema.databio.org/&#123;namespace&#125;/schemas.json</code></pre>

        <h3>Contributing</h3>You can contribute your own schema via PR to the GitHub repository.
      </>
    );
}

export default App