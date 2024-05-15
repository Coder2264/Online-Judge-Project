import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
  });
  
  const User = mongoose.model('User', userSchema);

/*const user1 = new User({
  name: 'John Doe',
  email: 'john@doe.com',
  age: 25
});

const user2 = new User({
    name: 'Alice Doe',
    email: 'Alice@doe.com',
    age: 24
  });

user1.save()
.then((res) => console.log(res))
.catch((err) => console.log(err));*/

User.findOne({age:{ $gt: 24 }})
.then((res) => console.log(res))
.catch((err) => console.log(err));