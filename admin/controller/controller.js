let getEle = function (id) {
    return document.getElementById(id);
};

//Render ra Table
let renderPhoneList = function (phoneArr) {
    // console.log(phoneArr)
    let content = "";
    for (let i = 0; i < phoneArr.length; i++) {
        let phone = phoneArr[i];
        content += `
        <tr>
            <td>${phone.id}</td>
            <td>${phone.name}</td>
            <td>${phone.price}</td>
            <td>
            <img src="${phone.img}" alt=""  class="img-fluid w-50"/>
            </td>
            <td>${phone.frontCamera}</td>
            <td>${phone.backCamera}</td>
            <td>${phone.screen}</td>
            <td>${phone.type}</td>
            <td>${phone.desc}</td>
            <td> 
                <button onclick="xoaSP(${phone.id})" class="btn btn-danger m-1">Xóa</button>

                <button class="btn btn-warning m-1" data-toggle="modal"
                data-target="#exampleModal" onclick="suaSP(${phone.id})">Sửa</button>
            </td>
        </tr>`;
    }
    getEle("tableBody").innerHTML = content;
};

let validation = new Validation();
//Lấy thông tin
function layThongTin(isAdd) {
    let id = getEle("txtID").value;
    let name = getEle("txtName").value;
    let price = getEle("txtPrice").value;
    let img = getEle("txtImg").value;
    let frontCamera = getEle("frontCamera").value;
    let backCamera = getEle("backCamera").value;
    let screen = getEle("screen").value;
    let type = getEle("type").value;
    let desc = getEle("txtDesc").value;

    let isValid = true;
    if (isAdd) {
        isValid &=
            validation.kiemTraRong(name, "errorName", "(*) Vui lòng nhập tên điện thoại");
    }
    isValid &= validation.kiemTraRong(price, "errorPrice", "(*) Vui lòng nhập giá điện thoại");
    isValid &= validation.kiemTraRong(img, "errorImg", "(*) Vui lòng nhập link hình ảnh");
    isValid &= validation.kiemTraRong(frontCamera, "errorFrontCamera", "(*) Vui lòng nhập giá điện thoại");
    isValid &= validation.kiemTraRong(backCamera, "errorBackCamera", "(*) Vui lòng nhập giá điện thoại");
    isValid &= validation.kiemTraRong(screen, "errorScreen", "(*) Vui lòng nhập giá điện thoại");
    isValid &= validation.kiemTraType("type", "errorType", "(*) Vui lòng chọn loại điện thoại");
    isValid &= validation.kiemTraRong(desc, "errorDesc", "(*) Vui lòng nhập giá điện thoại");




    if (!isValid) return null;


    let phone = new Phone(id, name, price, img, frontCamera, backCamera, screen, type, desc);
    return phone;
};

