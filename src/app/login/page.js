'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Pagina2 from '../components/Pagina2';

export default function Page() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [saudacao, setSaudacao] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('previousPage')) {
            localStorage.setItem('previousPage', window.location.href);
        }

        // Carregar a saudação do localStorage
        const saudacaoSalva = localStorage.getItem('saudacao');
        if (saudacaoSalva) {
            setSaudacao(saudacaoSalva);
        }
    }, []);

    const loginCliente = () => {
        // Verificação de login do administrador
        if (email === 'admin@admin' && senha === '1234') {
            setMensagem('Login de administrador bem-sucedido!');
            setSaudacao('Olá, adm');
            localStorage.setItem('saudacao', 'Olá, adm'); 
            window.location.href = 'http://localhost:3000/adm/home';
            return;
        }

        // Verificação para clientes comuns
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        const cliente = clientes.find(cliente => cliente.email === email);

        if (!cliente) {
            setMensagem('E-mail não encontrado!');
            return;
        }

        if (cliente.senha !== senha) {
            setMensagem('Senha incorreta!');
            return;
        }

        localStorage.setItem('clienteLogado', JSON.stringify(cliente));
        setMensagem('Login bem-sucedido!');
        setSaudacao(`Olá, ${cliente.nome}`);
        localStorage.setItem('saudacao', `Olá, ${cliente.nome}`);
        window.location.href = 'http://localhost:3000/clientes/home';
    };

    const handleLogout = () => {
        // Limpar a saudação e redirecionar para a página de login
        localStorage.removeItem('saudacao');
        setSaudacao('');
        window.location.href = '/';
    };

    return (
        <Pagina2 titulo="">
           

            {/* Formulário de Login */}
            <div style={{
                padding: '40px',
                width: '400px',
                margin: '50px auto',
                backgroundColor: '#B2E0F0',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                color: 'white',
                textAlign: 'center'
            }}>
                <h2 style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '700',
                    fontSize: '24px',
                    marginBottom: '30px',
                    color: 'black'
                }}>
                   Faça seu Login
                </h2>

                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail"
                        style={{
                            width: '100%',
                            padding: '12px',
                            marginBottom: '15px',
                            borderRadius: '5px',
                            border: '2px solid #333',
                            fontSize: '16px'
                        }}
                    />
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Senha"
                        style={{
                            width: '100%',
                            padding: '12px',
                            marginBottom: '20px',
                            borderRadius: '5px',
                            border: '2px solid #333',
                            fontSize: '16px'
                        }}
                    />
                </div>

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

                <button
                    onClick={loginCliente}
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
                    ENTRAR 
                </button>

                <div style={{ marginTop: '20px' }}>
                    <p style={{ fontSize: '14px', color: 'black' }}>
                        Não tem conta? 
                        <Link href="/cadastros" style={{
                            color: 'red',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                        }}> Cadastre-se
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
