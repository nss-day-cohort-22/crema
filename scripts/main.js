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
            e => e.EmployeeId === order.EmployeeId
        )

        // Get the location
        const location = CremaDatabase.locations.find(
            l => l.LocationId === order.LocationId
        )

        // Get the payment
        const payment = CremaDatabase.paymentTypes.find(
            p => p.PaymentId === order.PaymentId
        )

        // Get the products
        const orderProducts = CremaDatabase.orderProducts.filter(
            op => op.OrderId === order.OrderId
        )

        /*
            Create a variable, initialized to 0, to hold the total
            price of the order
        */
        let totalPrice = 0

        /*
            Now that we have a reference to all of the products on
            the order, let's get the actual product object in the
            Products table
        */
        orderProducts.forEach(
            op => {
                // The product object with the matching primary key
                const foundProduct = CremaDatabase.products.find(
                    p => op.ProductId === p.ProductId
                )

                // Add price of current line item to total price of order
                totalPrice += foundProduct.Price
            }
        )

        // Build the HTML representation of the current order
        domString += `
            <article id="order--${order.OrderId}" class="order">
                <section class="order__customer">
                    <h2>${currentCustomer.Name}</h2>
                </section>
                <section class="order__price>
                    Total price: $${totalPrice}
                </section>
                <section class="order__date>
                    Date ordered: <time>${order.Date}</time>
                </section>
            </article>
        `
    }
)

// Add all order components to the DOM
orderSummaryEl.innerHTML = domString
