import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

console.log("app.js loaded");

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA1rc5NCEGVCv6TQL2OkxwvrX2APsqNxJo",
  authDomain: "easy-13.firebaseapp.com",
  projectId: "easy-13",
  storageBucket: "easy-13.firebasestorage.app",
  messagingSenderId: "487523175232",
  appId: "1:487523175232:web:50b599c3fc886897a908a5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Generate account number
function generateAccountNumber() {
  return "MBS" + Math.floor(1000000000 + Math.random() * 9000000000);
}

// Form submit
document.getElementById("accountForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // ✅ SAFELY READ VALUES
  const name = document.getElementById("name").value.trim();
  const father = document.getElementById("father").value.trim();
  const dob = document.getElementById("dob").value;
  const gender = document.getElementById("gender").value;
  const mobile = document.getElementById("mobile").value.trim();
  const address = document.getElementById("address").value.trim();
  const accountType = document.getElementById("accountType").value;

  // 🔒 Extra safety check
  if (!name || !father || !dob || !gender || !mobile || !address || !accountType) {
    alert("Please fill all fields");
    return;
  }

  try {
    await addDoc(collection(db, "accounts"), {
      accountNo: generateAccountNumber(),
      openingDate: new Date().toLocaleDateString(),
      status: "Pending",
      name: name,
      father: father,
      dob: dob,
      gender: gender,
      mobile: mobile,
      address: address,
      accountType: accountType
    });

    document.getElementById("result").innerHTML =
      "✅ Account Created Successfully (Pending Approval)";

    document.getElementById("accountForm").reset();

  } catch (error) {
    console.error(error);
    alert("Error: " + error.message);
  }
});
