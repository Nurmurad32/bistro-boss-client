import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import './CheckoutForm.css'
import Swal from "sweetalert2";

const CheckoutForm = ({ cart, price }) => {
    const stripe = useStripe();
    const elements = useElements()
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;

        const name = form.name.value;
        const number = form.number.value;
        const address = form.address.value;

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            setCardError(' ')
            console.log('[PaymentMethod]', paymentMethod);
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'unknown'
                },
            },
        })
        if (confirmError) {
            console.log(confirmError)
        }

        console.log(paymentIntent)
        setProcessing(false)
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id)

            // Save payment information to the server
            // const transactionId = paymentIntent.id;
            const payment = {
                email: user?.email,
                name,
                number,
                address,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                quantity: cart.length,
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.menuItemId),
                orderStatus: 'Service Pending',
                itemNames: cart.map(item => item.name)
            }
            axiosSecure.post('/payments', payment)
                .then(data => {
                    console.log(data.data)
                    if (data.data.insertResult.insertedId) {
                        form.reset()
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your Payment Success",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })

        }

    }

    return (
        <>
            <form className="w-2/3 m-8 mx-auto" onSubmit={handleSubmit}>
                <div className="form-control w-full ">
                    {/* <label className="label"> */}
                    <span className="label-text font-semibold">Name*</span>
                    {/* </label> */}
                    <input type="text" name="name" className="input input-bordered w-full " required />
                </div>
                <div className="form-control w-full ">
                    {/* <label className="label"> */}
                    <span className="label-text font-semibold">Contact*</span>
                    {/* </label> */}
                    <input type="text" name="number" className="input input-bordered w-full " required />
                </div>
                <div className="form-control w-full ">
                    {/* <label className="label"> */}
                    <span className="label-text font-semibold">Address*</span>
                    {/* </label> */}
                    <input type="text" name="address" className="input input-bordered w-full " required />
                </div>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="bg-white">
                    <p className="text-red-700 text-center"><a href="https://docs.stripe.com/testing">Test Card </a></p>
                    <div className="grid grid-cols-2 p-1  text-center">
                        <p className="mr-2">CARD: 4242424242424242</p>
                        <p>CVC: 345</p>
                    {/* </div> */}
                    {/* <div className="flex"> */}
                        <p className="mr-2">DATE: Any future date</p>
                        <p>ZIP: 10019</p>
                    </div>


                </div>
                <button className="btn btn-brand1 btn-sm mt-4 text-center flex justify-center" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
            {transactionId && <p className="text-green-500 ml-8 text-center">Transaction complete with transactionId: {transactionId}</p>}
        </>
    );
};

export default CheckoutForm;