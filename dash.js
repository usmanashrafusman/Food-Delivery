
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    email = user.email;

    db.collection("OrdersRestaurent").doc(email).collection("Pending")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            //console.log(change.doc.data().Status);
            if (change.doc.data().Status == "Pending") {
              getPendingData(change)
            }
          }

          if (change.type === "modified") {
            //console.log(change.doc.data().Status);
            if (change.doc.data().Status == "Approved") {
              approveOrder(change)
            }
          }

        });
      });

//

//

    db.collection("OrdersRestaurent").doc(email).collection("Pending")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            //console.log(change.doc.data().Status);
            if (change.doc.data().Status == "Approved") {
              approveOrder(change)
            }
          }


          if (change.type === "modified") {
            //console.log(change.doc.data().Status);
            if (change.doc.data().Status == "Delivered") {
              deliveredOrder(change)
            }
          }
        });
      });
//

//
    db.collection("OrdersRestaurent").doc(email).collection("Pending")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            //console.log(change.doc.data().Status);
            if (change.doc.data().Status == "Delivered") {
              deliveredOrder(change)
            }
          }
        });
      });

  }
});

//




//

const td = () => {
  tableCol = document.createElement("td");
};

//

//
const tr = () => {
  tableRow = document.createElement("tr")
}
//

//
const drawTable = (e, ...time) => {
  let div = document.getElementById(e);

  let headingForTable = [

    "Dish",
    "Category",
    "Prize Per Dish",
    "Quantity",
    "From",
    "Ordered Time",
    ...time
  ];

  table = document.createElement("table");

  tr();

  for (let i = 0; i < headingForTable.length; i++) {
    const tableHead = document.createElement("th");
    tableHead.innerText = headingForTable[i];
    tableRow.appendChild(tableHead);
  }

  table.appendChild(tableRow);

  div.appendChild(table)

};



//Flags
pendingHead = true;
pendingTable = true;
approvedTable = true;
approvedHead = true;
deliveredHead = true;
deliveredTable = true;
//Flags



const getData = (change) => {

  tr()

  td()
  tableCol.innerText = change.doc.data().OrderName;
  tableRow.appendChild(tableCol)

  td()
  tableCol.innerText = change.doc.data().Category;
  tableRow.appendChild(tableCol)

  td()
  tableCol.innerText = change.doc.data().PrizePerOrder;
  tableRow.appendChild(tableCol)

  td()
  tableCol.innerText = change.doc.data().Quantity;
  tableRow.appendChild(tableCol)

  td()
  tableCol.innerText = change.doc.data().user;
  tableRow.appendChild(tableCol)

  td()
  tableCol.innerText = change.doc.data().Ordertime;
  tableRow.appendChild(tableCol)

}

const getPendingData = (change) => {


  if (pendingHead) {
    pendingHead = false;
    drawTable("pending")
  }

  getData(change)


  td()
  tableCol.setAttribute("id", "b")
  delOrder = document.createElement("button")
  delOrder.setAttribute("class", "btn btn-sm btn-danger")
  delOrder.innerText = "Cancel Order"
  tableCol.appendChild(delOrder)
  delOrder.addEventListener("click", function () {
    toremove = this.parentElement.parentElement;
    removeOrder(change)
  })
  tableRow.appendChild(tableCol)


  td()
  tableCol.setAttribute("id", "b")
  let appOrder = document.createElement("button")
  appOrder.setAttribute("class", "btn btn-sm btn-primary b")
  appOrder.innerText = "Approve Order"

  appOrder.addEventListener("click", function () {


    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let appNow = new Date()
        let appDate = appNow.toLocaleDateString();
        let appTime = appNow.toLocaleTimeString();
        let appToday = `${appDate} ${appTime}`;

        db.collection("OrdersRestaurent").doc(email).collection("Pending").doc(change.doc.id).update({

            Status: "Approved",
            OrderApp: appToday

          })
          .then(() => {

            db.collection("OrdersRestaurent").doc(email).collection("Pending").doc(change.doc.id).get().then((doc) => {
              if (doc.exists) {
                let from = doc.data().user

                db.collection("OrdersClients").doc(from).collection("Pending").doc(change.doc.id).update({

                    Status: "Approved",
                    OrderApp: appToday

                  })
                  .then(() => {
                    alert("Order Approved!");
                    toremove = this.parentElement.parentElement;
                    toremove.remove()
                  });


              } else {
                //console.log("No such document!");
              }
            }).catch((error) => {
              //console.log("Error getting document:", error);
            });



          });


      }
    });





  })

  tableCol.appendChild(appOrder)
  tableRow.appendChild(tableCol)

  let pendingDiv = document.getElementById("pending")
  //console.log(pendingDiv.children[1])
  pendingDiv.children[1].append(tableRow)

}

const removeOrder = (change) => {


  const user = firebase.auth().currentUser;
  if (user) {
    email = user.email;
    //console.log(email)

    db.collection("OrdersRestaurent").doc(email).collection("Pending").doc(change.doc.id).delete()
      .then(() => {

        let from = change.doc.data().user

        db.collection("OrdersClients").doc(from).collection("Pending").doc(change.doc.id).delete()
          .then(() => {
            alert("Document successfully deleted!");
            toremove.remove()

          })
          .catch((error) => {
            //console.error("Error removing document: ", error);
          });
      })
      .catch((error) => {
        //console.error("Error removing document: ", error);
      });

  }


}





const approveOrder = (change) => {

  if (approvedHead) {
    approvedHead = false;
    drawTable("approved", "Approved Time")
  }

  getData(change)

  td()
  tableCol.innerText = change.doc.data().OrderApp;
  tableRow.appendChild(tableCol)


  td()
  tableCol.setAttribute("id", "b")
  delOrder = document.createElement("button")
  delOrder.setAttribute("class", "btn btn-sm btn-danger")
  delOrder.innerText = "Cancel Order"
  tableCol.appendChild(delOrder)
  delOrder.addEventListener("click", function () {
    toremove = this.parentElement.parentElement;
    removeOrder(change)
  })
  tableRow.appendChild(tableCol)



  td()
  tableCol.setAttribute("id", "b")
  let appOrder = document.createElement("button")
  appOrder.setAttribute("class", "btn btn-sm btn-warning b")
  appOrder.innerText = "Delivered Order"
  appOrder.addEventListener("click", function () {



    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let deliNow = new Date()
        let deliDate = deliNow.toLocaleDateString();
        let deliTime = deliNow.toLocaleTimeString();
        let deliToday = `${deliDate} ${deliTime}`;

        db.collection("OrdersRestaurent").doc(email).collection("Pending").doc(change.doc.id).update({

            Status: "Delivered",
            OrderDeliverd: deliToday

          })
          .then(() => {

            db.collection("OrdersRestaurent").doc(email).collection("Pending").doc(change.doc.id).get().then((doc) => {
              if (doc.exists) {
                let from = doc.data().user

                db.collection("OrdersClients").doc(from).collection("Pending").doc(change.doc.id).update({

                    Status: "Delivered",
                    OrderDeliverd: deliToday

                  })
                  .then(() => {
                    alert("Order Approved!");
                    toremove = this.parentElement.parentElement;
                    toremove.remove()
                  });


              } else {
                //console.log("No such document!");
              }
            }).catch((error) => {
              //console.log("Error getting document:", error);
            });



          });


      }
    });


   


  })
  tableCol.appendChild(appOrder)
  tableRow.appendChild(tableCol)



    approvedDiv = document.getElementById("approved");
    //console.log(approvedDiv.children[1])
    approvedDiv.children[1].append(tableRow)




}



























deliveredTable = true;
const deliveredOrder = (change) => {


  if (deliveredHead) {
    deliveredHead = false;
    drawTable("delivered", "Approved Time ", "Delivered Time")
  }


  getData(change)

  td()
  tableCol.innerText = change.doc.data().OrderApp;
  tableRow.appendChild(tableCol)

  td()
  tableCol.innerText = change.doc.data().OrderDeliverd;
  tableRow.appendChild(tableCol)


  let deliDiv = document.getElementById("delivered");



//console.log(deliDiv.children[1])
deliDiv.children[1].append(tableRow)

}
