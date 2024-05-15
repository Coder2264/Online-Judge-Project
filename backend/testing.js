import jwt from 'jsonwebtoken';

const payload ={
    id:'3902mofmo2e0211k',
    email:'akhtarkamran2004@gmail.com',
    name:'Kamra_2004'
}

const token=jwt.sign(payload,'putbidmbs', {expiresIn:'1h'});

console.log(token);

const decoded=jwt.verify(token,'putbidmbs');

console.log(decoded);