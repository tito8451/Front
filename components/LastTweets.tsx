import { useSelector } from 'react-redux';
import Tweet from './Tweet';
import styles from '../styles/LastTweets.module.css';

const LastTweets: React.FC = () => {
    const tweetsData = useSelector((state: { tweets: { value: any[] } }) => state.tweets.value);

    const tweets = tweetsData.map((data, i) => {
        return <Tweet key={i} {...data} />;
    });

    return (
        <>
            {tweets.length === 0 ? <p style={{ textAlign: 'center' }}>Aucun tweet trouvé.</p> : tweets}
        </>
    );
};

export default LastTweets;
