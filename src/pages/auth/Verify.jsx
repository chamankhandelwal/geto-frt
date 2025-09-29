import { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../../context/UserContext";
const Verify = () => {
  const [otp, setOtp] = useState("");
  const { btnLoading, verifyOtp } = useUserData();
  const navigate = useNavigate();

  const handlerOTP = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>OTP Verification</h2>
        <form onSubmit={handlerOTP}>
          <label htmlFor="verify">OTP sent to your email!</label>
          <input
            type="number"
            name="verify"
            id="verify"
            value={otp}
            required
            onChange={(e) => setOtp(e.target.value)}
          />
          <p className="mt-3 link-p">
            Go to?&nbsp;
            <Link
              to={"/login"}
              style={{ textDecoration: "none", fontStyle: "italic" }}
            >
              Login
            </Link>
            &nbsp; page
          </p>

          <button className="common-btn" type="submit" disabled={btnLoading}>
            {btnLoading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verify;
