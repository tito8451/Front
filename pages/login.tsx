import Head from 'next/head';
import Login from '../components/Login';

const LoginPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Login / Hackatweet</title>
            </Head>
            <Login />
        </>
    );
}

export default LoginPage;
