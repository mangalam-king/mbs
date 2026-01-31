import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

console.log("🔥 Firebase script started");

const firebaseConfig = {
  apiKey: "AIzaSyA1rc5NCEGVCv6TQL2OkxwvrX2APsqNxJo",
  authDomain: "easy-13.firebaseapp.com",
  projectId: "easy-13"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("accountForm");

if (!form) {
  alert("❌ Form not found");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("✅ Submit clicked");

  const data = {
    bankName: "MBS Mats. Bank",
    accountNo: "MBS" + Date.now(),
    status: "Pending",
    createdAt: new Date(),

    name: document.getElementById("name").value,
    father: document.getElementById("father").value,
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
    mobile: document.getElementById("mobile").value,
    address: document.getElementById("address").value,
    accountType: document.getElementById("accountType").value
  };

  console.log("📦 Sending:", data);

  try {
    await addDoc(collection(db, "accounts"), data);
    alert("✅ Account Created Successfully!");
    form.reset();
  } catch (err) {
    console.error(err);
    alert("❌ Error: " + err.message);
  }
});
