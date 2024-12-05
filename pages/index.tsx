import Head from 'next/head';
import Login from '../components/Login';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Home / Hackatweet</title>
            </Head>
            <Login />
        </>
    );
}

export default Index;
