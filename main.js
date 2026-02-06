// Main JavaScript for index.html
// Handles form submission and wish creation

import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const wishForm = document.getElementById('wishForm');
    const generateBtn = document.getElementById('generateBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const errorMessage = document.getElementById('errorMessage');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const emailInput = document.getElementById('email');
    const confirmEmailInput = document.getElementById('confirmEmail');
    const emailMatchNote = document.getElementById('emailMatchNote');
    const genderInputs = document.querySelectorAll('input[name="gender"]');

    // Update button text based on gender selection
    genderInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const gender = e.target.value;
            const pronoun = gender === 'male' ? 'her' : 'him';
            btnText.textContent = `Don't hesitate… go make ${pronoun} smile this Valentine's 💖`;
            
            // Update button color based on gender (male=pink, female=blue)
            if (gender === 'female') {
                generateBtn.classList.add('btn-female');
            } else {
                generateBtn.classList.remove('btn-female');
            }
        });
    });

    // Initialize character count with default message
    charCount.textContent = messageTextarea.value.length;

    // Update character count
    messageTextarea.addEventListener('input', () => {
        charCount.textContent = messageTextarea.value.length;
    });

    // Email confirmation validation
    function validateEmailMatch() {
        const email = emailInput.value;
        const confirmEmail = confirmEmailInput.value;
        
        if (confirmEmail === '') {
            emailMatchNote.textContent = '';
            emailMatchNote.style.color = '';
            return true;
        }
        
        if (email === confirmEmail) {
            emailMatchNote.textContent = '✅ Emails match';
            emailMatchNote.style.color = '#4caf50';
            return true;
        } else {
            emailMatchNote.textContent = '❌ Emails do not match';
            emailMatchNote.style.color = '#f44336';
            return false;
        }
    }

    confirmEmailInput.addEventListener('input', validateEmailMatch);
    emailInput.addEventListener('input', () => {
        if (confirmEmailInput.value !== '') {
            validateEmailMatch();
        }
    });

    // Throttling configuration
    const THROTTLE_DURATION = 10000; // 10 seconds between submissions
    const THROTTLE_KEY = 'lastWishSubmission';

    // Check if user can submit (throttle check)
    function canSubmit() {
        const lastSubmission = localStorage.getItem(THROTTLE_KEY);
        if (!lastSubmission) return true;
        
        const timeSinceLastSubmission = Date.now() - parseInt(lastSubmission);
        return timeSinceLastSubmission >= THROTTLE_DURATION;
    }

    // Get remaining cooldown time
    function getRemainingCooldown() {
        const lastSubmission = localStorage.getItem(THROTTLE_KEY);
        if (!lastSubmission) return 0;
        
        const timeSinceLastSubmission = Date.now() - parseInt(lastSubmission);
        const remaining = THROTTLE_DURATION - timeSinceLastSubmission;
        return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
    }

    // Handle form submission
    wishForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Check throttling
        if (!canSubmit()) {
            const remainingSeconds = getRemainingCooldown();
            showError(`Please wait ${remainingSeconds} seconds before creating another wish.`);
            return;
        }

        // Get form values
        const recipientName = document.getElementById('recipientName').value.trim();
        const message = document.getElementById('message').value.trim();
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const email = emailInput.value.trim();
        const confirmEmail = confirmEmailInput.value.trim();

        // Validate inputs
        if (!recipientName || !message || !gender || !email || !confirmEmail) {
            showError('Please fill in all fields');
            return;
        }

        // Validate email match
        if (email !== confirmEmail) {
            showError('Emails do not match. Please check and try again.');
            confirmEmailInput.focus();
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address');
            return;
        }

        // Validate length
        if (recipientName.length > 15) {
            showError('Name must be 15 characters or less');
            return;
        }

        if (message.length > 400) {
            showError('Message must be 400 characters or less');
            return;
        }

        // Disable button and show loader
        generateBtn.disabled = true;
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');
        errorMessage.classList.add('hidden');

        try {
            // Execute reCAPTCHA (skip on localhost if not configured)
            let recaptchaToken = null;
            try {
                recaptchaToken = await grecaptcha.execute('6LeZfGIsAAAAALInW9lxC1-U_sHdFYAtIAnAXasM', { action: 'create_wish' });
                console.log('reCAPTCHA token obtained');
            } catch (recaptchaError) {
                console.warn('reCAPTCHA error (may be localhost):', recaptchaError.message);
                recaptchaToken = 'localhost_bypass';
            }

            // Calculate expiry time (30 minutes from now)
            const now = new Date();
            const expiresAt = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes

            // Create wish document
            const wishData = {
                recipientName: recipientName,
                message: message,
                gender: gender,
                email: email,
                createdAt: serverTimestamp(),
                expiresAt: expiresAt,
                paid: false,
                recaptchaToken: recaptchaToken, // Store token for server-side verification

                txnId: null
            };

            // Add to Firestore
            const docRef = await addDoc(collection(db, 'wishes'), wishData);
            
            console.log('Wish created with ID:', docRef.id);

            // Store submission timestamp for throttling
            localStorage.setItem(THROTTLE_KEY, Date.now().toString());

            // Redirect to wish page
            const basePath = window.location.pathname.includes('/valentine.github.io/') ? '/valentine.github.io' : '';
            window.location.href = `${basePath}/v.html?id=${docRef.id}`;

        } catch (error) {
            console.error('Error creating wish:', error);
            showError('Failed to create wish. Please check your Firebase configuration and try again.');
            
            // Re-enable button
            generateBtn.disabled = false;
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
        }
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 5000);
    }
});
