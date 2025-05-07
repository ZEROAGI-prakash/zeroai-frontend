import { useState } from 'react'
import './App.css'

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setAnswer('');
    const res = await fetch(`${backendUrl}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history: [] }),
    });
    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Ask ZeroAI</h2>
      <input
        style={{ width: '80%', padding: 8, fontSize: 16 }}
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Type your question..."
      />
      <button onClick={fetchData} style={{ marginLeft: 8, padding: '8px 16px' }}>
        Ask
      </button>
      {loading && <div>Loading...</div>}
      {answer && (
        <div style={{ marginTop: 24, padding: 16, background: '#f0f0f0', borderRadius: 8 }}>
          <b>Answer:</b>
          <div>{answer}</div>
        </div>
      )}
    </div>
  );
}

export default App;
