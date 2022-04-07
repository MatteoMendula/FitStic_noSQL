async function ciao(){
    console.log("ciao")
    console.log("va")
}

async function piappo(){
    await ciao()
}

piappo()