import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

console.log("app.js loaded");

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

function generateAccountNumber() {
  return "MBS" + Math.floor(1000000000 + Math.random() * 9000000000);
}

document.getElementById("accountForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "accounts"), {
      accountNo: generateAccountNumber(),
      openingDate: new Date().toLocaleDateString(),
      status: "Pending",
      name: name.value,
      father: father.value,
      dob: dob.value,
      gender: gender.value,
      mobile: mobile.value,
      address: address.value,
      accountType: accountType.value
    });

    result.innerHTML = "✅ Account Created Successfully (Pending Approval)";
    accountForm.reset();

  } catch (err) {
    alert(err.message);
    console.error(err);
  }
});
