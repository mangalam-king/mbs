import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA1rc5NCEGVCv6TQL2OkxwvrX2APsqNxJo",
  authDomain: "easy-13.firebaseapp.com",
  projectId: "easy-13"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function v(id) {
  const el = document.getElementById(id);
  console.log(id, el ? el.value : "❌ NOT FOUND");
  return el ? el.value : undefined;
}

document.getElementById("accountForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    accountNo: "MBS" + Date.now(),
    openingDate: new Date().toLocaleDateString(),
    status: "Pending",
    name: v("name"),
    father: v("father"),
    dob: v("dob"),
    gender: v("gender"),
    mobile: v("mobile"),
    address: v("address"),
    accountType: v("accountType")
  };

  console.log("DATA TO FIRESTORE:", data);

  await addDoc(collection(db, "accounts"), data);
});
