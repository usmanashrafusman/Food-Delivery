let url = window.location.href.split('=')[1];

//console.log(url)

let docRef = db.collection("Restaurent").doc(url);

docRef.get().then((doc) => 
{

  if (doc.exists)
   {

    db.collection("Restaurent").doc(url).collection("Dishes").get()
      .then(querySnapshot =>
         {
        querySnapshot.forEach((doc) => 
        {
          callResturant(doc)
          //console.log(doc.data())
        })
      }).catch((error) =>
       {
        //console.log("Error getting document:", error);
      });


  } else {
    document.write("<h1>No such restaurant</h1>");
  }
}).catch((error) => {
  //console.log("Error getting document:", error);
});


const callResturant = (doc) => {
  let row = document.getElementsByClassName("row")[0]
  let col = document.createElement("div");
  col.setAttribute("class", "col");
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  card.setAttribute("style", "width:18rem");
  const img = document.createElement("img");
  img.setAttribute("src", doc.data().DishImg);
  img.setAttribute("class", "card-img-top");
  card.appendChild(img);
  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  const cardTitle = document.createElement("h5");
  cardTitle.innerText = doc.data().DishName;
  cardBody.appendChild(cardTitle);
  const cardLink = document.createElement("p");
  cardLink.setAttribute("class", "btn btn-warning");
  cardLink.innerText = "Price :" + doc.data().DishPrize;
  const breakRow = document.createElement("br")
  const buy = document.createElement("button")
  buy.innerText = "Buy"
  buy.setAttribute("class", "btn btn-success")
  let quantity = document.createElement("input")
  quantity.setAttribute("type","number")
  quantity.value=1;
  cardCat = document.createElement("p");
  cardCat.setAttribute("class", "btn btn-secondary");
  cardCat.innerText = "Category :" + doc.data().DishCat;
  cardBody.appendChild(cardLink);
  cardBody.appendChild(breakRow);
  cardBody.appendChild(buy)
  cardBody.appendChild(quantity)
  cardBody.appendChild(cardCat);
  card.appendChild(cardBody);
  cardTitle.setAttribute("class", "card-title")
  col.appendChild(card);
  row.appendChild(col);
  let every = document.createElement("div");
  every.appendChild(row)
  document.body.appendChild(row)


  const user = firebase.auth().currentUser;
  if (user) 
  {
    email = user.email;
    //console.log(email)
  }

  buy.addEventListener("click", function ()
   {
     
    const user = firebase.auth().currentUser;
    if (user)
     {
      email = user.email;
      //console.log(email)

    let now = new Date()
    let date = now.toLocaleDateString();
    let time = now.toLocaleTimeString();
    let today = `${date} ${time}`;
    let itemQuantity = quantity.value;
  
      db.collection("Restaurent").doc(url).collection("Dishes").doc(doc.id).get().then((doc) => {
        if (doc.exists) 
        {  
          //console.log("Exists")
           let dishID = doc.id
          let nameOfOrder = doc.data().DishName
          let prizeOfOrder = doc.data().DishPrize
          let catOforder = doc.data().DishCat

 let orderedFood =    {
  ID : dishID,
   OrderName : nameOfOrder,
   PrizePerOrder : prizeOfOrder,
   Category : catOforder,
   cancelOrder: true,
   Ordertime :today,
   Quantity : itemQuantity,
   Status : "Pending",
   Rest : url,
   user : email
 }
         
         db.collection("OrdersRestaurent").doc(url).collection("Pending").add(

  orderedFood 
          )  
          .then((doc) =>
          {
            let forClient = doc.id;
    //console.log(doc.id)


    db.collection("OrdersClients").doc(email).collection("Pending").doc(forClient).set(

      orderedFood 
              )  
              .then((doc) =>
              {
        //console.log("Working")
       
             }).catch((error) =>
              {
               //console.log("Error getting document:", error);
             }); 

         }).catch((error) =>
          {
           //console.log("Error getting document:", error);
         });

         
        }
    }).catch((error) => {
        //console.log("Error getting document:", error);
    });

    }
  })


}



