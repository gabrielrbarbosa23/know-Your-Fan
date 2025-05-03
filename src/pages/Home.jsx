import React, { useState, useRef, useEffect } from "react";
import FormFan from "../components/FormFan";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import '../styles.css';

Modal.setAppElement("#root");

const Home = () => {
    const [modalAberta, setModalAberta] = useState(false);
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const inputSenhaRef = useRef(null);

    const abrirModal = () => {
        setModalAberta(true);
        setErro("");
        setSenha("");
    };

    const fecharModal = () => {
        setModalAberta(false);
        setErro("");
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (senha === "123") {
            fecharModal();
            navigate("/dashboard");
        } else {
            setErro("Senha incorreta. Enemy spotted!");
        }
    };

    useEffect(() => {
        if (modalAberta) {
            setTimeout(() => {
                if (inputSenhaRef.current) {
                    inputSenhaRef.current.focus();
                }
            }, 200);
        }
    }, [modalAberta]);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Know Your Fan</h1>
            <FormFan />

            <button
                onClick={abrirModal}
                style={{ marginTop: "20px", padding: "10px 20px" }}
                className="dashboard-button"
            >
                Acessar Dashboard
            </button>

            <Modal
                isOpen={modalAberta}
                onRequestClose={fecharModal}
                contentLabel="Digite a senha"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2>Senha de admin</h2>
                <form onSubmit={handleLogin}>
                    <input
                        ref={inputSenhaRef}
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Senha"
                        style={{ padding: "10px", marginRight: "10px" }}
                    />
                    <button type="submit" className="login-button">
                        Entrar
                    </button>
                </form>
                {erro && <p style={{ color: "red", marginTop: "10px" }}>{erro}</p>}
                <button
                    onClick={fecharModal}
                    className="cancel-button"
                >
                    Cancelar
                </button>
            </Modal>
        </div>
    );
};

export default Home;