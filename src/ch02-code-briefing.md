# Code Briefing

At the heart of Intecture is _your code_. Without it, Intecture is a lifeless blob. And at the heart of your code is Intecture's _API_.

It's a _"By your powers combined..."_ type deal.

Anyway, we aren't here to teach you to code, but we can certainly help you to get the best out of Intecture's API. This chapter introduces you to the basic concepts, but you'll find more information in both the 'thorough' and 'excoriating' varieties in the [API reference](ch05-02-reference-api.html) and [technical manuals](/docs) respectively.

> **What comes first?** Just to clarify early on to avoid confusion,
> <span class="lang-content lang-rust"><code class="hljs">main.rs</code></span>
> <span class="lang-content lang-c"><code class="hljs">main.c</code></span>
> <span class="lang-content lang-php"><code class="hljs">main.php</code></span>
> is always the first file Intecture will look for in a project or a payload.

## Connecting to a host

The first step in the process is connecting to a host. You'll need a `Host` instance for almost every API interaction, so it's best to get it out of the way quickly.

If you take a peek at your project's
<span class="lang-content lang-rust"><code class="hljs">src/main.rs</code>,</span>
<span class="lang-content lang-c"><code class="hljs">src/main.c</code>,</span>
<span class="lang-content lang-php"><code class="hljs">src/main.php</code>,</span>
you'll see a line like this one:

<div class="lang-content lang-rust">

```rust
let mut host = try!(Host::connect(&format!("hosts/{}.json", name)));
```
</div>
<div class="lang-content lang-c">

```c
Host *host = host_connect(host_file);
```
</div>
<div class="lang-content lang-php">

```php
$host = Host::connect("hosts/$hostname.json");
```
</div>

As you can see, this line passes a path string to
<span class="lang-content lang-rust lang-php"><code class="hljs">Host::connect</code>.</span>
<span class="lang-content lang-c"><code class="hljs">host_connect</code>.</span>
This is a path to a JSON document, which must contain the connection details for your managed host. You'll learn about that in the next chapter.

<span class="lang-content lang-rust lang-c">If you get a <code class="hljs">Host</code> back from this static function,</span>
<span class="lang-content lang-php">So long as you don't cop an Exception in the face,</span>
then you'll have a mutually authenticated, encrypted connection to your host. Neat-o!

The other main connection method you'll see is the one used by your payloads:

<div class="lang-content lang-rust">

```rust
let mut host = try!(Host::connect_payload(api_endpoint, file_endpoint));
```
</div>
<div class="lang-content lang-c">

```c
Host *host = host_connect_payload(argv[1], argv[2]);
```
</div>
<div class="lang-content lang-php">

```php
$host = Host::connect_payload($argv[1], $argv[2]);
```
</div>

When Intecture runs a payload, that payload is executed as a separate process. Thus it cannot share the parent's host connection. Instead of maintaining lots of authenticated, encrypted connections (which is expensive), Intecture creates a bridge between your _real_ host connection and the payload. When the payload's process is executed, two bridge endpoints are passed to it via _stdin_, allowing the payload to reuse the _real_ connection via those endpoints.

The important take away here is that
<span class="lang-content lang-rust lang-php"><code class="hljs">Host::connect</code></span>
<span class="lang-content lang-c"><code class="hljs">host_connect</code></span>
is _only_ used in your [entry point](ch03-01-anatomy-entry-point.html) code, and
<span class="lang-content lang-rust lang-php"><code class="hljs">Host::connect_payload</code></span>
<span class="lang-content lang-c"><code class="hljs">host_connect_payload</code></span>
is _only_ used in your [payloads](ch03-03-anatomy-payloads.html).

> For the eagle eyed, the previous chapter contained an example which used
> <span class="lang-content lang-rust lang-php"><code class="hljs">Host::connect_endpoint</code>.</span>
> <span class="lang-content lang-c"><code class="hljs">host_connect_endpoint</code>.</span>
> This is the poor cousin of
> <span class="lang-content lang-rust lang-php"><code class="hljs">Host::connect</code></span>
> <span class="lang-content lang-c"><code class="hljs">host_connect</code></span>
> and is generally not recommended. However for very basic projects that don't need separate data files,
> <span class="lang-content lang-rust lang-php"><code class="hljs">Host::connect_endpoint</code></span>
> <span class="lang-content lang-c"><code class="hljs">host_connect_endpoint</code></span>
> is your bargain basement, no frills, data-hating alternative.

## Getting data

As we just mentioned, when you connect to a host using
<span class="lang-content lang-rust lang-php"><code class="hljs">Host::connect</code>,</span>
<span class="lang-content lang-c"><code class="hljs">host_connect</code>,</span>
you pass it a path to a JSON document. You'll read more about data files in the [Data section](ch03-02-anatomy-data.html) of the next chapter, but for now, let's be content understanding how to access that data.

<span class="lang-content lang-rust">In Rust, you are provided with a helpful set of macros that allow you to search your data using [this awesome proposed IETF standard](https://tools.ietf.org/html/rfc6901).</span>
<span class="lang-content lang-c">In C, you are provided with a few functions that allow you to search your data using [this awesome proposed IETF standard](https://tools.ietf.org/html/rfc6901).</span>
<div class="lang-content lang-rust lang-c">
I'll give you a minute to clean the vomit off your keyboard.

Ok, to save you expending precious life on an IETF RFC, imagine that this was your JSON document:

```json
{
    "path": {
        "to": "value"
    }
}
```

According to the RFC (and its implementation), if you wanted to access the string at index "to", you'd use this pointer: `/path/to`. Rocket science.
</div>

<div class="lang-content lang-rust">
Now then, here's a list of Rust macros to help you access data via JSON pointers:

```rust
let data = host.data_owned();

wantnull!(data => "/path/to"); // -> Option<()>
wantbool!(data => "/path/to"); // -> Option<bool>
wanti64!(data => "/path/to"); // -> Option<i64>
wantu64!(data => "/path/to"); // -> Option<u64>
wantf64!(data => "/path/to"); // -> Option<f64>
wantstr!(data => "/path/to"); // -> Option<&str>
wantarray!(data => "/path/to"); // -> Option<&Vec>
wantobj!(data => "/path/to"); // -> Option<BTreeMap>
```

You can also use `need` macros if you want to return a `Result` rather than an `Option`, for example:

```rust
needstr!(data => "/path/to"); // -> Result<&str, Error>
```
</div>

<div class="lang-content lang-c">
Now then, here's an example that demonstrates how to use the API functions to access data:

```c
void *data = host_data(host);
char *json_ptr = "/path/to";

int retval = get_value_type(data, json_ptr);
assert(retval > -1);
enum DataType dtype = (enum DataType)retval;

void *v = get_value(data, dtype, json_ptr);
assert(v);
```
</div>

<div class="lang-content lang-rust lang-c">

> Tip: If you've asked for a valid data pointer but you're getting nothing back, it could be that you're asking for the wrong data type. Remember this before beating your head on the screen!
</div>

<div class="lang-content lang-php">
In PHP, you are provided with an associative array of all of your data. It couldn't be easier!

To get your sticky mits on that data, just ask the `Host`:

```php
$data = $host->data();
print_r($data['_telemetry']);
```
</div>

## Doing stuff

One of the most basic things you can do with Intecture is run shell commands. These are passed to your host's `/bin/sh` interpreter, so if you want to use Bash syntax, you'll need to invoke its interpreter yourself.

<div class="lang-content lang-rust">

```rust
let cmd = Command::new("ls /etc");
let result = cmd.exec(&mut host)?;
println!("{:?}", result);
```
</div>
<div class="lang-content lang-c">

```c
Command *whoami = command_new("ls /etc");
CommandResult *result = command_exec(whoami, host);
printf("exit: %d, stdout: %s, stderr: %s",
    result->exit_code,
    result->stdout,
    result->stderr);
```
</div>
<div class="lang-content lang-php">

```php
$whoami = new Command("ls /etc");
$result = $whoami->exec($host);
print_r($result);
```
</div>

Don't worry, it's not all "roll your own" though. The API also contains more powerful endpoints (called _primitives_) for managing packages, services and the filesystem. Check out the [API reference](ch05-02-reference-api.html) chapter for the low down.

## Idempotence

_Idempotence (/ˌaɪdᵻmˈpoʊtəns/ eye-dəm-poh-təns) is a bombastic, pompous word for insecure narcissists that means "Only do this when you have to"._

Full disclosure - I stole that from Wikipedia. Then edited it.

Idempotence, despite its highfalutin sound, is actually quite important for software like Intecture. Needless to say that all of the API's endpoints are idempotent, with the exception of `Command`, which is up to the user to make safe.

Still lost? Here's an example: Say I'm installing Hadoop onto a jillion-server cluster. I use a Hadoop payload that looks like this:

<div class="lang-content lang-rust">

```rust
let hadoop_pkg = Package::new(&mut host, "hadoop-pkg-name", None)?;
let result = hadoop_pkg.install(&mut host)?;
```
</div>
<div class="lang-content lang-c">

```c
enum Providers providers = Default;
Package *hadoop_pkg = package_new(host, "hadoop-pkg-name", providers);
CommandResult *result = package_install(hadoop_pkg, host)
```
</div>
<div class="lang-content lang-php">

```php
$hadoop_pkg = new Package($host, "hadoop-pkg-name");
$result = $hadoop_pkg->install($host);
```
</div>

In this example, the `result`
<span class="lang-content lang-rust">binding has the type <code class="hljs">Option&lt;CommandResult&gt;</code>. The reason it's an <code class="hljs">Option</code></span>
<span class="lang-content lang-c lang-php">variable may or may not be <code class="hljs">NULL</code>. The reason</span>
is because if Hadoop is already installed, Intecture will do nothing. Otherwise it will attempt to install Hadoop and let you know how it went.

Thus, I can run
<span class="lang-content lang-rust"><code class="hljs">Package::install</code></span>
<span class="lang-content lang-c"><code class="hljs">package_install</code></span>
<span class="lang-content lang-php"><code class="hljs">Package->install</code></span>
as many times as I like, but Intecture will only attempt to install it once, saving you potential explosions. _That_ is idempotence.
