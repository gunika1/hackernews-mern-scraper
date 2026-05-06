import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage({ type }) {
  const isLogin = type === 'login';
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) await login({ email: form.email, password: form.password });
      else await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h1>{isLogin ? 'Login' : 'Create account'}</h1>
        {!isLogin && <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required minLength="6" />
        {error && <p className="error">{error}</p>}
        <button className="btn full" disabled={loading}>{loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}</button>
        <p className="switch-text">
          {isLogin ? 'New here?' : 'Already have an account?'} <Link to={isLogin ? '/register' : '/login'}>{isLogin ? 'Register' : 'Login'}</Link>
        </p>
      </form>
    </main>
  );
}
