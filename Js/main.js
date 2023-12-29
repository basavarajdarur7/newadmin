
// timeclock
window.onload = function () {

    setInterval(() => {
        var dt = new Date();
        document.getElementById("time").innerHTML = dt.toLocaleTimeString();
    }, 0)


    Dashboard();
    console.log(baseURL);
}


// Dashboard Home
window.onload = function () { 
    Dashboard() ;
  }

function Dashboard() {


    // document.getElementById("loader_dash").style.display = "block";



    DashboardTable();

    // document.getElementById("loader_dash").style.display = "block";


    fetch(`${baseURL}/booking/getAllBookingOrders`)
        .then(res => res.json())
        .then(json => {
            console.log(json.data)

            document.getElementsByClassName('Dashboard_order1')[0].innerText = json.data.hotel;
            document.getElementsByClassName('Dashboard_orderdata11')[0].innerText = json.data.poja;
            document.getElementsByClassName('Dashboard_orderdata12')[0].innerText = json.data.visitings;
            document.getElementsByClassName('Dashboard_orderdata13')[0].innerText = json.data.taxi;
            document.getElementsByClassName('Dashboard_orderdata14')[0].innerText = json.data.airport;

            document.getElementsByClassName('Dashboard_ruppe')[0].innerText = json.data.byCash;
            document.getElementsByClassName('Dashboard_ruppe1')[0].innerText = json.data.byOnline;

            document.getElementById("loader_dash").style.display = "none";

        });






    //   Table();

}
// two nunber added -2
function accept21() {
    document.getElementById("Dashboard_statusCell4").innerText = "Allocated";
    document.getElementById("Dashboard_statusCell4").style.color = " #00bf4c";
    document.getElementById("Dashboard_act4").style.display = "none";
}
//two number added -4
function accept42() {
    document.getElementById("Dashboard_statusCell5").innerText = "Allocated";
    document.getElementById("Dashboard_statusCell5").style.color = " #00bf4c";
    document.getElementById("Dashboard_act5").style.display = "none";
}
// one number added -1
function accept13() {
    document.getElementById("Dashboard_statusCell1").innerText = "Allocated";
    document.getElementById("Dashboard_statusCell1").style.color = " #00bf4c";
    document.getElementById("Dashboard_act3").style.display = "none";
}
// one number added -3
function accept34() {
    document.getElementById("Dashboard_statusCell22").innerText = "Allocated";
    document.getElementById("Dashboard_statusCell22").style.color = " #00bf4c";
    document.getElementById("Dashboard_act22").style.display = "none";
}
// two nunber added -2
function reject21() {
    document.getElementById("Dashboard_statusCell4").innerText = "Rejected";
    document.getElementById("Dashboard_statusCell4").style.color = "#ff0000";
    document.getElementById("Dashboard_act4").style.display = "none";
}
//two number added -4
function reject42() {
    document.getElementById("Dashboard_statusCell5").innerText = "Rejected";
    document.getElementById("Dashboard_statusCell5").style.color = "#ff0000";
    document.getElementById("Dashboard_act5").style.display = "none";
}
// one number adede -1
function reject13() {
    document.getElementById("Dashboard_statusCell1").innerText = "Rejected";
    document.getElementById("Dashboard_statusCell1").style.color = "#ff0000";
    document.getElementById("Dashboard_act3").style.display = "none";
}
// one number added -3
function reject34() {
    document.getElementById("Dashboard_statusCell22").innerText = "Rejected";
    document.getElementById("Dashboard_statusCell22").style.color = "#ff0000";
    document.getElementById("Dashboard_act22").style.display = "none";
}


// dashBoard download 



function homeDownload01() {

    var table2excel = new Table2Excel();
    table2excel.export(document.querySelectorAll("table.api-data-convert01"));


}

async function DashboardTable() {

    document.getElementById("loader_dash").style.display = "block";
    document.getElementById("homepage").style.opacity = "0";



    try {
        const response = await fetch(`${baseURL}/dashBoard/getAllDashBoardHomeList`);
        const data = await response.json();
        console.log(data)



        let table = '<table class="api-data-convert01"><thead>';
        table += '<tr> <th class="Dashboard_left">S.No</th> <th>User Name</th> <th>Mobile Number</th><th>Request for</th><th>Price ( ₹ )</th><th>Status</th><th class="Dashboard_right ">Response</th></tr>';


        let button = "";
        if (data.data.status == "Waiting to Respond") {
            button = ` <button class="approve" onclick="accept21(${data.data.userRequestId})">Approve </button>
          <button class="reject" onclick="reject21(${data.data.userRequestId})">Reject</button>`;
        }



        table += `<tbody><tr><td>${data.data.userRequestId}</td><td>${data.data.userName}</td><td>${data.data.mobileNumber}</td><td>${data.data.requestFor}</td><td>${data.data.price+".00"}</td><td  style="color:${data.data.status === "Allocated" ? "green" : data.data.status === "Rejected" ? "red" : "orange"};">${data.data.status}</td><td id="Dashboard_act4" >${button}</td></tr></tbody>`;
        const response1 = await fetch(`${baseURL}/dashBoard/getAllDashBoardHomeTaxiServiceList`);
        const data1 = await response1.json();

        let button1 = "";
        if (data1.data.status == "Waiting to Respond") {
            button1 = ` <button class="approve" onclick="accept21(${data1.data.userRequestId})">Approve </button>
          <button class="reject" onclick="reject21(${data1.data.userRequestId})">Reject</button>`;
        }

        table += `<tbody><tr><td>${data1.data.userRequestId}</td><td>${data1.data.userName}</td><td>${data1.data.mobileNumber}</td><td>${data1.data.requestFor}</td><td>${data1.data.price+".00"}</td><td  style="color:${data1.data.status === "Allocated" ? "green" : data1.data.status === "Rejected" ? "red" : "orange"};">${data1.data.status}</td><td id="Dashboard_act4" >${button1}</td></tr></tbody>`;
        const response2 = await fetch(`${baseURL}/dashBoard/getAllDashBoardHomeUjjainDarshanList`);
        const data2 = await response2.json();


        let button2 = "";
        if (data2.data.status == "Waiting to Respond") {
            button2 = ` <button class="approve" onclick="accept34(${data2.data.userRequestId})">Approve </button>
          <button class="reject" onclick="reject34(${data2.data.userRequestId})">Reject</button>`;
        }

        table += `<tbody><tr><td>${data2.data.userRequestId}</td><td>${data2.data.userName}</td><td>${data2.data.mobileNumber}</td><td>${data2.data.requestFor}</td><td>${data2.data.price+".00"}</td><td  style="color:${data2.data.status === "Allocated" ? "green" : data2.data.status === "Rejected" ? "red" : "orange"};">${data2.data.status}</td><td id="Dashboard_act22" >${button2}</td></tr></tbody>`;
        const response3 = await fetch(`${baseURL}/dashBoard/getAllDashBoardOmkareshwarlist`);
        const data3 = await response3.json();

        if (data3.data != null) {



            let button3 = "";
            if (data3.data.status == "Waiting to Respond") {
                button3 = ` <button class="approve" onclick="accept34(${data3.data.userRequestId})">Approve </button>
                      <button class="reject" onclick="reject34(${data3.data.userRequestId})">Reject</button>`;
            }

            table += `<tbody><tr><td>${data3.data.userRequestId}</td><td>${data3.data.userName}</td><td>${data3.data.mobileNumber}</td><td>${data3.data.requestFor}</td><td>${data3.data.price+".00"}</td><td  style="color:${data3.data.status === "Allocated" ? "green" : data3.data.status === "Rejected" ? "red" : "orange"};">${data3.data.status}</td><td id="Dashboard_act22" >${button3}</td></tr></tbody>`;
        }
        const response4 = await fetch(`${baseURL}/dashBoard/getAllDashBoardMaabagalamukhilist`);
        const data4 = await response4.json();

        let button4 = "";
        if (data4.data.status == "Waiting to Respond") {
            button4 = ` <button class="approve" onclick="accept34(${data4.data.userRequestId})">Approve </button>
          <button class="reject" onclick="reject34(${data4.data.userRequestId})">Reject</button>`;
        }


        table += `<tbody><tr><td>${data4.data.userRequestId}</td><td>${data4.data.userName}</td><td>${data4.data.mobileNumber}</td><td>${data4.data.requestFor}</td><td>${data4.data.price+".00"}</td><td  style="color:${data4.data.status === "Allocated" ? "green" : data4.data.status === "Rejected" ? "red" : "orange"};">${data4.data.status}</td><td id="Dashboard_act22" >${button4}</td></tr></tbody>`;
        const response5 = await fetch(`${baseURL}/dashBoard/getAllDashBoardHomeShoppingList`);
        const data5 = await response5.json();

        if (data5.data != null) {

        let button5 = "";
        if (data5.data.status == "Waiting to Respond") {
            button5 = ` <button class="approve" onclick="accept42(${data5.data.userRequestId})">Approve </button>
<button class="reject" onclick="reject42(${data5.data.userRequestId})">Reject</button>`;
        }


        table += `<tbody><tr><td>${data5.data.userRequestId}</td><td>${data5.data.userName}</td><td>${data5.data.mobileNumber}</td><td>${data5.data.requestFor}</td><td>${data5.data.price+".00"}</td><td  style="color:${data5.data.status === "Allocated" ? "green" : data5.data.status === "Rejected" ? "red" : "orange"};" >${data5.data.status}</td><td id="Dashboard_act22" >${button5}</td></tr></tbody>`;
    }
        const response6 = await fetch(`${baseURL}/dashBoard/getAllDashBoardPojaList`);
        const data6 = await response6.json();

        let button6 = "";
        if (data6.data.status == "Waiting to Respond") {
            button6 = ` <button class="approve" onclick="accept34(${data6.data.userRequestId})">Approve </button>
<button class="reject" onclick="reject34(${data6.data.userRequestId})">Reject</button>`;
        }


        table += `<tbody><tr><td>${data6.data.userRequestId}</td><td>${data6.data.userName}</td><td>${data6.data.mobileNumber}</td><td>${data6.data.requestFor}</td><td>${data6.data.price+".00"}</td><td  style="color:${data6.data.status === "Allocated" ? "green" : data6.data.status === "Rejected" ? "red" : "orange"};">${data6.data.status}</td><td id="Dashboard_act22" >${button6}</td></tr></tbody>`;

        table += '</thead ></table>';
        let x = document.getElementById('dashboarddiv');
        x.innerHTML = table;

        document.getElementById("loader_dash").style.display = "none";
        document.getElementById("homepage").style.opacity = "10";


    } catch (error) {
        console.error(error);
    }
}

async function accept21(id) {
    try {
        const response = await fetch(`${baseURL}/dashBoard/hotelApprove/` + id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
        });
        const data = await response.json();
        if (data.data != undefined) {
            DashboardTable();
        }


    } catch (error) {
        console.error(error);
    }
}

async function reject21(id) {
    try {
        const response = await fetch(`${baseURL}/dashBoard/hotelReject/` + id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
        });
        const data = await response.json();
        if (data.data != undefined) {
            DashboardTable();
        }


    } catch (error) {
        console.error(error);
    }
}



async function accept34(id) {
    try {
        const response = await fetch(`${baseURL}/dashBoard/ujjainGuideApprove/` + id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
        });
        const data = await response.json();
        if (data.data != undefined) {
            DashboardTable();
        }


    } catch (error) {
        console.error(error);
    }
}

async function reject34(id) {
    try {
        const response = await fetch(`${baseURL}/dashBoard/ujjainGuideaReject/` + id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
        });
        const data = await response.json();
        if (data.data != undefined) {
            DashboardTable();
        }


    } catch (error) {
        console.error(error);
    }
}


async function accept42(id) {
    try {
        const response = await fetch(`${baseURL}/dashBoard/shoppingApprove/` + id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
        });
        const data = await response.json();
        if (data.data != undefined) {
            DashboardTable();
        }


    } catch (error) {
        console.error(error);
    }
}

async function reject42(id) {
    try {
        const response = await fetch('' + id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
        });
        const data = await response.json();
        if (data.data != undefined) {
            DashboardTable();
        }


    } catch (error) {
        console.error(error);
    }
}

