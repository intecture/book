# `incli host`

### Add a host

To add a new host, use the `add` subcommand.

Remember that the hostname (or IP address) you pass to it must also be used when connecting to your host.

For example, if you wish to add a host with the hostname `web1.example.com` and IP address `10.0.0.1`, you'd run:

```bash
incli host add web1.example.com
```

If you then tried to refer to it using its IP address in your code:

```rust
let mut host = Host::connect_endpoint("10.0.0.1", 7101, 7102).unwrap();
```

...then it'd blow up in your face!

This is because the _Auth_ server stores the host certificate as `web1.example.com.crt` and is unaware of the host's IP address. Thus when the `Host` primitive queries the _Auth_ server for the host's public key, the _Auth_ server will return a "not found" error.

### Bootstrap a host

Bootstrapping a host allows you to automatically setup and configure a new managed host remotely. When bootstrapping, the CLI does a few things:

1. Creates a new host certificate
2. Installs the _Agent_ using the [auto-installer](ch01-02-intro-installation.html#auto-installer)
3. Installs the _Agent_ private key and _Auth_ public key
4. Configures [`agent.json`](ch05-01-01-reference-agent-json.html) using the values in your [`project.json`](ch05-05-01-reference-projects-json.html)
5. Starts the _Agent_ service

The CLI relies on SSH to bootstrap a host, and supports either password or private key authentication.

To bootstrap a host, use the `bootstrap` subcommand:

```bash
incli host bootstrap web1.example.com
```

Bootstrapping has a few dependencies that it expects to find on the managed host:

- `pkg-config`, or `pkgconf` on FreeBSD
- `curl`
- If you don't run `bootstrap` as _root_, you'll also need `sudo` with privileges for the SSH user

If your host doesn't have one or more of these dependencies, or you want to tack some other housekeeping onto the end of the bootstrap process, you can use the _preinstall_ and _postinstall_ scripts. For example:

```bash
incli host bootstrap web1.example.com -m "pkg install -y pkgconf curl sudo"
```

### Delete a host

To delete a host, use the `delete` subcommand:

```bash
incli host delete web1.example.com
```

### List hosts

To list the _Auth_ server's known hosts, use the `list` subcommand:

```bash
incli host list
```
