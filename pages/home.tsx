import Head from 'next/head';
import Home from '../components/Home';

const LoginPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Login / Hackatweet</title>
            </Head>
            <Home />
        </>
    );
}

export default LoginPage;
