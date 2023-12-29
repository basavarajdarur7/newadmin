//    pujaBooking
window.onload = function () { 
  pujaBooking();
}


// // timeclock
// window.onload = function () {

//     setInterval(() => {
//         var dt = new Date();
//         document.getElementById("time").innerHTML = dt.toLocaleTimeString();
//     }, 0)
// }


// puja downloading button

function pujaDownload() {

  var table2excel = new Table2Excel();
  table2excel.export(document.querySelectorAll("table.api-data-convert03"));
    
}


function pujaBooking() {
 
  PujaBookingTable();


  fetch(`${baseURL}/booking/getAllPoojaBooking`)
      .then(res => res.json())
      .then(json => {
          console.log(json.data)

          // document.getElementsByClassName('puja_rup')[0].innerText = json.data.total;
          document.getElementsByClassName('puja_rup1')[0].innerText = json.data.available;
          document.getElementsByClassName('puja_rup2')[0].innerText = json.data.occupied;
          document.getElementsByClassName('puja_rup3')[0].innerText = json.data.reserved;

          document.getElementsByClassName('puja_rupee')[0].innerText = json.data.byCash;
          document.getElementsByClassName('puja_rupee1')[0].innerText = json.data.byOnline;

      });






 
}








function puja_aprve2() {
  document.getElementById("puja_statusCell2").innerText = "Allocated";
  document.getElementById("puja_statusCell2").style.color = " #00bf4c";
  document.getElementById("puja_act2").style.display = "none";
}

function puja_rect2() {
  document.getElementById("puja_statusCell2").innerText = "Rejected";
  document.getElementById("puja_statusCell2").style.color = "#ff0000";
  document.getElementById("puja_act2").style.display = "none";
}

function puja_approve2() {
  document.getElementById("puja_statusCell4").innerText = "Allocated";
  document.getElementById("puja_statusCell4").style.color = " #00bf4c";
  document.getElementById("puja_act4").style.display = "none";
}

function puja_reject2() {
  document.getElementById("puja_statusCell4").innerText = "Rejected";
  document.getElementById("puja_statusCell4").style.color = "#ff0000";
  document.getElementById("puja_act4").style.display = "none";

}

async function PujaBookingTable() {

  document.getElementById("loader_puja").style.display = "block";
  document.getElementById("puja").style.opacity = "0";
  try {
      const response = await fetch(`${baseURL}/admin/api/poja/allBookings`);
      const data = await response.json();
      console.log(data)


      let table = '<table class="api-data-convert03"><thead>';
      table += '<tr><th class="puja_left">S.No</th><th >User Name</th><th>Mobile Number</th><th>Price ( &#8377 )</th><th>Status</th><th>Response</th></tr>';
      let i = 1;
      data.data.forEach((item, i) => {
          let button = "";
          if (item.status == "Waiting to Respond") {
              button = ` <button class="approve" onclick="puja_aprve2(${item.id})">Approve </button>
      <button class="reject" onclick="puja_rect2(${item.id})">Reject</button>`;
          }

          // let members = 0
          // if (item.hotels.length > 0) {
          //     members = item.hotels[0].totalPerson
          // }

          table += `<tbody><tr><td>${+i}</td><td>${item.name}</td><td>${item.mobileNumber}</td><td>${item.price+".00"}</td><td style="color:${item.status === "Allocated" ? "green" : item.status === "Rejected" ? "red" : "orange"};">${item.status}</td><td id="puja_act2" >${button}</td></tr></tbody>`;
          i++;
      });
      document.getElementsByClassName('puja_rup')[0].innerText = data.data.length;
      table += '</thead ></table>';
      let x = document.getElementById('pujaDiv');
      x.innerHTML = table;

      document.getElementById("loader_puja").style.display = "none";
      document.getElementById("puja").style.opacity = "10";
  } catch (error) {
      console.error(error);
  }
}


async function puja_aprve2(id) {

  // document.getElementById("loader_pujabutton").style.display = "block";
  try {
      const response = await fetch(`${baseURL}/admin/api/poja/approve/` + id, {
          method: 'PUT',
          headers: {
              'Content-type': 'application/json'
          },
      });
      const data = await response.json();
      if (data.data != undefined) {
          PujaBookingTable();
      }
      console.log("HI THIS IS ANJU")


  } catch (error) {
      console.error(error);
  }


  // document.getElementById("loader_pujabutton").style.display = "none";
}


// document.getElementById('puja_aprve2').addEventListener('click', function() {
//     // Replace 'your_api_endpoint' with the actual URL of your API
//     fetch('http://13.200.156.231:8097/admin/api/poja/approve/', {
//       method: 'PUT', // or 'GET' depending on your API
//       headers: {
//         'Content-Type': 'application/json', // adjust based on your API's requirements
//         // Additional headers if needed
//       },
//       // Add any request body if required
//       // body: JSON.stringify({ key: 'value' }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       // Handle the API response data here
//       console.log('API response:', data);
//     })
//     .catch(error => {
//       // Handle errors
//       console.error('Error:', error);
//     });
//   });

async function puja_rect2(id) {
  try {
      const response = await fetch(`${baseURL}/admin/api/poja/reject/` + id, {
          method: 'PUT',
          headers: {
              'Content-type': 'application/json'
          },
      });
      const data = await response.json();
      if (data.data != undefined) {
          PujaBookingTable();
      }


  } catch (error) {
      console.error(error);
  }
 

  // document.getElementById("loader_pujabutton").style.display = "none";
}


