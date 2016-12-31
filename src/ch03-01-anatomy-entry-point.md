# The Entry Point

When an Intecture project is run, the _entry point_ is the binary/code file that the _CLI_ executes first. This is known in Intecture as a _bootstrap_, as it 'bootstraps' your build. For example, in Rust the bootstrap is the binary produced by `src/main.rs`. The _CLI_ will create this file for you when you create a new project.

> See the [Project reference](ch05-05-reference-projects.html) for the _bootstrap_ for each language.

The code in your bootstrap file is responsible for connecting to a host and running payloads for that host as required. It is strongly recommended that you don't put any configuration code into this file, unless it pertains to gathering metadata for a host. For example, you could use the bootstrap file to lookup build data from an external database and pass it to your payloads.

**In most cases this file should be left alone entirely.**

## A sneak peek

Can't resist a look? Well here's a breakdown of a Rust project's bootstrap, `src/main.rs`:

```rust
fn main() {
    let args: Vec<_> = env::args().collect();
    if args.len() < 2 {
        println!("Usage: incli run <server_host_or_ip>");
        exit(1);
    }

    if let Err(e) = run(&args[1]) {
        println!(""); // Output line break
        println!("{}", e);
        exit(1);
    }
}

fn run(name: &str) -> Result<(), Error> {
    print!("Connecting to host {}...", name);
    let mut host = try!(Host::connect(&format!("hosts/{}.json", name)));
    println!("done");

    // Call payloads
    let data = host.data_owned();
    for name in try!(needarray!(data => "/_payloads")) {
        println!("Running payload {}...", name);
        let payload = try!(Payload::new(try!(needstr!(name))));
        try!(payload.run(&mut host, None));
    }

    Ok(())
}
```

As we can see from the first few lines of `main()`, the binary insists on receiving a single argument - a server name. This name maps to a data file, which contains the connection data for that host.

> To pass arguments to your bootstrap, just append them to the `run` command. For example, `incli run arg1 arg2`.

Then in `run()`, a host connection is established, using the user argument to map to a host data file. Finally the `_payloads` array is traversed and each payload is executed for the current host.

The same logic in this example applies to the bootstraps for every language supported by Intecture.

#### A quick note on names

As we just eluded to with the user arguments, you can reference hosts by an arbitrary name, so long as that name somehow maps to valid connection data. By default, that's via a data file (covered in the next section).

However, when we initiate a connection to a host, the name must exactly match the name you used when creating the host's certificate. This is because when you connect to a host, the API will first attempt to lookup the host's public key on the Auth server. If the names don't match, the Auth server won't return a public key and your connection will fail.

For example, if you added a host like this: `incli host add web1.example.com`, connecting to its IP address would fail, as the Auth server only knows that host as _web1.example.com_.
