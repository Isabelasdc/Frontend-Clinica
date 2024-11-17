import Link from "next/link";
import { Container, Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { FaUserMd, FaClipboardList, FaBuilding, FaUser, FaTint, FaSearch, FaFacebook, FaInstagram, FaLinkedin, FaCalendarAlt, FaSignInAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Pagina(props) {
    const [cliente, setCliente] = useState(null);

    useEffect(() => {
        // Carregar as informações do cliente logado do localStorage
        const clienteLogado = JSON.parse(localStorage.getItem('clienteLogado'));
        if (clienteLogado) {
            setCliente(clienteLogado);
        }
    }, []);

    const handleLogout = () => {
        // Limpar o localStorage e redirecionar para a página de login
        localStorage.removeItem('clienteLogado');
        window.location.href = '/login'; // Redireciona para a página de login
    };

    return (
        <>
            <Navbar bg="white" variant="light">
                <Container>
                    {/* Logo da imagem no início */}
                    <Navbar.Brand href="/clientes/home ">
                        <img
                            src="/logo.png"
                            alt="Logo Saúde"
                            width={90}
                            height={90}
                        />
                    </Navbar.Brand>

                    <Nav className="me-auto">
                        {/* Seus outros links */}
                        <Nav.Link href="/clientes/consultas" onMouseEnter={(e) => e.target.style.color = 'red'} onMouseLeave={(e) => e.target.style.color = 'black'}>
                            <FaClipboardList className="me-2 icon" /> Consultas
                        </Nav.Link>
                        <Nav.Link href="/clientes/exames" onMouseEnter={(e) => e.target.style.color = 'red'} onMouseLeave={(e) => e.target.style.color = 'black'}>
                            <FaTint className="me-2 icon" /> Exames
                        </Nav.Link>
                        <Nav.Link href="/clientes/locais" onMouseEnter={(e) => e.target.style.color = 'red'} onMouseLeave={(e) => e.target.style.color = 'black'}>
                            <FaBuilding className="me-2 icon" /> Locais
                        </Nav.Link>
                    </Nav>

                    <Form className="d-flex">
                     
                        <Link href="/clientes/consultas" className="text-decoration-none">
                            <Button variant="danger" className="d-flex align-items-center me-2">
                                <FaCalendarAlt className="me-2" /> Marque sua consulta
                            </Button>
                        </Link>

                        {/* Exibindo o ícone de usuário e o nome do cliente logado */}
                        {cliente ? (
                            <div className="d-flex align-items-center">
                                <FaUser className="me-2" />
                                <span style={{ marginRight: '10px' }}>Olá, {cliente.nome}</span>
                                <Button variant="outline-secondary" onClick={handleLogout} className="custom-search-btn">
                                    Sair
                                </Button>
                            </div>
                        ) : (
                            <Link href="/login" passHref>
                                <Button variant="outline-secondary" className="custom-search-btn">
                                    <FaSignInAlt />
                                </Button>
                            </Link>
                        )}
                    </Form>
                </Container>
            </Navbar>

            <div style={{ backgroundColor: '#B2E0F0', color: 'red' }} className="text-center p-3">
                <h1 className="animated-title">{props.titulo}</h1>
            </div>

            <Container style={{ position: 'relative', zIndex: 1, paddingBottom: '80px' }}>
                {props.children}
            </Container>

            <footer style={{
                backgroundColor: '#0097b2',
                color: 'white',
                padding: '20px 0',
                width: '100%',
                textAlign: 'center',
                zIndex: 1000,
                position: 'relative',
                bottom: 0,
            }}>
                <Container>
                    <p>&copy; {new Date().getFullYear()} Saúde Fácil. Todos os direitos reservados.</p>
                    <div>
                        <a href="https://www.facebook.com" target="_blank" className="me-3">
                            <FaFacebook size={24} color="white" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" className="me-3">
                            <FaInstagram size={24} color="white" />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank">
                            <FaLinkedin size={24} color="white" />
                        </a>
                    </div>
                    <p>Endereço: Rua Exemplo, 123 - Cidade Fictícia, Estado Fictício</p>
                    <p>Telefone: (11) 1234-5678</p>
                </Container>
            </footer>

            <Container style={{
                position: 'fixed',
                zIndex: 1,
                minHeight: '80vh',
            }}>

            </Container>

            <style jsx global>{`
                .animated-title {
                    animation: fadeInZoom 0.5s ease-in-out forwards;
                }

                @keyframes fadeInZoom { 
                    0% {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .search-bar {
                    width: 300px;
                }
                .custom-search-btn {
                    color: #0097b2;
                    border-color: #0097b2;
                }

                .custom-search-btn:hover {
                    background-color: #0097b2;
                    color: white;
                    border-color: #0097b2;
                }
            `}</style>
        </>
    );
}
