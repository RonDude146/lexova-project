import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '../src/App';
import SignIn from '../src/pages/SignIn';
import SignUp from '../src/pages/SignUp';
import Landing from '../src/pages/Landing';

// Mock the API calls
jest.mock('../src/services/api', () => ({
  login: jest.fn(() => Promise.resolve({ token: 'fake-token', user: { role: 'client' } })),
  register: jest.fn(() => Promise.resolve({ success: true })),
  getProfile: jest.fn(() => Promise.resolve({ name: 'Test User', email: 'test@example.com' })),
}));

// Helper function to render components with router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </BrowserRouter>
  );
};

describe('Lexova Frontend Tests', () => {
  test('Landing page renders correctly', () => {
    renderWithRouter(<Landing />);
    
    // Check for key elements on the landing page
    expect(screen.getByText(/AI-Powered Legal Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Find the right lawyer/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument();
  });

  test('Sign In page renders and form works correctly', async () => {
    renderWithRouter(<SignIn />);
    
    // Check for form elements
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    
    // Fill and submit the form
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
    
    // Wait for the form submission to complete
    await waitFor(() => {
      expect(screen.getByText(/Signing in/i) || screen.getByText(/Dashboard/i)).toBeInTheDocument();
    });
  });

  test('Sign Up page renders and form works correctly', async () => {
    renderWithRouter(<SignUp />);
    
    // Check for form elements
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    
    // Fill and submit the form
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'newuser@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
    
    // Wait for the form submission to complete
    await waitFor(() => {
      expect(screen.getByText(/Creating your account/i) || screen.getByText(/Success/i)).toBeInTheDocument();
    });
  });

  test('Navigation works correctly', () => {
    renderWithRouter(<App />);
    
    // Check if navigation links exist
    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();
    
    // Navigate to About page
    fireEvent.click(aboutLink);
    
    // Check if About page content is rendered
    expect(screen.getByText(/About Lexova/i)).toBeInTheDocument();
  });

  test('SEO elements are present', () => {
    renderWithRouter(<App />);
    
    // Check if meta tags are set correctly
    const helmet = document.querySelector('title');
    expect(helmet).toBeInTheDocument();
    expect(helmet.textContent).toContain('Lexova');
  });
});

// More specific component tests could be added here

