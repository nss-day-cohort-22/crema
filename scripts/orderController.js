// Reference to the DOM element which will contain all order components
const orderSummaryEl = document.getElementById("orders")

// Define variable for holding order components, as a string
let domString = ""

// Factory function to build order component for DOM
const orderComponentFactory = (order, customer, price) => `
    <article id="order--${order.OrderId}" class="order">
    <section class="order__customer">
        <h2>${customer.Name}</h2>
    </section>
    <section class="order__price>
        Total price: $${price}
    </section>
    <section class="order__date>
        Date ordered: <time>${order.Date}</time>
    </section>
    </article>
`

// Iterate over all the orders
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
        domString += orderComponentFactory(order, currentCustomer, totalPrice)
    }
)

// Add all order components to the DOM
orderSummaryEl.innerHTML = domString
