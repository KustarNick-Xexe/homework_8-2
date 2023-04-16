import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../main.css';

function useJsonFetch(url, opts = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url, opts)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  }, []);

  return [data, isLoading, hasError];
}

function DataComponent({ url }) {
  const [data, isLoading, hasError] = useJsonFetch(url);
  if (hasError) {
    return <div>Произошла ошибка!</div>;
  }
  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  return (
    <div>
      <h1>Данные</h1>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}

function ErrorComponent({ url }) {
  const [data, isLoading, hasError] = useJsonFetch(url);
  if (hasError) {
    return <div>Произошла ошибка!</div>;
  }
  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  return (
    <div>
      <h1>Данные</h1>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}

function LoadingComponent({ url }) {
  const [data, isLoading, hasError] = useJsonFetch(url);
  if (hasError) {
    return <div>Произошла ошибка!</div>;
  }
  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  return (
    <div>
      <h1>Ответ: </h1>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}

const urls = ['http://localhost:7070/data', 'http://localhost:7070/error', 'http://localhost:7070/loading']

const App = () => {
  return (
    <div className=''>
       {urls.map((url, index) => (
          <>
            <DataComponent key={index} url={url} />
            <ErrorComponent key={index} url={url} />
            <LoadingComponent key={index} url={url} />
          </>
       ))}
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));