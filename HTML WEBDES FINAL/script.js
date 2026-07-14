// ===============================
// MOBILE MENU
// ===============================




var hamburger = document.getElementById("hamburgerBtn");
var mobileNav = document.getElementById("mobileNav");




if (hamburger != null && mobileNav != null) {




    hamburger.onclick = function () {




        mobileNav.classList.toggle("active");
    };




}




// =============
// SEARCH BAR
// =============




var navActions = document.querySelector(".nav-actions");
var searchButton = document.querySelectorAll(".icon-btn")[0];




// Create search input
var searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Search products...";
searchInput.style.display = "none";
searchInput.style.padding = "8px";
searchInput.style.marginRight = "10px";
searchInput.style.background = "#000000";
searchInput.style.color = "#ffffff";
searchInput.style.border = "1px solid #7a1212";
searchInput.style.borderRadius = "5px";
searchInput.style.outline = "none";




// Create suggestion box
var suggestionBox = document.createElement("div");
suggestionBox.style.display = "none";
suggestionBox.style.position = "absolute";
suggestionBox.style.top = "45px";
suggestionBox.style.left = "0";
suggestionBox.style.width = "220px";
suggestionBox.style.maxHeight = "220px";
suggestionBox.style.overflowY = "auto";
suggestionBox.style.background = "#000000";
suggestionBox.style.border = "1px solid #7a1212";
suggestionBox.style.color = "#ffffff";
suggestionBox.style.zIndex = "1000";




navActions.style.position = "relative";




navActions.insertBefore(searchInput, navActions.firstChild);
navActions.appendChild(suggestionBox);




// Show / Hide Search Bar
searchButton.onclick = function () {




    if (searchInput.style.display == "none") {




        searchInput.style.display = "block";
        searchInput.focus();




    } else {




        searchInput.style.display = "none";
        searchInput.value = "";
        suggestionBox.style.display = "none";




    }




};




// Search While Typing
searchInput.onkeyup = function () {




    var keyword = searchInput.value.toLowerCase();




    suggestionBox.innerHTML = "";




    if (keyword == "") {
        suggestionBox.style.display = "none";
        return;
    }




    var cards = document.querySelectorAll(".product-card");
    var found = 0;




    for (var i = 0; i < cards.length; i++) {




        var productName = cards[i].querySelector(".product-name").innerHTML;




        if (productName.toLowerCase().indexOf(keyword) != -1) {




            found++;




            var item = document.createElement("div");




            item.innerHTML = productName;
            item.style.padding = "10px";
            item.style.cursor = "pointer";
            item.style.background = "#000000";
            item.style.color = "#ffffff";
            item.style.borderBottom = "1px solid #520505";




            item.onmouseover = function () {
                this.style.background = "#8f0909";
                this.style.color = "#ffffff";
            };




            item.onmouseout = function () {
                this.style.background = "#000000";
                this.style.color = "#ffffff";
            };




            item.onclick = (function (card, name) {




                return function () {




                    searchInput.value = name;
                    suggestionBox.style.display = "none";




                    card.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });




                    card.style.outline = "3px solid #a40404";




                    setTimeout(function () {
                        card.style.outline = "";
                    }, 2000);




                };




            })(cards[i], productName);




            suggestionBox.appendChild(item);




        }




    }




    if (found > 0) {
        suggestionBox.style.display = "block";
    } else {
        suggestionBox.style.display = "none";
    }




};




// ===============================
// ADD TO CART
// ===============================




var cart = [];




if (localStorage.getItem("cart")) {




    cart = JSON.parse(localStorage.getItem("cart"));




}




for (var i = 0; i < cart.length; i++) {




    if (cart[i].quantity == null) {




        cart[i].quantity = 1;




    }




    if (typeof cart[i].price == "string") {




        cart[i].price = parseFloat(cart[i].price.replace(/[^\d.]/g, ""));




    }




}




localStorage.setItem("cart", JSON.stringify(cart));




var cartCount = document.querySelector(".cart-count");




function updateCartCount() {




    var totalItems = 0;




    for (var i = 0; i < cart.length; i++) {




        totalItems += cart[i].quantity;




    }




    if (cartCount != null) {




        cartCount.innerHTML = totalItems;




    }




}




updateCartCount();




var addButtons = document.querySelectorAll(".product-cta");




for (var i = 0; i < addButtons.length; i++) {




    addButtons[i].onclick = function () {




        var card = this.parentElement;




        while (!card.classList.contains("product-card")) {




            card = card.parentElement;




        }




        var name = card.querySelector(".product-name").innerHTML;




        var price = parseFloat(
            card.querySelector(".product-price").innerHTML.replace(/[^\d.]/g, "")
        );




        var found = false;




        for (var j = 0; j < cart.length; j++) {




            if (cart[j].name == name) {




                cart[j].quantity++;




                found = true;




                break;




            }




        }




        if (!found) {




            cart.push({




                name: name,
                price: price,
                quantity: 1




            });




        }




        localStorage.setItem("cart", JSON.stringify(cart));




        updateCartCount();




        alert( name + " has been added to your cart.");




    };




}




// ===============================
// VIEW CART
// ===============================




var cartWindow = document.createElement("div");




cartWindow.style.display = "none";
cartWindow.style.position = "fixed";
cartWindow.style.top = "50%";
cartWindow.style.left = "50%";
cartWindow.style.transform = "translate(-50%, -50%)";
cartWindow.style.backgroundColor = "#000000";
cartWindow.style.color = "#ffffff";
cartWindow.style.border = "2px solid #7a1212";
cartWindow.style.borderRadius = "10px";
cartWindow.style.padding = "20px";
cartWindow.style.width = "400px";
cartWindow.style.maxHeight = "500px";
cartWindow.style.overflowY = "auto";
cartWindow.style.zIndex = "1000";
cartWindow.style.boxShadow = "0 0 20px #520505";




document.body.appendChild(cartWindow);




var iconButtons = document.querySelectorAll(".icon-btn");




function displayCart() {




    cartWindow.innerHTML = "";




    var title = document.createElement("h2");
    title.innerHTML = "Shopping Cart";
    title.style.color = "#ffffff";
    title.style.textAlign = "center";
    title.style.marginBottom = "20px";




    cartWindow.appendChild(title);




    if (cart.length == 0) {




        var empty = document.createElement("p");




        empty.innerHTML = "Your cart is empty.";
        empty.style.textAlign = "center";
        empty.style.color = "#ffffff";




        cartWindow.appendChild(empty);




    } else {




        var totalItems = 0;
        var totalPrice = 0;




        for (let i = 0; i < cart.length; i++) {




            totalItems += cart[i].quantity;
            totalPrice += cart[i].price * cart[i].quantity;




            var box = document.createElement("div");




            box.style.background = "#000000";
            box.style.border = "1px solid #520505";
            box.style.borderRadius = "8px";
            box.style.padding = "12px";
            box.style.marginBottom = "15px";




            box.innerHTML =
                "<h3 style='margin:0;color:#ffffff;'>" +
                cart[i].name +
                "</h3>" +
                "<p style='color:#ffffff;'>Price: ₱" +
                cart[i].price.toFixed(2) +
                "</p>" +
                "<p style='color:#ffffff;'>Quantity: " +
                cart[i].quantity +
                "</p>";




            // Minus Button




            var minusBtn = document.createElement("button");




            minusBtn.innerHTML = "-";
            minusBtn.style.marginRight = "5px";
            minusBtn.style.padding = "6px 12px";
            minusBtn.style.background = "#000000";
            minusBtn.style.color = "#ffffff";
            minusBtn.style.border = "1px solid #7a1212";
            minusBtn.style.borderRadius = "5px";
            minusBtn.style.cursor = "pointer";




            minusBtn.onclick = function () {




                cart[i].quantity--;




                if (cart[i].quantity <= 0) {




                    cart.splice(i, 1);




                }




                localStorage.setItem("cart", JSON.stringify(cart));




                updateCartCount();




                displayCart();




            };




            // Plus Button




            var plusBtn = document.createElement("button");




            plusBtn.innerHTML = "+";
            plusBtn.style.marginRight = "5px";
            plusBtn.style.padding = "6px 12px";
            plusBtn.style.background = "#8f0909";
            plusBtn.style.color = "#ffffff";
            plusBtn.style.border = "1px solid #7a1212";
            plusBtn.style.borderRadius = "5px";
            plusBtn.style.cursor = "pointer";




            plusBtn.onclick = function () {




                cart[i].quantity++;




                localStorage.setItem("cart", JSON.stringify(cart));




                updateCartCount();




                displayCart();




            };




            // Remove Button




            var removeBtn = document.createElement("button");




            removeBtn.innerHTML = "Remove";
            removeBtn.style.padding = "6px 12px";
            removeBtn.style.background = "#000000";
            removeBtn.style.color = "#ffffff";
            removeBtn.style.border = "1px solid #7a1212";
            removeBtn.style.borderRadius = "5px";
            removeBtn.style.cursor = "pointer";




            removeBtn.onclick = function () {




                cart.splice(i, 1);




                localStorage.setItem("cart", JSON.stringify(cart));




                updateCartCount();




                displayCart();




            };




            box.appendChild(minusBtn);
            box.appendChild(plusBtn);
            box.appendChild(removeBtn);




            cartWindow.appendChild(box);




        }
        // ===============================
        // CART SUMMARY
        // ===============================




        var summary = document.createElement("div");




        summary.style.marginTop = "15px";
        summary.style.paddingTop = "10px";
        summary.style.borderTop = "2px solid #520505";
        summary.style.color = "#ffffff";




        summary.innerHTML =
            "<h3>Total Items: " + totalItems + "</h3>" +
            "<h3>Estimated Price: ₱" + totalPrice.toFixed(2) + "</h3>";




        cartWindow.appendChild(summary);




        // ===============================
        // CHECKOUT BUTTON
        // ===============================




        var checkoutBtn = document.createElement("button");




        checkoutBtn.innerHTML = "Checkout";




        checkoutBtn.style.width = "100%";
        checkoutBtn.style.padding = "10px";
        checkoutBtn.style.marginTop = "15px";
        checkoutBtn.style.background = "#a40404";
        checkoutBtn.style.color = "#ffffff";
        checkoutBtn.style.border = "1px solid #7a1212";
        checkoutBtn.style.borderRadius = "5px";
        checkoutBtn.style.cursor = "pointer";




        checkoutBtn.onmouseover = function () {




            this.style.background = "#940808";




        };




        checkoutBtn.onmouseout = function () {




            this.style.background = "#a40404";




        };




        checkoutBtn.onclick = function () {




            alert("Thank you for your purchase!");




            cart = [];




            localStorage.setItem("cart", JSON.stringify(cart));




            updateCartCount();




            displayCart();




        };




        cartWindow.appendChild(checkoutBtn);




    }




    // ===============================
    // CLOSE BUTTON
    // ===============================




    var closeBtn = document.createElement("button");




    closeBtn.innerHTML = "Close";




    closeBtn.style.width = "100%";
    closeBtn.style.padding = "10px";
    closeBtn.style.marginTop = "10px";
    closeBtn.style.background = "#000000";
    closeBtn.style.color = "#ffffff";
    closeBtn.style.border = "1px solid #7a1212";
    closeBtn.style.borderRadius = "5px";
    closeBtn.style.cursor = "pointer";




    closeBtn.onmouseover = function () {




        this.style.background = "#520505";




    };




    closeBtn.onmouseout = function () {




        this.style.background = "#000000";




    };




    closeBtn.onclick = function () {




        cartWindow.style.display = "none";




    };




    cartWindow.appendChild(closeBtn);




    cartWindow.style.display = "block";




}




// ===============================
// OPEN CART
// ===============================




if (iconButtons.length >= 3) {




    iconButtons[2].onclick = function () {




        displayCart();




    };




}  




// ===============================
// PROFILE VIEW
// ===============================
var profileBox = document.createElement("div");
profileBox.className = "profile-box";




document.body.appendChild(profileBox);




if (iconButtons.length >= 2) {
    iconButtons[1].onclick = function () {


        var name = localStorage.getItem("profileName");
        var email = localStorage.getItem("profileEmail");




        if (name && email) {


            profileBox.innerHTML =
                "<h2>Profile</h2>" +
                "<h3>Name</h3>" +
                "<p>" + name + "</p>" +
                "<h3>Email</h3>" +
                "<p>" + email + "</p><br>" +
                "<button  id='editProfile'>Edit</button> " +
                "<button  id='closeProfile'>Close</button>";


            profileBox.style.display = "block";


            document.getElementById("closeProfile").onclick = function () {
                profileBox.style.display = "none";
            };


            document.getElementById("editProfile").onclick = function () {


                profileBox.innerHTML =
                    "<h2>Log in Profile</h2>" +




                    "<label>Enter Name:</label><br>" +
                    "<input type='text' id='profileName' placeholder='Name' value='" + name + "'><br><br>" +




                    "<label>Enter Email:</label><br>" +
                    "<input type='email' id='profileEmail' placeholder='Email@gmail.com'  value='" + email + "'><br><br>" +




                    "<button id='saveProfile'>Save</button> " +
                    "<button id='closeProfile'>Close</button>";




                document.getElementById("closeProfile").onclick = function () {
                    profileBox.style.display = "none";
                };


                document.getElementById("saveProfile").onclick = function () {




                    localStorage.setItem("profileName",
                        document.getElementById("profileName").value);




                    localStorage.setItem("profileEmail",
                        document.getElementById("profileEmail").value);




                    iconButtons[1].click();
                };


            };


        } else {


            profileBox.innerHTML =
                "<h2>Log in Profile</h2>" +




                "<label>Enter Name</label><br>" +
                "<input type='text' id='profileName' placeholder='Name'><br><br>" +




                "<label>Enter Email</label><br>" +
                "<input type='email' id='profileEmail' placeholder='Email@gmail.com' ><br><br>" +




                "<button id='saveProfile'>Save</button> " +
                "<button id='closeProfile'>Close</button>";




            profileBox.style.display = "block";




            document.getElementById("closeProfile").onclick = function () {
                profileBox.style.display = "none";
            };




            document.getElementById("saveProfile").onclick = function () {




                localStorage.setItem("profileName",
                    document.getElementById("profileName").value);




                localStorage.setItem("profileEmail",
                    document.getElementById("profileEmail").value);
                iconButtons[1].click(2);
            };
        }
    };
}


