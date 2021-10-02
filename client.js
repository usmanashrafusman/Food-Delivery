
  let userArr = []
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    let email = user.email;
    userArr.push(email)

    let profPic = document.getElementById("profPic")
    let userName = document.getElementById("userName")
    let loc = document.getElementById("loc")
    let userMail = document.getElementById("userMail")
    let cont = document.getElementById("cont")

    db.collection("Clients").doc(email).get().then((doc) => {
      if (doc.exists) {

          profPic.src = doc.data().ProfilePic,
          userName.innerText = doc.data().FirstName,
          loc.innerText = doc.data().Address,
          userMail.innerText = doc.data().email,
          cont.innerText = doc.data().Contact


      } else {

        //console.log("No such document!");
      }
    }).catch((error) => {
      //console.log("Error getting document:", error);
    });


    db.collection("Restaurent").get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
            //console.log(doc.data())
          callResturant(doc)
        })
      }).catch((error) => {
        //console.log("Error getting document:", error);
      });

 



    // ...
  } else {
    //console.log("?")
 
  }
});

const callResturant = (doc) => {

    let row = document.getElementsByClassName("row")[0];

    let col = document.createElement("div");
  
    col.setAttribute("class", "col");
  
    let card = document.createElement("div");
  
    card.setAttribute("class", "card");
  
    card.setAttribute("style", "width:18rem");
  
    const img = document.createElement("img");
  
    img.setAttribute("src", doc.data().ProfilePic);
  
    img.setAttribute("class", "card-img-top");
  
    card.appendChild(img);
  
    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    const cardTitle = document.createElement("h5");
    cardTitle.innerText = doc.data().RestaurentName;
    cardBody.appendChild(cardTitle);
    const cardLink = document.createElement("p");
    cardLink.setAttribute("class", "btn btn-danger");
    cardLink.innerText = "Location :" + doc.data().Address;
    cardCat = document.createElement("p");
    cardCat.setAttribute("class", "btn btn-secondary");
    cardCat.innerText = "Email :" + doc.data().email;
    cardCont = document.createElement("p");
    cardCont.setAttribute("class", "btn btn-primary");
    cardCont.innerText = "Contact :" + doc.data().Contact;
    cardClic= document.createElement("a");
    cardClic.setAttribute("class", "btn btn-success");
    cardClic.innerText = "Open Restaurent"
    cardClic.setAttribute("href", `restaurent.html?id=${doc.id}`);
    cardBody.appendChild(cardLink);
    cardBody.appendChild(cardCat);
    cardBody.appendChild(cardCont);
    cardBody.appendChild(cardClic)
  
    card.appendChild(cardBody);
  
    cardTitle.setAttribute("class", "card-title")
  
    col.appendChild(card);
  
    row.appendChild(col);
  
    let every = document.getElementById("allRest");

    every.appendChild(row)
  }
  