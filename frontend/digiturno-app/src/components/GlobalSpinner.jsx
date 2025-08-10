import SphereSpinner from 'react-spinner-material';
import { useAuth } from '../hooks/useAuth';

export default function GlobalSpinner() {
    const { loading } = useAuth();

    if (!loading) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
        }}>
            <SphereSpinner radius={50} color={"#fff"} stroke={2} visible={true} />
        </div>
    );
}
