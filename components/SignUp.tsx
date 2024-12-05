import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import Image from 'next/image';
import styles from '../styles/SignUp.module.css';
import { useRouter } from 'next/router';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'http://localhost:3000'; // Défaut à local

const SignUp: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: { user: { value: any } }) => state.user.value);
    const router = useRouter();
   
    // Définir les états pour les champs de formulaire
    const [firstname, setFirstname] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Vérifie les valeurs des champs
        if (!firstname || !username || !email || !password || username.length < 3 || username.length > 10 || password.length < 6) {
            alert('Veuillez remplir tous les champs avec des valeurs valides.');
            return;
        }

        try {
            const response = await fetch(`${API_KEY}/users/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ firstname, username, email, password }),
            });
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json(); // Convertit la réponse en JSON

            if (data.result) {
                dispatch(login({ token: data.token, username, firstname, email }));
                router.push('/home'); // Redirige après la connexion
            } else {
                setError(data.error || 'Une erreur est survenue'); // Affiche l'erreur
            }
        } catch (error) {
            console.error('Erreur de fetch:', error); // Journaliser l'erreur
            setError('Une erreur est survenue lors de la soumission.'); // Message d'erreur pour l'utilisateur
        }
    };

    return (
        <div className={styles.container}>
            <Image src="/logo.png" alt="Logo" width={100} height={100} />
            <h3 className={styles.title}>Create your Hackatweet account</h3>
            <form onSubmit={handleSubmit}>
                <input
                    id="firstname"
                    type="text"
                    className={styles.input}
                    onChange={(e) => setFirstname(e.target.value)}
                    autoComplete="given-name"
                    value={firstname}
                    placeholder="Firstname"
                    required
                />
                <input
                    id="username"
                    type="text"
                    className={styles.input}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    autoComplete="username"
                    placeholder="Username"
                    required
                />
                <input
                    id="email"
                    type="email"
                    className={styles.input}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    autoComplete="email"
                    placeholder="Email"
                    required
                />
                <input
                    id="password"
                    type="password"
                    className={styles.input}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Password"
                    required
                />
                <button type="submit" className={styles.button}>Sign up</button>
            </form>
            {error && <p className={styles.error}>{error}</p>} {/* Affichez l'erreur si elle existe */}
        </div>
    );
};

export default SignUp;
