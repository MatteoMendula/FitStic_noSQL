const mongoose = require('mongoose');

const my_pasword = "PLACE_YOUR_PWD_HERE";
const my_cluster = "PLACE_YOUR_CLUSTER_NAME_HERE";
mongoose.connect(`mongodb+srv://nomeSignificativo:${my_pasword}@cluster0.mml7f.mongodb.net/${my_cluster}?retryWrites=true&w=majority`);

const Cat = mongoose.model('Cat', { name: String });

async function run(){

    // Update all cats with name Romeo to name RomeoUpdated
    const resUpdateRomeo = await Cat.updateMany({ name: "Romeo" }, { name: "RomeoUpdated" });
    console.log("resUpdateRomeo", resUpdateRomeo);

    const kittens = await Cat.find();
    console.log("all kittens", kittens);

    const look4romeo = await Cat.find({name: "Romeo"});
    console.log("romeo", look4romeo);

    const look4updateRomeo = await Cat.find({name: "RomeoUpdated"});
    console.log("updated romeo", look4updateRomeo);
}

run();
