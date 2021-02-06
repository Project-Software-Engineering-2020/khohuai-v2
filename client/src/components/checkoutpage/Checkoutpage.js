// import React, { useState } from 'react';
// import axios from 'axios';
// import Checkoutcerditcard from './creditcard'

// const CheckoutPage = () => {
//     const [charge, setcharge] = useState(undefined)
//     const createCreditCardCharge = async (email, name, amount, token) => {
//         try {
//             const res = await axios({
//                 method: 'post',
//                 url: 'http://localhost:80/checkout-credit-card',
//                 data: {
//                     email,
//                     name,
//                     amount,
//                     token
//                 },
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             })
//             const resData = res.data
//             this.setState({ charge: resData })
//             console.log('ส่งไปแล้ว')
//         } catch (err) {
//             console.log(err)
//         }

//     }
//     return(

//     )
// }