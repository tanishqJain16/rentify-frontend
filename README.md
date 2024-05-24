# Rentify - Real Estate Property Listing

## Overview

Rentify is a Real Estate Property Listing web application designed to help users find rental properties easily. The application provides a platform where users can browse, filter, and sort through various rental properties based on their preferences. With Rentify, users can quickly discover available properties, view detailed information, and connect with property owners or agents. The application offers authentication functionality, allowing users to securely log in and manage their rental properties. Whether you're a potential tenant searching for the perfect rental or a property owner looking to list your properties, Rentify makes the process simple and efficient.

## Project Structure

### Components

- **LoginPage**: Handles user authentication.
- **SignUpPage**: Allows new users to create an account.
- **PropertyListingBuyer**: Displays all listed properties to potential tenants with options to filter and sort the listings.
- **PropertyListingSeller**: Allows property owners or agents to view, add, update, and delete their rental properties.
- **PropertyCard**: Displays individual property details.

### Services

- **PropertyDetails**: Contains API calls related to fetching, adding, updating, and deleting property details.

### Assets

- **Images**: Contains image files used in the application, such as `noData.webp`.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/tanishqJain16/rentify-frontend.git
    ```
2. Navigate to the project directory:
    ```sh
    cd rentify-frontend
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage

You can access the deployed Rentify application using the following link:

[Real Estate Property Listing](https://rentify-woad.vercel.app/)

### Authentication

- **Login**: Users can log in with their email and password.
- **Sign Up**: New users can create an account by providing their details.

### Buyer Interface

1. **View Properties**: All listed rental properties are displayed.
2. **Filter Properties**: Tenants can filter properties by price range and location.
3. **Sort Properties**: Tenants can sort properties by price (low to high, high to low).
4. **Contact Property Owner**: Buyers can view contact details of the property owner and email the details to their registered email address.

### Seller Interface

1. **View Listed Properties**: Property owners or agents can view properties they have listed for rent.
2. **Add New Property**: Owners can add new rental properties by providing necessary details.
3. **Update Property**: Owners can update details of their listed properties.
4. **Delete Property**: Owners can delete their listed properties.

## Application Flow

1. **Authentication**: 
   - Users must log in or sign up to access the Rentify application.
   - Upon successful login, the user's role (tenant or property owner) determines their interface.

2. **Buyer Flow**:
   - Tenants can browse through available rental properties.
   - They can apply filters to narrow down properties based on their preferences.
   - Sorting options are available to arrange properties based on price.

3. **Seller Flow**:
   - Owners or agents can view properties they have listed for rent.
   - They can add new properties, update existing ones, or delete properties as needed.
   - Property owners can log out from their account.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Vite**: Development server and build tool.
- **React Router**: For routing between different pages.
- **Redux Toolkit**: For state management.
- **Material-UI**: For UI components.
- **React Hot Toast**: For notifications.

## Contributing

If you would like to contribute to Rentify, please fork the repository and create a pull request with your changes. Ensure your code follows the project's style guidelines and includes relevant tests.

## License

Rentify is licensed under the MIT License. See the LICENSE file for more information.
