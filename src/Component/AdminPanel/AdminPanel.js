import { useState, useEffect } from "react"

import Loader from "../Loader/Loader";
import { db } from "../Wishlist/db";
import './AdminPanel.css';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';

const AdminPanel = () => {
    const [newWish, setNewWish] = useState({ Id: '', Description: '' });
    const [currentWish, setCurrentWish] = useState({ docId: '', Id: '', State: '', Description: '', Photo: '' });
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);
    const [needUpdated, setNeedUpdated] = useState(false);
    const [loadedData, setLoadedData] = useState(false);
    const [wishes, setWishes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'wish'));
            const datosArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a, b) => a.Number - b.Number);
            if (datosArray.length === 0) {
                setNeedUpdated(true);
            } else {
                setWishes(datosArray);
                setNeedUpdated(false);
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

    const deleteWish = async () => {
        setLoading(true);
        setEdit(false);
        const docRef = await deleteDoc(doc(db, 'wish', currentWish.docId));

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
            <div className="bg-gradient">
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
                            <div className="container">
                                <h2>Editar Deseo</h2>
                                <form>
                                    <div className="row">
                                        <div className="col-25">
                                            <label for="fname">Número</label>
                                        </div>
                                        <div className="col-75">
                                            <input 
                                                type="text" 
                                                value={currentWish.Id}
                                                onChange={(e) => setCurrentWish({ ...currentWish, Id: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-25">
                                            <label for="fname">Completado</label>
                                        </div>
                                        <div className="col-75">
                                            <label className="switch">
                                                <input 
                                                    type="checkbox"
                                                    value={currentWish.State}
                                                    onChange={(e) => setCurrentWish({ ...currentWish, Id: e.target.value })}
                                                 />
                                                <span className="slider"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-25">
                                            <label for="subject">Deseo</label>
                                        </div>
                                        <div class="col-75">
                                            <textarea style={{ height: 200 + 'px' }}
                                                value={currentWish.Description}
                                                onChange={(e) => setCurrentWish({ ...currentWish, Description: e.target.value })}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="row">
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
                        <div className="content">
                            <div className="container">
                                <h2>Agregar Deseo</h2>
                                <form>
                                    <div className="row">
                                        <div className="col-25">
                                            <label for="fname">Número</label>
                                        </div>
                                        <div className="col-75">
                                            <input 
                                                type="text" 
                                                value={newWish.Id}
                                                onChange={(e) => setNewWish({ ...newWish, Id: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-25">
                                            <label for="fname">Completado</label>
                                        </div>
                                        <div className="col-75">
                                            <label className="switch">
                                                <input 
                                                    type="checkbox"
                                                    value={newWish.State}
                                                    onChange={(e) => setNewWish({ ...newWish, Id: e.target.value })}
                                                 />
                                                <span className="slider"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-25">
                                            <label for="subject">Deseo</label>
                                        </div>
                                        <div class="col-75">
                                            <textarea style={{ height: 200 + 'px' }}
                                                value={newWish.Description}
                                                onChange={(e) => setNewWish({ ...newWish, Description: e.target.value })}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <a className="btn btn-success" onClick={addWish}>AGREGAR</a>
                                        <a className="btn btn-danger" onClick={() => setCreate(false)}>CANCELAR</a>
                                    </div>
                                </form>
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
                                <th></th>
                                <th>
                                    <a className="btn btn-success" onClick={() => setCreate(true)}>
                                        <svg width="80px" height="80px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                            <title>new-indicator-filled</title>
                                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <g id="scheduler" fill="#000000" transform="translate(85.333333, 85.333333)">
                                                    <path d="M170.666667,1.42108547e-14 C264.923264,-3.10380131e-15 341.333333,76.4100694 341.333333,170.666667 C341.333333,264.923264 264.923264,341.333333 170.666667,341.333333 C76.4100694,341.333333 2.57539587e-14,264.923264 1.42108547e-14,170.666667 C2.6677507e-15,76.4100694 76.4100694,3.15255107e-14 170.666667,1.42108547e-14 Z M192,85.3333333 L149.333333,85.3333333 L149.333333,149.333333 L85.3333333,149.333333 L85.3333333,192 L149.333333,191.999333 L149.333333,256 L192,256 L191.999333,191.999333 L256,192 L256,149.333333 L191.999333,149.333333 L192,85.3333333 Z" id="Combined-Shape">
                                                    </path>
                                                </g>
                                            </g>
                                        </svg>
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
                                    <td>{wish.Number}</td>
                                    <td>{wish.Description}</td>
                                    <td>{wish.State}</td>
                                    <td>
                                        <a className="btn btn-warning" onClick={(e) => {
                                            setCurrentWish({docId: wish.id, Id: wish.Number, State: wish.State, Description: wish.Description, Photo: `./pictures/wish${wish.Number}.png` });
                                            setEdit(true);
                                        }}>
                                            <i>
                                                <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </i>
                                            Editar
                                        </a>
                                    </td>
                                    <td>
                                        <a className="btn btn-danger" onClick={(e) => {
                                            setCurrentWish({docId: wish.id, Id: wish.Number, State: wish.State, Description: wish.Description, Photo: `./pictures/wish${wish.Number}.png` });
                                            deleteWish();
                                        }}>
                                            <i>
                                                <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3 3L21 21M18 6L17.6 12M17.2498 17.2527L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6H4M16 6L15.4559 4.36754C15.1837 3.55086 14.4194 3 13.5585 3H10.4416C9.94243 3 9.47576 3.18519 9.11865 3.5M11.6133 6H20M14 14V17M10 10V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </i>
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