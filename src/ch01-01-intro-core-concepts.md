# Core Concepts

Intecture has a number of components that make up a functioning system. You can install all of these on the same machine, or you can give them dedicated machines. We would recommend something like this:

<p style="text-align: center;">
  <img alt="Recommended layout" src="diagrams/ch01-01-recommended-layout.dot.svg">
</p>

As the diagram suggests, there are four main components that make up Intecture: _Agent_, _API_, _Auth_ and _CLI_. The _Dev box_ also hosts your Intecture Project.

The **Auth server** runs the **Auth** component, which handles security. It acts as a trusted broker between your _Dev box_ and your _Managed hosts_. It also serves as the certificate store for your users and hosts (note that it only stores public keys, not private keys).

The **Dev box** is the most crowded host. It is responsible for running your Intecture project, which means that all of your code dependencies will live here. It's worth noting that this is pretty cool, because it means that your managed hosts will never need to know about your code, its interpreters/runtimes, package managers etc. Depending on the size of your team, this could be a dedicated host, or your own laptop.

To make Intecture do stuff, you need to create an Intecture **Project** via the CLI. Projects are simply structured folders that contain your code, data and any other artifacts you require to make your code 'go'. It might be helpful to think of them as a repository; in fact the CLI will generate a new Git repository in the root of your Project when you create it.

Inside your Project, your _code_ is used to drive Intecture, via the **API**. The API provides you with abstractions for doing things to your managed hosts, like creating directories, installing packages and lots more. You'll firstly use the API to connect to a host, then use other API endpoints to define what you want the host to do (its configuration).

In order to wrangle Intecture's systems, we've also built a **CLI** tool. The CLI helps you to create and run your Project(s), interrogate the Auth server and bootstrap new _Managed hosts_.

>We will sprinkle CLI commands throughout the book as we come across them, so don't worry about learning them all now!

Finally we have the **Agent**. The Agent lives on your managed hosts, i.e. the servers you want Intecture to configure. It listens for connection attempts from the API, and once authenticated, runs commands that the API sends to it.

>Note that the API does not send raw shell commands. It has a request syntax that the Agent interprets and actions independently. This allows the Agent to action a generic request in an environment-specific way. For example, to install a package, the API will simply ask the Agent to "please install that package". The Agent will then interpret that into a set of instructions specific to the environment it is running in. Bing, bang, bosh!
