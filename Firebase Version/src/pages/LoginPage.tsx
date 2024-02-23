import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConnection';
import 'tailwindcss/tailwind.css';
import { Link, useNavigate } from 'react-router-dom';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home');
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-900">
            <div className="max-w-md w-full p-8 bg-neutral-800 rounded-md shadow-md">
                <h2 className="font-bebas tracking-wider text-3xl mb-4">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-1">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:border-emerald-600 text-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:border-emerald-600 text-black"
                        />
                    </div>
                    {error && <div className="text-red-600">{error}</div>}
                    <button type="submit" className="w-full bg-emerald-700 text-white p-2 rounded-md hover:bg-emerald-600 focus:outline-none focus:bg-emerald-600">Login</button>
                </form>
                <div className="mt-4 flex justify-end">
                    <Link to="/register" className="text-emerald-500 block hover:underline">Não tem uma conta? Registre-se aqui</Link>
                </div>
            </div>
        </div>
    )
}
