function validation(values) {
    let error = {}; // Initialize the error object
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    const password_pattern = /^[A-Za-z0-9]{1,20}$/;

    // Name validation
    if (values.name === "") {
        error.name = "Name should not be empty";
    } else {
        error.name = ""; // Clear any existing error message
    }

    // Email validation
    if (values.email === "") {
        error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email didn't match";
    } else {
        error.email = ""; // Clear any existing error message
    }

    // Password validation
    if (values.password === "") {
        error.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password didn't match";
    } else {
        error.password = ""; // Clear any existing error message
    }

    // Return the error object
    return error;
}

export default validation;
