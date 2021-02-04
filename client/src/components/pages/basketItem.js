import React from 'react'

function BasketItem({item}) {
    return (
        <div className="card p-3">
            <div className="row">
                <section className="col-8">
                    <figure>
                        <img src={item.photoURL} width="200px" height="100px" />
                    </figure>
                </section>
                <section className="col-4">
                    <div>จำนวน {item.qty} ใบ</div>
                </section>
            </div>
        </div>
    )
}

export default BasketItem
