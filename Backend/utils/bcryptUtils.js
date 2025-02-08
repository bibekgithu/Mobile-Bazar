// Import bcrypt
const bcrypt = require('bcryptjs');

// Example: Hashing a password
const hashPassword = async (password) => {
    try {
        // Generate a salt (optional: specify rounds, e.g., 10)
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
};

// Example: Comparing a password
const comparePassword = async (enteredPassword, hashedPassword) => {
    try {
        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
        return isMatch; // Returns true if passwords match, false otherwise
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
};

// Example Usage
(async () => {
    const plainPassword = 'mySecurePassword123';

    // Hash the password
    const hashed = await hashPassword(plainPassword);
    console.log('Hashed Password:', hashed);

    // Compare the password
    const isMatch = await comparePassword(plainPassword, hashed);
    console.log('Do passwords match?', isMatch); // Should log true
})();