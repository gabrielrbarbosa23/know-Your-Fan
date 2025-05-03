import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import '../styles.css';

const Dashboard = () => {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "fans"));
                const lista = [];
                querySnapshot.forEach((doc) => {
                    lista.push({ id: doc.id, ...doc.data() });
                });
                setDados(lista);
            } catch (error) {
                console.error("Erro ao buscar dados: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            {loading ? (
                <p>Carregando dados...</p>
            ) : dados.length === 0 ? (
                <p>Nenhum fã cadastrado.</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>CPF</th>
                            <th>Interesses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map((fan) => (
                            <tr key={fan.id}>
                                <td>{fan.nome}</td>
                                <td>{fan.email}</td>
                                <td>{fan.cpf}</td>
                                <td>{fan.interesses}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* Botão para voltar para a página principal */}
            <button 
                onClick={() => navigate('/')} 
                className="back-button">
                Voltar
            </button>
        </div>
    );
};

export default Dashboard;
