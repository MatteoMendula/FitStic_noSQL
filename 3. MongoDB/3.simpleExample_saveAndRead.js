const mongoose = require('mongoose');

const my_pasword = "PLACE_YOUR_PWD_HERE";
const my_cluster = "PLACE_YOUR_CLUSTER_NAME_HERE";
mongoose.connect(`mongodb+srv://nomeSignificativo:${my_pasword}@cluster0.mml7f.mongodb.net/${my_cluster}?retryWrites=true&w=majority`);

const Cat = mongoose.model('Cat', { name: String });

async function run(){
    const kitty = new Cat({ name: 'Zildjian' });
    await kitty.save();
    console.log('meow');
    const kittens = await Cat.find();
    console.log(kittens);
}

run();
