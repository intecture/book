# Hello, \<hostname\>!

Now that you've got a working Intecture instance, we wanted to give you our take on a "Hello, world!" app.

> If you want to follow along, jump on to your _Dev box_ now!

## 1. Rust compiler

We're going to use Rust in this example, so we will need the Rust compiler:

```bash
curl https://sh.rustup.rs -sSf | sh
# Remember to initialise Rust's env vars
. ~/.cargo/env
```

## 2. Setup your project (optional)

In step 1.2.2 you setup your first Intecture project. If you want to follow along, you can reuse that project, or you can create a new one by saying the magic words:

```bash
incli project init hello-hostname rust
cd hello-hostname
```

>Remember to copy your `user.crt`, `auth.crt` and `project.json` from the original project.

## 3. Hello \<hostname\>

Let's edit `main.rs` and make it look like this, substituting `<hostname>` on line 7 with the hostname/IP address of your managed host:

```rust
#[macro_use]
extern crate inapi;

use inapi::Host;

fn main() {
    let host = Host::connect_endpoint("<hostname>", 7101, 7102).unwrap();
    println!("Hello, {}!", needstr!(host.data_owned() => "/_telemetry/hostname").unwrap());
}
```

Finally, let's say hello!

```bash
incli run
```

After some consternation from the compiler, your project should say hello. In doing so, it's done a round trip to the _Agent_ on your managed host, after authenticating you and your host with the _Auth_ server.

Here's one I prepared earlier:

```
$ incli run
...
compiler drama
...
Hello, pete.local!
$
```
