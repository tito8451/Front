import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import Image from 'next/image';
import styles from '../styles/SignUp.module.css';
import { useRouter } from 'next/router';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
console.log("Mon Api Key est : " + API_KEY);
const SignUp: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: { user: { value: any } }) => state.user.value);
    const router = useRouter();

    useEffect(() => {
        if (user.token) {
            router.push('/');
        }
    }, [user.token, router]);

    const [firstName, setFirstName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!firstName || !username || !email || !password) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        fetch(`${API_KEY}/users/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, username, email, password }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({ token: data.token, username, firstName, email }));
                } else {
                    setError(data.error || 'Une erreur est survenue');
                }
            }).catch(error => console.error(error));
    };

    return (
        <div className={styles.container}>
            <Image src="/logo.png" alt="Logo" width={100} height={100} />
            <h3 className={styles.title}>Create your Hackatweet account</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" className={styles.input} onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder="Firstname" />
                <input type="text" className={styles.input} onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" />
                <input type="email" className={styles.input} onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
                <input type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
                <button type="submit" className={styles.button}>Sign up</button>
            </form>
            {error && <p className={styles.error}>{error}</p>} {/* Affichez l'erreur si elle existe */}
        </div>
    );
};

export default SignUp;
