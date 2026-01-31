import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// Auto account number
function generateAccountNumber() {
  return "MBS" + Math.floor(1000000000 + Math.random() * 9000000000);
}

document.getElementById("accountForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const accountNo = generateAccountNumber();
  const openingDate = new Date().toLocaleDateString();

  await addDoc(collection(db, "accounts"), {
    accountNo: accountNo,
    openingDate: openingDate,
    status: "Pending",
    name: name.value,
    father: father.value,
    dob: dob.value,
    gender: gender.value,
    mobile: mobile.value,
    address: address.value,
    accountType: accountType.value
  });

  document.getElementById("result").innerHTML =
    `✅ Account Created<br>
     <b>Account No:</b> ${accountNo}<br>
     <b>Status:</b> Pending Approval`;

  document.getElementById("accountForm").reset();
});
