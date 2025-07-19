import { useState, useEffect } from "react"

import Card from '../Card/Card';
import './Wishlist.css';
import axios from "axios";
import { SeaTable } from "../SeaTable/SeaTable";
import Loader from "../Loader/Loader";
import ProgressBar from "../ProgressBar/ProgressBar";

const Wishlist = () => {
    const [newWish, setNewWish] = useState({ Id: '', State: 0, Description: '' });
    const [currentWish, setCurrentWish] = useState({ row_id: '', Id: '', State: '', Description: '', Photo: '' });
    const [photo, setPhoto] = useState('');
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);
    const [needUpdated, setNeedUpdated] = useState(false);
    const [loadedData, setLoadedData] = useState(false);
    const [wishes, setWishes] = useState([]);
    const [current, setCurrent] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${SeaTable.access_token}`
                }
            };

            const response = await axios.get(`https://cloud.seatable.io/api-gateway/api/v2/dtables/${SeaTable.dtable_uuid}/rows/?table_name=${SeaTable.table_name}&convert_keys=true`, options);
            if (response.status === 200) {
                setWishes(response.data.rows);
                const completedWish = response.data.rows.filter(wish =>
                    wish.State === 1
                );
                setCurrent(completedWish.length);
                setTotal(response.data.rows.length);
                setLoadedData(true);
            } else {
                setNeedUpdated(true);
            }
        };

        fetchData();
    }, [SeaTable.dtable_uuid, SeaTable.access_token, SeaTable.table_name]);

    const addWish = () => {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Bearer ${SeaTable.access_token}`
            },
            body: JSON.stringify({ table_name: `${SeaTable.table_name}`, rows: [{ Id: newWish.Id, State: newWish.State, Description: newWish.Description, Photo: '' }] })
        };

        fetch(`https://cloud.seatable.io/api-gateway/api/v2/dtables/${SeaTable.dtable_uuid}/rows/`, options)
            .then(res => res.json())
            .then(res => window.location.reload())
            .catch(err => console.error(err));
    }

    const updateWish = () => {
        console.log(currentWish);
        const options = {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Bearer ${SeaTable.access_token}`
            },
            body: JSON.stringify({
                updates: [{
                    row: {
                        Id: currentWish.Id, State: currentWish.State, Description: currentWish.Description, Photo: [{
                            name: currentWish.Photo.name,
                            url: URL.createObjectURL(currentWish.Photo),
                            type: currentWish.Photo.type,
                        }]
                    }, row_id: currentWish.row_id
                }],
                table_name: `${SeaTable.table_name}`
            })
        };

        fetch(`https://cloud.seatable.io/api-gateway/api/v2/dtables/${SeaTable.dtable_uuid}/rows/`, options)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    const completeWish = () => {
        const options = {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Bearer ${SeaTable.access_token}`
            },
            body: JSON.stringify({
                updates: [{ row: { State: '1' }, row_id: currentWish.row_id }],
                table_name: `${SeaTable.table_name}`
            })
        };

        fetch(`https://cloud.seatable.io/api-gateway/api/v2/dtables/${SeaTable.dtable_uuid}/rows/`, options)
            .then(res => res.json())
            .then(res => window.location.reload())
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

    return (
        <>
            <div className='bg-gradient'>
                <div className="limit-h">
                    {wishes.map((wish) => (
                        <Card key={wish._id} wish={wish} setCurrentWish={setCurrentWish} setEdit={setEdit} />
                    ))}
                </div>
                <input type="button" value="Agregar Deseo" className="floating-button" onClick={(e) => setCreate(true)} />
            </div>
            <ProgressBar current={current} total={total} />
            {needUpdated ? (
                <div className="dark-window-notice">
                    <div className="content">
                        <Loader />
                    </div>
                </div>) :
                ''
            }
            {create ? (
                <div className="window-notice">
                    <div className="content">
                        <div className="popup">
                            <a className="close-btn" onClick={(e) => { setCreate(false); setNewWish({ Id: '', State: 0, Description: '' }) }}>✖️</a>
                            <form className="form">
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 34" height="34" width="34">
                                        <path strokeLinejoin="round" strokeWidth="2.5" stroke="#115DFC" d="M7.08385 9.91666L5.3572 11.0677C4.11945 11.8929 3.50056 12.3055 3.16517 12.9347C2.82977 13.564 2.83226 14.3035 2.83722 15.7825C2.84322 17.5631 2.85976 19.3774 2.90559 21.2133C3.01431 25.569 3.06868 27.7468 4.67008 29.3482C6.27148 30.9498 8.47873 31.0049 12.8932 31.1152C15.6396 31.1838 18.3616 31.1838 21.1078 31.1152C25.5224 31.0049 27.7296 30.9498 29.331 29.3482C30.9324 27.7468 30.9868 25.569 31.0954 21.2133C31.1413 19.3774 31.1578 17.5631 31.1639 15.7825C31.1688 14.3035 31.1712 13.564 30.8359 12.9347C30.5004 12.3055 29.8816 11.8929 28.6437 11.0677L26.9171 9.91666"></path>
                                        <path strokeLinejoin="round" strokeWidth="2.5" stroke="#115DFC" d="M2.83331 14.1667L12.6268 20.0427C14.7574 21.3211 15.8227 21.9603 17 21.9603C18.1772 21.9603 19.2426 21.3211 21.3732 20.0427L31.1666 14.1667"></path>
                                        <path strokeWidth="2.5" stroke="#115DFC" d="M7.08331 17V8.50001C7.08331 5.82872 7.08331 4.49307 7.91318 3.66321C8.74304 2.83334 10.0787 2.83334 12.75 2.83334H21.25C23.9212 2.83334 25.2569 2.83334 26.0868 3.66321C26.9166 4.49307 26.9166 5.82872 26.9166 8.50001V17"></path>
                                        <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" stroke="#115DFC" d="M14.1667 14.1667H19.8334M14.1667 8.5H19.8334"></path>
                                    </svg>
                                </div>
                                <div className="note">
                                    <label className="title">Tengo un deseo</label>
                                    <span className="subtitle">Todo buen romance, tiene deseos o fantasías que cumplir, aquí podrás apuntar las tuyas, para así poder cumplirlas con tu.</span>
                                </div>
                                <input
                                    placeholder="Número del Deseo"
                                    name="Id"
                                    type="number"
                                    className="input_field"
                                    value={newWish.Id}
                                    onChange={e => setNewWish({ ...newWish, Id: e.target.value })}
                                    required />
                                <input
                                    placeholder="Escriba el Deseo"
                                    name="Description"
                                    type="text"
                                    className="input_field"
                                    value={newWish.Description}
                                    onChange={e => setNewWish({ ...newWish, Description: e.target.value })}
                                    required />
                                <input type="button" value="Anotar Deseo" className="input_field submit" onClick={addWish} />
                            </form>
                        </div>
                    </div>
                </div>) :
                ''
            }
            {edit ? (
                <div className="window-notice">
                    <div className="content">
                        <div className="popup">
                            {currentWish.State === 1 && (<div class="ribbon">COMPLETADO</div>)}
                            <a className="close-btn" onClick={(e) => { setEdit(false); setCurrentWish({ row_id: '', Id: '', State: '', Description: '', Photo: '' }) }}>✖️</a>
                            <form className="form">
                                <div className="note">
                                    <label className="title">Información del deseo</label>
                                </div>
                                <img src={currentWish.State === 0 ? "./OIP.webp" : (currentWish.Photo ? currentWish.Photo : "./OIP.webp")} style={{ width: 100 + '%', cursor: 'pointer', borderRadius: 10 + 'px', border: 1 + 'px solid white', boxShadow: 0 + ' ' + 0 + ' ' + 4 + 'px grey'  }} />
                                <input
                                    placeholder="Número del Deseo"
                                    name="Id"
                                    type="number"
                                    className="input_field"
                                    onChange={e => setCurrentWish({ ...currentWish, Id: e.target.value })}
                                    value={currentWish.Id}
                                    readOnly={currentWish.State === 0 ? false : true}
                                />
                                <input
                                    placeholder="Escriba el Deseo"
                                    name="Description"
                                    type="text"
                                    className="input_field"
                                    onChange={e => setCurrentWish({ ...currentWish, Description: e.target.value })}
                                    value={currentWish.Description}
                                    readOnly={currentWish.State === 0 ? false : true}
                                />
                                <input type="button" value="Actualizar Deseo" className="input_field submit" onClick={updateWish} style={{ display: currentWish.State === 0 ? "block" : "none" }} />
                                <input type="button" value="Marcar Completado" className="input_field complete" onClick={completeWish} style={{ display: currentWish.State === 0 ? "block" : "none" }} />
                            </form>
                        </div>
                    </div>
                </div>
            ) : ''}
        </>
    )
}

export default Wishlist;