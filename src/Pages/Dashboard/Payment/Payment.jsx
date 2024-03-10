import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckOutForm";
import useCart from "../../../hooks/useCart";


// TODO:  Provide Publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const [cart] = useCart()
    const total = cart.reduce((sum,item) => sum + item.price, 0)
    const price = parseFloat(total.toFixed(2));
    return (
        <div className="my-8">
            <SectionTitle subHeading={"Please Process"} heading={"Payment"}></SectionTitle>
            <Elements stripe={stripePromise}>
                <CheckoutForm cart={cart} price={price}/>
            </Elements>
        </div>
    );
};

export default Payment;