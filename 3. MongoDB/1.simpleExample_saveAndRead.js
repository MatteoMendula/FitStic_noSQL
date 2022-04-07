const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://nomeSignificativo:svslwSwqHrliMVaJ@cluster0.mml7f.mongodb.net/Cluster0?retryWrites=true&w=majority`);

const Cat = mongoose.model('Cat', { name: String });

async function run(){
    const kitty = new Cat({ name: 'Zildjian' });
    kitty.save().then(() => console.log('meow'));

    const kittens = await Cat.find();
    console.log(kittens);
}

run();
