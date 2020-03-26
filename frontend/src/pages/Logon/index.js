import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import {FiLogIn} from 'react-icons/fi';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
    const [id, setID] = useState('');
    const history = useHistory();

    async function handleLogon(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', {id});
            localStorage.setItem('ongID', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        }
        catch(err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form" onSubmit={handleLogon}>
                <img src={logoImg} alt='Be The Hero'/>
                <form>
                    <h1>Faça seu logon</h1>
                    <input
                        type="text"
                        placeholder='Sua ID'
                        value={id}
                        onChange={e => setID(e.target.value)}
                    />
                    <button type='submit' className='button'>Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color='#e02041'/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt='Heroes'/>
        </div>
    );
}