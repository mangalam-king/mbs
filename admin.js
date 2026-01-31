import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore, collection, getDocs, doc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA1rc5NCEGVCv6TQL2OkxwvrX2APsqNxJo",
  authDomain: "easy-13.firebaseapp.com",
  projectId: "easy-13"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const data = document.getElementById("data");

const snap = await getDocs(collection(db, "accounts"));
snap.forEach(s => {
  const d = s.data();
  data.innerHTML += `
    <tr>
      <td>${d.accountNo}</td>
      <td contenteditable id="n-${s.id}">${d.name}</td>
      <td contenteditable id="m-${s.id}">${d.mobile}</td>
      <td>${d.accountType}</td>
      <td>${d.status}</td>
      <td>
        <button onclick="approve('${s.id}')">Approve</button>
        <button onclick="reject('${s.id}')">Reject</button>
        <button onclick="save('${s.id}')">Save</button>
      </td>
    </tr>`;
});

window.approve = async id => {
  await updateDoc(doc(db, "accounts", id), { status: "Approved" });
  location.reload();
};

window.reject = async id => {
  await updateDoc(doc(db, "accounts", id), { status: "Rejected" });
  location.reload();
};

window.save = async id => {
  await updateDoc(doc(db, "accounts", id), {
    name: document.getElementById(`n-${id}`).innerText,
    mobile: document.getElementById(`m-${id}`).innerText
  });
  alert("Updated");
};
