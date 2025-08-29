const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/bfhl',(req,res) => {
    try{
        const {data} = req.body;
        if(!data || !Array.isArray(data)){
            return res.status(400).json({is_success:false,message:"Invalid input, data should be an array"});
    }
    
    const user_id = `sidharth_sivakumar_15042004`;
    const email = "sidharth.sivakumar150404@gmail.com"
    const roll_number = "22BDS0285";

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum_of_numbers = 0;
    let alpha_chars = [];

    for(let item of data){
        if(typeof item !== 'string') continue
        if(/^\d+$/.test(item)){
            const num = parseInt(item);
            sum_of_numbers += num;
            if(num%2===0){
                even_numbers.push(item);
            }else{
                odd_numbers.push(item);
            }
        } else if(/^[a-zA-Z]+$/.test(item)){
            alphabets.push(item.toUpperCase());
            for(let char of item){
                alpha_chars.push(char);
            }
        }else{
            special_characters.push(item);
        }
    }

    alpha_chars.reverse();
    const concatenated_alphabets = alpha_chars.map((char,index)=>{
        return index%2===0 ? char.toUpperCase() : char.toLowerCase();
    }).join('');

    res.status(200).json({
        is_success: true,
        user_id,
        email_id: email,
        college_roll_number: roll_number,
        even_numbers,
        odd_numbers,
        alphabets,
        special_characters,
        sum_of_numbers,
        concatenated_alphabets
    });
    }catch(error){
        console.error('Error:',error);
        res.status(500).json({is_success:false,message:'Internal Server Error'});
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;