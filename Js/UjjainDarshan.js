
// timeclock
window.onload = function () {

  setInterval(() => {
      var dt = new Date();
      document.getElementById("time").innerHTML = dt.toLocaleTimeString();
  }, 0)
}




//    ujjainDarshan
window.onload = function () { 
  ujjainDarshan();
}



function ujjainDownload() {

  var table2excel = new Table2Excel();
  table2excel.export(document.querySelectorAll("table.api-data-convert04"));
    
}

function ujjainDarshan() {

  ujjainTable();
  
  fetch(`${baseURL}/booking/getAllUjjainiBookings`)
      .then(res => res.json())
      .then(json => {
          console.log(json.data)

          // document.getElementsByClassName('ujjain_rup')[0].innerText = json.data.total;
          document.getElementsByClassName('ujjain_rup1')[0].innerText = json.data.available;
          document.getElementsByClassName('ujjain_rup2')[0].innerText = json.data.occupied;
          document.getElementsByClassName('ujjain_rup3')[0].innerText = json.data.reserved;

          document.getElementsByClassName('ujjain_rupee')[0].innerText = json.data.byCash;
          document.getElementsByClassName('ujjain_rupee1')[0].innerText = json.data.byOnline;

      });





  
}
function ujjain_aprve4() {
  document.getElementById("ujjain_statusCell2").innerText = "Allocated";
  document.getElementById("ujjain_statusCell2").style.color = "#00bf4c";
  document.getElementById("ujjain_act2").style.display = "none";
}

function ujjain_rect4() {
  document.getElementById("ujjain_statusCell2").innerText = "Rejected";
  document.getElementById("ujjain_statusCell2").style.color = "#ff0000";
  document.getElementById("ujjain_act2").style.display = "none";
}

function ujjain_approve4() {
  document.getElementById("ujjain_statusCell4").innerText = "Allocated";
  document.getElementById("ujjain_statusCell4").style.color = "#00bf4c";
  document.getElementById("ujjain_act4").style.display = "none";
}

function ujjain_reject4() {
  document.getElementById("ujjain_statusCell4").innerText = "Rejected";
  document.getElementById("ujjain_statusCell4").style.color = "#ff0000";
  document.getElementById("ujjain_act4").style.display = "none";
}



async function ujjainTable() {


  document.getElementById("loader_ujjain").style.display = "block";
  document.getElementById("Ujjain").style.opacity = "0";
  try {
      const response = await fetch(`${baseURL}/admin/api/ujjain/allBookings`);
      const data = await response.json();
      console.log(data)


      let table = '<table class="api-data-convert04"><thead>';
      table += '<tr><th class="ujjain_left">S.No</th><th >User Name</th><th>Mobile Number</th><th>Places</th><th>Price( &#8377 )</th><th>Status</th><th>Response</th></tr>';
      let i = 1;
      data.data.forEach(item => {
          let button = "";
          if (item.status == "Waiting to Respond") {
              button = ` <button class="approve" onclick="ujjain_aprve4(${item.id})">Approve </button>
      <button class="reject" onclick="ujjain_rect4(${item.id})">Reject</button>`;
          }

          // let members = 0
          // if (item.hotels.length > 0) {
          //     members = item.hotels[0].totalPerson
          // }

          table += `<tbody><tr><td>${i}</td><td>${item.name}</td><td>${item.mobileNumber}</td><td onmouseover="clickplace3()" onmouseout="packageDiv3()">${3}</td><td>${item.price+".00"}</td><td style="color:${item.status === "Allocated" ? "green" : item.status === "Rejected" ? "red" : "orange"};">${item.status}</td><td id="ujjain_act2" >${button}</td></tr></tbody>`;
          i++;
      });
      document.getElementsByClassName('ujjain_rup')[0].innerText = data.data.length;
      table += '</thead ></table>';
      let x = document.getElementById('ujjainDiv');
      x.innerHTML = table;

      document.getElementById("loader_ujjain").style.display = "none";
      document.getElementById("Ujjain").style.opacity = "10";
  } catch (error) {
      console.error(error);
  }
}





async function ujjain_aprve4(id) {
  try {
      const response = await fetch(`${baseURL}/admin/api/ujjain/approve/` + id, {
          method: 'PUT',
          headers: {
              'Content-type': 'application/json'
          },
      });
      const data = await response.json();
      if (data.data != undefined) {
          ujjainTable();
      }


  } catch (error) {
      console.error(error);
  }
}

async function ujjain_rect4(id) {
  try {
      const response = await fetch(`${baseURL}/admin/api/ujjain/reject/` + id, {
          method: 'PUT',
          headers: {
              'Content-type': 'application/json'
          },
      });
      const data = await response.json();
      if (data.data != undefined) {
          ujjainTable();
      }


  } catch (error) {
      console.error(error);
  }
}


// ujjainDarshanpapupcode

// function clickplace(){
//   document.getElementById('PlaceDiv').style.display='block'
// }

// function packageDiv(){
//   document.getElementById('PlaceDiv').style.display='none'
// }

// // seconddiv


// function clickplace1(){
//   document.getElementById('PlaceDiv1').style.display='block'
// }

// function packageDiv1(){
//   document.getElementById('PlaceDiv1').style.display='none'
// }

// // 3rddiv

// function clickplace2(){
//   document.getElementById('PlaceDiv2').style.display='block'
// }

// function packageDiv2(){
//   document.getElementById('PlaceDiv2').style.display='none'
// }

// // 4thdiv


function clickplace3(){
  document.getElementById('PlaceDiv3').style.display='block'
}

function packageDiv3(){
  document.getElementById('PlaceDiv3').style.display='none'
}



// Maa_baglamukkipapup

// function maaBaglamukki(){
//   document.getElementById('baglamukhiDiv').style.display='block'
// }

function packagemaaDiv(){
  document.getElementById('baglamukhiDiv').style.display='none'
}

// seconddiv


function maaBaglamukkiTour1(){
  document.getElementById('baglamukhiDiv1').style.display='block'
  
}

function packagemaaDiv1(){
  document.getElementById('baglamukhiDiv1').style.display='none'
}

// 3rddiv

function maaBaglamukkiTour2(){
  document.getElementById('baglamukhiDiv2').style.display='block'
}

function packagemaaDiv2(){
  document.getElementById('baglamukhiDiv2').style.display='none'
}

// 4thdiv


function maaBaglamukkiTour3(){
  document.getElementById('baglamukhiDiv3').style.display='block'
}

function packagemaaDiv3(){
  document.getElementById('baglamukhiDiv3').style.display='none'
}