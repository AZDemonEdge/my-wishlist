import './Card.css';

const Card = ({ wish, setCurrentWish, setEdit }) => {
    const clickEvent = (e) => {
        setCurrentWish({ row_id: wish._id, Id: wish.Id, State: wish.State, Description: wish.Description, Photo: `./pictures/wish${wish.Id}.png` });
        setEdit(true);
    }
    return (
        <>
            <div className={wish.State === 0 ? 'card' : 'card-completed'} onClick={clickEvent}>
                <div className="number">
                    <p className="text">{wish.Id}</p>
                </div>
                <p className="content">
                    {wish.Description}
                </p>
            </div>
        </>
    );
}

export default Card;