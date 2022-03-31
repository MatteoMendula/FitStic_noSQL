const mongoose = require('mongoose');

const my_pasword = "PLACE_YOUR_PWD_HERE";
const my_cluster = "PLACE_YOUR_CLUSTER_NAME_HERE";
mongoose.connect(`mongodb+srv://nomeSignificativo:${my_pasword}@cluster0.mml7f.mongodb.net/${my_cluster}?retryWrites=true&w=majority`);

const Cat = mongoose.model('Cat', { name: String });

async function run(){
    const kitty1 = new Cat({ name: 'Zildjian' });
    const kitty2 = new Cat({ name: 'Romeo' });

    const res1 = await kitty1.save();
    const res2 = await kitty2.save();
    console.log('Zildjian result:', res1);
    console.log('Romeo result:', res2);

    const kittens = await Cat.find();
    console.log("all kittens", kittens);

    const look4romeo = await Cat.find({name: "Romeo"});
    console.log("romeo", look4romeo);
}

run();
