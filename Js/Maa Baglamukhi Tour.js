//   maaBaglamukkiTour
window.onload = function () { 
  maaBaglamukkiTour() ;
}

// maaBaglamukhi download download button

function maaBaglamukhiDownload() {

  var table2excel = new Table2Excel();
  table2excel.export(document.querySelectorAll("table.api-data-convert06"));
    
}


function maaBaglamukkiTour() {


  maaBaglamukhiTable();


  fetch(`${baseURL}/booking/getAllUjjainiBookings`)
      .then(res => res.json())
      .then(json => {
          console.log(json.data)

          // document.getElementsByClassName('Maa_baglamukki_rup')[0].innerText = json.data.total;
          document.getElementsByClassName('Maa_baglamukki_rup1')[0].innerText = json.data.available;
          document.getElementsByClassName('Maa_baglamukki_rup2')[0].innerText = json.data.occupied;
          document.getElementsByClassName('Maa_baglamukki_rup3')[0].innerText = json.data.reserved;

          document.getElementsByClassName('Maa_baglamukki_rupee')[0].innerText = json.data.byCash;
          document.getElementsByClassName('Maa_baglamukki_rupee1')[0].innerText = json.data.byOnline;

      });



 


  
}
function Maa_baglamukki_aprve4() {
  document.getElementById("Maa_baglamukki_statusCell2").innerText = "Allocated";
  document.getElementById("Maa_baglamukki_statusCell2").style.color = "#00bf4c";
  document.getElementById("Maa_baglamukki_act2").style.display = "none";
}

function Maa_baglamukki_rect4() {
  document.getElementById("Maa_baglamukki_statusCell2").innerText = "Rejected";
  document.getElementById("Maa_baglamukki_statusCell2").style.color = "#ff0000";
  document.getElementById("Maa_baglamukki_act2").style.display = "none";
}

function Maa_baglamukki_approve4() {
  document.getElementById("Maa_baglamukki_statusCell4").innerText = "Allocated";
  document.getElementById("Maa_baglamukki_statusCell4").style.color = "#00bf4c";
  document.getElementById("Maa_baglamukki_act4").style.display = "none";
}

function Maa_baglamukki_reject4() {
  document.getElementById("Maa_baglamukki_statusCell4").innerText = "Rejected";
  document.getElementById("Maa_baglamukki_statusCell4").style.color = "#ff0000";
  document.getElementById("Maa_baglamukki_act4").style.display = "none";
}


async function  maaBaglamukhiTable() {

  document.getElementById("loader_MaaBaglamukhi").style.display = "block";
  document.getElementById("Maa").style.opacity = "0";
  try {
      const response = await fetch(`${baseURL}/admin/api/maaBaglamukhi/allBookings`);
      const data = await response.json();
      console.log(data)


      let table = '<table class="api-data-convert06"><thead>';
      table += '<tr><th class="ujjain_left">S.No</th><th >User Name</th><th>Mobile Number</th><th>Places</th><th>Price( &#8377 )</th><th>Status</th><th>Response</th></tr>';
      let i = 1;
      data.data.forEach(item => {
          let button = "";
          if (item.status == "Waiting to Respond") {
              button = ` <button class="approve" onclick="Maa_baglamukki_aprve4(${item.id})">Approve </button>
      <button class="reject" onclick="Maa_baglamukki_rect4(${item.id})">Reject</button>`;
          }

          table += `<tbody><tr><td>${i}</td><td>${item.name}</td><td>${item.mobileNumber}</td><td>${item.data.totalujjainguides}</td><td>${item.price+".00"}</td><td style="color:${item.status === "Allocated" ? "green" : item.status === "Rejected" ? "red" : "orange"};">${item.status}</td><td id="Maa_baglamukki_act2" >${button}</td></tr></tbody>`;
          i++;
      });
      document.getElementsByClassName('Maa_baglamukki_rup')[0].innerText = data.data.length;
      table += '</thead ></table>';
      let x = document.getElementById('maabaglamukhidiv');
      x.innerHTML = table;

      document.getElementById("loader_MaaBaglamukhi").style.display = "none";
      document.getElementById("Maa").style.opacity = "10";
  } catch (error) {
      console.error(error);
  }
}

async function Maa_baglamukki_aprve4(id) {
  try {
      const response = await fetch(`${baseURL}/admin/api/maaBaglamukhi/approve/` + id, {
          method: 'PUT',
          headers: {
              'Content-type': 'application/json'
          },
      });
      const data = await response.json();
      if (data.data != undefined) {
          maaBaglamukhiTable();
      }


  } catch (error) {
      console.error(error);
  }
}

async function Maa_baglamukki_rect4(id) {
  try {
      const response = await fetch(`${baseURL}/admin/api/maaBaglamukhi/reject/` + id, {
          method: 'PUT',
          headers: {
              'Content-type': 'application/json'
          },
      });
      const data = await response.json();
      if (data.data != undefined) {
          maaBaglamukhiTable();
      }


  } catch (error) {
      console.error(error);
  }
}

