"use client";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    id: "",
    amount: "",
    months: "",
  });

  const interestRate = 0.15;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loanAmount = Number(form.amount) || 0;
  const months = Number(form.months) || 0;

  const interest = loanAmount * interestRate;
  const totalRepayment = loanAmount + interest;
  const monthlyPayment = months ? totalRepayment / months : 0;

  return (
    <div style={styles.container}>
      
      {/* LOGO */}
      <img src="/logo.png" alt="SasaCash Logo" style={styles.logo} />

      <h1>SasaCash Loan Application</h1>

      {/* STEP 1 */}
      {step === 1 && (
        <div>
          <h2>Personal Information</h2>

          <input
            style={styles.input}
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />
          <input
            style={styles.input}
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />
          <input
            style={styles.input}
            name="id"
            placeholder="ID Number"
            onChange={handleChange}
          />

          <button style={styles.button} onClick={() => setStep(2)}>
            Next
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div>
          <h2>Loan Details</h2>

          <input
            style={styles.input}
            name="amount"
            type="number"
            placeholder="Amount (KES 1,000 - 50,000)"
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="months"
            type="number"
            placeholder="Repayment Months (1-12)"
            onChange={handleChange}
          />

          <button style={styles.button} onClick={() => setStep(1)}>
            Back
          </button>

          <button
            style={styles.button}
            onClick={() => {
              if (loanAmount < 1000 || loanAmount > 50000) {
                alert("Loan must be between KES 1,000 and 50,000");
                return;
              }
              if (months < 1 || months > 12) {
                alert("Repayment must be between 1 and 12 months");
                return;
              }
              setStep(3);
            }}
          >
            Next
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div>
          <h2>Review Your Loan</h2>

          <p><strong>Name:</strong> {form.name}</p>
          <p><strong>Phone:</strong> {form.phone}</p>
          <p><strong>Loan Amount:</strong> KES {loanAmount}</p>
          <p><strong>Interest (15%):</strong> KES {interest}</p>
          <p><strong>Total Repayment:</strong> KES {totalRepayment}</p>
          <p><strong>Monthly Payment:</strong> KES {monthlyPayment.toFixed(2)}</p>
          <p><strong>Period:</strong> {months} months</p>

          <button style={styles.button} onClick={() => setStep(2)}>
            Back
          </button>

          <button style={styles.button} onClick={() => setStep(4)}>
            Proceed
          </button>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div>
          <h2>Processing Fee Payment</h2>

          <p>Please pay <strong>KES 200</strong> via M-Pesa</p>
          <p><strong>Till Number: 8808802</strong></p>

          <p>After payment, click confirm to complete application.</p>

          <button
            style={styles.button}
            onClick={() => {
              alert("Application submitted successfully!");
              setStep(1);
            }}
          >
            Confirm Payment
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial",
  },
  logo: {
    width: "120px",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },
  button: {
    padding: "10px 15px",
    margin: "5px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
