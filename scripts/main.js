const orderSummaryEl = document.getElementById("orders")

let domString = ""

CremaDatabase.orders.forEach(
    order => {
        // Get the customer
        const currentCustomer = CremaDatabase.customers.find(
            c => c.CustomerId === order.CustomerId
        )

        // Get the employee
        const employee = CremaDatabase.employees.find(
            c => c.EmployeeId === order.EmployeeId
        )

        // Get the location
        const location = CremaDatabase.locations.find(
            c => c.LocationId === order.LocationId
        )

        // Get the payment
        const payment = CremaDatabase.paymentTypes.find(
            c => c.PaymentId === order.PaymentId
        )

        // Get the products
        const orderProducts = CremaDatabase.orderProducts.filter(
            c => c.OrderId === order.OrderId
        )

        const arrayOfOrderedProducts = []
        let totalPrice = 0

        orderProducts.forEach(
            op => {
                const foundProduct = CremaDatabase.products.find(
                    p => op.ProductId === p.ProductId
                )

                arrayOfOrderedProducts.push(foundProduct)
                totalPrice += foundProduct.Price
            }
        )

        domString += `
            <article id="order--${order.OrderId}">
                <section class="order__customer">
                    <h2>${currentCustomer.Name}</h2>
                </section>
                <section>
                    Total price: $${totalPrice}
                </section>
                Date ordered: <time>${order.Date}</time>
            </article>
        `

        let x = 1 // My breakpoint
    }
)

orderSummaryEl.innerHTML = domString
