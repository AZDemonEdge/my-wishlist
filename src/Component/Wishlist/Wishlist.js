import { useState, useEffect } from "react"

import Card from '../Card/Card';
import Loader from "../Loader/Loader";
import { db } from "./db";
import './Wishlist.css';
import HeartButton from "../HeartButton/HeartButton";
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { useNavigate  } from "react-router-dom";

const Wishlist = () => {
    const [newWish, setNewWish] = useState({ Id: '', Description: '' });
    const [currentWish, setCurrentWish] = useState({ docId: '', Id: '', State: '', Description: '', Photo: '' });
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);
    const [needUpdated, setNeedUpdated] = useState(false);
    const [loadedData, setLoadedData] = useState(false);
    const [wishes, setWishes] = useState([]);
    const [completedWishes, setCompletedWishes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'wish'));
            const datosArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a, b) => a.Number - b.Number);
            if (datosArray.length === 0) {
                setNeedUpdated(true);
            } else {
                const CW = datosArray.filter(item => item.State == 1);
                setCompletedWishes(CW);
                setWishes(datosArray);
                setNeedUpdated(false);
            }
            setLoadedData(true);
        };

        fetchData();

        if (loadedData) {
            init();
        }
    }, [completedWishes.length, wishes.length]);

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
        let currentProgress = (completedWishes.length / wishes.length * 100).toFixed(2);

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

    const addWish = async () => {
        setLoading(true);
        setCreate(false);
        const docRef = await addDoc(collection(db, 'wish'), {
            Number: newWish.Id,
            State: 0,
            Description: newWish.Description
        });

        window.location.reload();
    }

    const updateWish = async () => {
        setLoading(true);
        setEdit(false);
        const docRef = doc(db, 'wish', currentWish.docId);

        await updateDoc(docRef, {
            Number: currentWish.Id,
            Description: currentWish.Description
        });

        window.location.reload();
    }

    const completeWish = async () => {
        setLoading(true);
        setEdit(false);
        const docRef = doc(db, 'wish', currentWish.docId);

        await updateDoc(docRef, {
            State: 1
        });

        window.location.reload();
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
    } else {

        const listarDeseos = wishes.filter(wish => wish.State === 0);
        const listarDeseosCompletados = wishes.filter(wish => wish.State === 1);

        return (
            <div className="bg-gradient" onLoad={init} >

                {loading && (
                    <div className="window-notice">
                        <div className="content">
                            <div className="heart">
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>

                                <div className="pixel"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel"></div>

                                <div className="pixel pink"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel soft-pink"></div>

                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel pink"></div>

                                <div className="pixel pink"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel pink"></div>

                                <div className="pixel pink"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel pink"></div>

                                <div className="pixel"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel"></div>

                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>

                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel white"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>

                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel white"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>

                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel soft-pink"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>

                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel pink"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                                <div className="pixel"></div>
                            </div>
                        </div>
                    </div>
                )}

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
                                        onChange={(e) => setCurrentWish({ ...currentWish, Id: e.target.value })}
                                        readOnly={currentWish.State === 1}
                                    />
                                    <textarea
                                        placeholder="Descripción del Deseo"
                                        name="description"
                                        type="text"
                                        className="input_field"
                                        style={{ resize: 'none', width: 100 + '%', height: 100 + 'px', paddingTop: 10 + 'px', paddingRight: 10 + 'px' }}
                                        value={currentWish.Description}
                                        onChange={(e) => setCurrentWish({ ...currentWish, Description: e.target.value })}
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
                                <div className="form">
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
                                    <HeartButton onclick={addWish} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <nav className="navbar">
                    <h1>Mi Lista de Deseos</h1>
                </nav>

                <div className="container" style={{margin: 20 + 'px auto', maxWidth: 80 + '%'}}>
                    <div className="tabs">
                        <div className="tab-buttons">
                            <a className="tab-button active" data-tab="tab1">Pendientes ({wishes.length - completedWishes.length})</a>
                            <a className="tab-button" data-tab="tab2">Completados ({completedWishes.length})</a>
                        </div>

                        <div className="tab-content active" id="tab1">
                            {listarDeseos.map(wish => (<Card key={wish.id} wish={wish} setEdit={setEdit} setCurrentWish={setCurrentWish} />))}
                        </div>

                        <div className="tab-content" id="tab2">
                            {listarDeseosCompletados.map(wish => (<Card key={wish.id} wish={wish} setEdit={setEdit} setCurrentWish={setCurrentWish} />))}
                        </div>
                    </div>
                </div>

                <a className="floating-button" style={{bottom: 7 + 'rem', color: '#007bff'}} onClick={(e) => navigate('/exclusivities')}>
                    <svg fill="currentColor" height="35px" width="35px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                        viewBox="0 0 512 512" xmlSpace="preserve">
                        <g>
                            <g>
                                <path d="M428.522,0H150.261c-46.03,0-83.478,37.448-83.478,83.478v328.348H16.696C7.475,411.826,0,419.301,0,428.522
                                    C0,474.552,37.448,512,83.478,512h211.478c46.03,0,83.478-37.448,83.478-83.478V100.174h116.87c9.22,0,16.696-7.475,16.696-16.696
                                    C512,37.448,474.552,0,428.522,0z M83.478,478.609c-21.767,0-40.336-13.956-47.226-33.391h176.906
                                    c2.513,12.33,7.755,23.68,15.062,33.391H83.478z M345.043,83.478v345.043c0,27.618-22.469,50.087-50.087,50.087
                                    c-27.618,0-50.087-22.469-50.087-50.087c0-9.22-7.475-16.696-16.696-16.696h-128V83.478c0-27.618,22.469-50.087,50.087-50.087
                                    h211.524C351.28,47.353,345.043,64.7,345.043,83.478z M381.295,66.783c6.891-19.435,25.46-33.391,47.226-33.391
                                    s40.336,13.956,47.226,33.391H381.295z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <circle cx="150.261" cy="116.87" r="16.696"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M294.957,100.174h-77.913c-9.22,0-16.696,7.475-16.696,16.696s7.475,16.696,16.696,16.696h77.913
                                    c9.22,0,16.696-7.475,16.696-16.696S304.177,100.174,294.957,100.174z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <circle cx="150.261" cy="183.652" r="16.696"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M294.957,166.957h-77.913c-9.22,0-16.696,7.475-16.696,16.696c0,9.22,7.475,16.696,16.696,16.696h77.913
                                    c9.22,0,16.696-7.475,16.696-16.696C311.652,174.432,304.177,166.957,294.957,166.957z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <circle cx="150.261" cy="250.435" r="16.696"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M294.957,233.739h-77.913c-9.22,0-16.696,7.475-16.696,16.696c0,9.22,7.475,16.696,16.696,16.696h77.913
                                    c9.22,0,16.696-7.475,16.696-16.696C311.652,241.214,304.177,233.739,294.957,233.739z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <circle cx="150.261" cy="317.217" r="16.696"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M294.957,300.522h-77.913c-9.22,0-16.696,7.475-16.696,16.696s7.475,16.696,16.696,16.696h77.913
                                    c9.22,0,16.696-7.475,16.696-16.696S304.177,300.522,294.957,300.522z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M510.238,209.577l-33.391-66.783c-6.14-12.28-23.721-12.29-29.866,0l-33.391,66.783c-1.16,2.318-1.763,4.874-1.763,7.466
                                    v244.87c0,27.618,22.469,50.087,50.087,50.087S512,489.531,512,461.913v-244.87C512,214.451,511.397,211.896,510.238,209.577z
                                    M478.609,461.913c0,9.206-7.49,16.696-16.696,16.696s-16.696-7.49-16.696-16.696v-16.696h33.391V461.913z M478.609,411.826
                                    h-33.391V267.13h33.391V411.826z M478.609,233.739h-33.391v-12.754l16.696-33.391l16.696,33.391V233.739z"/>
                            </g>
                        </g>
                    </svg>
                </a>

                <a className="floating-button" id="floatingBtn" onClick={(e) => setCreate(true)}>
                    <div className="progress-circle">
                        <svg viewBox="0 0 36 36">
                            <circle className="bg-circle" cx="18" cy="18" r="16"></circle>
                            <circle className="progress-bar" cx="18" cy="18" r="16"
                                strokeDasharray="0 100" id="progressBar"></circle>
                        </svg>
                        <div className="progress-text" id="progressText">{(completedWishes.length / wishes.length * 100).toFixed(2)}%</div>
                    </div>
                </a>
            </div>
        )
    }

}

export default Wishlist;