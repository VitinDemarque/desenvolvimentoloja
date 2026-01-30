import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';
import { TransitionLink } from '../components/TransitionLink';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    showLoading();
    
    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      login(data.token, data.user);
      
      // Delay navigation slightly to show success or transition
      setTimeout(() => {
        navigate('/');
        setTimeout(() => hideLoading(), 300);
      }, 500);
      
    } catch (err: any) {
      setError(err.message);
      hideLoading();
    }
  };

  return (
    <div className="container" style={{ marginTop: '0', maxWidth: '1600px', marginBottom: '100px' }}>
      <h2 className="section-title">Login</h2>
      {error && <div className="error-msg">{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="auth-input"
        />
        <button type="submit" className="hero-cta" style={{ width: '100%', marginTop: '10px' }}>Entrar</button>
      </form>
      <TransitionLink to="/register" className="auth-link">Cadastrar-se</TransitionLink>
    </div>
  );
}
