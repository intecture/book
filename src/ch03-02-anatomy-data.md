# Data

Data files allow you to abstract your project's data from your code. This results in cleaner code and more importantly, allows data to be reused, merged and overridden.

For the most part, data files are pure JSON documents, which can be nested in fiendishly complex directory structures of villainous design, or elegantly simple, flat structures of benevolent creation. Either way, there are a few characteristics of Intecture's data parser that bear explanation.

> Tip: When you see the term "root namespace", it simply refers to the top level of a JSON file. You would access it in the same way as you'd access the root filesystem - by using `/` at the beginning of your path.

### 1. Data files have entry points too

Thought you'd washed your hands of this entry point business? _Au contraire, mon frère!_

Data files have entry points too, though they tend to be host specific. When you connect to a host using the `Host::connect` function, you must specify a data file that contains the host's connection data. This file will be the top level data file (i.e. it can't be overridden), which is important because...

### 2. Data files are recursive

From your top level data file, you can choose to include other data files, or payloads, using the reserved index `_include`. The data parser will look for this index in the root namespace and resolve entries to a path relative to `<project_dir>/data/`, unless they are absolute or prefixed with `payload:`.

For example, these are all valid `_include` entries:

```json
{
    "_include": [
        "roles/web.json",
        "/path/to/data.json",
        "payload:nginx",
        "payload: firewall::reload"
    ]
}
```

And they resolve to:
- _\<project_dir\>/data/roles/web.json_
- _/path/to/data.json_
- _\<project_dir\>/payloads/nginx/data/main.json_ (if it exists)
- _\<project_dir\>/payloads/firewall/data/reload.json_ (if it exists)

Anything else will likely blow a hole in the fabric of your reality.

### 3. Data files don't have to reference data files

We've already mentioned this, but to expand a little - we can include Payloads by prefixing an `_include` entry with `payload:`. This does two things:

1. The data parser will search in the appropriate path for a data file matching the payload name. If it exists, it will merge the file, but if not it is simply ignored.
2. The entry (excluding `payload:`) is appended to another special array in the root namespace, `_payloads`. This should ring a bell from the previous section's code sample! Ok, I know it doesn't. Go and check now... Right, so now we know that we can use this new array to tell us which payloads to run in our code. Magic!

### 4. Data merge by default

When a data file is included by another data file, the data inside have to be merged. There are two options when merging - overwrite, or combine. By default, Intecture attempts to combine appropriate data types, and overwrites the rest. Specifically, arrays and objects can be merged, but strings and integers cannot.

For example, take this top level data file:

```json
{
    "array": [ 1, 2, 3 ],
    "object": {
        "a": "b",
        "c": "d"
    },
    "string": "The internet's on computers now?!",
    "int": 123
}
```

and this lower level data file:

```json
{
    "array": [ 4, 5, 6 ],
    "object": {
        "a": "z",
        "e": "f"
    },
    "string": "That's not a knife!",
    "int": 456,
    "key": "value"
}
```

When we mash 'em together (merge them) we get...

```json
{
    "array": [ 1, 2, 3, 4, 5, 6 ],
    "object": {
        "a": "b",
        "c": "d",
        "e": "f"
    },
    "string": "The internet's on computers now?!",
    "int": 123,
    "key": "value"
}
```

#### Stop the merge!

You can also force the parser's hand into overriding types that would normally be merged. We use the _overwrite_ (`!`) operator for this purpose.

For example, take this top level data file:

```json
{
    "array!": [ 1, 2, 3 ]
}
```

and this lower level data file:

```json
{
    "array": [ 4, 5, 6 ]
}
```

On merge, we get:

```json
{
    "array": [ 1, 2, 3 ]
}
```

Note that due to the hierarchical nature of the parser's inheritence laws, the overwrite operator cannot be used to force a lower level value to overwrite a higher one. In that case, the `!` would be ignored and the data would be merged.

### 5. Data can tell you what to do

We are still working on their ability to add more vegetables to your shopping list, but right now data are able to decide for themselves what value they resolve to. These are called _conditions_.

Take the example of a package, say OpenSSL. To install OpenSSL's development package on CentOS, I'd run:

```bash
yum install openssl-devel
```

However on Debian, I'd run:

```bash
apt-get install libssl-dev
```

With Intecture I can do something similar:

```rust
let os = needstr!(host.data_owned() => "/_telemetry/os/platform")?;
let pkg = match os {
    "centos" => Package::new(&mut host, "openssl-devel", None)?,
    "debian" => Package::new(&mut host, "libssl-dev", None)?,
    _ => panic!("Why didn't I anticipate this?!"),
};
```

That isn't too bad, is it? Perhaps not, but it can definitely be improved by using the parser's kick arse _conditions_ engine! Introducing the _condition_ (`?`) operator.

_Crowd claps politely_

Let's rewrite our Rust example using data conditions to aid our cause:

```json
{
    "pkg?": [
        {
            "?": "/_telemetry/os/platform = centos",
            "_": "openssl-devel"
        },
        {
            "?": "/_telemetry/os/platform = debian",
            "_": "libssl-dev"
        },
        {
            "_": "I SHOULD REALLY USE A MORE HELPFUL DEFAULT VALUE!!!!"
        }
    ]
}
```

And our new-and-improved Rust code:

```rust
let pkg_name = needstr!(host.data_owned() => "/pkg")?;
let pkg = Package::new(&mut host, pkg_name, None)?,
```

The conditions lexer/parser can handle much more substantial queries too. For the full skinny, see the [Projects data reference](ch05-05-03-reference-projects-data.html).

### 6. Data know things that you don't

There's one last special index kicking around, which we've just referenced in the _conditions_ examples above: `_telemetry`. Telemetry is the data automatically gathered from a host when we connect to it, which pertains to that host and its environment. For example, telemetry can tell you about the operating system, networks, filesystem and more.

Telemetry is really useful for making your code cross-platform compatible. You can use it to make decisions about what packages to install, how many threads to run in your processes, which IP address bind a service to etc.

To access telemetry data, simply read values from the `_telemetry` index in the root namespace.

For a full list of telemetry data gathered by Intecture, read the [Projects data reference](ch05-05-03-reference-projects-data.html#Telemetry).
