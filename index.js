import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/analyze-emotion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input, prompt })
    });

    const data = await res.json();
    setResponse(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Input:</td>
              <td><textarea value={input} onChange={e => setInput(e.target.value)} /></td>
            </tr>
            <tr>  
              <td>Prompt:</td>
              <td><textarea value={prompt} onChange={e => setPrompt(e.target.value)} /></td>
            </tr>
            <tr>
              <td></td>
              <td><button type="submit">Analyze</button></td>
            </tr>
          </tbody>
        </table>
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>response.message</pre>
        </div>
      )}
    </div>
  );
}
