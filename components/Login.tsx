import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';
import Image from 'next/image';
import { Modal } from 'antd';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Login: React.FC = () => {
    const user = useSelector((state: { user: { value: any } }) => state.user.value);
    const [signUpModalVisible, setSignUpModalVisible] = useState<boolean>(false);
    const [signInModalVisible, setSignInModalVisible] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        if (user.token) {
          router.push('/');
        }
    }, [user.token, router]);

    const showSignUpModal = () => setSignUpModalVisible(true);
    const showSignInModal = () => setSignInModalVisible(true);
    const handleCancelSignUp = () => setSignUpModalVisible(false);
    const handleCancelSignIn = () => setSignInModalVisible(false);

    return (
        <div className={styles.container}>
            <div className={styles.leftSection}>
                <Image src="/logo.png" alt="Logo" width={300} height={300} />
            </div>
            <div className={styles.rightSection}>
                <Image src="/logo.png" alt="Logo" width={50} height={50} />
                <h2 className={styles.title}>See what’s happening</h2>
                <h3>Join Hackatweet today.</h3>
                <div onClick={showSignUpModal} className={styles.signUp}>
                    <a className={styles.signUpText}> Sign up</a>
                </div>
                <p>Already have an account?</p>
                <div onClick={showSignInModal} className={styles.signIn}>
                    <a> Sign in</a>
                </div>
            </div>

            <Modal onCancel={handleCancelSignUp} open={signUpModalVisible} footer={null}>
                <SignUp />
            </Modal>

            <Modal onCancel={handleCancelSignIn} open={signInModalVisible} footer={null}>
                <SignIn />
            </Modal>
        </div>
    );
};

export default Login;

