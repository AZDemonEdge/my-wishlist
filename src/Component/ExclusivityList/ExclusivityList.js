import { useState, useEffect } from "react"

import Loader from "../Loader/Loader";
import { db } from "../Wishlist/db";
import './ExclusivityList.css';
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import HeartButton from "../HeartButton/HeartButton";
import { useNavigate  } from "react-router-dom";

const ExclusivityList = () => {
    const [newExclusivity, setNewExclusivity] = useState({ To: '', Description: '' });
    const [create, setCreate] = useState(false);
    const [needUpdated, setNeedUpdated] = useState(false);
    const [loadedData, setLoadedData] = useState(false);
    const [exclusivities, setExclusivities] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'exclusivity'));
            const datosArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if (datosArray.length === 0) {
                //setNeedUpdated(true);
            } else {
                setExclusivities(datosArray);
                setNeedUpdated(false);
            }
            setLoadedData(true);
        };

        fetchData();

        if (loadedData) {
            init();
        }
    }, []);

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
        let currentProgress = 100;

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
            progressText.textContent = '+';
        });
    }

    const addExclusivity = async () => {
        setLoading(true);
        setCreate(false);
        try {

            const docRef = await addDoc(collection(db, 'exclusivity'), {
                To: newExclusivity.To,
                Description: newExclusivity.Description
            });

            window.location.reload();

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error
            });
        }
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

        const exclusivityGobblin = exclusivities.filter(exclusivity => exclusivity.To === 0);
        const exclusivityPixie = exclusivities.filter(exclusivity => exclusivity.To === 1);

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

                {create && (
                    <div className="window-notice">
                        <div className="content">
                            <div className="popup">
                                <span className="close-btn" onClick={(e) => setCreate(false)}>✖️</span>
                                <div className="form">
                                    <div className="note">
                                        <label className="title">Añadir un Deseo</label>
                                    </div>
                                    <label className="subtitle">Agregar a la Lista de:</label>
                                    <select
                                        className="input_field"
                                        onChange={(e) => setNewExclusivity({ ...newExclusivity, To: e.target.value })}
                                    >
                                        <option value="0" selected>Duende Chiflado</option>
                                        <option value="1">Hada Chalada</option>
                                    </select>
                                    <textarea
                                        placeholder="Descripción de la Exclusividad"
                                        name="description"
                                        type="text"
                                        className="input_field"
                                        style={{ resize: 'none', width: 100 + '%', height: 100 + 'px', paddingTop: 10 + 'px', paddingRight: 10 + 'px' }}
                                        value={newExclusivity.Description}
                                        onChange={(e) => setNewExclusivity({ ...newExclusivity, Description: e.target.value })}
                                    ></textarea>
                                    <HeartButton onclick={addExclusivity} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <nav className="navbar">
                    <h1>Lista de Exclusividades</h1>
                </nav>

                <div className="container" style={{margin: 20 + 'px auto'}}>
                    <div className="tabs">
                        <div className="tab-buttons">
                            <a className="tab-button active" data-tab="tab1">Duende Chiflado ({exclusivityGobblin.length})</a>
                            <a className="tab-button" data-tab="tab2">Hada Chalada ({exclusivityPixie.length})</a>
                        </div>

                        <div className="tab-content active" id="tab1">
                            <ol className="exclusivity-list">
                                {exclusivityGobblin.map(exclusivity => (
                                    <li>{exclusivity.Description}</li>
                                ))}
                            </ol>
                        </div>

                        <div className="tab-content" id="tab2">
                            <ol className="exclusivity-list">
                                {exclusivityPixie.map(exclusivity => (
                                    <li>{exclusivity.Description}</li>
                                ))}
                            </ol> 
                        </div>
                    </div>
                </div>

                <a className="floating-button" id="floatingBtn" style={{bottom: 7 + 'rem', color: '#007bff'}} onClick={(e) => navigate('/wishes')}>
                    <svg fill="currentColor" height="35px" width="35px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                        viewBox="0 0 512 512" xmlSpace="preserve">
                        <g>
                            <g>
                                <path d="M378.965,156.886H268.721c-4.392,0-7.95,3.56-7.95,7.95s3.559,7.95,7.95,7.95h110.244c4.392,0,7.95-3.56,7.95-7.95
                                    S383.357,156.886,378.965,156.886z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M378.965,241.689H268.721c-4.392,0-7.95,3.56-7.95,7.95s3.559,7.95,7.95,7.95h110.244c4.392,0,7.95-3.56,7.95-7.95
                                    S383.357,241.689,378.965,241.689z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M378.965,326.493H268.721c-4.392,0-7.95,3.56-7.95,7.95s3.559,7.95,7.95,7.95h110.244c4.392,0,7.95-3.56,7.95-7.95
                                    S383.357,326.493,378.965,326.493z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M226.319,139.925h-33.921c-4.392,0-7.95,3.56-7.95,7.95v33.921c0,4.391,3.559,7.95,7.95,7.95h33.921
                                    c4.392,0,7.95-3.56,7.95-7.95v-33.921C234.269,143.485,230.711,139.925,226.319,139.925z M218.369,173.847h-18.021v-18.021h18.021
                                    V173.847z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M226.319,224.729h-33.921c-4.392,0-7.95,3.56-7.95,7.95V266.6c0,4.391,3.559,7.95,7.95,7.95h33.921
                                    c4.392,0,7.95-3.56,7.95-7.95v-33.921C234.269,228.288,230.711,224.729,226.319,224.729z M218.369,258.65h-18.021v-18.021h18.021
                                    V258.65z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M226.319,309.532h-33.921c-4.392,0-7.95,3.56-7.95,7.95v33.921c0,4.391,3.559,7.95,7.95,7.95h33.921
                                    c4.392,0,7.95-3.56,7.95-7.95v-33.921C234.269,313.092,230.711,309.532,226.319,309.532z M218.369,343.453h-18.021v-18.021h18.021
                                    V343.453z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <g>
                                    <path d="M472.39,363.911c2.615,1.083,5.75,2.382,6.282,2.602c-0.369-0.153-2.154-0.892-6.294-2.607
                                        c-2.485-1.029-3.531-1.462-3.66-1.516c0.134,0.056,1.75,0.725,3.652,1.512c-14.48-5.995-29.915-4.392-43.053,4.036V133.035
                                        c0-4.391-3.559-7.95-7.95-7.95c-4.392,0-7.95,3.56-7.95,7.95v230.54c-11.934-4.706-25.074-4.328-37.111,1.463
                                        c-18.668,8.982-30.732,28.596-30.732,49.968c0,4.189,0.751,8.624,2.188,13.25H165.896c-4.384,0-7.95-3.566-7.95-7.95V53.532
                                        c0-4.384,3.566-7.95,7.95-7.95h18.551v42.932c0,4.391,3.559,7.95,7.95,7.95h33.921c4.392,0,7.95-3.56,7.95-7.95V45.582h26.501
                                        v42.932c0,4.391,3.559,7.95,7.95,7.95h33.921c4.392,0,7.95-3.56,7.95-7.95V45.582h26.501v42.932c0,4.391,3.559,7.95,7.95,7.95
                                        h33.921c4.392,0,7.95-3.56,7.95-7.95V45.582h18.551c4.384,0,7.95,3.566,7.95,7.95v34.981c0,4.391,3.559,7.95,7.95,7.95
                                        c4.392,0,7.95-3.56,7.95-7.95V53.532c0-13.152-10.7-23.851-23.851-23.851h-18.551V7.95c0-4.391-3.559-7.95-7.95-7.95h-33.921
                                        c-4.392,0-7.95,3.56-7.95,7.95v21.731h-26.501V7.95c0-4.391-3.559-7.95-7.95-7.95h-33.921c-4.392,0-7.95,3.56-7.95,7.95v21.731
                                        h-26.501V7.95c0-4.391-3.559-7.95-7.95-7.95h-33.921c-4.392,0-7.95,3.56-7.95,7.95v21.731h-18.551
                                        c-13.151,0-23.851,10.699-23.851,23.851v366.774c0,13.152,10.7,23.851,23.851,23.851h189.142
                                        c19.612,32.974,63.983,64.956,65.942,66.358c3.084,1.98,6.168,1.98,9.253,0c0.756-0.541,18.722-13.45,36.967-31.246
                                        c25.506-24.879,38.439-46.501,38.439-64.263C505.64,392.687,492.279,372.155,472.39,363.911z M352.994,37.631V15.901h18.021
                                        v21.731v42.932h-18.021V37.631z M276.671,37.631V15.901h18.021v21.731v42.932h-18.021V37.631z M200.348,37.631V15.901h18.021
                                        v21.731v42.932h-18.021V37.631z M425.637,494.146c-12.247-9.376-45.616-36.366-58.912-61.637c0-0.001-0.001-0.002-0.001-0.003
                                        c-3.483-6.621-5.249-12.508-5.249-17.499c0-15.301,8.527-29.29,21.724-35.64c8.968-4.314,19.289-3.975,28.052,0.684
                                        c4.637,2.465,8.838,8.866,14.354,8.985c5.056,0.109,8.498-5.457,12.518-7.753c8.921-5.096,18.337-6.758,28.17-2.686
                                        c14.023,5.809,23.446,20.442,23.446,36.41C489.739,440.351,447.104,477.884,425.637,494.146z"/>
                                    <path d="M468.718,362.39C468.705,362.385,468.701,362.383,468.718,362.39L468.718,362.39z"/>
                                    <path d="M478.672,366.513C478.775,366.556,478.771,366.554,478.672,366.513L478.672,366.513z"/>
                                </g>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M82.153,0C60.316,0,42.34,16.806,40.455,38.161H30.211C17.06,38.161,6.36,48.86,6.36,62.012v132.505
                                    c0,4.391,3.559,7.95,7.95,7.95c4.392,0,7.95-3.56,7.95-7.95V62.012c0-4.384,3.566-7.95,7.95-7.95h10.07v140.455v89.044
                                    c0,4.391,3.559,7.95,7.95,7.95c4.392,0,7.95-3.56,7.95-7.95v-81.093h51.942v225.789H56.182V323.843c0-4.391-3.559-7.95-7.95-7.95
                                    c-4.392,0-7.95,3.56-7.95,7.95v112.364c0,1.805,0.615,3.556,1.743,4.966l32.179,40.224v22.652c0,4.391,3.559,7.95,7.95,7.95
                                    c4.392,0,7.95-3.56,7.95-7.95v-22.652l32.179-40.224c1.127-1.41,1.743-3.161,1.743-4.966V194.518V41.872
                                    C124.025,18.784,105.241,0,82.153,0z M82.153,465.882l-17.379-21.724h34.76L82.153,465.882z M108.124,186.567H56.182V41.872
                                    c0-14.32,11.65-25.971,25.971-25.971s25.971,11.651,25.971,25.971V186.567z"/>
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
                        <div className="progress-text" id="progressText"> + </div>
                    </div>
                </a>
            </div>
        )
    }

}

export default ExclusivityList;