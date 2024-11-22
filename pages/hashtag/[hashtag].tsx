import { useRouter } from 'next/router';
import Head from 'next/head';
import Hashtag from '../../components/Hashtag';

const HashtagPage: React.FC = () => {
    const router = useRouter();
    const { hashtag } = router.query; // Notez que `hashtag` aura le type `string | string[] | undefined`

    return (
        <>
            <Head>
                <title>#{hashtag} / Hackatweet</title>
            </Head>
            <Hashtag />
        </>
    );
}

export default HashtagPage;
