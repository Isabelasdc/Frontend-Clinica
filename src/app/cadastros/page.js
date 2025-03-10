'use client';

import { useState } from 'react';
import Link from 'next/link'; // Importando o componente Link
import Pagina2 from "@/app/components/Pagina2";
import { BiLogoVuejs } from 'react-icons/bi';

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');

    // Função de cadastro
    const cadastrarCliente = () => {
        // Verificando se todos os campos estão preenchidos
        if (!nome || !email || !senha) {
            setMensagem('Todos os campos são obrigatórios!');
            return;
        }

        // Recuperando os clientes já cadastrados
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

        // Verificando se já existe um cliente com o mesmo e-mail
        const clienteExistente = clientes.find(cliente => cliente.email === email);

        if (clienteExistente) {
            setMensagem('E-mail já cadastrado!');
            return;
        }

        // Criando o novo cliente
        const novoCliente = { nome, email, senha };

        // Adicionando ao localStorage
        clientes.push(novoCliente);
        localStorage.setItem('clientes', JSON.stringify(clientes));

        // Logando o usuário automaticamente após o cadastro
        localStorage.setItem('clienteLogado', JSON.stringify(novoCliente));

        setMensagem('Cadastro realizado com sucesso!');

        // Redirecionando para a página inicial
        window.location.href = '/clientes/home'; // Alterando para a página inicial ou home
    };

    return (
        <Pagina2 titulo="Cadastro">
            <div style={{
                padding: '40px',
                padding: '40px',
                width: '400px',
                margin: '50px auto',
                backgroundColor: '#B2E0F0',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                color: 'white',
                textAlign: 'center'
            }}>
                {/* Título */}
                <h2 style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '700',
                    fontSize: '24px',
                    marginBottom: '30px',
                    color: 'black   '
                }}>
                    CADASTRE-SE AGORA  
                </h2>

                <div style={{ marginBottom: '20px' }}>
                    {/* Campo de Nome */}
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome"
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            marginBottom: '15px',
                            borderRadius: '5px',
                            border: '2px solid #333',
                            boxSizing: 'border-box',
                            fontSize: '16px'
                        }}
                    />
                    {/* Campo de E-mail */}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail"
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            marginBottom: '15px',
                            borderRadius: '5px',
                            border: '2px solid #333',
                            boxSizing: 'border-box',
                            fontSize: '16px'
                        }}
                    />
                    {/* Campo de Senha */}
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Senha"
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            marginBottom: '20px',
                            borderRadius: '5px',
                            border: '2px solid #333',
                            boxSizing: 'border-box',
                            fontSize: '16px'
                        }}
                    />
                </div>

                {/* Mensagem de erro ou sucesso */}
                <div style={{ minHeight: '30px' }}>
                    {mensagem && (
                        <p style={{
                            textAlign: 'center',
                            color: 'red',
                            marginTop: '15px',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}>
                            {mensagem}
                        </p>
                    )}
                </div>

                {/* Botão de Cadastro */}
                <button
                    onClick={cadastrarCliente}
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    CADASTRAR
                </button>

                {/* Link para página de login */}
                <div style={{ marginTop: '20px' }}>
                    <p style={{ fontSize: '14px', color: 'black' }}>
                        Já tem conta? 
                        <Link href="/login" style={{
                            color: '#007bff',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                        }}> Faça login
                        </Link>
                    </p>
                </div>
            </div>
            <style jsx global>{`
                body {
                    background-image: url('https://cdn.prod.website-files.com/66351b9f531bf70f210e21e5/66351b9f531bf70f210e277a_medico-com-um-estetoscopio-nas-maos-e-fundo-do-hospital-scaled.webp');
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
                }
            `}</style>
        </Pagina2>
    );
}