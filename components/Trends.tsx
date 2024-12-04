import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import styles from '../styles/Trends.module.css';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const Trends: React.FC = () => {
    const user = useSelector((state: { user: { value: any } }) => state.user.value);
    const tweetsData = useSelector((state: { tweets: { value: any[] } }) => state.tweets.value);
    const [trendsData, setTrendsData] = useState<{ hashtag: string; count: number }[]>([]);

    useEffect(() => {
        fetch(`${API_KEY}/tweets/trends/${user.token}`)
            .then(response => response.json())
            .then(data => {
                console.log("c'est le trend",data);
                data.result && setTrendsData(data.trends);
            }).catch(error => console.error(error));
    }, [user.token, tweetsData]);

    const trends = trendsData.map((data, i) => (
        <Link key={i} href={`/hashtag/${data.hashtag.slice(1)}`}>
            <div className={styles.tweetContainer}>
                <h3 className={styles.hashtag}>{data.hashtag}</h3>
                <h4 className={styles.nbrTweet}>{data.count} Tweet{data.count > 1 && 's'}</h4>
            </div>
        </Link>
    ));

    return (
        <div className={styles.container}>
            {trends}
        </div>
    );
};

export default Trends;
