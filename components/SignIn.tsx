import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import Image from 'next/image';
import styles from '../styles/SignIn.module.css';
import { useRouter } from 'next/router';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
console.log("Mon Api Key est : " + API_KEY);
const SignIn: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: { user: { value: any } }) => state.user.value);
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user.token) {
            router.push('/');
        }
    }, [user.token, router]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username || !password || !email) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        fetch(`${API_KEY}/users/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({ token: data.token, firstName: data.firstName, username: data.username, email: data.email }));
                } else {
                    setError(data.error || 'Une erreur est survenue');
                }
            }).catch(error => console.error(error));
    };

    return (
        <div className={styles.container}>
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            <h3 className={styles.title}>Connect to Hackatweet</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" className={styles.input} onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" />
                <input type="email" className={styles.input} onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
                <input type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
                <button type="submit" className={styles.button}>Sign in</button>
            </form>
            {error && <p className={styles.error}>{error}</p>} {/* Affichez l'erreur si elle existe */}
        </div>
    );
};

export default SignIn;
