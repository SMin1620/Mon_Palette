import React from 'react';
import styles from './ItemDetail.module.css';
import ItemDetailTop from './ItemDetail/ItemDetailTop/ItemDetailTop';
import ItemDetailBottom from './ItemDetail/ItemDetailBottom/ItemDetailBottom';

const ItemDetail = () => {
    return (
        <div>
            <ItemDetailTop />
            <ItemDetailBottom />
        </div>
    )

};

export default ItemDetail;
