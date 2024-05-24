# Real Estate Property Listing

## Overview

This project is a Real Estate Property Listing web application that allows users to view, filter, and sort listed properties. The application includes authentication functionality, enabling users to log in and log out. Buyers can filter properties by price range and location, while sellers can add, update, and delete their properties. The application is built using React with Vite for the development server, and backend services providing property data.

## Project Structure

### Components

- **LoginPage**: Handles user authentication.
- **SignUpPage**: Allows new users to create an account.
- **PropertyListingBuyer**: Displays all listed properties to buyers with options to filter and sort the listings.
- **PropertyListingSeller**: Allows sellers to view, add, update, and delete their properties.
- **PropertyCard**: Displays individual property details.

### Services

- **PropertyDetails**: Contains API calls related to fetching, adding, updating, and deleting property details.

### Assets

- **Images**: Contains image files used in the application, such as `noData.webp`.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/real-estate-listing.git
    ```
2. Navigate to the project directory:
    ```sh
    cd real-estate-listing
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage

You can access the deployed project using the following link:

[Real Estate Property Listing](http://example.com)  <!-- Replace with your actual deployed link -->

### Authentication

- **Login**: Users can log in with their email and password.
- **Sign Up**: New users can create an account by providing their details.

### Buyer Interface

1. **View Properties**: All listed properties are displayed.
2. **Filter Properties**: Buyers can filter properties by price range and location.
3. **Sort Properties**: Buyers can sort properties by price (low to high, high to low).

### Seller Interface

1. **View Listed Properties**: Sellers can view properties they have listed.
2. **Add New Property**: Sellers can add new properties by providing details such as type, location, price, area, and other relevant information.
3. **Update Property**: Sellers can update details of their listed properties.
4. **Delete Property**: Sellers can delete their listed properties.

## Application Flow

1. **Authentication**: 
   - Users must log in or sign up to access the application.
   - Upon successful login, the user's profession (buyer or seller) determines their interface.

2. **Buyer Flow**:
   - Buyers can view all properties listed.
   - They can apply filters to narrow down properties by price and location.
   - Sorting options are available to arrange properties based on price.

3. **Seller Flow**:
   - Sellers can view properties they have listed.
   - They can add new properties by providing necessary details.
   - Sellers can update or delete their properties as needed.
   - Sellers can log out from their account.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Vite**: Development server and build tool.
- **React Router**: For routing between different pages.
- **Redux Toolkit**: For state management.
- **Material-UI**: For UI components.
- **React Hot Toast**: For notifications.

## Contributing

If you would like to contribute to this project, please fork the repository and create a pull request with your changes. Ensure your code follows the project's style guidelines and includes relevant tests.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
