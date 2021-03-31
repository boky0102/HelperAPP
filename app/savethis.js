function handleJobSubmit(event){
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", jobData.username);
    formData.append("title", jobData.title);
    formData.append("description", jobData.description);
    formData.append("category", jobData.category);
    formData.append("deadline", jobData.deadline);
    formData.append("budget", jobData.budget);
    formData.append("streetAndNum", jobData.adress.streetAndNum);
    formData.append("city", jobData.adress.city);
    formData.append("country", jobData.adress.country);
    formData.append("productImage", imgFile);

    
    

    console.log("SUBMITED");
    const url="http://localhost:3001/newJob";
    const data = cookies.get('token');

    const config = {
        headers:{
            'authorization': `Bearer ${data}`/* ,
            'content-type' : 'multipart/form-data' */

        }
    }
    
    if(number === true){

        axios.post(url, formData, config)
        .then((response) => {
            if(response.status === 200){
                console.log("New job created");
            }
            else{
                console.log("Not created")
            }
        })
        .catch((err) => {
            console.log(err);
    })

    }
    
}