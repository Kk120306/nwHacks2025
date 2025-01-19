function validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    const password_pattern = /^[A-Za-z0-9]{1,20}$/;
    
    if(values.email === ""){
        error.email = "Email should not be empty"
    }
    else if (!email_pattern.test(values.email)) {
        error.email = "Email Didn't match"
    }else {
        error.email = "";
    }

    if(values.password === "") {
        error.password = "Password shoudl not be empty"
    }else if (!password_pattern.test(values.password)) {
        error.password = "Password didn't match"
    } else {
        error.password = "";
    }

}

export default validation;