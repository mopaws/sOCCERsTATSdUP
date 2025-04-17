@@ -1,134 +1,107 @@
//Set up local storage login stuff if it hasn't already been created for the current user.
if(! localStorage.getItem("save")){
  localStorage.setItem("save", false);
}

function generateSignInRequest(name, password){
  let box = document.getElementById("keepLogin");
  fetch("http://127.0.0.1:5000/getUser/" + name +"/"+password)
  .then(response => response.json())
  .then(data => {
      console.log(data["good"])
      if(data["good"]){


        localStorage.setItem("save login", box.checked);
        if(box.checked){

          localStorage.setItem("user", name);
          localStorage.setItem("pass", password);
        } else {
          if(localStorage.getItem("user")){
            localStorage.removeItem("user");
          }
          if(localStorage.getItem("pass")){
            localStorage.removeItem("pass");
          } 
        } 
        loadPage(true);
      }
  })
  .catch(error => console.error('Error:', error));
}

//creates a non admin account
function createNewUser(name, password){

  fetch("http://127.0.0.1:5000/addUser/" + name + "/" +password)
  .then(response => response.json())
  .then(data => {
    
      if(data[0] == 'inserted data'){
        console.log("new user created succesfully");
      }
  })
  .catch(error => console.error('Error:', error));







}

function addStatType(name, tnum, tplayer, tnote){
  fetch("http://127.0.0.1:5000/newStat/" + name + "/" + tnum + "/" + tplayer + "/" + tnote)
   .then(response => response.json())
   .then(data => {
     console.log(data);
   })
   .catch(error => console.error('Error:', error));
 }

function addOpp(name){
  fetch("http://127.0.0.1:5000/addOpp/"+name)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => console.error('Error:', error));
  let table = document.getElementById("trackedOpponents").getElementsByTagName('tbody')[0];
  getOpps(table);
}

function getStatTypes(){
  fetch("http://127.0.0.1:5000/stats")
  .then(response => response.json())
  .then(data => {
    return data;
  })
  .catch(error => console.error('Error:', error));
}

function removeFromTracked(id){
  fetch("http://127.0.0.1:5000/removeStat/"+id)
  .then(response => response.json())
  .then(data => {
    console.log("deleated " + id);
  })
  .catch(error => console.error('Error:', error));
}

function removeOppFromData(id){
  fetch("http://127.0.0.1:5000/removeOpp/"+id)
  .then(response => response.json())
  .then(data => {
    console.log("deleted " + id);
  })
  .catch(error => console.error('Error:', error));
}

function subfinalData(id){
  fetch("http://127.0.0.1:5000/subtractStat/" + id)
  .then(response => response.json())
  .then(data => {
      if(data['data'] == true){
        console.log(" subbed from stat ");
      }
      else{
        console.log("failed");
      }
  })
  .catch(error => console.error('Error:', error));
}

function addfinalData(stat, game, num, player, note){
  fetch("http://127.0.0.1:5000/addGeneralStat/" + stat + "/" +game+ "/"+ num + "/"+player + "/"+note)
  .then(response => response.json())
  .then(data => {
    
      if(data['data'] == true){
        console.log("done");
      }
      else{
        console.log("failed");
      }
  })
  .catch(error => console.error('Error:', error));
}

//For populating the Opponents in the NewGame popup
function popOppSelect(selectId) {
  fetch("http://127.0.0.1:5000/opponents")
  .then(response => response.json())
  .then(data => {
    selectId.innerHTML = "";
    for(let i = 0; i < data.length; i++){
      let opt = document.createElement("option")
      opt.value = data[i][1]; //name
      opt.innerHTML = data[i][1];
      selectId.appendChild(opt)
    }
  })
}
