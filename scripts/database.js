const CremaDatabase = {
    "employees": employees,
    "orders": orders,
    "products": products,
    "productTypes": productTypes,
    "customers": customers,
    "paymentTypes": payments,
    "locations": locations,
    "orderProducts": orderProducts,
}

localStorage.setItem("CremaDatabase", JSON.stringify(CremaDatabase))