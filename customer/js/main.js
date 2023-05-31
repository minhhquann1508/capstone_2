const url = `https://6471e5116a9370d5a41acc1a.mockapi.io/api/product`;
//giỏ hàng
let cart = new Cart
//Lấy dữ liệu từ Api 
const fetchData = async () => {
    try {
        let res = await axios({
            url:url,
            method:"GET"
        }) 
        return res.data; 
    } 
    catch (error) {
        return error;
    }
}

//render dữ liệu lấy về từ api
const renderProductList = (list = []) => {
    let htmls = list.map((item) => {
        return `
        <div class="col-3">
            <div class="item">
                <div class="item-img">
                    <img
                    class="img-fluid"
                    src=${item.img}
                    alt=""
                    />
                </div>
            <div class="item-details">
                <h6 class="my-0">${item.name}</h6>
                <p class="my-0">${item.frontCamera},${item.backCamera},${item.screen}</p>
                <p class="my-0">${item.desc}</p>
            </div>
            <div class="item-option">
                <span>${item.price}$</span>
                <input class="quantity-${item.id}" style="width:30px" type="number" min="1" value="1"/>
                <button onclick="addItemToCart(${item.id})">Add</button>
            </div>
            </div>
        </div>
        `
    })
    document.querySelector('.list-customer-item').innerHTML = htmls.join('')
}

//Lọc sản phẩm theo loại điện thoại
const getSameTypeProduct = (type) => {
    let typeValue = type.value;
    fetchData()
    .then((res) => {
        let newTypeList = res.filter((item) => item.type.toLowerCase() === typeValue);
        if(newTypeList.length === 0) {
            renderProductList(res);
        }
        else {
            renderProductList(newTypeList);
        }
    })
    .catch((err) => {
        console.log(err)
    })
}

//thêm sản phẩm vào giỏ hàng
const addItemToCart = (itemID) => {
    const quantity = document.querySelector(`.quantity-${itemID}`).value;
    fetchData()
    .then((res) => {
        let findingProduct = res.find((item) => Number(item.id) === Number(itemID));
        const {id,name,price,img} = findingProduct;
        console.log(quantity)
        cart.addNewItemToCart(id,name,price,img,quantity)
    })
    .catch((err) => {
        console.log(err)
    })
}

//render Cart 
const renderCart = () => {
    if(cart.list.length <= 0) {
        document.querySelector('.cart-body').innerHTML = 'Không có sản phẩm trong giỏ hàng.'
        document.querySelector('.cart-footer span').innerHTML = 'Tổng tiền :0$'
    }
    else {
        let htmls = cart.list.map((item) => {
            return `
                <div class="cart-item d-flex">
                    <div class="cart-item-img w-50">
                        <img class="img-fluid" src=${item.img} alt="" />
                    </div>
                    <div class="cart-item-details">
                        <h6>${item.name}</h6>
                        <p>${item.price}$</p>
                        <input type="number" class="quantity-${item.id}" onchange="updateTotalPrice(${item.id})" style="width:30px" value=${item.quantity} min="1"/>
                        <div>
                            <span class="total-${item.id}">Tổng tiền:${item.calcTotal()}</span>
                            <button onclick="deleteCartItem(${item.id})">Xóa</button>
                        </div>
                        
                    </div>
                </div>
            `
        })
        document.querySelector('.cart-body').innerHTML = htmls.join('');
        document.querySelector('.cart-footer span').innerHTML = `Tổng tiền: ${cart.calcTotalBill()}$`
    }
}

//Cập nhật lại giá tiền sau khi thay đổi số lượng
const updateTotalPrice = (id) => {
    let quantity = document.querySelector(`.quantity-${id}`).value;
    let findingProduct =  cart.list.find((item) => Number(item.id) === Number(id));
    findingProduct.quantity = quantity;
    renderCart();
}

//Xóa sản phẩm khỏi giỏ hàng
const deleteCartItem = (id) => {
    cart.deleteCartItem(id);
    renderCart();
}

window.addEventListener("DOMContentLoaded", function () {
    fetchData()
    .then((res) => {
        renderProductList(res);
    })
    .catch((err) => {
        console.log(err)
    })
})
