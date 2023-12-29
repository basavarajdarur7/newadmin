
// timeclock
window.onload = function () {

  setInterval(() => {
    var dt = new Date();
    document.getElementById("time").innerHTML = dt.toLocaleTimeString();
  }, 0)
}




//  hotelBooking
window.onload = function () {
  hotelBooking();
}


function downLoadExcel() {

  var table2excel = new Table2Excel();
  table2excel.export(document.querySelectorAll("table.api-data-convert02"));


}



function hotelBooking(condition) {
  Table(condition);


  fetch(`${baseURL}/admin/hotelBooking/getAllHotelBookings`)
    .then(res => res.json())
    .then(json => {
      console.log(json.data)
      // document.getElementsByClassName('Hotel_rup')[0].innerText = json.data.total;
      document.getElementsByClassName('Hotel_rup1')[0].innerText = json.data.available;
      document.getElementsByClassName('Hotel_rup2')[0].innerText = json.data.occupied;
      document.getElementsByClassName('Hotel_rup3')[0].innerText = json.data.reserved;

      document.getElementsByClassName('Hotel_rupee')[0].innerText = json.data.byCash;
      document.getElementsByClassName('Hotel_rupee1')[0].innerText = json.data.byOnline;
    });



  async function Table(cond) {

    // document.getElementById("loader_home").style.display = "block";

    try {
      var url;
      if (cond === "manual") {
        url = '/manualBooking/getAllManualBooking';
      } else {
        url = '/admin/hotelBooking/allHotelBookings';
      }
      const response = await fetch(`${baseURL}` + url);
      const data = await response.json();
      console.log(data)


      let table = '<table class="api-data-convert02"><thead>';
      if (cond === "manual") {
        table += '<tr><th class="Hotel_left">S.No</th><th >User Name</th><th>Mobile Number</th><th>HotelName</th><th>NumberOfAdults</th><th>NumberOfChildrens</th><th>Price(&#8377)</th></tr>';

      } else {
        table += '<tr><th class="Hotel_left">S.No</th><th >User Name</th><th>Mobile Number</th><th>HotelName</th><th>NumberOfAdults</th><th>NumberOfChildrens</th><th>Price(&#8377)</th><th>Status<th/><th>Response<th/></tr>';

      }

      let i = 1;
      data.data.reverse().forEach((item, i) => {
        let button = "";
        if (item.status == "Waiting to Respond") {
          button = ` <button class="approve" onclick="Hotel_approve(${item.id})">Approve </button>
          <button class="reject" onclick="Hotel_reject(${item.id})">Reject</button>`;
        }

        // let members = 0
        // if (item.hotels.length > 0) {
        //     members = item.hotels[0].totalPerson
        // }
        let hotelName = item.hotels == undefined ? item.hotelName : item.hotels.length > 0 ? item.hotels[0].hotelName : '';
        if (cond === "manual") {

          table += `<tbody><tr><td>${i + 1}</td><td>${item.userName}</td><td>${item.mobileNumber}</td><td>${item.hotelName}</td><td>${item.numberOfAdults}</td><td>${item.numberOfChildrens}</td><td>${item.price+".00"}</td></tr></tbody>`;

        } else {
          table += `<tbody><tr><td>${i + 1}</td><td>${item.name}</td><td>${item.mobileNo}</td><td>${hotelName}</td><td>${item.noOfAdults}</td><td>${item.noOfChildren}</td><td>${item.price+".00"}</td><td style="color:${item.status === "Allocated" ? "green" : item.status === "Rejected" ? "red" : "orange"};">${item.status}</td><td style="display: flex;
          position: relative;
          left: 58px;">${button}</tr></tbody>`;

        }
        i++;

      });
      document.getElementsByClassName('Hotel_rup')[0].innerText = data ? data.data.length : " ";
      table += '</thead ></table>';
      let x = document.getElementById('BookingDiv');
      x.innerHTML = table;


      // document.getElementById("loader_home").style.display = "none";

    } catch (error) {
      console.log(error);
    }
  }


  async function getUserBookingInfo() {
    try {
      const response1 = await fetch(`${baseURL}/manualBooking/getAllManualBooking`);
      const values = await response1.json();
      document.getElementById('username').value = values.data.userName;
      document.getElementById('HotelName').value = values.data.hotelName;
      document.getElementById('MobileNumber').value = values.data.mobileNumber;
      document.getElementById('Noofadults').value = values.data.numberOfAdults;
      document.getElementById('Noofchilds').value = values.data.numberOfChildrens;
    } catch (error) {
      console.error(error);
    }
  }





}
function Hotel_aprve2() {
  document.getElementById("Hotel_statusCell1").innerText = "Allocated";
  document.getElementById("Hotel_statusCell1").style.color = " #00bf4c";
  document.getElementById("Hotel_act1").style.display = "none";
}

function Hotel_rect2() {
  document.getElementById("Hotel_statusCell1").innerText = "Rejected";
  document.getElementById("Hotel_statusCell1").style.color = "#ff0000";
  document.getElementById("Hotel_act1").style.display = "none";
}

function Hotel_approve2() {
  document.getElementById("Hotel_statusCell4").innerText = "Allocated";
  document.getElementById("Hotel_statusCell4").style.color = " #00bf4c";
  document.getElementById("Hotel_act4").style.display = "none";
}

function Hotel_reject2() {
  document.getElementById("Hotel_statusCell4").innerText = "Rejected";
  document.getElementById("Hotel_statusCell4").style.color = "#ff0000";
  document.getElementById("Hotel_act4").style.display = "none";

}


async function Hotel_approve(id) {
  try {
    const response = await fetch(`${baseURL}/admin/hotelBooking/approve/` + id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
    });
    const data = await response.json();
    if (data.data != undefined) {
      // generateTable();
      hotelBooking()
    }


  } catch (error) {
    console.error(error);
  }
  // Table()
}

async function Hotel_reject(id) {
  try {
    const response = await fetch(`${baseURL}/admin/hotelBooking/reject/` + id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
    });
    const data = await response.json();
    if (data.data != undefined) {
      // generateTable();
      hotelBooking();
    }


  } catch (error) {
    console.error(error);
  }
}


function addHotelClick01() {
  document.getElementById('hotelsavediv').style.display = 'block';

}



// function onclickbutton() {
//   document.getElementById('hotelsavediv').style.display = 'block';

// }

// async function Addhotel(id) {

//     document.getElementById('hotelsavediv').style.display = 'none'
//     document.getElementById('succes1').style.display = 'block'
// }

// function closePopUp() {
//   document.getElementById('succes1').style.display = 'none'
// }

// function closePopUp1() {
//   document.getElementById('hotelsavediv').style.display = 'none'
// }

function intoMarkPopup() {
  document.getElementById('hotelsavediv').style.display = 'none'

}


async function Addhotel(event) {
  event.preventDefault();
  try {
    var obj = new Object();
    obj.userName = document.getElementById('UserName').value;
    obj.hotelName = document.getElementById('HotelName').value;
    obj.mobileNumber = document.getElementById('MobileNumber').value;
    obj.numberOfAdults = document.getElementById('Noofadults').value;
    obj.numberOfChildrens = document.getElementById('Noofchilds').value;
    obj.price = document.getElementById('price').value;
    const response = await fetch(`${baseURL}/manualBooking/book`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
    const data = await response.json();
    if (data.data !== undefined) {

      document.getElementById('UserName').value = '';
      document.getElementById('HotelName').value = '';
      document.getElementById('MobileNumber').value = '';
      document.getElementById('Noofadults').value = '';
      document.getElementById('Noofchilds').value = '';
      document.getElementById('hotelsavediv').style.display = 'none'
      document.getElementById('succes1').style.display = 'block'
      hotelBooking('manual');
      setTimeout(() => {
        document.getElementById('succes1').style.display = 'none'
      }, 5000)
    }


  } catch (error) {
    console.error(error);
  }
}


// inputcode
function Validityuname(event) {
  //     var inputValue = document.getElementById('HotelName').value;
  //     var reg = RegExp('^[a-zA-Z_ ]*$');
  //     var test = reg.test(inputValue);
  //    if (test){
  //     return true
  //    }
  //    event.preventDefault()
  //    return false
}
function onlyNumberKey(evt) {

  // Only ASCII character in that range allowed
  let ASCIICode = (evt.which) ? evt.which : evt.keyCode
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
    return false;
  return true;
}