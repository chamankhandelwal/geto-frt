import { Link, useParams } from "react-router-dom";
import "./PaymentSucess.css";

const PaymentSucess = ({user}) => {
    const params = useParams();
  return (
    <div className="payment-sucess-page">
        {user && <div className="sucess-message">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="checkmark-check" fill="none" d="M14 27 l10 10 l20 -20"/>
            </svg>
            <h2>Payment Successful</h2>
            <p>Your course subscription have been activated</p>
            <p>Reference no - {params.id}</p>
            <Link to={`/${user._id}/dashboard`} className="db-btn">Go to Dashboard</Link>
        </div>}
    </div>
  )
}

export default PaymentSucess;
