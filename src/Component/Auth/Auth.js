import './Auth.css'
import { useState } from "react"
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const AccessCode = (e) => {
        e.preventDefault();
        if (code === '070725') {
            navigate('/wishes');
        } else {
            setError(true)
        }
    }

    return (
        <div className="bg-gradient">
            <div className="form-container">
                <form className="Auth-form" onSubmit={AccessCode}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="lock-icon"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        strokeWidth="0"
                        fill="currentColor"
                        stroke="currentColor"
                    >
                        <path
                            d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 0 1 .567-3.677A2.001 2.001 0 0 1 14 16a1.99 1.99 0 0 1-1 1.723z"
                        ></path>
                    </svg>
                    <p className="form-title">Mi Lista de Deseos</p>
                    <p className="form-sub-title">
                        Para verificar que eres miembro de esta lista de deseos por favor introduzca la clave de acceso.
                    </p>
                    <div className="login-card">
                        <div className="field-container">
                            <input placeholder="" className="input" type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
                            <span className="placeholder">Código de acceso</span>
                            {error ? (<p style={{ color: "red", marginRight: 20 + "px"}}>❌</p>) : ''}
                        </div>
                        <button className="btn" type="button">
                            <a className="btn-label" onClick={AccessCode}>Continue</a>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Auth;