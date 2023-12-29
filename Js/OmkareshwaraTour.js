// timeclock
window.onload = function () {

  setInterval(() => {
      var dt = new Date();
      document.getElementById("time").innerHTML = dt.toLocaleTimeString();
  }, 0)
}





// omkarshwarTour
window.onload = function () { 
  omkarshwarTour();
}


function omkarshwarTourDownload() {

  var table2excel = new Table2Excel();
  table2excel.export(document.querySelectorAll("table.api-data-convert05"));
    
}
function omkarshwarTour() {
  OmkareshwaraTable();


  fetch(`${baseURL}/booking/getAllUjjainiBookings`)
      .then(res => res.json())
      .then(json => {
          console.log(json.data)

          // document.getElementsByClassName('omkarshawar_rup')[0].innerText = json.data.total;
          document.getElementsByClassName('omkarshawar_rup1')[0].innerText = json.data.available;
          document.getElementsByClassName('omkarshawar_rup2')[0].innerText = json.data.occupied;
          document.getElementsByClassName('omkarshawar_rup3')[0].innerText = json.data.reserved;

          document.getElementsByClassName('omkarshawar_rupee')[0].innerText = json.data.byCash;
          document.getElementsByClassName('omkarshawar_rupee1')[0].innerText = json.data.byOnline;

      });





  
}
function omkarshawar_aprve4() {
  document.getElementById("omkarshawar_statusCell2").innerText = "Allocated";
  document.getElementById("omkarshawar_statusCell2").style.color = "#00bf4c";
  document.getElementById("omkarshawar_act2").style.display = "none";
}

function omkarshawar_rect4() {
  document.getElementById("omkarshawar_statusCell2").innerText = "Rejected";
  document.getElementById("omkarshawar_statusCell2").style.color = "#ff0000";
  document.getElementById("omkarshawar_act2").style.display = "none";
}

function omkarshawar_approve4() {
  document.getElementById("omkarshawar_statusCell4").innerText = "Allocated";
  document.getElementById("omkarshawar_statusCell4").style.color = "#00bf4c";
  document.getElementById("omkarshawar_act4").style.display = "none";
}

function omkarshawar_reject4() {
  document.getElementById("omkarshawar_statusCell4").innerText = "Rejected";
  document.getElementById("omkarshawar_statusCell4").style.color = "#ff0000";
  document.getElementById("omkarshawar_act4").style.display = "none";
}


async function OmkareshwaraTable() {

  document.getElementById("loader_omkareshwara").style.display = "block";
  document.getElementById("Omkarshwar").style.opacity = "0";
  try {
      const response = await fetch(`${baseURL}/admin/api/ujjain/allBookings`);
      const data = await response.json();
      console.log(data)


      let table = '<table class="api-data-convert05"><thead>';
      table += '<tr><th class="ujjain_left">S.No</th><th >User Name</th><th>Mobile Number</th><th>Places</th><th>Price( &#8377 )</th><th>Status</th><th>Response</th></tr>';
      let i = 1;
      data.data.forEach(item => {
          let button = "";
          if (item.status == "Waiting to Respond") {
              button = ` <button class="approve" onclick="omkarshawar_aprve4(${item.id})">Approve </button>
      <button class="reject" onclick="omkarshawar_rect4(${item.id})">Reject</button>`;
          }

          // let members = 0
          // if (item.hotels.length > 0) {
          //     members = item.hotels[0].totalPerson
          // }

          table += `<tbody><tr><td>${i}</td><td>${item.name}</td><td>${item.mobileNumber}</td><td>${item.data.totalujjainguides}</td><td>${item.price+".00"}</td><td style="color:${item.status === "Allocated" ? "green" : item.status === "Rejected" ? "red" : "orange"};">${item.status}</td><td id="omkarshawar_act2" >${button}</td></tr></tbody>`;
          i++;
      });
      document.getElementsByClassName('omkarshawar_rup')[0].innerText = data.data.length;
      table += '</thead ></table>';
      let x = document.getElementById('omkareshwaraDiv');
      x.innerHTML = table;

      document.getElementById("loader_omkareshwara").style.display = "none";
      document.getElementById("Omkarshwar").style.opacity = "10";
  } catch (error) {
      console.error(error);
  }
}

async function omkarshawar_aprve4(id) {
  try {
      const response = await fetch(`${baseURL}/admin/api/omkareshwar/approve/` + id, {
          method: 'PUT',
          headers: {
              'Content-type': 'application/json'
          },
      });
      const data = await response.json();
      if (data.data != undefined) {
          OmkareshwaraTable();
      }


  } catch (error) {
      console.error(error);
  }
}

async function omkarshawar_rect4(id) {
  try {
      const response = await fetch(`${baseURL}/admin/api/omkareshwar/reject/` + id, {
          method: 'PUT',
          headers: {
              'Content-type': 'application/json'
          },
      });
      const data = await response.json();
      if (data.data != undefined) {
          OmkareshwaraTable();
      }


  } catch (error) {
      console.error(error);
  }
}

