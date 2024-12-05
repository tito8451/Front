import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import Image from 'next/image';
import styles from '../styles/SignUp.module.css';
import { useRouter } from 'next/router';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'http://localhost:3000';
// console.log("Mon Api Key est : " + API_KEY);
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Vérifier les valeurs des champs
        if (!firstName || !username || !email || !password || username.length < 3 || username.length > 10 || password.length < 6) {
            alert('Veuillez remplir tous les champs avec des valeurs valides.');
            return;
        }

        try {
            const response = await fetch(`${API_KEY}/users/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, username, email, password }),
            });

            const data = await response.json(); // Convertir la réponse en JSON

            if (data.result) {
                dispatch(login({ token: data.token, username, firstName, email }));
                router.push('/');
            } else {
                setError(data.error || 'Une erreur est survenue');
            }
        } catch (error) {
            console.error('Erreur de fetch:', error); // Gérer l'erreur ici
            setError('Une erreur est survenue lors de la soumission.'); // Optionnel : faire un message d'erreur pour l'utilisateur
        }
    };

    return (
        <div className={styles.container}>
  <Image src="/logo.png" alt="Logo" width={100} height={100} />
  <h3 className={styles.title}>Create your Hackatweet account</h3>
  <form onSubmit={handleSubmit}>
      <input
          id="firstName"
          type="text"
          className={styles.input}
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete="given-name" // Utilisez 'given-name' pour le prénom
          value={firstName}
          placeholder="Firstname"
          required // Marquez comme requis
      />
      <input
          id="username"
          type="text"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          autoComplete="username" // Ajoutez l'attribut 'autocomplete'
          placeholder="Username"
          required // Marquez comme requis
      />
      <input
          id="email"
          type="email"
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          autoComplete="email" // Gardez l'attribut précisé
          placeholder="Email"
          required // Marquez comme requis
      />
      <input
          id="password"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          required // Marquez comme requis
      />
      <button type="submit" className={styles.button}>Sign up</button>
  </form>
  {error && <p className={styles.error}>{error}</p>} {/* Affichez l'erreur si elle existe */}
</div>

    );
};

export default SignUp;
