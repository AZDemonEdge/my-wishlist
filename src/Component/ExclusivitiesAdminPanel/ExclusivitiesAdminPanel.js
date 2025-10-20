import { useState, useEffect } from "react"

import Loader from "../Loader/Loader";
import { db } from "../Wishlist/db";
import './ExclusivitiesAdminPanel.css';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate  } from "react-router-dom";

const ExclusivitiesAdminPanel = () => {
    const [newExclusivity, setNewExclusivity] = useState({ To: 0, Description: '' });
    const [currentExclusivity, setCurrentExclusivity] = useState({ docId: '', To: '', Description: ''});
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);
    const [needUpdated, setNeedUpdated] = useState(false);
    const [loadedData, setLoadedData] = useState(false);
    const [exclusivities, setExclusivityes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'exclusivity'));
            const datosArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if (datosArray.length === 0) {
                setNeedUpdated(true);
            } else {
                setExclusivityes(datosArray);
                setNeedUpdated(false);
            }
            setLoadedData(true);
        };

        fetchData();
    }, [exclusivities]);

    const addExclusivity = async () => {
        setLoading(true);
        setCreate(false);
        const docRef = await addDoc(collection(db, 'exclusivity'), {
            To: newExclusivity.To,
            Description: newExclusivity.Description
        });

        window.location.reload();
    }

    const updateExclusivity = async () => {
        setLoading(true);
        setEdit(false);
        const docRef = doc(db, 'exclusivity', currentExclusivity.docId);

        await updateDoc(docRef, {
            To: currentExclusivity.To,
            Description: currentExclusivity.Description
        });

        window.location.reload();
    }

    const deleteExclusivity = async (docId) => {
        setLoading(true);

        const docRef = doc(db, 'exclusivity', docId);
        await deleteDoc(docRef);
        
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

        return (
            <div className="bg-admin">
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
                        <div className="content" style={{ fontSize: 1 + 'rem !important'}}>
                            <div className="container">
                                <h2>Editar Exclusividad</h2>
                                <form>
                                    <div className="row">
                                        <div className="col-35">
                                            <label for="fname">Para </label>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 + 'px'}}>
                                            <label className="switch">
                                                <input 
                                                    type="checkbox"
                                                    checked={currentExclusivity.To}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setCurrentExclusivity({ ...currentExclusivity, To: 1 });
                                                        } else {
                                                            setCurrentExclusivity({ ...currentExclusivity, To: 0 });
                                                        }
                                                    }}
                                                 />
                                                <span className="slider2"></span> 
                                            </label> 
                                            <p style={{textAlign: 'center'}}>{currentExclusivity.To===1 ? (
                                                <span style={{color: 'deeppink', padding: 0.3 + 'rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 0.05 + 'px solid deeppink', borderRadius: 12 + 'px'}}>
                                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M20 9C20 13.0803 16.9453 16.4471 12.9981 16.9383C12.9994 16.9587 13 16.9793 13 17V19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V21H10C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19H11V17C11 16.9793 11.0006 16.9587 11.0019 16.9383C7.05466 16.4471 4 13.0803 4 9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9ZM6.00365 9C6.00365 12.3117 8.68831 14.9963 12 14.9963C15.3117 14.9963 17.9963 12.3117 17.9963 9C17.9963 5.68831 15.3117 3.00365 12 3.00365C8.68831 3.00365 6.00365 5.68831 6.00365 9Z" fill="currentColor"/>
                                                    </svg> Hada Chalada
                                                </span>
                                            ) : (
                                                <span style={{color: 'blue', padding: 0.3 + 'rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 0.05 + 'px solid blue', borderRadius: 12 + 'px'}}>
                                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M15 3C15 2.44772 15.4477 2 16 2H20C21.1046 2 22 2.89543 22 4V8C22 8.55229 21.5523 9 21 9C20.4477 9 20 8.55228 20 8V5.41288L15.4671 9.94579C15.4171 9.99582 15.363 10.0394 15.3061 10.0767C16.3674 11.4342 17 13.1432 17 15C17 19.4183 13.4183 23 9 23C4.58172 23 1 19.4183 1 15C1 10.5817 4.58172 7 9 7C10.8559 7 12.5642 7.63197 13.9214 8.69246C13.9587 8.63539 14.0024 8.58128 14.0525 8.53118L18.5836 4H16C15.4477 4 15 3.55228 15 3ZM9 20.9963C5.68831 20.9963 3.00365 18.3117 3.00365 15C3.00365 11.6883 5.68831 9.00365 9 9.00365C12.3117 9.00365 14.9963 11.6883 14.9963 15C14.9963 18.3117 12.3117 20.9963 9 20.9963Z" fill="currentColor"/>
                                                    </svg> Duende Chiflado
                                                </span>
                                            )}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-35">
                                            <label for="subject">Exclusividad</label>
                                        </div>
                                        <div>
                                            <textarea style={{ height: 200 + 'px' }}
                                                value={currentExclusivity.Description}
                                                onChange={(e) => setCurrentExclusivity({ ...currentExclusivity, Description: e.target.value })}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="row" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                        <a className="btn btn-success" onClick={updateExclusivity}>EDITAR</a>
                                        <a className="btn btn-danger" onClick={() => setEdit(false)}>CANCELAR</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {create && (
                    <div className="window-notice">
                        <div className="content" style={{ fontSize: 1 + 'rem !important'}}>
                            <div className="container">
                                <h2>Agregar Exclusividad</h2>
                                <form>
                                    <div className="row">
                                        <div className="col-35">
                                            <label for="fname">Para</label>
                                        </div>
                                        <div>
                                            <select
                                                onChange={(e) => setNewExclusivity({ ...newExclusivity, To: e.target.value })}
                                            >
                                                <option value="0" selected>Duende Chiflado</option>
                                                <option value="1">Hada Chalada</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-35">
                                            <label for="subject">Exclusividad</label>
                                        </div>
                                        <div>
                                            <textarea
                                                value={newExclusivity.Description}
                                                onChange={(e) => setNewExclusivity({ ...newExclusivity, Description: e.target.value })}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="row" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                        <a className="btn btn-success" onClick={addExclusivity}>AGREGAR</a>
                                        <a className="btn btn-danger" onClick={() => setCreate(false)}>CANCELAR</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                <nav className="navbar">
                    <h1>Exclusividades</h1>
                </nav>

                <div className="container">
                    <table style={{width: 100 + '%'}}>
                        <thead style={{width: 100 + '%'}}>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>PARA</th>
                                <th style={{width: 52 + '%'}}>ESCLUSIVIDAD</th>
                                <th>
                                    <a className="btn btn-info" onClick={() => navigate('/admin')}>
                                        <svg fill="currentColor" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
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
                                </th>
                                <th>
                                    <a className="btn btn-success" onClick={() => setCreate(true)}>
                                        <svg width="20px" height="20px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                            <title>new-indicator-filled</title>
                                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <g id="scheduler" fill="currentColor" transform="translate(85.333333, 85.333333)">
                                                    <path d="M170.666667,1.42108547e-14 C264.923264,-3.10380131e-15 341.333333,76.4100694 341.333333,170.666667 C341.333333,264.923264 264.923264,341.333333 170.666667,341.333333 C76.4100694,341.333333 2.57539587e-14,264.923264 1.42108547e-14,170.666667 C2.6677507e-15,76.4100694 76.4100694,3.15255107e-14 170.666667,1.42108547e-14 Z M192,85.3333333 L149.333333,85.3333333 L149.333333,149.333333 L85.3333333,149.333333 L85.3333333,192 L149.333333,191.999333 L149.333333,256 L192,256 L191.999333,191.999333 L256,192 L256,149.333333 L191.999333,149.333333 L192,85.3333333 Z" id="Combined-Shape">
                                                    </path>
                                                </g>
                                            </g>
                                        </svg> Nuevo
                                    </a>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {exclusivities.map(exclusivity => (
                                <tr>
                                    <td></td>
                                    <td>{exclusivity.id}</td>
                                    <td style={{textAlign: 'center'}}>{exclusivity.To===1 ? (
                                        <span style={{color: 'deeppink', padding: 0.3 + 'rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 0.05 + 'px solid deeppink', borderRadius: 12 + 'px'}}>
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M20 9C20 13.0803 16.9453 16.4471 12.9981 16.9383C12.9994 16.9587 13 16.9793 13 17V19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V21H10C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19H11V17C11 16.9793 11.0006 16.9587 11.0019 16.9383C7.05466 16.4471 4 13.0803 4 9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9ZM6.00365 9C6.00365 12.3117 8.68831 14.9963 12 14.9963C15.3117 14.9963 17.9963 12.3117 17.9963 9C17.9963 5.68831 15.3117 3.00365 12 3.00365C8.68831 3.00365 6.00365 5.68831 6.00365 9Z" fill="currentColor"/>
                                            </svg> Hada Chalada
                                        </span>
                                    ) : (
                                        <span style={{color: 'blue', padding: 0.3 + 'rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 0.05 + 'px solid blue', borderRadius: 12 + 'px'}}>
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M15 3C15 2.44772 15.4477 2 16 2H20C21.1046 2 22 2.89543 22 4V8C22 8.55229 21.5523 9 21 9C20.4477 9 20 8.55228 20 8V5.41288L15.4671 9.94579C15.4171 9.99582 15.363 10.0394 15.3061 10.0767C16.3674 11.4342 17 13.1432 17 15C17 19.4183 13.4183 23 9 23C4.58172 23 1 19.4183 1 15C1 10.5817 4.58172 7 9 7C10.8559 7 12.5642 7.63197 13.9214 8.69246C13.9587 8.63539 14.0024 8.58128 14.0525 8.53118L18.5836 4H16C15.4477 4 15 3.55228 15 3ZM9 20.9963C5.68831 20.9963 3.00365 18.3117 3.00365 15C3.00365 11.6883 5.68831 9.00365 9 9.00365C12.3117 9.00365 14.9963 11.6883 14.9963 15C14.9963 18.3117 12.3117 20.9963 9 20.9963Z" fill="currentColor"/>
                                            </svg> Duende Chiflado
                                        </span>
                                    )}</td>
                                    <td>{exclusivity.Description}</td>
                                    <td>
                                        <a className="btn btn-warning" onClick={(e) => {
                                            setCurrentExclusivity({docId: exclusivity.id, To: exclusivity.To, Description: exclusivity.Description });
                                            setEdit(true);
                                        }}>
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg> 
                                            Editar
                                        </a>
                                    </td>
                                    <td>
                                        <a className="btn btn-danger" onClick={(e) => deleteExclusivity(exclusivity.id)}>
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 3L21 21M18 6L17.6 12M17.2498 17.2527L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6H4M16 6L15.4559 4.36754C15.1837 3.55086 14.4194 3 13.5585 3H10.4416C9.94243 3 9.47576 3.18519 9.11865 3.5M11.6133 6H20M14 14V17M10 10V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg> 
                                            Eliminar
                                        </a>
                                    </td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default ExclusivitiesAdminPanel;