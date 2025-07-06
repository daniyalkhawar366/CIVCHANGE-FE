# CIVCHANGE Frontend Authentication System

## Overview

This document describes the complete authentication system implemented in the CIVCHANGE frontend application. The system integrates with the backend authentication API hosted at `https://civchange-be-production.up.railway.app`.

## Features Implemented

### 🔐 Authentication Features
- **User Registration** with email OTP verification
- **User Login** with JWT token management
- **Password Reset** via email OTP
- **Email Verification** with resend functionality
- **User Profile** management (view/update)
- **Role-based Access** (user/admin)
- **Protected Routes** with automatic redirects
- **JWT Token Management** with automatic refresh

### 🎨 UI/UX Features
- **Modern Design** with Tailwind CSS
- **Responsive Layout** for all devices
- **Loading States** and error handling
- **Toast Notifications** for user feedback
- **Form Validation** with real-time feedback
- **User Menu** with dropdown functionality

## File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx          # Authentication context and state management
├── components/
│   ├── auth/
│   │   ├── Login.tsx            # Login page
│   │   ├── Register.tsx         # Registration page
│   │   ├── VerifyEmail.tsx      # Email verification page
│   │   ├── ForgotPassword.tsx   # Password reset request page
│   │   ├── ResetPassword.tsx    # Password reset page
│   │   └── Profile.tsx          # User profile page
│   ├── Dashboard.tsx            # User dashboard
│   ├── Admin.tsx                # Admin dashboard
│   ├── ProtectedRoute.tsx       # Route protection component
│   ├── Navigation.tsx           # Updated navigation with auth
│   └── LandingPage.tsx          # Landing page component
├── services/
│   └── api.ts                   # Updated API service with auth endpoints
└── App.tsx                      # Main app with routing
```

## API Integration

### Backend URL
- **Production**: `https://civchange-be-production.up.railway.app`
- **Local**: `http://localhost:5000`

### Authentication Endpoints

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/auth/register` | POST | User registration | No |
| `/auth/login` | POST | User login | No |
| `/auth/verifyEmail` | POST | Email verification | No |
| `/auth/forgot-password` | POST | Password reset request | No |
| `/auth/reset-password` | POST | Password reset | No |
| `/auth/resend-verification` | POST | Resend verification email | No |
| `/auth/profile` | GET | Get user profile | Yes |
| `/auth/profile` | PUT | Update user profile | Yes |

### JWT Token Management

The application automatically:
- Stores JWT tokens in localStorage
- Includes tokens in API requests via Authorization header
- Handles token expiration (401 responses)
- Redirects to login on authentication failures

## Routes

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page
- `/verify-email` - Email verification page
- `/forgot-password` - Password reset request page
- `/reset-password` - Password reset page

### Protected Routes
- `/dashboard` - User dashboard (requires authentication)
- `/profile` - User profile (requires authentication)
- `/admin` - Admin dashboard (requires admin role)

## Components

### AuthContext
Manages authentication state and provides authentication functions:
- `user` - Current user object
- `loading` - Loading state
- `isAuthenticated` - Authentication status
- `isAdmin` - Admin role check
- `login(email, password)` - Login function
- `register(email, password, name)` - Registration function
- `logout()` - Logout function

### ProtectedRoute
Handles route protection and redirects:
- `requireAuth` - Whether authentication is required
- `requireAdmin` - Whether admin role is required
- Automatic redirects based on authentication status

### Navigation
Updated navigation component with:
- Dynamic auth buttons (Login/Register vs User Menu)
- User profile display
- Admin panel link for admin users
- Responsive mobile menu

## Usage Examples

### Login Flow
1. User visits `/login`
2. Enters email and password
3. On successful login, redirected to `/dashboard`
4. JWT token stored in localStorage

### Registration Flow
1. User visits `/register`
2. Enters name, email, and password
3. On successful registration, redirected to `/verify-email`
4. User enters OTP from email
5. Email verified, redirected to `/login`

### Password Reset Flow
1. User visits `/forgot-password`
2. Enters email address
3. Reset instructions sent to email
4. User visits `/reset-password`
5. Enters email, OTP, and new password
6. Password reset, redirected to `/login`

## Security Features

### JWT Token Security
- Tokens stored in localStorage
- Automatic token inclusion in API requests
- Token expiration handling
- Secure logout (token removal)

### Route Protection
- Authentication-based route access
- Role-based route access
- Automatic redirects for unauthorized access
- Loading states during authentication checks

### Form Validation
- Client-side validation
- Server-side error handling
- Real-time feedback
- Secure password requirements

## Styling

The authentication system uses:
- **Tailwind CSS** for styling
- **Responsive design** for all screen sizes
- **Modern UI components** with hover effects
- **Consistent color scheme** (indigo/purple theme)
- **Loading states** and animations

## Error Handling

### API Error Handling
- Network error handling
- Server error responses
- User-friendly error messages
- Toast notifications for feedback

### Form Validation
- Required field validation
- Email format validation
- Password strength requirements
- Password confirmation matching

## Dependencies

### New Dependencies Added
- `react-router-dom` - Client-side routing
- `@types/react-router-dom` - TypeScript types for routing

### Existing Dependencies Used
- `axios` - HTTP client for API calls
- `react-hot-toast` - Toast notifications
- `tailwindcss` - CSS framework

## Deployment

### Frontend Deployment
- Deploy to Vercel or similar platform
- Environment variables for API URLs
- CORS configuration on backend

### Backend Requirements
- CORS enabled for frontend domain
- JWT token validation
- Email service for OTP delivery

## Testing

### Manual Testing Checklist
- [ ] User registration flow
- [ ] Email verification flow
- [ ] Login/logout functionality
- [ ] Password reset flow
- [ ] Profile update functionality
- [ ] Route protection (authenticated routes)
- [ ] Route protection (admin routes)
- [ ] Mobile responsiveness
- [ ] Error handling scenarios

## Future Enhancements

### Potential Improvements
- **Social Login** (Google, GitHub)
- **Two-Factor Authentication** (2FA)
- **Session Management** with refresh tokens
- **Remember Me** functionality
- **Account Deletion** feature
- **Email Preferences** management
- **Activity Log** for user actions
- **Advanced Admin Features** (user management, analytics)

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured for frontend domain
   - Check API URL configuration

2. **JWT Token Issues**
   - Clear localStorage and re-login
   - Check token expiration handling

3. **Email Verification**
   - Check spam folder for verification emails
   - Use resend functionality if needed

4. **Route Protection**
   - Ensure AuthProvider wraps the app
   - Check authentication state loading

## Support

For issues or questions:
1. Check browser console for errors
2. Verify API endpoint responses
3. Test with different browsers
4. Check network connectivity

---

**Note**: This authentication system is fully integrated with the CIVCHANGE backend API and provides a complete user authentication experience with modern UI/UX patterns. 