# Care.IO - Professional Home Care Services Platform

A modern web application that connects families with professional caregivers for baby care, elderly care, and sick care services.

## What is Care.IO?

Care.IO is a platform where you can easily book professional home care services. Whether you need someone to take care of your baby, elderly parents, or a sick family member, we've got you covered with certified and trusted caregivers.

## Features

- **Browse Services** - Explore different care services with detailed information
- **Easy Booking** - Book services in just a few clicks with location selection
- **User Authentication** - Secure login and registration system
- **My Bookings** - Track all your bookings in one place
- **Booking Management** - View details and cancel bookings when needed
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Beautiful UI** - Modern and user-friendly interface

## Technologies Used

### Frontend
- **Next.js 16** - React framework for building the website
- **React 19** - JavaScript library for user interfaces
- **Tailwind CSS** - For styling and responsive design
- **DaisyUI** - Pre-built UI components
- **SweetAlert2** - Beautiful popup alerts

### Backend
- **Next.js API Routes** - Server-side functionality
- **MongoDB** - Database to store users, services, and bookings
- **NextAuth.js** - User authentication and session management
- **bcrypt** - Password encryption for security

### Additional Tools
- **React Hot Toast** - Notification messages
- **React Icons** - Icon library
- **Swiper** - Touch slider for testimonials

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/care-xyz.git
cd care-xyz
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add:
```env
MONGODB_URI=your_mongodb_connection_string
DB_NAME=careiodb
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
care-xyz/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes
│   │   ├── booking/           # Booking pages
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── services/          # Services pages
│   │   └── my-bookings/       # User bookings page
│   ├── Components/            # Reusable components
│   │   ├── Home/             # Home page sections
│   │   ├── Navbar.jsx        # Navigation bar
│   │   └── Footer.jsx        # Footer
│   ├── data/                  # Static data (locations)
│   └── lib/                   # Utility functions
├── public/                    # Static files (images, etc.)
└── package.json              # Project dependencies
```

## Key Pages

- **Home** (`/`) - Landing page with services overview
- **Services** (`/services`) - Browse all available services
- **Service Details** (`/services/[id]`) - Detailed service information
- **Booking** (`/booking/[id]`) - Book a service (requires login)
- **My Bookings** (`/my-bookings`) - View and manage your bookings
- **Login** (`/login`) - User login with demo credentials
- **Register** (`/register`) - Create a new account

## Demo Credentials

For testing purposes, you can use:
- **Email:** rahim@gmail.com
- **Password:** Rahim123

## Deployment

This project is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

## Contributing

Feel free to fork this project and submit pull requests. Any contributions are welcome!

## License

This project is open source and available under the MIT License.

## Contact

For any questions or support, please reach out to the development team.

---


