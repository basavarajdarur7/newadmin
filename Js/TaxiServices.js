// timeclock
window.onload = function () {

    setInterval(() => {
        var dt = new Date();
        document.getElementById("time").innerHTML = dt.toLocaleTimeString();
    }, 0)
}






//    taxiServices
window.onload = function () { 
  taxiServices() ;
}

// TaxiService download download button

function taxiServiceDownload() {

    var table2excel = new Table2Excel();
    table2excel.export(document.querySelectorAll("table.api-data-convert07"));
      
}

function taxiServices() {
  
  TaxiServiceTable();
  fetch(`${baseURL}/booking/getAllTaxiBookings`)
      .then(res => res.json())
      .then(json => {
          console.log(json.data)

          // document.getElementsByClassName('taxi_services_rup')[0].innerText = json.data.total;
          document.getElementsByClassName('taxi_services_rup1')[0].innerText = json.data.available;
          document.getElementsByClassName('taxi_services_rup2')[0].innerText = json.data.occupied;
          document.getElementsByClassName('taxi_services_rup3')[0].innerText = json.data.reserved;

          document.getElementsByClassName('taxi_services_rupee')[0].innerText = json.data.byCash;
          document.getElementsByClassName('taxi_services_rupee1')[0].innerText = json.data.byOnline;
      });








 

}

function taxi_services_approve4() {
  document.getElementById("taxi_services_statusCell4").innerText = "Allocated";
  document.getElementById("taxi_services_statusCell4").style.color = "#00bf4c";
  document.getElementById("taxi_services_act4").style.display = "none";
}

function taxi_services_reject4() {
  document.getElementById("taxi_services_statusCell4").innerText = "Rejected";
  document.getElementById("taxi_services_statusCell4").style.color = "#ff0000";
  document.getElementById("taxi_services_act4").style.display = "none";
}


async function TaxiServiceTable() {
  console.log("taxies");

  document.getElementById("loader_Taxi").style.display = "block";
  document.getElementById("Taxi").style.opacity = "0";
  try {
      const response = await fetch(`${baseURL}/taxiService/getAllTaxi`);
      const data = await response.json();
      console.log(data)
     
      document.getElementById("loader_Taxi").style.display = "none";
      document.getElementById("Taxi").style.opacity = "10";

      let table = '<div class="room1" ><table class="api-data-convert07"><thead>';
      table += '<tr><th class="airport_rides_left">S.No</th><th >User Name</th><th>From</th><th >To</th><th>Mobile Number</th><th>Members</th><th>Price(&#8377)</th><th>Status</th><th>Response</th></tr></thead>';
      let i = 1;
      data.data.forEach(item => {
          let button = "";
          if (item.status == "Waiting to Respond") {
              button = ` <button class="approve" onclick="taxi_services_aprve4(${item.id})">Approve </button>
                             <button class="reject" onclick="taxi_services_reject4(${item.id})">Reject</button>`;
          }

          table += `<tbody><tr><td>${i}</td><td>${item.userName}</td><td>${item.fromLocation}</td><td>${item.toLocation}</td><td>${item.mobileNo}</td><td>${3}</td><td>${item.totalFare+".00"}</td><td style="color:${item.status === "Allocated" ? "green" : item.status === "Rejected" ? "red" : "orange"};">${item.status}</td><td id="taxi_services_act2" >${button}</td></tr></tbody>`;
          i++;
      });
      document.getElementsByClassName('taxi_services_rup')[0].innerText = data.data.length;
      table += '</table></div>';
      let x = document.getElementById('taxiservicediv');
      x.innerHTML = table;

  } catch (error) {
      console.error(error);
  }
}

async function taxi_services_aprve4(id) {
  try {
      const response = await fetch(`${baseURL}/taxiService/approve/` + id, {
          method: 'PUT',
          headers: {
              'Content-type': 'application/json'
          },
      });
      const data = await response.json();
      if (data.data != undefined) {
          TaxiServiceTable();
      }


  } catch (error) {
      console.error(error);
  }
}



async function taxi_services_reject4(id) {
  try {
      const response = await fetch(`${baseURL}/taxiService/reject/` + id, {
          method: 'PUT',
          headers: {
              'Content-type': 'application/json'
          },
      });
      const data = await response.json();
      if (data.data != undefined) {
          TaxiServiceTable();
      }


  } catch (error) {
      console.error(error);
  }
}

