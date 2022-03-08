# Getting Started with Neo4j
## Developer Guide Overview

material taken from https://neo4j.com/developer/get-started/

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/urO5FyP9PoI/0.jpg)](https://www.youtube.com/watch?v=urO5FyP9PoI)

## What is a Graph Database?
We live in a connected world, and understanding most domains requires processing rich sets of connections to understand what’s really happening. Often, we find that the connections between items are as important as the items themselves.

![alt text](https://dist.neo4j.com/wp-content/uploads/graph-example.png)

## The Property Graph Model
In Neo4j, information is organized as **nodes**, **relationships**, and **properties**.
**Nodes** are the entities in the graph.

- Nodes can be tagged with labels, representing their different roles in your domain. (For example, Person).
- Nodes can hold any number of key-value pairs, or properties. (For example, name)
- Node labels may also attach metadata (such as index or constraint information) to certain nodes.

**Relationships** provide directed, named, connections between two node entities (e.g. Person LOVES Person).

- Relationships always have a direction, a type, a start node, and an end node, and they can have properties, just like nodes.
- Nodes can have any number or type of relationships without sacrificing performance.
- Although relationships are always directed, they can be navigated efficiently in any direction.

If you’d like to learn more about any of these, you can read more about Graph Data Modeling.

## Components of the Neo4j Graph Platform

Each of the elements listed below was designed to fill a business or technical need in the image above. We continue to improve the different perspectives from which to view data, as well as capabilities of the products themselves.

Detailed information and walkthroughs are covered in more detail in subsequent pages of this section, but if you have any questions or issues, don’t hesitate to reach out through the Neo4j Online Community!

- Neo4j Graph Database - our core graph database that is built to store and retrieve connected data. There are two editions a Community Edition and an Enterprise Edition. Everything in our platform interacts with data stored in the database.
- Neo4j Desktop - application to manage local instances of Neo4j. Free download includes Neo4j Enterprise Edition license.
- Neo4j Browser - online browser interface to query and view the data in the database. Basic visualization capabilities using Cypher query language.
- Neo4j Bloom - visualization tool for business users that does not require any code or programming skills to view and analyze data. Documentation is also available in our docs section.
- Neo4j AuraDB - database-as-a-service offering managed by Neo4j for graph databases in the cloud. Find out more general information on the product page.
- Graph Data Science - officially-supported library for executing graph algorithms with Neo4j and optimized for enterprise workloads and pipelines. Documentation for the library is also available.

![alt text](https://dist.neo4j.com/wp-content/uploads/neo4j_graph_platform.jpg)

# Your First Steps

- Create an AuraDB Free Instance
- Learn to Create and Query Data with Cypher
- Build an Application and host it on Neo4j AuraDB Free
- Get Help on our Neo4j Online Community [here](https://community.neo4j.com/)

## Create an AuraDB Free Instance
- Go to https://neo4j.com/cloud/aura/?ref=developer-guides;
- Follow the procedure to register your account and create a DB, choose the free plan;
- Open with **Neo4J Browser**.

![alt text](https://dist.neo4j.com/wp-content/uploads/free-database-type.png)

## Learn to Create and Query Data with Cypher
Once you have an AuraDB database, you can use the :play cypher command inside of Neo4j Browser to get started.
A first very basic example can be run by tying 

```sh
:play cypher
```

![alt text](https://dist.neo4j.com/wp-content/uploads/play-cypher-command.png)

then follow the suggested commands to start learning Cypher.

## Start with Cypheer
Taken from https://neo4j.com/developer/cypher/guide-cypher-basics/

```sh
:play movie graph
```

## Tutorial: Build a Cypher Recommendation Engine
Taken from https://neo4j.com/developer/cypher/guide-build-a-recommendation-engine/

### Basic Queries
Before we start recommending things, we need to find out what is interesting in our data to see what kinds of things we can and want to recommend. To start, let us run a query like this to find a single actor like Tom Hanks.

```sh
MATCH (tom:Person {name: 'Tom Hanks'})
RETURN tom
```

This should return:
![alt text](https://dist.neo4j.com/wp-content/uploads/cytutorial_match_tomhanks2.png)

Now that we found an actor we are interested in, we can retrieve all his movies by starting from the Tom Hanks node and following the ACTED_IN relationships. Your results should look like a graph.

```sh
MATCH (tom:Person {name: 'Tom Hanks'})-[r:ACTED_IN]-&gt;(movie:Movie)
RETURN tom, r, movie
```

![alt text](https://dist.neo4j.com/wp-content/uploads/cytutorial_tomhanks_movies2.png)

Of course, Tom has colleagues who acted with him in his movies. A statement to find Tom’s co-actors looks like this:

```sh
MATCH (tom:Person {name: 'Tom Hanks'})-[:ACTED_IN]-&gt;(:Movie)&lt;-[:ACTED_IN]-(coActor:Person)
RETURN coActor.name
```

![alt text](https://dist.neo4j.com/wp-content/uploads/cytutorial_tomhanks_coactors2.png)

### Recommendations with Collaborative Filtering

We can now turn the co-actor query above into a recommendation query by following those relationships another step out to find the "co-co-actors", i.e. the second-degree actors in Tom’s network. This will show us all the actors Tom may not have worked with yet, and we can specify a criteria to be sure he hasn’t directly acted with that person.

```ssh
MATCH (tom:Person {name: 'Tom Hanks'})-[:ACTED_IN]-&gt;(movie1:Movie)&lt;-[:ACTED_IN]-(coActor:Person)-[:ACTED_IN]-&gt;(movie2:Movie)&lt;-[:ACTED_IN]-(coCoActor:Person)
WHERE tom &lt;&gt; coCoActor
AND NOT (tom)-[:ACTED_IN]-&gt;(:Movie)&lt;-[:ACTED_IN]-(coCoActor)
RETURN coCoActor.name
```

![alt_text](https://dist.neo4j.com/wp-content/uploads/cytutorial_tomhanks_cocoactors2.png)

You probably noticed that a few names appear multiple times. This is because there are multiple paths to follow from Tom Hanks to these actors.
To see which co-co-actors appear most often in Tom’s network, we can take **frequency** of occurrences into account by counting the number of paths between Tom Hanks and each coCoActor and ordering them by highest to lowest value.

```ssh
MATCH (tom:Person {name: 'Tom Hanks'})-[:ACTED_IN]-&gt;(movie1:Movie)&lt;-[:ACTED_IN]-(coActor:Person)-[:ACTED_IN]-&gt;(movie2:Movie)&lt;-[:ACTED_IN]-(coCoActor:Person)
WHERE tom &lt;&gt; coCoActor
AND NOT (tom)-[:ACTED_IN]-&gt;(:Movie)&lt;-[:ACTED_IN]-(coCoActor)
RETURN coCoActor.name, count(coCoActor) as frequency
ORDER BY frequency DESC
LIMIT 5
```

![alt](https://dist.neo4j.com/wp-content/uploads/cytutorial_tomhanks_cocoactors_freq2.png)

### Exploring the Paths     

```ssh
MATCH (tom:Person {name: 'Tom Hanks'})-[:ACTED_IN]-&gt;(movie1:Movie)&lt;-[:ACTED_IN]-(coActor:Person)-[:ACTED_IN]-&gt;(movie2:Movie)&lt;-[:ACTED_IN]-(cruise:Person {name: 'Tom Cruise'})
WHERE NOT (tom)-[:ACTED_IN]-&gt;(:Movie)&lt;-[:ACTED_IN]-(cruise)
RETURN tom, movie1, coActor, movie2, cruise
```


![alt](https://dist.neo4j.com/wp-content/uploads/cytutorial_tomhanks_tomcruise2.png)

As you can see, this returns multiple paths. If you have ever played the six degrees of Kevin Bacon game, this concept of seeing how many hops exist between people is exactly what graphs depict. You will notice that our results even return a path with Kevin Bacon himself.
With these two simple Cypher statements, we already created two recommendation algorithms - who to meet/work with next and how to meet them.
