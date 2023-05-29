import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('/api/analyze-emotion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input, prompt })
      });
  
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error(error);
    }
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
          {/* Parse response.message into HTML */}
          <div dangerouslySetInnerHTML={{ __html: response.message }} />
        </div>
      )}
    </div>
  );
}
