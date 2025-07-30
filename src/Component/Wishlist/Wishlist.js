import { useState, useEffect } from "react"

import Card from '../Card/Card';
import axios from "axios";
import Loader from "../Loader/Loader";
import { bt } from "./bt";
import './Wishlist.css';
import HeartButton from "../HeartButton/HeartButton";

const Wishlist = () => {
    const [newWish, setNewWish] = useState({ Id: '', State: 0, Description: '' });
    const [currentWish, setCurrentWish] = useState({ row_id: '', Id: '', State: '', Description: '', Photo: '' });
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);
    const [needUpdated, setNeedUpdated] = useState(false);
    const [loadedData, setLoadedData] = useState(false);
    const [wishes, setWishes] = useState([]);
    const [completedWishes, setcompletedWishes] = useState([]);
    const seatable = { table_name: "Table1", dtable_uuid: bt.dtable_uuid, access_token: bt.access_token };

    useEffect(() => {
        const init = () => {
            const tabButtons = document.querySelectorAll('.tab-button');
            const tabContents = document.querySelectorAll('.tab-content');

            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetTab = button.getAttribute('data-tab');

                    // Remover clase active de todos los botones y contenidos
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));

                    // Agregar clase active al botón clickeado y su contenido
                    button.classList.add('active');
                    document.getElementById(targetTab).classList.add('active');
                });
            });

            // Funcionalidad del botón flotante
            const floatingBtn = document.getElementById('floatingBtn');
            const progressText = document.getElementById('progressText');
            const progressBar = document.getElementById('progressBar');

            // Porcentaje inicial
            let currentProgress = completedWishes.length / wishes.length * 100;

            // Función para actualizar la barra de progreso
            function updateProgress(percentage) {
                const circumference = 2 * Math.PI * 16; // radio = 16
                const offset = circumference - (percentage / 100) * circumference;
                progressBar.style.strokeDasharray = `${circumference} ${circumference}`;
                progressBar.style.strokeDashoffset = offset;
            }

            // Inicializar progreso
            updateProgress(currentProgress);

            // Hover effects
            floatingBtn.addEventListener('mouseenter', () => {
                progressText.textContent = '+';
            });

            floatingBtn.addEventListener('mouseleave', () => {
                progressText.textContent = currentProgress + '%';
            });
        }

        const fetchData = async () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${seatable.access_token}`
                }
            };

            try {
                const response = await axios.get(`https://cloud.seatable.io/api-gateway/api/v2/dtables/${seatable.dtable_uuid}/rows/?table_name=${seatable.table_name}&convert_keys=true`, options);
                if (response.status === 200) {
                    const CW = response.data.rows.filter(wish =>
                        wish.State === 1
                    );
                    const W = response.data.rows.filter(wish =>
                        wish.State === 0
                    );
                    setWishes(W);
                    setcompletedWishes(CW);
                    setLoadedData(true);
                    init();
                }
            } catch (AxiosError) {
                setLoadedData(true);
                setNeedUpdated(true);
            }

        };

        fetchData();
    }, [seatable]);

    const addWish = () => {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Bearer ${seatable.access_token}`
            },
            body: JSON.stringify({ table_name: `${seatable.table_name}`, rows: [{ Id: newWish.Id, State: newWish.State, Description: newWish.Description }] })
        };

        fetch(`https://cloud.seatable.io/api-gateway/api/v2/dtables/${seatable.dtable_uuid}/rows/`, options)
            .then(res => res.json())
            .then(res => { setNewWish({ Id: '', State: 0, Description: '' }); window.location.reload() })
            .catch(err => console.error(err));
    }

    const updateWish = () => {
        console.log(currentWish);
        const options = {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Bearer ${seatable.access_token}`
            },
            body: JSON.stringify({
                updates: [{
                    row: {
                        Id: currentWish.Id, State: currentWish.State, Description: currentWish.Description
                    }, row_id: currentWish.row_id
                }],
                table_name: `${seatable.table_name}`
            })
        };

        fetch(`https://cloud.seatable.io/api-gateway/api/v2/dtables/${seatable.dtable_uuid}/rows/`, options)
            .then(res => res.json())
            .then(res => { setCurrentWish({ row_id: '', Id: '', State: '', Description: '', Photo: '' }); window.location.reload() })
            .catch(err => console.error(err));
    }

    const completeWish = () => {
        const options = {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Bearer ${seatable.access_token}`
            },
            body: JSON.stringify({
                updates: [{ row: { State: '1' }, row_id: currentWish.row_id }],
                table_name: `${seatable.table_name}`
            })
        };

        fetch(`https://cloud.seatable.io/api-gateway/api/v2/dtables/${seatable.dtable_uuid}/rows/`, options)
            .then(res => res.json())
            .then(res => { setCurrentWish({ row_id: '', Id: '', State: '', Description: '', Photo: '' }); window.location.reload() })
            .catch(err => console.error(err));
    }

    if (!loadedData) {
        return (
            <>
                <div className="heartbeatloader">
                    <svg className="svgdraw" width="100%" height="100%" viewBox="0 0 150 400" xmlns="http://www.w3.org/2000/svg">
                        <path className="path" d="M 0 200 l 40 0 l 5 -40 l 5 40 l 10 0 l 5 15 l 10 -140 l 10 220 l 5 -95 l 10 0 l 5 20 l 5 -20 l 30 0" fill="transparent" strokeWidth="4" stroke="black"></path>
                    </svg>
                    <div className="innercircle"></div>
                    <div className="outercircle"></div>
                </div>

            </>
        );
    }

    if (needUpdated) {
        return (
            <>
                <div className="dark-window-notice">
                    <div className="content">
                        <Loader />
                    </div>
                </div>
            </>
        )
    }

    const listarDeseos = wishes.forEach(wish => {
        <Card key={wish.id} setCurrentWish={setCurrentWish} setEdit={setEdit} wish={wish} />
    })

    const listarDeseosCompletados = completedWishes.forEach(wish => {
        <Card key={wish.id} setCurrentWish={setCurrentWish} setEdit={setEdit} wish={wish} />
    })

    return (
        <div className="bg-gradient" >

            {edit && (
                <div className="window-notice">
                    <div className="content">
                        <div className="popup">
                            {currentWish.State === 1 && (<span className="ribbon">COMPLETADO</span>)}
                            <span className="close-btn" onClick={(e) => setEdit(false)}>✖️</span>
                            <form className="form">
                                {currentWish.State === 1 ? (
                                    <img src={currentWish.Photo ? currentWish.Photo : './OIP.webp'} style={{ width: 100 + '%', border: 1 + 'px solid white', borderRadius: 17 + 'px', boxShadow: '0 0 3px gray', marginTop: 10 + 'px' }} />
                                ) : (
                                    <div className="note">
                                        <label className="title">Editar Deseo</label>
                                    </div>
                                )}
                                <input
                                    placeholder="Número del Deseo"
                                    name="ID"
                                    type="number"
                                    className="input_field"
                                    value={currentWish.Id}
                                    readOnly={currentWish.State === 1}
                                />
                                <textarea
                                    placeholder="Descripción del Deseo"
                                    name="description"
                                    type="text"
                                    className="input_field"
                                    style={{ resize: 'none', width: 100 + '%', height: 100 + 'px', paddingTop: 10 + 'px', paddingRight: 10 + 'px' }}
                                    value={currentWish.Description}
                                    readOnly={currentWish.State === 1}
                                ></textarea>
                                {currentWish.State === 0 && (
                                    <div style={{ width: 100 + '%', display: 'flex', gap: 20 + 'px' }}>
                                        <input
                                            className="input_field btn-success"
                                            type="button"
                                            value={'Completar'}
                                            onClick={completeWish}
                                        />
                                        <input
                                            className="input_field  btn-primary"
                                            type="button"
                                            value={'Aceptar'}
                                            onClick={updateWish}
                                        />
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {create && (
                <div className="window-notice">
                    <div className="content">
                        <div className="popup">
                            <span className="close-btn" onClick={(e) => setCreate(false)}>✖️</span>
                            <form className="form">
                                <div className="note">
                                    <label className="title">Añadir un Deseo</label>
                                    <span className="subtitle">Agrega un deseo a la lista.</span>
                                </div>
                                <input
                                    placeholder="Número del Deseo"
                                    name="ID"
                                    type="number"
                                    className="input_field"
                                    value={newWish.Id}
                                    onChange={(e) => setNewWish({ ...newWish, Id: e.target.value })}
                                />
                                <textarea
                                    placeholder="Descripción del Deseo"
                                    name="description"
                                    type="text"
                                    className="input_field"
                                    style={{ resize: 'none', width: 100 + '%', height: 100 + 'px', paddingTop: 10 + 'px', paddingRight: 10 + 'px' }}
                                    value={newWish.Description}
                                    onChange={(e) => setNewWish({ ...newWish, Description: e.target.value })}
                                ></textarea>
                                <HeartButton onClick={addWish} />
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <nav className="navbar">
                <h1>Mi Lista de Deseos</h1>
            </nav>

            <div className="container">
                <div className="tabs">
                    <div className="tab-buttons">
                        <a className="tab-button active" data-tab="tab1">Pendientes</a>
                        <a className="tab-button" data-tab="tab2">Completados</a>
                    </div>

                    <div className="tab-content active" id="tab1">
                        {{listarDeseos}}
                    </div>

                    <div className="tab-content" id="tab2">
                        {{listarDeseosCompletados}}
                    </div>
                </div>
            </div>

            <a className="floating-button" id="floatingBtn" onClick={(e) => setCreate(true)}>
                <div className="progress-circle">
                    <svg viewBox="0 0 36 36">
                        <circle className="bg-circle" cx="18" cy="18" r="16"></circle>
                        <circle className="progress-bar" cx="18" cy="18" r="16"
                            strokeDasharray="0 100" id="progressBar"></circle>
                    </svg>
                    <div className="progress-text" id="progressText">{completedWishes.length / wishes.length * 100}%</div>
                </div>
            </a>
        </div>
    )
}

export default Wishlist;