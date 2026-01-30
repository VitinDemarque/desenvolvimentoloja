import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';
import { TransitionLink } from '../components/TransitionLink';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPwdReq, setShowPwdReq] = useState(false);
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  const validatePassword = (pwd: string) => {
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    return hasUpperCase && hasLowerCase && hasNumber && pwd.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic Validations
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não conferem.');
      return;
    }

    if (!validatePassword(password)) {
      setError('A senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número.');
      return;
    }

    showLoading();

    try {
      // Format phone to include country code if needed, or send as is
      const fullPhone = `+55${phone.replace(/\D/g, '')}`;

      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email, 
          password,
          phone: fullPhone,
          role: 'customer' // Default role
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setTimeout(() => {
        navigate('/login');
        setTimeout(() => hideLoading(), 300);
      }, 500);

    } catch (err: any) {
      setError(err.message);
      hideLoading();
    }
  };

  return (
    <div className="container" style={{ marginTop: '0', maxWidth: '1600px', marginBottom: '100px' }}>
      <h2 className="section-title">Criar Conta</h2>
      {error && <div className="error-msg">{error}</div>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Nome Completo */}
        <input
          type="text"
          placeholder="Nome Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="auth-input"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="auth-input"
        />

        {/* Telefone */}
        <div className="phone-input-group">
          <span className="phone-prefix">
            <img src="https://flagcdn.com/w40/br.png" alt="Brasil" style={{ width: '24px', borderRadius: '2px' }} />
            +55
          </span>
          <input
            type="tel"
            placeholder="(11) 99999-9999"
            value={phone}
            onChange={(e) => {
              // Only allow numbers
              const val = e.target.value.replace(/\D/g, '');
              // Apply basic masking
              let formatted = val;
              if (val.length > 2) formatted = `(${val.slice(0, 2)}) ${val.slice(2)}`;
              if (val.length > 7) formatted = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7, 11)}`;
              setPhone(formatted);
            }}
            required
            className="auth-input"
            style={{ border: 'none', paddingLeft: '0' }}
          />
        </div>

        {/* Senha */}
        <div className="password-group">
          {showPwdReq && (
            <div className="password-requirements">
              <div className={`requirement-item ${password.length >= 8 ? 'valid' : 'invalid'}`}>
                {password.length >= 8 ? '✓' : '•'} Mínimo de 8 caracteres
              </div>
              <div className={`requirement-item ${/[A-Z]/.test(password) ? 'valid' : 'invalid'}`}>
                {/[A-Z]/.test(password) ? '✓' : '•'} Uma letra maiúscula
              </div>
              <div className={`requirement-item ${/[a-z]/.test(password) ? 'valid' : 'invalid'}`}>
                {/[a-z]/.test(password) ? '✓' : '•'} Uma letra minúscula
              </div>
              <div className={`requirement-item ${/\d/.test(password) ? 'valid' : 'invalid'}`}>
                {/\d/.test(password) ? '✓' : '•'} Um número
              </div>
            </div>
          )}
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setShowPwdReq(true)}
            onBlur={() => setShowPwdReq(false)}
            required
            className="auth-input"
          />
        </div>

        {/* Confirmar Senha */}
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="auth-input"
        />

        <button type="submit" className="hero-cta" style={{ width: '100%', marginTop: '10px' }}>Cadastrar</button>
      </form>
      <TransitionLink to="/login" className="auth-link">Já tem uma conta? Entre</TransitionLink>
    </div>
  );
}