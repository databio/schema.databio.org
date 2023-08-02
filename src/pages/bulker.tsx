import data from '../../list.json';

const TemplateList = () => {
  return (
    <div>
      <div>
        {Object.entries(data).map(([key, value]) => {
          if (value.url.startsWith('bulker/')) {
            const fullUrl = `https://schema.databio.org/${value.url}`;
            return (
              <div key={key}>
                <span className="label">Description: </span> {value.description} <br />
                <span className="label">URL: </span>
                  <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                    {fullUrl}
                  </a><br /><br />
                
                
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default TemplateList;
