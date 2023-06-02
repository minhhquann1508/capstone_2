//render dữ liệu lấy về từ api
const renderProductList = (list = []) => {
    let htmls = list.map((item) => {
        return `
        <div class="col-12 col-md-6 col-lg-4 col-xl-3 py-3">
            <div class="item">
                <div class="item-img">
                    <img
                    class="img-fluid"
                    src=${item.img}
                    alt=""
                    />
                </div>
            <div class="item-details">
                <h6 class="my-0 item-title">${item.name}</h6>
                <p class="my-0 item-desc">${item.frontCamera},${item.backCamera},${item.screen}</p>
                <p class="my-0 item-desc">${item.desc}</p>
            </div>
            <div class="item-option">
                <span class="item-price">Giá: ${item.price}$</span>
                <div>
                    <input class="quantity-${item.id} item-quantity" style="width:30px" type="number" min="1" value="1"/>
                    <button class="button" onclick="addItemToCart(${item.id})">Add</button>
                </div>
            </div>
            </div>
        </div>
        `
    })
    document.querySelector('.list-customer-item').innerHTML = htmls.join('')
    document.querySelector('.loading-icon').style.display = 'none'; 
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
                        <h6 class="item-title">${item.name}</h6>
                        <p class="item-price my-0">Đơn giá:${item.price}$</p>
                        <input type="number" class="item-quantity quantity-${item.id}" onchange="updateTotalPrice(${item.id})" style="width:30px" value=${item.quantity} min="1"/>
                        <div class="cart-optional">
                            <span class="item-price total-${item.id}"><b>Tổng tiền:</b>${item.calcTotal()}$</span>
                            <button class="deleted-button" onclick="deleteCartItem(${item.id})">Xóa</button>
                        </div>
                        
                    </div>
                </div>
            `
        })
        document.querySelector('.cart-body').innerHTML = htmls.join('');
        document.querySelector('.cart-footer span').innerHTML = `Tổng tiền: ${cart.calcTotalBill()}$`
    }
}
