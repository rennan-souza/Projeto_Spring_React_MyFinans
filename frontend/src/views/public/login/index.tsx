import { useContext, useEffect, useState, type FormEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type { LoginRequestType } from "../../../types/LoginRequestType";
import { autenticar } from "../../../services/AuthService";

function Login() {

    const navigate = useNavigate();

    const { setAuthContextData } = useContext(AuthContext);

    const [alertMessage, setAlertMessage] = useState<boolean>(false);

    const [load, setLoad] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');


    async function handleLogin(event: FormEvent) {
        setLoad(true);
        event.preventDefault();

        const data: LoginRequestType = ({
            email,
            senha
        });

        await autenticar(data).then((res) => {
            localStorage.setItem("token", res.data.token);
            setAuthContextData({ authenticated: true });
            console.log(res)
            navigate("/dashboard");
        }).catch(() => {
            setAlertMessage(true);
            setLoad(false)
        });
    }

    useEffect(() => {

    }, [alertMessage, load])

    return (
        <div className="container">
            <div className="c-card mt-5">
                <div className="text-center mb-4">
                    <h1 className="mb-4">
                        <i className="bi bi-coin"></i>
                        MyFinans
                    </h1>
                    <h1 className="fs-3 text-secondary mb-0">
                        Login
                    </h1>
                </div>

                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Email"
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="form-control mb-2"
                        placeholder="Senha"
                        name="senha"
                        onChange={e => setSenha(e.target.value)}
                    />
                    {alertMessage && <div className="alert alert-danger">Usuário ou senha inválidos</div>}
                    <div className="d-grid mb-4">
                        {load === false ?
                            <button type="submit" className="btn btn-lg btn-primary">
                                Entrar
                            </button>
                            :
                            <button className="btn btn-lg btn-primary btn-disabled">
                                Entrando...
                            </button>
                        }
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <a href="#" className="mb-3 text-secondary base-link">Esqueci minha senha</a>
                        <NavLink to="/criar-conta" className="mb-0 fs-2 text-primary base-link">Criar conta</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;