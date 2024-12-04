import { useDispatch, useSelector } from 'react-redux';
import { likeTweet, deleteTweet } from '../reducers/tweets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import Moment from 'react-moment';
import styles from '../styles/Tweet.module.css';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY
interface TweetProps {
    _id: string;
    content: string;
    createdAt: string;
    likes: { username: string }[];
    author: { firstName: string; username: string };
}

const Tweet: React.FC<TweetProps> = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state: { user: { value: any } }) => state.user.value);

    const handleLike = () => {
        fetch(`${API_KEY}/tweets/like`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token, tweetId: props._id }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(likeTweet({ tweetId: props._id, username: user.username }));
                }
            }).catch(error => console.error(error));
    };

    const handleDelete = () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce tweet ?'))
            fetch(`${API_KEY}/tweets`,{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token, tweetId: props._id }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(deleteTweet(props._id));
                }
            });
    };

    const isLiked = props.likes.some(e => e.username === user.username);
    const likeStyle: React.CSSProperties = isLiked ? { color: '#f91980' } : {};

    const formattedContent = props.content.split(' ').map((word, i) => (
        word.startsWith('#')
            ? <span key={i} style={{ fontWeight: 'bold' }}><Link href={`/hashtag/${word.slice(1)}`}>{word}</Link> </span>
            : word + ' '
    ));

    return (
        <div className={styles.container}>
            <div className={styles.userInfo}>
                <Image src="/avatar.png" alt="Avatar" width={46} height={46} className={styles.avatar} />
                <p className={styles.content}>
                    <span className={styles.name}>{props.author.firstName}</span>
                    <span className={styles.greyText}>@{props.author.username} · <Moment className={styles.greyText} fromNow>{props.createdAt}</Moment></span>
                </p>
            </div>
            <p>{formattedContent}</p>
                <FontAwesomeIcon onClick={handleLike} icon={faHeart} className={styles.like} style={likeStyle} />
            <span style={likeStyle}>{props.likes.length}</span>
              {props.author.username === user.username && (
                <FontAwesomeIcon onClick={handleDelete} icon={faTrashCan} className={styles.delete} />
            )}
        </div>
    );
};

export default Tweet;
