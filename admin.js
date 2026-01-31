import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

const table = document.getElementById("data");

const snapshot = await getDocs(collection(db, "accounts"));

snapshot.forEach((snap) => {
  const d = snap.data();
  const id = snap.id;

  table.innerHTML += `
    <tr>
      <td>${d.accountNo}</td>
      <td contenteditable="true" id="name-${id}">${d.name}</td>
      <td contenteditable="true" id="mobile-${id}">${d.mobile}</td>
      <td>${d.accountType}</td>
      <td><b>${d.status}</b></td>
      <td>
        <button onclick="approve('${id}')">Approve</button>
        <button onclick="reject('${id}')">Reject</button>
        <button onclick="saveEdit('${id}')">Save</button>
      </td>
    </tr>
  `;
});

window.approve = async (id) => {
  await updateDoc(doc(db, "accounts", id), {
    status: "Approved"
  });
  alert("Account Approved");
  location.reload();
};

window.reject = async (id) => {
  await updateDoc(doc(db, "accounts", id), {
    status: "Rejected"
  });
  alert("Account Rejected");
  location.reload();
};

window.saveEdit = async (id) => {
  const name = document.getElementById(`name-${id}`).innerText;
  const mobile = document.getElementById(`mobile-${id}`).innerText;

  await updateDoc(doc(db, "accounts", id), {
    name: name,
    mobile: mobile
  });

  alert("Details Updated");
};
