import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import type { CriarContaRequestType } from "../../../types/CriarContaRequestType";
import { criarConta } from "../../../services/AuthService";


function CriarConta() {

    const [listaDeErros, setListaDeErros] = useState<CriarContaRequestType>();

    const [formData, setFormData] = useState<CriarContaRequestType>({
        nome: "",
        dataNascimento: "",
        email: "",
        senha: ""
    });

    const navigate = useNavigate();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const res = await criarConta(formData);
            console.log(res);
            alert("Conta criada com sucesso!");
            navigate("/login");
        } catch (err: any) {
            if (err.response) {
                setListaDeErros(err.response.data.errors);
                console.log(err.response);
                alert(err.response.data.message);
            } else {
                alert("Ocorreu um erro inesperado. " + err);
            }
        }
    }

    return (
        <div className="container">
            <div className="c-card mt-5 m-auto w-350">
                <div className="text-center mb-4">
                    <h1 className="mb-4">
                        <i className="bi bi-coin"></i>
                        MyFinans
                    </h1>
                    <h1 className="fs-3 text-secondary mb-0">
                        Criar Conta
                    </h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label>Nome completo</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Seu nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                        />
                        <span className="text-danger fs-10">{listaDeErros?.nome}</span>
                    </div>
                    <div className="mb-2">
                        <label>Data de nascimento</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dataNascimento"
                            value={formData.dataNascimento}
                            onChange={handleChange}
                        />
                        <span className="text-danger fs-10">{listaDeErros?.dataNascimento}</span>
                    </div>
                    <div className="mb-2">
                        <label>Seu email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <span className="text-danger fs-10">{listaDeErros?.email}</span>
                    </div>
                    <div className="mb-3">
                        <label>Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Crie a sua senha"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                        />
                        {listaDeErros?.senha ? (
                            <span className="text-danger">{listaDeErros.senha}</span>
                        ) : (
                            <span className="fs-13">A senha deve ter de 6 a 12 caracteres</span>
                        )}

                    </div>
                    <div className="d-grid mb-4">
                        <button type="submit" className="btn btn-lg btn-primary">
                            Criar Conta
                        </button>
                    </div>
                    <div className="text-center">
                        <NavLink to="/login" className="base-link">Login</NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CriarConta;
