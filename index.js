const express = require('express');
const axios = require('axios');

const app = express();

//Function for zero profix
const zeroPrefix = (n) => {
    return (n < 10) ? ('0' + n) : n.toString();
};

//Function to convert Date format

const getDob=(data)=>{
    const date = new Date(data);
    const year = date.getFullYear();
    const month =  zeroPrefix(date.getMonth() + 1);
    const day = zeroPrefix(date.getDate());
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;

}


//Function to get the data of 10 random users in the most time-efficient way.


const getRandomUsers= async ()=> {
    try {

        const response = await axios.get('https://randomuser.me/api/?results=10');
        const users = response.data.results;
        const userData = users.map(user => ({
        Name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        DOB: getDob(user.dob.date),
        email: user.email
        }));
    
        return userData;
        
    } catch (error) {
        console.log('random::api::error::', error)
        return error;
    }
    
}

const PORT = 3000

// API endpoint to get the data of 10 random users
app.get('/users', async (req, res) => {
    try {
        const userData = await getRandomUsers();
        res.status(200).json({
            count: userData.length,
            data:userData
        });
    } catch (error) {
        console.log('random::api::error::', error)
        res.status(400).json({message:error});
    }
    
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

