# Development of a Web Application to Support the Business of a Second-Hand Clothing Store

Bachelor thesis project (2025) – Razvoj veb-aplikacije za podršku poslovanju prodavnice polovne garderobe.

## Development Steps

1. **Requirements Gathering and Modeling**  
   Collected user requirements and created UML diagrams: use case diagram, class diagram, and sequence diagrams to model system behavior and interactions.

2. **Market and Comparative Analysis**  
   Analyzed the current market state and conducted a comparative analysis of existing online stores for second-hand clothing (examples: local and international thrift platforms). Identified shortcomings and proposed improvements for better user experience and business efficiency.

3. **Database Design**  
   Designed a relational database with tables for users, products, categories, orders, order items, and related entities. Defined primary key auto-generation, constraints, and business logic triggers.

4. **Backend Implementation**  
   Created CRUD operations for all main entities (products, orders, users) along with additional business logic operations to support the system's requirements.

5. **Frontend Implementation**  
   Developed the client-side application and user interface for intuitive interaction.

## Technologies Used

- UML diagrams created with **GenMyModel** (online modeling tool)
- Database developed in **Microsoft SQL Server Management Studio**
- Backend (server-side) built using **.NET** technology in Visual Studio environment
- Frontend (client-side) built using **Angular** in Visual Studio Code environment
- Payment processing implemented with **Stripe**

## Application Description

The system supports two user roles:

1. **User (Customer)**
2. **Administrator**

Both roles share basic attributes, but differ in available functionalities. Authentication and authorization are implemented via username and password login, clearly separating roles.

The application starts with the **Home page**, providing detailed information about the importance of second-hand clothing for sustainability and fashion reuse. The main **Shop page** displays all available products with additional features described below.

### Functionalities

- **Login**  
  User and Administrator log in using username and password.

- **Registration**  
  New users can register by filling out the appropriate form.

- **Product Browsing**  
  Users and Administrators can view all available products on the Shop page with pagination for better visibility.

- **Product Sorting**  
  Products can be sorted by name, price (low to high or high to low), or displayed in default order.

- **Product Search**  
  Search by entering letters or keywords – matching products are listed.

- **Product Categories**  
  Selecting a category displays only products belonging to it.

- **Product Details**  
  Hovering over a product offers options: "Add to Cart" and "View". "View" shows detailed description, price, photos, size, condition, and allows adding to cart.

- **Shopping Cart**  
  Cart icon in the navigation bar shows the number of items. Users can update quantity, remove items, or proceed to checkout.

- **Checkout & Payment**  
  Multi-step checkout: fill address/user details → review order → enter card information (valid or invalid for testing). Successful payment accepts the order; invalid shows an error message.

- **Product Management (Admin only)**  
  Administrator can add new products, update existing ones, delete products, upload photos.

- **User & Order Management (Admin only)**  
  Administrator can view all users and their orders, including payment status.
