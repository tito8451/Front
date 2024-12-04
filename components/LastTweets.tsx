import { useSelector } from 'react-redux';
import Tweet from './Tweet';
import styles from '../styles/LastTweets.module.css';

interface TweetData {
    _id: string; // Identifiant du tweet
    author: { firstName: string; username: string }; // Objet de l'auteur
    content: string; // Contenu du tweet
    likes: { username: string }[]; // Tableau d'objets avec username
    createdAt: string; // Date de création
    __v?: number; // Version, optionnelle
  }
  
const LastTweets: React.FC = () => {
    const tweetsData = useSelector((state: { tweets: { value: any[] } }) => state.tweets.value);

    const tweets = tweetsData.map((data: TweetData, i: number) => (
        <Tweet key={data._id} {...data} /> // Utilisez _id ici comme clé
      ));

    return (
        <>
            {tweets.length === 0 ? <p style={{ textAlign: 'center' }}>Aucun tweet trouvé.</p> : tweets}
        </>
    );
};

export default LastTweets;
