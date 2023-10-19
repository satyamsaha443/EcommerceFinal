document.addEventListener("DOMContentLoaded", function() {
    displayCartItems();
});

function displayCartItems() {
    const cartContainer = document.getElementById('cart-items');
    const totalAmountElem = document.getElementById('total-amount');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartContainer.innerHTML = "";
    
    let totalAmount = 0;  // Added to track total amount

    cart.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.style.boxShadow = "inset 0px 0.5px 0px 0px #0000001a";
        tr.innerHTML = `
            <td style="width:10rem; display: flex; align-items: center; justify-content: center; flex-wrap: wrap;"><img src="${item.image}" alt="${item.name}" width="50"></td>
            <td style="width:35%;">${item.name}</td>
            <td style="width:15%;">₹${item.price}</td>
            <td width:5%;>${item.quantity}</td>
            <td style="width:15%;">₹${item.price * item.quantity}</td>
            <td style="width:30%;">
                <button onclick="addQuantity(${index})" class="btn-cart">Add</button>
                <button onclick="subQuantity(${index})" class="btn-cart">Remove</button>
                <button onclick="removeFromCart(${index})" class="btn-cart">Delete</button>
            </td>
        `;

        cartContainer.appendChild(tr);
        
        totalAmount += item.price * item.quantity;  // Update the total amount for each item
    });
    
    // Round off the total amount to the nearest whole number and update the total amount section
    totalAmountElem.innerText = "₹" + Math.round(totalAmount);
}



function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function addQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function subQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if(cart[index].quantity >0){
        cart[index].quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));

    }
        displayCartItems();
}



var options = {
    "key": "rzp_test_X67TVYyGPWNAzm", // Enter the Key ID generated from the Dashboard
    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Acme Corp", //your business name
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": " ", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
    },
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com", 
        "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
var rzp1 = new Razorpay(options);
rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
// document.getElementById('rzp-button1').onclick = function(e){
//     rzp1.open();
//     e.preventDefault();
// }




function proceedToPayment() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    rzp1.open();
     e.preventDefault();
    if(cart.length >0){
     window.location.href = 'payment.html';
    }else{
     alert('Your cart is empty. Please add some items first!!');
    }
 }