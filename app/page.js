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
          <div style={{ ...styles.progressBar, width: `${getProgress()}%` }}></div>
        </div>
        <p style={styles.progressText}>Step 1 of 4</p>

        <label>First Name *</label>
        <input name="firstName" onChange={handleChange} style={styles.input} />

        <label>Middle Name</label>
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

        <button style={styles.primaryBtn} onClick={() => {
          if (!validatePersonal()) return alert("Fill all required fields");
          setPage("loan");
        }}>Next</button>
      </div>
    );
  }

  // LOAN
  if (page === "loan") {
    return (
      <div style={styles.container}>
        <h2>Loan Details</h2>

        <div style={styles.progressContainer}>
          <div style={{ ...styles.progressBar, width: `${getProgress()}%` }}></div>
        </div>
        <p style={styles.progressText}>Step 2 of 4</p>

        <input name="amount" type="number" placeholder="KES 1,000 - 50,000" onChange={handleChange} style={styles.input} />
        <input name="months" type="number" placeholder="1 - 12 months" onChange={handleChange} style={styles.input} />

        <select name="purpose" onChange={handleChange} style={styles.input}>
          <option value="">Loan Purpose</option>
          <option>Business</option>
          <option>Personal</option>
          <option>Medical</option>
          <option>Emergency</option>
          <option>Other</option>
        </select>

        <div style={styles.cardWhite}>
          <p>Loan: {loan}</p>
          <p>Interest: {interest}</p>
          <p>Total: {total}</p>
          <p>Monthly: {monthly.toFixed(2)}</p>
        </div>

        <button style={styles.secondaryBtn} onClick={() => setPage("personal")}>Back</button>
        <button style={styles.primaryBtn} onClick={() => {
          if (!validateLoan()) return alert("Invalid loan details");
          setPage("review");
        }}>Next</button>
      </div>
    );
  }

  // REVIEW
  if (page === "review") {
    return (
      <div style={styles.container}>
        <h2>Review</h2>

        <div style={styles.progressContainer}>
          <div style={{ ...styles.progressBar, width: `${getProgress()}%` }}></div>
        </div>
        <p style={styles.progressText}>Step 3 of 4</p>

        <div style={styles.cardWhite}>
          <p>{form.firstName} {form.lastName}</p>
          <p>KES {loan}</p>
          <p>Total: {total}</p>
        </div>

        <button style={styles.secondaryBtn} onClick={() => setPage("loan")}>Back</button>
        <button style={styles.primaryBtn} onClick={() => setPage("payment")}>Proceed</button>
      </div>
    );
  }

  // PAYMENT
  if (page === "payment") {
    return (
      <div style={styles.container}>
        <h2>Payment</h2>

        <div style={styles.progressContainer}>
          <div style={{ ...styles.progressBar, width: `${getProgress()}%` }}></div>
        </div>
        <p style={styles.progressText}>Step 4 of 4</p>

        <p>Pay KES 200 via M-Pesa (Till 8808802)</p>

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
        <div style={styles.successCard}>
          <h2>✅ Application Submitted</h2>
          <p>Your loan request has been received.</p>

          <button style={styles.primaryBtn} onClick={() => setPage("home")}>
            Back Home
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  container: { maxWidth: "420px", margin: "auto", padding: "20px", background: "#f5f7fb" },
  logo: { width: "100px" },
  card: { background: "green", color: "white", padding: "20px", borderRadius: "20px" },
  cardWhite: { background: "white", padding: "15px", borderRadius: "10px", marginTop: "10px" },
  feature: { background: "white", padding: "10px", margin: "10px 0" },
  input: { width: "100%", padding: "10px", margin: "10px 0" },
  primaryBtn: { width: "100%", padding: "12px", background: "green", color: "white", border: "none" },
  secondaryBtn: { width: "100%", padding: "12px", background: "#ccc", border: "none" },
  progressContainer: { height: "6px", background: "#ddd", margin: "10px 0" },
  progressBar: { height: "6px", background: "green" },
  progressText: { fontSize: "12px" },
  successCard: { background: "white", padding: "20px", textAlign: "center", marginTop: "50px" }
};
