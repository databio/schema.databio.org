import './App.css'
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

function App() {
  
  interface SchemaOption {
    value: string;
    label: string;
  }
  
  const schemaOptions: SchemaOption[] = [
    { value: '/bulker/', label: 'Bulker' },
    { value: '/pep/', label: 'Pep' },
    { value: '/pipelines/', label: 'Pipelines' },
    { value: '/refgenie/', label: 'Refgenie' },
    { value: '/refget/', label: 'Refget' },
  ];

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (selectedOption: any) => {
    navigate(selectedOption.value)
  };

  return (
    <>
      <div>
        <div>
          <h1>Databio schemas</h1>
        </div>
        <h2>About</h2>

        Here you'll find an API for databio lab schemas like bulker, pep, pipelines, refgenie, refget, etc.

        <h2>Search schema categories below</h2>

        <Select
          options={schemaOptions}
          onChange={handleChange}
        />
      </div>
    </>
  )
}

export default App
