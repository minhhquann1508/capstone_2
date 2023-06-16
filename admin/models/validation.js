function Validation() {
    //property

    //method
    this.kiemTraRong = function (value, errorId, mess) {
        if (value === "") {
            //SAI
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
        }

        //ĐÚNG
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = "";
        return true;
    };

    this.kiemTraType = function (idSelect, errorId, mess) {
        if (getEle(idSelect).selectedIndex !== 0) {
            //true
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        //false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };
}