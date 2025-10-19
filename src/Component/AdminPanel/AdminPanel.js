import { useState, useEffect } from "react"

import Loader from "../Loader/Loader";
import { db } from "../Wishlist/db";
import './AdminPanel.css';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

const AdminPanel = () => {
    const [newWish, setNewWish] = useState({ Id: '', Description: '' });
    const [newExclusivity, setNewExclusivity] = useState({ To: '', Description: '' });
    const [currentWish, setCurrentWish] = useState({ docId: '', Id: '', State: '', Description: '', Photo: '' });
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);
    const [exclusivity, setExclusivity] = useState(false);
    const [needUpdated, setNeedUpdated] = useState(false);
    const [loadedData, setLoadedData] = useState(false);
    const [wishes, setWishes] = useState([]);
    const [exclusivities, setExclusivities] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'wish'));
            const datosArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a, b) => a.Number - b.Number);
            if (datosArray.length === 0) {
                setNeedUpdated(true);
            } else {
                setWishes(datosArray);
                const query = await getDocs(collection(db, 'exclusivity'));
                if (query.empty) {
                    setNeedUpdated(true);
                } else {
                    const data = query.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setExclusivities(data);
                    setNeedUpdated(false);
                }
            }
            setLoadedData(true);
        };

        fetchData();
    }, [wishes]);

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
            State: currentWish.State,
            Description: currentWish.Description
        });

        window.location.reload();
    }

    const deleteWish = async (docId) => {
        setLoading(true);

        const docRef = doc(db, 'wish', docId);
        await deleteDoc(docRef);
        
        window.location.reload();
    }

    const addExclusivity = async () => {
        try {

            const coleccionRef = db.collection('exclusivity');

            const docRef = await coleccionRef.add({
                To: newExclusivity.To,
                Description: newExclusivity.Description
            });

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
                                <h2>Editar Deseo</h2>
                                <form>
                                    <div className="row">
                                        <div className="col-35">
                                            <label for="fname">Número</label>
                                        </div>
                                        <div>
                                            <input 
                                                type="text" 
                                                value={currentWish.Id}
                                                onChange={(e) => setCurrentWish({ ...currentWish, Id: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-35">
                                            <label for="fname">Estado </label>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 + 'px'}}>
                                            <label className="switch">
                                                <input 
                                                    type="checkbox"
                                                    checked={currentWish.State}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setCurrentWish({ ...currentWish, State: 1 });
                                                        } else {
                                                            setCurrentWish({ ...currentWish, State: 0 });
                                                        }
                                                    }}
                                                 />
                                                <span className="slider"></span> 
                                            </label> 
                                            <p style={{textAlign: 'center'}}>{currentWish.State===1 ? (
                                                <span style={{ backgroundColor: 'lightgreen', color: 'darkgreen', padding: 0.3 + 'rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 0.05 + 'px solid darkgreen', borderRadius: 12 + 'px'}}>
                                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.0303 10.0303C16.3232 9.73744 16.3232 9.26256 16.0303 8.96967C15.7374 8.67678 15.2626 8.67678 14.9697 8.96967L10.5 13.4393L9.03033 11.9697C8.73744 11.6768 8.26256 11.6768 7.96967 11.9697C7.67678 12.2626 7.67678 12.7374 7.96967 13.0303L9.96967 15.0303C10.2626 15.3232 10.7374 15.3232 11.0303 15.0303L16.0303 10.0303Z" fill="currentColor"/>
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" fill="currentColor"/>
                                                    </svg> Completado
                                                </span>
                                            ) : (
                                                <span style={{ backgroundColor: 'lightyellow', color: 'orange', padding: 0.3 + 'rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 0.05 + 'px solid orange', borderRadius: 12 + 'px'}}>
                                                    <svg width="20px" height="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M511.9 183c-181.8 0-329.1 147.4-329.1 329.1s147.4 329.1 329.1 329.1c181.8 0 329.1-147.4 329.1-329.1S693.6 183 511.9 183z m0 585.2c-141.2 0-256-114.8-256-256s114.8-256 256-256 256 114.8 256 256-114.9 256-256 256z" fill="currentColor" />
                                                        <path d="M548.6 365.7h-73.2v161.4l120.5 120.5 51.7-51.7-99-99z" fill="currentColor" />
                                                    </svg> Pendiente
                                                </span>
                                            )}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-35">
                                            <label for="subject">Deseo</label>
                                        </div>
                                        <div>
                                            <textarea style={{ height: 200 + 'px' }}
                                                value={currentWish.Description}
                                                onChange={(e) => setCurrentWish({ ...currentWish, Description: e.target.value })}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="row" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                        <a className="btn btn-success" onClick={updateWish}>EDITAR</a>
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
                                <h2>Agregar Deseo</h2>
                                <form>
                                    <div className="row">
                                        <div className="col-35">
                                            <label for="fname">Número</label>
                                        </div>
                                        <div>
                                            <input 
                                                type="text" 
                                                value={newWish.Id}
                                                onChange={(e) => setNewWish({ ...newWish, Id: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-35">
                                            <label for="subject">Deseo</label>
                                        </div>
                                        <div>
                                            <textarea
                                                value={newWish.Description}
                                                onChange={(e) => setNewWish({ ...newWish, Description: e.target.value })}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="row" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                        <a className="btn btn-success" onClick={addWish}>AGREGAR</a>
                                        <a className="btn btn-danger" onClick={() => setCreate(false)}>CANCELAR</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                
                {exclusivity && (
                    <div className="container mt-3">
                        <h2>Listas de Exclusividad</h2>
                        <br />
                        <ul className="nav nav-tabs nav-justified" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-bs-toggle="tab" href="#duende">Duende</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-bs-toggle="tab" href="#hada">Hada</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div id="duende" className="container tab-pane active"><br />
                                <h3>Lista de Exclusividad para Duende Chiflado</h3>
                                <ol className="exclusivity-list">
                                    {exclusivityGobblin.map(exclusivity => (
                                        <li>{exclusivity.Description}</li>
                                    ))}
                                </ol>
                            </div>
                            <div id="hada" className="container tab-pane fade"><br />
                                <h3>Lista de Exclusividad para Hada Chalada</h3>
                                <ol className="exclusivity-list">
                                    {exclusivityPixie.map(exclusivity => (
                                        <li>{exclusivity.Description}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                )}
                <nav className="navbar">
                    <h1>Mi Lista de Deseos</h1>
                </nav>

                <div className="container">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>NÚMERO</th>
                                <th>DESEO</th>
                                <th>ESTADO</th>
                                <th>
                                    <a className="btn btn-info" onClick={() => setExclusivity(true)}>
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.5203 18.3408L16.0758 18.9449H16.0758L16.5203 18.3408ZM17.5 13.8296L16.9737 14.364C17.2657 14.6515 17.7343 14.6515 18.0263 14.364L17.5 13.8296ZM18.4797 18.3408L18.0351 17.7367L18.4797 18.3408ZM17.5 18.8201L17.5 19.5701L17.5 18.8201ZM16.9649 17.7367C16.4677 17.3709 15.8871 16.891 15.4382 16.374C14.9683 15.8329 14.75 15.3733 14.75 15.0361H13.25C13.25 15.9337 13.7742 16.7455 14.3056 17.3575C14.858 17.9937 15.5376 18.5488 16.0758 18.9449L16.9649 17.7367ZM14.75 15.0361C14.75 14.2796 15.0929 13.9195 15.4138 13.8038C15.7508 13.6823 16.3333 13.7332 16.9737 14.364L18.0263 13.2953C17.0918 12.3749 15.9243 12.0252 14.905 12.3927C13.8697 12.766 13.25 13.7847 13.25 15.0361H14.75ZM18.9242 18.9449C19.4624 18.5488 20.142 17.9937 20.6944 17.3575C21.2258 16.7455 21.75 15.9337 21.75 15.0361H20.25C20.25 15.3733 20.0317 15.8329 19.5618 16.374C19.1129 16.891 18.5323 17.3709 18.0351 17.7367L18.9242 18.9449ZM21.75 15.0361C21.75 13.7847 21.1303 12.766 20.095 12.3927C19.0757 12.0252 17.9082 12.3749 16.9737 13.2953L18.0263 14.364C18.6667 13.7332 19.2492 13.6823 19.5862 13.8038C19.9071 13.9195 20.25 14.2796 20.25 15.0361H21.75ZM16.0758 18.9449C16.4541 19.2232 16.8783 19.5701 17.5 19.5701L17.5 18.0701C17.4796 18.0701 17.4637 18.071 17.4032 18.0387C17.3121 17.99 17.1982 17.9084 16.9649 17.7367L16.0758 18.9449ZM18.0351 17.7367C17.8019 17.9084 17.688 17.99 17.5968 18.0387C17.5363 18.071 17.5204 18.0701 17.5 18.0701L17.5 19.5701C18.1217 19.5701 18.5459 19.2232 18.9242 18.9449L18.0351 17.7367Z" fill="currentColor"/>
                                            <path opacity="0.5" d="M21 6L3 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                            <path opacity="0.5" d="M21 10L3 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                            <path opacity="0.5" d="M10 14H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                            <path opacity="0.5" d="M10 18H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg> Exclusividad
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
                            {wishes.map(wish => (
                                <tr>
                                    <td></td>
                                    <td>{wish.id}</td>
                                    <td style={{textAlign: 'center'}}>{wish.Number}</td>
                                    <td>{wish.Description}</td>
                                    <td style={{textAlign: 'center'}}>{wish.State===1 ? (
                                        <span style={{ backgroundColor: 'lightgreen', color: 'darkgreen', padding: 0.3 + 'rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 0.05 + 'px solid darkgreen', borderRadius: 12 + 'px'}}>
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.0303 10.0303C16.3232 9.73744 16.3232 9.26256 16.0303 8.96967C15.7374 8.67678 15.2626 8.67678 14.9697 8.96967L10.5 13.4393L9.03033 11.9697C8.73744 11.6768 8.26256 11.6768 7.96967 11.9697C7.67678 12.2626 7.67678 12.7374 7.96967 13.0303L9.96967 15.0303C10.2626 15.3232 10.7374 15.3232 11.0303 15.0303L16.0303 10.0303Z" fill="currentColor"/>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" fill="currentColor"/>
                                            </svg> Completado
                                        </span>
                                    ) : (
                                        <span style={{ backgroundColor: 'lightyellow', color: 'orange', padding: 0.3 + 'rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 0.05 + 'px solid orange', borderRadius: 12 + 'px'}}>
                                            <svg width="20px" height="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M511.9 183c-181.8 0-329.1 147.4-329.1 329.1s147.4 329.1 329.1 329.1c181.8 0 329.1-147.4 329.1-329.1S693.6 183 511.9 183z m0 585.2c-141.2 0-256-114.8-256-256s114.8-256 256-256 256 114.8 256 256-114.9 256-256 256z" fill="currentColor" />
                                                <path d="M548.6 365.7h-73.2v161.4l120.5 120.5 51.7-51.7-99-99z" fill="currentColor" />
                                            </svg> Pendiente
                                        </span>
                                    )}</td>
                                    <td>
                                        <a className="btn btn-warning" onClick={(e) => {
                                            setCurrentWish({docId: wish.id, Id: wish.Number, State: wish.State, Description: wish.Description, Photo: `./pictures/wish${wish.Number}.png` });
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
                                        <a className="btn btn-danger" onClick={(e) => deleteWish(wish.id)}>
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

export default AdminPanel;