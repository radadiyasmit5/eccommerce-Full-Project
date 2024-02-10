import React, {useState, useEffect} from "react"
import {PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js"
import "../../pages/payment/payment.css"
import {toast} from "react-toastify"
import {useHistory} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import ProductCheckutCard from "./ProductCheckutCard"
import {currencyFormat} from "../../utils/utils"
import {emptyCart} from "../../reducers/CartReducer"
import {deleteProductsinCart} from "../../functions/Cart"

const CheckoutForm = (props) => {
  const stripe = useStripe()
  const elements = useElements()
  const {coupon, cart} = useSelector((state) => state)
  const history = useHistory()
  const {originalTotal, finalTotal, totalPriceAfterDiscount} = props
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state)
  useEffect(() => {
    if (!stripe) {
      return
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    )
    if (!clientSecret) {
      return
    }
    stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
      switch (paymentIntent.status) {
        case "succeeded":
          console.log("success")
          setMessage("Payment succeeded!")
          break
        case "processing":
          setMessage("Your payment is processing.")
          break
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.")
          break
        default:
          setMessage("Something went wrong.")
          break
      }
    })
  }, [stripe])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: process.env.REACT_APP_URL,
        },
        redirect: "if_required",
      })
      .then((response) => {
        if (response?.error) {
          if (
            response.error.type === "card_error" ||
            response.error.type === "validation_error"
          ) {
            setMessage(response.error.message)
          } else {
            setMessage("An unexpected error occurred.")
          }
        }
        if (response.paymentIntent.status == "succeeded") {
          dispatch(emptyCart())
          if (typeof window !== undefined) {
            localStorage.removeItem("cart")
          }
          deleteProductsinCart(user?.token)
          toast.success("Payment Completed SuccessFully")
          history.push("/home")
        }
      })

    setIsLoading(false)
  }
  const paymentElementOptions = {
    layout: "tabs",
  }

  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-7 mt-5">
          <ProductCheckutCard product={cart} />
        </div>
        <div className="col-md-4 " style={{marginTop: "20lvh"}}>
          <form id="payment-form" onSubmit={handleSubmit}>
            <div className="my-3">
              <p className="d-inline">SubTotal: </p>
              {"   "}
              <span className=" font-weight-bold">
                {currencyFormat(originalTotal)}
              </span>
            </div>
            <div className="my-3">
              <p className="d-inline">Discount Applied: </p>
              {"   "}
              <span className=" font-weight-bold">
                {currencyFormat(
                  totalPriceAfterDiscount
                    ? originalTotal - totalPriceAfterDiscount
                    : 0
                )}
              </span>
            </div>
            <div className="my-3">
              <p className="d-inline">Total Payable Amount: </p>
              {"   "}
              <span className=" font-weight-bold">
                {currencyFormat(
                  totalPriceAfterDiscount > 0
                    ? totalPriceAfterDiscount
                    : originalTotal
                )}
              </span>
            </div>
            <br />
            <hr />
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
            />
            <button
              disabled={isLoading || !stripe || !elements}
              id="submit payment-btn"
              className="payment-btn"
            >
              <span id="button-text">
                {isLoading ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  "Pay now"
                )}
              </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm
