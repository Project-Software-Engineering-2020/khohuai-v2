const { firestore, auth } = require("../firebaseDB");

const getInventory = async (req, res) => {
  let uid = "";

  await auth.onAuthStateChanged(function (user) {
    if (user) {
      uid = user.uid;
    }
  });
  //const uid = "MEi2CKybAkZYfAFhkerLUqO0EYR2";
  let inventory = [];
  await firestore
    .collection("inventorys")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        inventory.push(doc.data());
      });
    });
  await firestore
    .collection("users")
    .doc(uid)
    .collection("inventory")
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        for (let i in inventory) {
          if (inventory[i].name === doc.data().name) {
            inventory[i].in_stock = doc.data().in_stock;
          }
        }
      });
    });
  res.send(inventory);
};

const setInventory = async (req, res) => {
  let token = req.body.tokens;
  let updateValue = req.body.update_value;
  let uid = "";

  await auth.onAuthStateChanged(function (user) {
    if (user) {
      uid = user.uid;
    }
  });
  //const uid = "MEi2CKybAkZYfAFhkerLUqO0EYR2";
  let inventory = [];
  try {
    await firestore
      .collection("users")
      .doc(uid)
      .collection("inventory")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          inventory.push({ id: doc.id, name: doc.data().name });
        });
      });
    let tokenID;
    for (let i in inventory) {
      if (inventory[i].name === token) {
        tokenID = inventory[i].id;
      }
    }
    await firestore
      .collection("users")
      .doc(uid)
      .collection("inventory")
      .doc(tokenID)
      .update({
        in_stock: updateValue,
      });
  } catch (error) { console.log(error); }
};

module.exports = { getInventory, setInventory };
