import Head from 'next/head';
import SignIn from '../components/SignIn';

const SignInPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Sign-in / Hackatweet</title>
            </Head>
            <SignIn />
        </>
    );
}

export default SignInPage;
