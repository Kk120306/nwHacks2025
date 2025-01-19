function validation(values) {
    let error = {}
    const email_pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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