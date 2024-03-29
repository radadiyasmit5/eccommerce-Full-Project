import React, {useEffect, useState} from "react"
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import {paymentIntent} from "../../functions/payment"
import {useSelector} from "react-redux"
import CheckoutForm from "../../componant/payment/CheckoutForm"
import "./payment.css"
import {toast} from "react-toastify"
import {useHistory} from "react-router-dom"
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TOKEN)
export default function Payment() {
  const {user, coupon} = useSelector((state) => state)
  const history = useHistory()
  const [clientSecret, setclientSecrete] = useState("")
  const [originalTotal, setoriginalTotal] = useState(0)
  const [finalTotal, setfinalTotal] = useState(0)
  const [totalPriceAfterDiscount, settotalPriceAfterDiscount] = useState(0)
  useEffect(() => {
    if (user && user.token) {
      paymentIntent(user.token, coupon)
        .then((res) => {
          setclientSecrete(res.data.clientSecret)
          setoriginalTotal(res.data.originalTotal)
          setfinalTotal(res.data.finalTotal)
          settotalPriceAfterDiscount(res.data.totalPriceAfterDiscount)
        })
        .catch((err) => {
          console.log(err)
          toast.error(
            "Sorry ,Server Encountered SOme issue While generating Payment Link"
          )
          history.push({
            pathname: "/error",
            state: {
              from: "/payment",
              err: "Failed to get the payment Intent",
              to: "/checkout",
            },
          })
        })
    }
  }, [user])

  const appearance = {
    theme: "stripe",
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className="main-container">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            originalTotal={originalTotal}
            finalTotal={finalTotal}
            totalPriceAfterDiscount={totalPriceAfterDiscount}
          />
        </Elements>
      )}
    </div>
  )
}
