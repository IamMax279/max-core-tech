# MaxCoreTech full-stack e-commerce app #

![image](https://github.com/user-attachments/assets/1687fb14-f9bc-4e41-818a-16d79b10712f)

![image](https://github.com/user-attachments/assets/8856c6f7-6f3f-4ea9-8861-ef003ab25fce)

![image](https://github.com/user-attachments/assets/f7d2f6f2-1877-4f48-acc2-5229b8a1df3e)

## URL ##
max-core-tech.onrender.com

## Description: ##
This is my e-commerce portfolio project. It involves:
- **Authentication using JWT**
  - Complete login/registration system
  - Email verification
  - Password reset functionality
  - Token refresh mechanism
  - Session management

- **User Management**
  - User profiles with shipping information
  - Account settings and password changes
  - Account deletion with proper data cleanup

- **Shopping Experience**
  - Product browsing and search
  - Shopping cart functionality using Redux
  - Persistent cart across sessions
  - Responsive product display

- **Checkout Process**
  - Address management
  - Shipping options
  - Payment integration with Stripe
  - Order confirmation

## Tech Stack

### Frontend
- **Framework**: Next.js with App Router
- **State Management**: Redux for global state, React Query for server state
- **Styling**: Tailwind CSS with custom theming
- **Form Handling**: Formik with Yup validation
- **Components**: HeroUI library (pop-up modals for the most part)
- **Authentication**: Custom JWT implementation with secure cookie storage

### Backend
- **Framework**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Custom JWT implementation with refresh token rotation
- **Payment Processing**: Stripe API integration
- **Email Services**: Nodemailer for transactional emails

### DevOps
- **Containerization**: Docker & Docker Compose
