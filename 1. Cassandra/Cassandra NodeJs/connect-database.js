const { Client } = require("cassandra-driver");

async function run() {
    const client = new Client({
      cloud: {
        secureConnectBundle: "./secure-connect-databaseonce.zip",
      },
      credentials: {
        username: "OHhXyNaniDEJbNpOjUOytoXg",
        password: "sq.2vB6Rg60tSZDuy0X5IcslKR30-bWrPdn1dWCbZbyrRfplfFylvv5bOr_r1gN8r95Hy1wh4fAdObu+_Soqs0wGPWb.Ej9LMuGoZZ4xwYwll2Rt_KRP6G7ou5nJ-t_j",
      },
    });
  
    await client.connect();
  
    // Execute a query
    // const rs = await client.execute("SELECT * FROM system.local");
    let rs = await client.execute('USE "DatabaseOnce_keyspace"');
    rs = await client.execute('SELECT * FROM users;');
    console.log(`Your cluster returned ${JSON.stringify(rs)} row(s)`);
  
    await client.shutdown();
}
  
// Run the async function
run();