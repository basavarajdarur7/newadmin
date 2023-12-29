// timeclock
window.onload = function () {

  setInterval(() => {
      var dt = new Date();
      document.getElementById("time").innerHTML = dt.toLocaleTimeString();
  }, 0)
}





window.onload = function () { 
  airportRides();
}




// airPort download download button

function airPortDownload() {

  var table2excel = new Table2Excel();
  table2excel.export(document.querySelectorAll("table.api-data-convert08"));
    
}


function airportRides() {
  Table();


  fetch(`${baseURL}/booking/getAllAirportBookings`)
      .then(res => res.json())
      .then(json => {
          console.log(json.data)

          // document.getElementsByClassName('airport_rides_rup')[0].innerText = json.data.total;
          document.getElementsByClassName('airport_rides_rup1')[0].innerText = json.data.available;
          document.getElementsByClassName('airport_rides_rup2')[0].innerText = json.data.occupied;
          document.getElementsByClassName('airport_rides_rup3')[0].innerText = json.data.reserved;

          document.getElementsByClassName('airport_rides_rupee')[0].innerText = json.data.byCash;
          document.getElementsByClassName('airport_rides_rupee1')[0].innerText = json.data.byOnline;
      });







  
}
function airport_rides_ap1() {
  document.getElementById("airport_rides_statusCell2").innerText = "Allocated";
  document.getElementById("airport_rides_statusCell2").style.color = "#00bf4c";
  document.getElementById("airport_rides_act2").style.display = "none";
}

function airport_rides_re1() {
  document.getElementById("airport_rides_statusCell2").innerText = "Rejected";
  document.getElementById("airport_rides_statusCell2").style.color = "#ff0000";
  document.getElementById("airport_rides_act2").style.display = "none";
}

function airportrides_approve4() {
  document.getElementById("airport_rides_statusCell4").innerText = "Allocated";
  document.getElementById("airport_rides_statusCell4").style.color = "#00bf4c";
  document.getElementById("airport_rides_act4").style.display = "none";
}

function airportrides_reject4() {
  document.getElementById("airport_rides_statusCell4").innerText = "Rejected";
  document.getElementById("airport_rides_statusCell4").style.color = "#ff0000";
  document.getElementById("airport_rides_act4").style.display = "none";
}


async function Table() {
  document.getElementById("loader_Airport").style.display = "block";
  try {
      const response = await fetch(`${baseURL}/airportRides/getAll`);
      const data = await response.json();
      console.log(data)


      let table = '<table class="api-data-convert08"><thead>';
      table += '<tr><th class="airport_rides_left">S.No</th><th >User Name</th><th >From</th><th >To</th><th>Mobile Number</th><th>Price( &#8377 )</th><th>Status</th><th>Response</th></tr>';
      let i = 1;
      data.data.forEach(item => {
          let button = "";
          if (item.status == "Waiting to Respond") {
              button = ` <button class="approve" onclick="airport_rides_ap1(${item.id})">Approve </button>
  <button class="reject" onclick="airport_rides_re1(${item.id})">Reject</button>`;
          }

          table += `<tbody><tr><td>${i}</td><td>${item.userName}</td><td>${item.from}</td><td>${item.to}</td><td>${item.mobileNo}</td><td>${item.totalprice+".00"}</td><td style="color:${item.status === "Allocated" ? "green" : item.status === "Rejected" ? "red" : "orange"};" >${item.status}</td><td id="airport_rides_act2" >${button}</td></tr></tbody>`;
          i++;
      });
      document.getElementsByClassName('airport_rides_rup')[0].innerText = data.data.length;
      table += '</thead ></table>';
      let x = document.getElementById('airportDiv');
      x.innerHTML = table;

      document.getElementById("loader_Airport").style.display = "none";
  } catch (error) {
      console.error(error);
  }
}


async function airport_rides_ap1(id) {
  try {
      const response = await fetch(`${baseURL}/airportRides/approve/` + id, {
          method: 'PUT',
          headers: {
              'Content-type': 'application/json'
          },
      });
      const data = await response.json();
      if (data.data != undefined) {
          // console.log("HI THIS IS ANJU")
          Table().table

      }

      // $( "#mytable" ).load( "your-current-page.html #mytable" );
  } catch (error) {
      console.error(error);
  }
}



async function airport_rides_re1(id) {
  try {
      const response = await fetch(`${baseURL}/airportRides/reject/` + id, {
          method: 'PUT',
          headers: {
              'Content-type': 'application/json'
          },
      });
      const data = await response.json();
      if (data.data != undefined) {
          Table();
      }


  } catch (error) {
      console.error(error);
  }
}





