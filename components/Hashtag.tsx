
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { loadTweets } from '../reducers/tweets';
import { useRouter } from 'next/router';
import styles from '../styles/Hashtag.module.css';
import Link from 'next/link';
import Tweet from './Tweet';
import Trends from './Trends';
import Image from 'next/image';
import { clear } from 'console';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface TweetData {
    _id: string; // Identifiant du tweet
    author: { firstName: string; username: string }; // Objet de l'auteur
    content: string; // Contenu du tweet
    likes: { username: string }[]; // Tableau d'objets avec username
    createdAt: string; // Date de création
    __v?: number; // Version, optionnelle
  }
  
const Hashtag: React.FC = () => {
    const dispatch = useDispatch();
    
    // Typage de state.user et state.tweets dans useSelector
    const user = useSelector((state: { user: { value: { token: string | null; username: string | null; firstName: string | null } } }) => state.user.value);
    const tweetsData = useSelector((state: { tweets: { value: any[] } }) => state.tweets.value);

    const router = useRouter();
    const { hashtag } = router.query;
    
    // const debounceTimeout = useRef<NodeJS.Timeout | null>(null); 
    // useEffect(() => {
    //     if (!user.token) {
    //         if(debounceTimeout.current){
    //             clearTimeout(debounceTimeout.current);
    //         }
    //         debounceTimeout.current = setTimeout(() => {
    //             router.push('/');
    //         }, 300)
    //        }
    //        return () => {
    //         if (debounceTimeout.current) {
    //             clearTimeout(debounceTimeout.current); // Nettoyage lors de la désinstallation
    //         }
    //     };

    // }, [user.token, router]);

    const [query, setQuery] = useState<string>('#');

    useEffect(() => {
        if (!hashtag) {
            return;
        }

        setQuery(`#${hashtag}`);
        fetch(`${API_KEY}/tweets/hashtag/${user.token}/${hashtag}`)
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(loadTweets(data.tweets));
                }
            }).catch(error => console.error(error));
    }, [hashtag, user.token, dispatch]);

    const handleSubmit = () => {
        if (query.length > 1) {
            router.push(`/hashtag/${query.slice(1)}`);
        }
    };

    const tweets = tweetsData.map((data: TweetData, i: number) => (
        <Tweet key={data._id} {...data} />
    ));
    return (
        <div className={styles.container}>
            <div className={styles.leftSection}>
                <Link href="/home">
                    <Image src="/logo.png" alt="Logo" width={100} height={150} className={styles.logo} />
                </Link>
                <div className={styles.userSection}>
                    <Image src="/avatar.png" alt="Avatar" width={46} height={46} className={styles.avatar} />
                    <div className={styles.userInfo}>
                        <p className={styles.name}>{user.firstName}</p>
                        <p className={styles.username}>@{user.username}</p>
                    </div>
                    <button onClick={() => { router.push('/'); dispatch(logout()); }} className={styles.logout}>Logout</button>
                </div>
            </div>

            <div className={styles.middleSection}>
                <h2 className={styles.title}>Hashtag</h2>
                <div>
                    <input
                        type="text"
                        onChange={(e) => setQuery(`#${e.target.value.replace(/^#/, '')}`)}
                        onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
                        value={query}
                        className={styles.searchBar}
                    />
                    {tweets.length === 0 && <p className={styles.noTweet}>No tweets found with #{hashtag}</p>}
                    {tweets}
                </div>
            </div>

            <div className={styles.rightSection}>
                <h2 className={styles.title}>Trends</h2>
                <Trends />
            </div>
        </div>
    );
};

export default Hashtag;
