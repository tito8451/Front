import Head from 'next/head';
import Home from '../components/Home';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Home / Hackatweet</title>
            </Head>
            <Home />
        </>
    );
}

export default Index;
