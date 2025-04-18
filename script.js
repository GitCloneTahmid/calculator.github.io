function redirectToProduct() {
    const product = document.getElementById("product").value;
    if (product) {
        // Define the paths based on the product selected
        let path;
        switch (product) {
            case "tshirt":
                path = "tshirt/tshirt.html";
                break;
            case "poloshirt":
                path = "polo%20consumption/polo.html"; // Updated path
                break;
            case "pants":
                path = "pant%20consumption/pant.html"; // Updated path
                break;
            case "boxers":
                path = "boxers%20consumption/boxers.html";
                break;
            default:
                path = "index.html"; // Fallback to homepage
        }
        window.location.href = path;
    } else {
        alert("Please select a product before confirming!");
    }
}
