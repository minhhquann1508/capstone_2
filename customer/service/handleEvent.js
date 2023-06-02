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
        saveData();
    })
    .catch((err) => {
        console.log(err)
    })
}
//Cập nhật lại giá tiền sau khi thay đổi số lượng
const updateTotalPrice = (id) => {
    let quantity = document.querySelector(`.quantity-${id}`).value;
    let findingProduct =  cart.list.find((item) => Number(item.id) === Number(id));
    findingProduct.quantity = quantity;
    saveData();
    renderCart();
}

//Xóa sản phẩm khỏi giỏ hàng
const deleteCartItem = (id) => {
    if(confirm("Bạn có chắc muốn xóa sản phẩm này không ?")) {
        cart.deleteCartItem(id);
        saveData();
        renderCart();
    }
    else {
        return;
    }
}

//Lăn chuột xuông thì hiện số pixel đã cuộn;
window.onscroll = () => {
    let scrollPixels = window.pageYOffset || document.documentElement.scrollTop;
    if(scrollPixels >= 100) {
        document.querySelector('.back-top-top-btn').style.display = 'block';
    }
    else {
        document.querySelector('.back-top-top-btn').style.display = 'none';
    }
}

const handleBackToTopEvent = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}