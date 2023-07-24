
let file_list_A = []
let file_list_B = []

let file_list_A2 = []
let file_list_B2 = []

let api_1 = ""
let api_2 = ""
let api_3 = ""

// search file [API]
function data_9(NO) {
    let API_url = api_1
    let API_data = {
        'WebName': NO,
        'FileId': '',
        'FileName': '',
        'FilePath': '',
        'FormId': '',
        'ExecID': '',
    }
    return fetch(API_url, {
        method: 'POST',
        body: JSON.stringify(API_data),
        headers: { 'content-type': 'application/json' }
    }).then(function (data) {
        return data.json();
    }).then(function (res) {
        return res
    })
}

// add new form's file [API]
function push_14(FormId, data_post3, EmpId) {
    let API_url = api_2
    let API_data = new FormData();
    API_data.append('WebName', 'oee_img') 
    API_data.append('EmpId', EmpId)
    API_data.append('FormId', FormId)
    API_data.append('Pic', data_post3)
    return fetch(API_url, {
        method: 'POST',
        body: API_data,
        headers: { "Accept": "application/json" },
    }).then(function (data) {
        return data.json();
    }).then(function (res) {
        return res
    })
}

async function onload_1() {

    api_1 = document.getElementById("api1").value
    api_2 = document.getElementById("api2").value
    api_3 = document.getElementById("api3").value

    let savedData = localStorage.getItem('savedData');
    if (savedData) {
        try {
            let dataObject = JSON.parse(savedData);
            document.getElementById('api1').value = dataObject.data1;
            document.getElementById('api2').value = dataObject.data2;
            document.getElementById('api3').value = dataObject.data3;
        } catch (error) {
            console.error("解析本地資料時發生錯誤：", error);
        }
    } else {
        if (api_1 !== "" && api_2 !== "" && api_3 !== "") {
            let dataObject = {
                data1: api_1,
                data2: api_2,
                data3: api_3
            };
            try {
                localStorage.setItem('savedData', JSON.stringify(dataObject));
            } catch (error) {
                console.error("儲存資料到本地時發生錯誤：", error);
            }
        }
    }

    api_1 = document.getElementById("api1").value
    api_2 = document.getElementById("api2").value
    api_3 = document.getElementById("api3").value

    const data_3 = await data_9("oee_img")
    let number_a = 0
    let number_b = 0
    for (i = 0; i < data_3.length; i++) {
        let item_1 = data_3[i]
        let split_1 = item_1["WebID"].split("#$")
        if (split_1[0] == "A" && parseInt(split_1[1]) > number_a) {
            number_a = parseInt(split_1[1])
        }
        if (split_1[0] == "B" && parseInt(split_1[1]) > number_b) {
            number_b = parseInt(split_1[1])
        }
    }
    number_a = parseInt(number_a)
    number_b = parseInt(number_b)

    for (i = 0; i < data_3.length; i++) {
        let item_1 = data_3[i]
        let split_1 = item_1["WebID"].split("#$")
        if (split_1[0] == "A" && parseInt(split_1[1]) == number_a) {
            file_list_A2.push(api_3 + item_1["FilePath"])
        }
        if (split_1[0] == "B" && parseInt(split_1[1]) == number_b) {
            file_list_B2.push(api_3 + item_1["FilePath"])
        }
    }

    let show_down1 = document.getElementById("show_down1")
    while (show_down1.hasChildNodes()) { show_down1.removeChild(show_down1.firstChild); }
    for (i = 0; i < file_list_A2.length; i++) {
        let file = file_list_A2[i]

        let imgElem = document.createElement('img')
        imgElem.src = file
        show_down1.appendChild(imgElem)
    }

    let show_down2 = document.getElementById("show_down2")
    while (show_down2.hasChildNodes()) { show_down2.removeChild(show_down2.firstChild); }
    for (i = 0; i < file_list_B2.length; i++) {
        let file = file_list_B2[i]

        let imgElem = document.createElement('img')
        imgElem.src = file
        show_down2.appendChild(imgElem)
    }

}

async function up_1() {

    // get file
    const inputFile = document.getElementById('avatar');
    let oneFile = inputFile.files;
    let size = document.getElementById("input_1").value

    for (i = 0; i < oneFile.length; i++) {
        let file_1 = oneFile[i]
        let file_type = file_1["name"].split(".")[1]

        if (file_type == "jpg" || file_type == "jpeg" || file_type == "png" || file_type == "JPG" || file_type == "JPEG") {
            if (size == "產線宣導") {
                file_list_A.push(file_1)
            } else if ((size == "衛教宣導")) {
                file_list_B.push(file_1)
            }
        }

    }

    let show_up1 = document.getElementById("show_up1")
    while (show_up1.hasChildNodes()) { show_up1.removeChild(show_up1.firstChild); }
    for (i = 0; i < file_list_A.length; i++) {
        let file = file_list_A[i]

        let reader = new FileReader();
        reader.addEventListener("load", function () {
            var imgData = reader.result;
            var imgElem = document.createElement('img');
            imgElem.src = imgData;
            document.querySelector('#show_up1').appendChild(imgElem);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    let show_up2 = document.getElementById("show_up2")
    while (show_up2.hasChildNodes()) { show_up2.removeChild(show_up2.firstChild); }
    for (i = 0; i < file_list_B.length; i++) {
        let file = file_list_B[i]

        let reader = new FileReader();
        reader.addEventListener("load", function () {
            var imgData = reader.result;
            var imgElem = document.createElement('img');
            imgElem.src = imgData;
            document.querySelector('#show_up2').appendChild(imgElem);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

}

async function push_up() {

    const data_3 = await data_9("oee_img")
    let number_a = 0
    let number_b = 0
    for (i = 0; i < data_3.length; i++) {
        let item_1 = data_3[i]
        let split_1 = item_1["WebID"].split("#$")
        if (split_1[0] == "A" && parseInt(split_1[1]) > number_a) {
            number_a = parseInt(split_1[1])
        }
        if (split_1[0] == "B" && parseInt(split_1[1]) > number_b) {
            number_b = parseInt(split_1[1])
        }
    }
    number_a = parseInt(number_a) + 1
    number_b = parseInt(number_b) + 1

    for (i = 0; i < file_list_A.length; i++) {
        let time = "A" + "#$" + number_a.toString()
        await push_14(time, file_list_A[i], "")
        console.log("ok")
    }

    for (i = 0; i < file_list_B.length; i++) {
        let time = "B" + "#$" + number_b.toString()
        await push_14(time, file_list_B[i], "")
        console.log("ok2")
    }

    location.reload()
}
