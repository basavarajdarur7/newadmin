// timeclock
window.onload = function () {

  setInterval(() => {
      var dt = new Date();
      document.getElementById("time").innerHTML = dt.toLocaleTimeString();
  }, 0)
}








window.onload = function () { 
  shopping() ;


  console.log(baseURL);

}


// shopping download download button

function shoppingDownload() {

  var table2excel = new Table2Excel();
  table2excel.export(document.querySelectorAll("table.api-data-convert09"));
    
}

function shopping() {

  ShoppingTable()

  fetch(`${baseURL}/booking/getAllShopBookings`)

      .then(res => res.json())
      .then(json => {
          console.log(json.data)

          // document.getElementsByClassName('shopping_rup')[0].innerText = json.data.total;
          document.getElementsByClassName('shopping_rup1')[0].innerText = json.data.available;
          document.getElementsByClassName('shopping_rup2')[0].innerText = json.data.occupied;
          document.getElementsByClassName('shopping_rup3')[0].innerText = json.data.reserved;

          document.getElementsByClassName('shopping_rupee')[0].innerText = json.data.byCash;
          document.getElementsByClassName('shopping_rupee1')[0].innerText = json.data.byOnline;
      });



 






  
}



function shopping_ap1() {
  document.getElementById("shopping_statusCell2").innerText = "Allocated";
  document.getElementById("shopping_statusCell2").style.color = "#00bf4c";
  document.getElementById("shopping_act2").style.display = "none";
}

function shopping_re1() {
  document.getElementById("shopping_statusCell2").innerText = "Rejected";
  document.getElementById("shopping_statusCell2").style.color = "#ff0000";
  document.getElementById("shopping_rides_act2").style.display = "none";
}

function shopping_approve4() {
  document.getElementById("shopping_statusCell4").innerText = "Allocated";
  document.getElementById("shopping_statusCell4").style.color = "#00bf4c";
  document.getElementById("shopping_act4").style.display = "none";
}

function shopping_reject4() {
  document.getElementById("shopping_statusCell4").innerText = "Rejected";
  document.getElementById("shopping_statusCell4").style.color = "#ff0000";
  document.getElementById("shopping_act4").style.display = "none";
}


async function  ShoppingTable() {

  document.getElementById("loader_Shopping").style.display = "block";
  try {
      const response = await fetch(`${baseURL}/admin/api/shop/allBookings`);
      const data = await response.json();
      console.log(data)

      let table = '<table class="api-data-convert09"><thead>';
      table += '<tr><th class="airport_rides_left">S.No</th><th >User Name</th><th>Mobile Number</th><th>Order Number</th><th>items</th><th>Price( &#8377 )</th><th>Status</th><th>Response</th></tr>';
      let i = 1;
      data.forEach(item => {
          let button = "";
          if (item.status == "Waiting to Respond") {
              button = ` <button class="approve" onclick="shopping_ap1(${item.id})">Approve </button>
     <button class="reject" onclick="shopping_re1(${item.id})">Reject</button>`;
          }

          table += `<tbody><tr><td>${i}</td><td>${item.name}</td><td>${item.mobileNumber}</td><td>${item.orderNumber}</td><td>${item.items}</td><td>${item.totalPrice+".00"}</td><td style="color:${item.status === "Allocated" ? "green" : item.status === "Rejected" ? "red" : "orange"};">${item.status}</td><td  id="shopping_act2" >${button}</></tr></tbody>`;
          i++;
      });
      document.getElementsByClassName('shopping_rup')[0].innerText = data.length;
      table += '</thead ></table>';
      let x = document.getElementById('ShoppingDiv');
      x.innerHTML = table;
      document.getElementById("loader_Shopping").style.display = "none";
  } catch (error) {
      console.error(error);
  }
}

async function shopping_ap1(id) {
  try {
      const response = await fetch(`${baseURL}/admin/api/shop/approve/` + id, {
          method: 'PUT',
          headers: {
              'Content-type': 'application/json'
          },
      });
      const data = await response.json();
      if (data.data != undefined) {
          ShoppingTable();
      }


  } catch (error) {
      console.error(error);
  }
}



async function shopping_re1(id) {
  try {
      const response = await fetch(`${baseURL}/admin/api/shop/reject/` + id, {
          method: 'PUT',
          headers: {
              'Content-type': 'application/json'
          },
      });
      const data = await response.json();
      if (data.data != undefined) {
          ShoppingTable();
      }


  } catch (error) {
      console.error(error);
  }
}
