import { FirebaseAuthTypes, getAuth } from '@react-native-firebase/auth';

type User = FirebaseAuthTypes.User;

/**
 * Authentication service for handling user authentication
 */
export const authService = {
  /**
   * Register a new user with email and password
   * @param email - User email
   * @param password - User password
   * @returns User object if registration is successful
   */
  register: async (email: string, password: string): Promise<User> => {
    try {
      console.log(`Attempting to register user with email: ${email}`);

      // Validate inputs
      if (!email || !password) {
        throw new Error('Email și parola sunt obligatorii');
      }

      if (password.length < 6) {
        throw new Error('Parola trebuie să conțină cel puțin 6 caractere');
      }

      // Log Firebase auth state before registration
      console.log('Firebase auth state before registration:', {
        currentUser: getAuth().currentUser?.uid,
      });

      // Create user account
      const userCredential = await getAuth().createUserWithEmailAndPassword(
        email.trim(),
        password,
      );

      console.log('User created successfully, sending verification email');

      // Send email verification
      if (userCredential.user) {
        try {
          await userCredential.user.sendEmailVerification();
          console.log('Verification email sent');
        } catch (emailError) {
          console.error('Error sending verification email:', emailError);
          // Continue even if sending email fails
        }
      }

      return userCredential.user;
    } catch (error: any) {
      console.error('Registration error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack,
        nativeErrorCode: error.nativeErrorCode,
        nativeErrorMessage: error.nativeErrorMessage,
      });

      // Handle specific error codes
      if (error.code === 'auth/email-already-in-use') {
        throw new Error(
          'Această adresă de email este deja folosită de un alt cont.',
        );
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Adresa de email nu este validă.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error(
          'Parola este prea slabă. Te rugăm să folosești o parolă mai puternică.',
        );
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('Verifică conexiunea la internet și încearcă din nou.');
      } else if (error.code === 'auth/internal-error') {
        throw new Error(
          'A apărut o eroare internă. Te rugăm să încerci din nou.',
        );
      } else if (error.message) {
        throw new Error(`Eroare la înregistrare: ${error.message}`);
      } else {
        throw new Error(
          'A apărut o eroare necunoscută. Te rugăm să încerci din nou.',
        );
      }
    }
  },

  /**
   * Sign in a user with email and password
   * @param email - User email
   * @param password - User password
   * @returns User object if login is successful
   */
  login: async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await getAuth().signInWithEmailAndPassword(
        email,
        password,
      );
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  /**
   * Sign out the current user
   */
  logout: async (): Promise<void> => {
    try {
      await getAuth().signOut();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  /**
   * Send password reset email
   * @param email - User email
   */
  resetPassword: async (email: string): Promise<void> => {
    try {
      await getAuth().sendPasswordResetEmail(email);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  /**
   * Get current authenticated user
   * @returns Current user or null if not authenticated
   */
  getCurrentUser: (): User | null => {
    return getAuth().currentUser;
  },

  /**
   * Check if user's email is verified
   * @returns Boolean indicating if email is verified
   */
  isEmailVerified: (): boolean => {
    const user = getAuth().currentUser;
    return user ? user.emailVerified : false;
  },

  /**
   * Resend verification email to current user
   */
  resendVerificationEmail: async (): Promise<void> => {
    try {
      const user = getAuth().currentUser;
      if (user) {
        await user.sendEmailVerification();
      } else {
        throw new Error('No user is signed in');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
