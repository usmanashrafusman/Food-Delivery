//Array Of User Dat
let userArr = []
//Array of User Data


// SignUp For Normal User
const signUpToAdd = () => {
  location.href = "signupFoodie.html";
};

// Sign Up Page For Restaurent Owner
const signUpToAddRes = () => {
  location.href = "signupRes.html";
};

//Login For Normal User
const logIn = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userEmail = auth.currentUser.email;
      userArr.push(email)
      location.href = "userClient.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if(error.message=="The email address is badly formatted."){
        let message = document.getElementById("message")
        message.innerText="Please Enter Correct Email "
        setTimeout(function(){ message.innerText=""; }, 5000);
      }
      if(error.message=="The password is invalid or the user does not have a password."){
        let message = document.getElementById("message")
        message.innerText="Please Enter Correct Password"
        setTimeout(function(){ message.innerText=""; }, 5000);
      }

      if(error.message=="There is no user record corresponding to this identifier. The user may have been deleted."){
        let message = document.getElementById("message")
        message.innerText="Did't Find Your Account"
        setTimeout(function(){ message.innerText=""; }, 5000);
      }
  
      //console.log(errorMessage);
    });
};

//Login For Restaurent Owner
const logInRes = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
 

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userEmail = auth.currentUser.email;
      location.href = "userClientRes.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if(error.message=="The email address is badly formatted."){
        let message = document.getElementById("message")
        message.innerText="Please Enter Correct Email "
        setTimeout(function(){ message.innerText=""; }, 5000);
      }
      if(error.message=="The password is invalid or the user does not have a password."){
        let message = document.getElementById("message")
        message.innerText="Please Enter Correct Password"
        setTimeout(function(){ message.innerText=""; }, 5000);
      }

      if(error.message=="There is no user record corresponding to this identifier. The user may have been deleted."){
        let message = document.getElementById("message")
        message.innerText="Did't Find Your Account"
        setTimeout(function(){ message.innerText=""; }, 5000);
      }


      
      //console.log(errorMessage);
    });


};

// Sign Up Form For Normal User
const signup = () => {
  const email = document.getElementById("email").value.toLowerCase();
  const password = document.getElementById("password").value;
  const fName = document.getElementById("Fname").value;
  const lName = document.getElementById("Lname").value;
  const address = document.getElementById("userAddress").value;
  const contact = document.getElementById("userContact").value;
  // const profilePic = document.getElementById("userImg").value;
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
      firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        //console.log("Going")
        var user = userCredential.user;
        db.collection("Clients")
        .doc(email)
        .set({
          email: email,
          password: password,
          FirstName: fName,
          LastName : lName,
          Address: address,
          Contact: contact,
          ProfilePic: url,
        })
  
        .then(() => {
          alert("your Account Is Created");
          location.reload();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
  
      //Uploded User Information Into Firebase
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });




    })
    .catch(console.error);
  


}

// Sign Up Form For Restaurent Owner
const signupRes = () => {
  const email = document.getElementById("email").value.toLowerCase();
  const password = document.getElementById("password").value;
  const resName = document.getElementById("resName").value;
  const addressOfRes = document.getElementById("address").value;
  const contactNo = document.getElementById("contactNo").value;
  const specility = document.getElementById("Speciality").value;
  // const profPic = document.getElementById("ResImg").value;


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

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      
      // Uploding User Information Into Firebase
      db.collection("Restaurent")
        .doc(email)
        .set({
          email: email,
          password: password,
          RestaurentName: resName,
          Address: addressOfRes,
         Contact: contactNo,
          Speciality: specility,
          ProfilePic: url,
        })

        .then(() => {
          alert("your Account Is Created");
          location.reload();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      //Uploded User Information Into Firebase
    })

    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    }); })
    .catch(console.error);
};
