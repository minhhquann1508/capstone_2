let api = new Api();
let initData = [];
let memorizedData = [];

//Render ra Table
function fetchPhoneList() {
    let promise = api.callApi("product", "GET", null);
    // let uniqueChars = [...new Set(chars)];

    promise
        .then(function (res) {
            renderPhoneList(res.data);
            initData = [].concat(res.data);
            memorizedData = [].concat(res.data);
        })
        .catch(function (err) {
            console.log(err);
        });
};

//Chọn loại
const types = {
    '1': 'iphone',
    '2': 'samsung',
};
function filterPhoneList(type) {
    if (type === '0') {
        renderPhoneList(initData);
    } else {
        const filterList = [];
        for (let i = 0; i < memorizedData.length; i++) {
            if (memorizedData[i].type.toLowerCase() === types[type].toLowerCase()) {
                console.log(memorizedData[i].type, types[type], memorizedData[i])
                filterList.push(memorizedData[i]);
            }
        }
        renderPhoneList(filterList);
    }
};
fetchPhoneList();
function typePhone(value) {
    filterPhoneList(value);
}

//Xóa sp trên admin
function xoaSP(id) {
    api.callApi(`product/${id}`, "DELETE", null)
        .then(function (res) {
            //Gọi lại API lấy danh sách SP mới nhất từ server
            fetchPhoneList();
        })
        .catch(function (err) {
            console.log(err);
        });
};

//Thêm sp trên admin
function themSP() {
    let phone = layThongTin(true);
    console.log(phone);

    if (phone) {
        api.callApi("product", "POST", phone)
            .then(function (res) {
                //fect list data
                fetchPhoneList();
                //close modal
                modal.click();
            })
            .catch(function (err) {
                console.log(err);
            });
    }
};

//Reset modal
var modal = document.getElementsByClassName("close")[0];
modal.reset = function () {
    getEle("formPhone").reset();

    let btnAddPhone = "<button class='btn btn-success' onclick='themSP()'>Add</button>";
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnAddPhone;

};
$('#exampleModal').on('hide.bs.modal', function (e) {
    modal.reset();
})


//Click button ThemSP
getEle("btnThemSP").addEventListener("click", function () {
    let btnAddPhone = "<button class='btn btn-success' onclick='themSP()'>Add</button>";
    document.getElementsByClassName("btnAdd")[0].innerHTML = btnAddPhone;

    getEle("txtID").disabled = true;
});

// Sửa sp trên admin
function suaSP(id) {

    let btnUpdatePhone = `<button class='btn btn-success' onclick='updatePhone(${id})'>Update</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdatePhone;

    api.callApi(`product/${id}`, "GET", null)
        .then(function (result) {
            // console.log(result.data);
            //show product ra các thẻ input
            getEle("txtID").value = result.data.id;
            getEle("txtID").disabled = true;


            getEle("txtName").value = result.data.name;
            getEle("txtPrice").value = result.data.price;
            getEle("txtImg").value = result.data.img;
            getEle("frontCamera").value = result.data.frontCamera;
            getEle("backCamera").value = result.data.backCamera;
            getEle("type").value = result.data.type;
            getEle("txtDesc").value = result.data.desc;

        })
        .catch(function (err) {
            console.log(err);
        });
};

//Cập nhật sp trên admin
function updatePhone(id) {
    let phone = layThongTin(id);

    api.callApi(`product/${id}`, "PUT", phone)
        .then(function (result) {
            //fect list data
            fetchPhoneList();

            //close modal
            modal.click()
        })
        .catch(function (err) {
            console.log(err);
        });
};

//Sắp xếp tăng và giảm dần
const prices = {
    '0': 'sort',
    '1': 'asc',
    '2': 'desc',
};
function sapXep(type) {
    if (prices[type] === 'asc') {
        const sort = memorizedData.sort((a, b) => Number(a.price) - Number(b.price))
        renderPhoneList(sort);
    } else if (prices[type] === 'desc') {
        const sort = memorizedData.sort((a, b) => Number(b.price) - Number(a.price))
        renderPhoneList(sort);
    } else {
        console.log(initData, 'init');
        renderPhoneList(initData);
    }
};

//Search
getEle("txtSearch").addEventListener("keyup", function () {
    let keyword = getEle("txtSearch").value.toLowerCase();
    const phoneTimKiem = memorizedData.filter((item) => item.name.toLowerCase().indexOf(keyword) > -1)

    renderPhoneList(phoneTimKiem);
});


