import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConnection';
import 'tailwindcss/tailwind.css';
import { Link, useNavigate } from 'react-router-dom';

export function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/home');
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-grey-100">
            <div className="max-w-md w-full p-8 bg-black rounded-md shadow-md">
                <h2 className="text-3xl font-bold mb-4">Crie uma conta</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-1">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
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
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block mb-1">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
                        />
                    </div>
                    {error && <div className="text-red-500">{error}</div>}
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Register</button>
                </form>
                <div className="mt-4">
                    <Link to="/" className="text-blue-500 hover:underline">Já possui conta? Login</Link>
                </div>
            </div>
        </div>
    )
}
