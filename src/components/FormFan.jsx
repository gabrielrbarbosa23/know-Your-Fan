import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

export default function FormFan() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        endereco: '',
        cpf: '',
        interesses: '',
        eventos: '',
    });

    const [errors, setErrors] = useState({
        nome: '',
        email: '',
        endereco: '',
        cpf: '',
        interesses: '',
        eventos: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cpf') {
            let formattedCpf = value.replace(/\D/g, '');

            if (formattedCpf.length > 11) {
                formattedCpf = formattedCpf.slice(0, 11);
            }

            if (formattedCpf.length <= 3) {
                formattedCpf = formattedCpf.replace(/(\d{3})/, '$1');
            } else if (formattedCpf.length <= 6) {
                formattedCpf = formattedCpf.replace(/(\d{3})(\d{3})/, '$1.$2');
            } else if (formattedCpf.length <= 9) {
                formattedCpf = formattedCpf.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
            } else {
                formattedCpf = formattedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            }

            setFormData(prev => ({
                ...prev,
                [name]: formattedCpf
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

        for (let key in formData) {
            if (!formData[key]) {
                newErrors[key] = 'Este campo é obrigatório!';
            }
        }

        if (formData.email && !emailPattern.test(formData.email)) {
            newErrors.email = 'Email inválido! Certifique-se de incluir "@" e um domínio.';
        }

        if (formData.cpf && !cpfPattern.test(formData.cpf)) {
            newErrors.cpf = 'CPF inválido! O formato deve ser xxx.xxx.xxx-xx';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            await addDoc(collection(db, 'fans'), formData);
            alert('Dados enviados com sucesso!');
            setFormData({
                nome: '',
                email: '',
                endereco: '',
                cpf: '',
                interesses: '',
                eventos: '',
            });
            setErrors({}); 
        } catch (err) {
            console.error(err);
            alert('Erro ao enviar os dados.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Cadastro de Fã</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    name="nome" 
                    placeholder="Nome" 
                    onChange={handleChange} 
                    value={formData.nome} 
                />
                {errors.nome && <span style={{ color: 'red' }}>{errors.nome}</span>}<br />
                
                <input 
                    name="email" 
                    placeholder="Email" 
                    onChange={handleChange} 
                    value={formData.email} 
                />
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}<br />
                
                <input 
                    name="endereco" 
                    placeholder="Endereço" 
                    onChange={handleChange} 
                    value={formData.endereco} 
                />
                {errors.endereco && <span style={{ color: 'red' }}>{errors.endereco}</span>}<br />
                
                <input 
                    name="cpf" 
                    placeholder="CPF" 
                    onChange={handleChange} 
                    value={formData.cpf} 
                />
                {errors.cpf && <span style={{ color: 'red' }}>{errors.cpf}</span>}<br />
                
                <input 
                    name="interesses" 
                    placeholder="Interesses (separados por vírgula)" 
                    onChange={handleChange} 
                    value={formData.interesses} 
                />
                {errors.interesses && <span style={{ color: 'red' }}>{errors.interesses}</span>}<br />
                
                <input 
                    name="eventos" 
                    placeholder="Eventos ou compras no último ano" 
                    onChange={handleChange} 
                    value={formData.eventos} 
                />
                {errors.eventos && <span style={{ color: 'red' }}>{errors.eventos}</span>}<br />
                
                <button type="submit" className="submit-button">Enviar</button>
            </form>
        </div>
    );
}
