const neo4j = require('neo4j-driver')


const uri = "neo4j+s://caf3f6b3.databases.neo4j.io";
const user = "neo4j";
const password = "g8lX1JGG7ic_-H3eD6TNRltbLsNnxhIA0N7yaAtkaFE";

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
const session = driver.session()
const personName = 'Tom Hanks'

async function run() { 

    try {
    const result = await session.run(
        'MATCH (tom:Person {name: $name}) RETURN tom',
        { name: personName }
    )

    const singleRecord = result.records[0]
    const node = singleRecord.get(0)

    console.log(node.properties.name)
    } finally {
    await session.close()
    }

    // on application exit:
    await driver.close();

}

run(); //Alice