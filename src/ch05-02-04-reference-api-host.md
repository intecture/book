# Host

The `Host` primitive is responsible for connecting to and authenticating your managed hosts.

`Host` <span class="lang-content lang-rust lang-c">structures</span><span class="lang-content lang-php">objects</span> also store your host's data. This data is derived from your data files, as well as your host itself. For more information on how this process works and how you can control its output, see the [Data reference](ch05-05-03-reference-projects-data.html).

### Example

<div class="lang-content lang-rust">

```rust
// Connect to a host via a data file
let mut host = Host::connect("hosts/web1.json").unwrap();

// Or, connect to a host via a raw endpoint (not recommended)
let mut host = Host::connect_endpoint("web1.example.com", 7101, 7102).unwrap();
```
</div>
<div class="lang-content lang-c">

```c
// Connect to a host via a data file
Host *host = host_connect("hosts/web1.json");

// Or, connect to a host via a raw endpoint (not recommended)
host_connect_endpoint("web1.example.com", 7101, 7102);
```
</div>
<div class="lang-content lang-php">

```php
// Connect to a host via a data file
$host = Host::connect("hosts/web1.json");

// Or, connect to a host via a raw endpoint (not recommended)
$host = Host::connect_endpoint("web1.example.com", 7101, 7102);
```
</div>

## Multiple hosts

Each primitive that you pass your `Host` <span class="lang-content lang-rust lang-c">structure</span><span class="lang-content lang-php">object</span> to will use it to communicate with your managed host. Thus it is possible to reuse your primitive <span class="lang-content lang-rust lang-c">structures</span><span class="lang-content lang-php">objects</span> across multiple hosts, although this is not part of the default workflow.

### Example

<div class="lang-content lang-rust">

```rust
let mut web1 = Host::connect("hosts/web1.json").unwrap();
let mut web2 = Host::connect("hosts/web2.json").unwrap();

let cmd = Command::new("ls /etc");
cmd.exec(&mut web1).unwrap();
cmd.exec(&mut web2).unwrap();
```
</div>
<div class="lang-content lang-c">

```c
Host *web1 = host_connect("hosts/web1.json");
Host *web2 = host_connect("hosts/web2.json");

Command *cmd = command_new("ls /etc");
command_exec(cmd, web1);
command_exec(cmd, web2);
```
</div>
<div class="lang-content lang-php">

```php
$web1 = Host::connect("hosts/web1.json");
$web2 = Host::connect("hosts/web2.json");

$cmd = new Command("ls /etc");
$cmd->exec($web1);
$cmd->exec($web2);
```
</div>

## Host data file

As we just demonstrated, the best way to connect to a host is via a host data file. The contents of this data file is largely up to you, however we recommend that you put in it any data specific to that host.

For a host data file to be compatible with the
<span class="lang-content lang-rust lang-php"><code class="hljs">Host::connect</code> method,</span>
<span class="lang-content lang-c"><code class="hljs">host_connect</code> function,</span>
you must provide the following keys in the root of your data file:

```json
{
    "hostname": "web1.example.com",
    "api_port": 7101,
    "file_port": 7102,
    "...": "..."
}
```

> The order of your data doesn't matter. Intecture just needs to be able to find `hostname`, `api_port` and `file_port` somewhere in the top level of your data.

<div class="lang-content lang-rust lang-php">

## Methods</div>
<div class="lang-content lang-c">

## Functions</div>

<div class="lang-content lang-rust lang-php">

#### `::connect(...)`</div>
<div class="lang-content lang-c">

#### `host_connect(...)`</div>

Creates a new `Host` <span class="lang-content lang-rust lang-c">struct</span><span class="lang-content lang-php">object</span> using a data file to supply connection information for your managed host.

<div class="lang-content lang-rust lang-php">

#### `::connect_endpoint(...)`</div>
<div class="lang-content lang-c">

#### `host_connect_endpoint(...)`</div>

Creates a new `Host` <span class="lang-content lang-rust lang-c">struct</span><span class="lang-content lang-php">object</span> using information supplied directly to the <span class="lang-content lang-rust lang-php">method</span><span class="lang-content lang-c">function</span>.

This is generally considered to be poor style as connection information is _data_, and therefore belongs in a data file! However for very simple workflows, you can use this <span class="lang-content lang-rust lang-php">method</span><span class="lang-content lang-c">function</span> to avoid using data altogether.

<div class="lang-content lang-rust lang-php">

#### `::connect_payload(...)`</div>
<div class="lang-content lang-c">

#### `host_connect_payload(...)`</div>

Creates a new `Host` <span class="lang-content lang-rust lang-c">struct</span><span class="lang-content lang-php">object</span> using proxy endpoints provided to `stdin`.

As the name implies, this should only be used from within a payload. The data for this method will be provided as arguments to `stdin` by Intecture when it executes the payload's process. It should never be supplied manually.

<div class="lang-content lang-rust lang-php">

#### `data(...)`</div>
<div class="lang-content lang-c">

#### `host_data(...)`</div>

Returns the data specified in your data files for the managed host, as well as data gathered from the host, called [_Telemetry_](ch05-05-03-reference-projects-data.html#Telemetry).

To query your data, Intecture has provided you with some helpers. See the [code briefing](ch02-code-briefing.html#Getting%20data) for the low-down.

<div class="lang-content lang-rust">

#### `data_owned(...)`

Thanks to Rust's awesome and infuriating borrow checker, we need to use a reference counted version of our data structure in conjunction with the data macros. For any other purpose, we strongly recommend using `data(...)` instead.

## Data macros

To make your life easier when getting data out of `Value` structs, we've provided you with some macros:

To get a specific data type for the current value, do something like this:

```rust
let value = host.data_owned();

if let Some(myint) = wantu64!(value) {
    // We got a party now, baby!
}
```

And if you want to get angry when you don't get what you want, you can do something like this:

```rust
let myint = needu64!(value).unwrap();
```

If these aren't the droids you're looking for, you can also request data located at a specific JSON pointer:

```rust
let r2d2 = needobj!(value => "/behind/the/locked/door").unwrap();
```

There's macros for every possible data type supported by JSON:

- NULL - `wantnull!`, `neednull!`
- bool - `wantbool!`, `needbool!`
- i64 - `wanti64!`, `needi64!`,
- u64 - `wantu64!`, `needu64!`,
- f64 - `wantf64!`, `needf64!`,
- \&str - `wantstr!`, `needstr!`,
- \&Vec - `wantarray!`, `needarray!`
- \&BTreeMap - `wantobj!`, `needobj!`
</div>
