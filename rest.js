let userArr = []
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    let email = user.email;
    userArr.push(email)

    let profilePic = document.getElementById("profilePic")
    let nameOfRes = document.getElementById("name")
    let resLoc = document.getElementById("resloc")
    let resMail = document.getElementById("resMail")
    let contNo = document.getElementById("contNo")
    let spec = document.getElementById("spec");

    db.collection("Restaurent").doc(email).get().then((doc) => {
      if (doc.exists) {
   
        profilePic.src = doc.data().ProfilePic,
          nameOfRes.innerText = doc.data().RestaurentName,
          resLoc.innerText = doc.data().Address,
          resMail.innerText = doc.data().email,
          contNo.innerText = doc.data().Contact,
          spec.innerText = doc.data().Speciality


      } else {

        //console.log("No such document!");
      }
    }).catch((error) => {
      //console.log("Error getting document:", error);
    });


    db.collection("Restaurent").doc(userArr[0]).collection("Dishes").get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          callResturant(doc)
          //console.log(doc.data())
        })
      }).catch((error) => {
        //console.log("Error getting document:", error);
      });


    // ...
  } else {
    //console.log("?")
    // ...
  }
});




const saveDish = () => {
  let dishName = document.getElementById("dishName").value
  let dishPrize = document.getElementById("dishPrize").value
  let dishCat = document.getElementById("cats").value

  const ref = firebase.storage().ref();
  const file = document.querySelector("#photo").files[0];
  const day = new Date()
  const name = +new Date() + "-" + file.name + "-" + day.getTime;
  const metadata = {
    contentType: file.type
  };
  const task = ref.child(name).put(file, metadata);
  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
      //console.log(url)  
    
      db.collection("Restaurent")
      .doc(userArr[0]).collection("Dishes")
      .add({
        DishName: dishName,
        DishPrize: dishPrize,
        DishCat: dishCat,
        DishImg: url
      })
  
      .then(() => {
        alert("Your Dish Is Added");
        location.reload();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  
  
    // Uploded User Information Into Firebase
    
    
    })
    .catch(console.error);



  // Uploding User Information Into Firebase



}
let savbtn = document.getElementById("savebtn");
savbtn.addEventListener("click", saveDish)



const callResturant = (doc) => {
  let row = document.getElementsByClassName("row")[0];
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
  cardLink.setAttribute("class", "btn btn-danger");
  cardLink.innerText = "Price :" + doc.data().DishPrize;
  cardCat = document.createElement("p");
  cardCat.setAttribute("class", "btn btn-secondary");
  cardCat.innerText = "Category :" + doc.data().DishCat;
  cardBody.appendChild(cardLink);
  cardBody.appendChild(cardCat);
  card.appendChild(cardBody);
  cardTitle.setAttribute("class", "card-title")
  col.appendChild(card);
  row.appendChild(col);
  let every = document.getElementById("allDishes");
  every.appendChild(row)
}


const goToDash =()=>{
  location.href="adminDash.html"
}
