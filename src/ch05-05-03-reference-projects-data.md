# Data

Project Data stores all the information about your infrastructure - your hosts, configuration data and payloads. Ideally, your _code_ should be completely generic and portable across infrastructures, while your _data_ should inform the configuration of a specific infrastructure.

For an introduction to project data, refer to [Anatomy of a Project](ch03-02-anatomy-data.html).

## Conditions

Conditions allow you to introduce dynamic content to a JSON document, without breaking JSON syntax. This is useful for adapting your data to its environment.

To introduce a condition, use the `?` operator:

```json
"conditional_key?": {}
```

After it has been evaluated the "?" is removed from the key, so your data would contain `conditional_key`, _not_ `conditional_key?`.

### Valid data types

For a condition to be parsed and evaluated by Intecture, the value needs to be either an object or an array. Any other value will be returned without evaluation. For example:

```json
"object_do_good?": {},          <-- Evaluated
"how_about_array?": [],         <-- Evaluated
"whats_an_array?": "no idea"    <-- Ignored, leaving the key/value untouched
```

Note that there's a difference between an object (`{}`) value and an array (`[]`) value. In order to represent a conditional expression, we must have both a query and a return value. We represent this in JSON using an _object_, which we will discuss in a moment. The other valid conditional value is an _array_, which is simply a collection of conditional expression objects.

You can think of a conditional expression (an object) as a single `if` expression. If the query evaluates to `true`, the value is returned. Otherwise `NULL` is returned. Whereas a collection (an array) is equivalent to an `if, else if, ...` expression, where multiple queries are tested in sequence.

### Conditional expressions

A conditional expression contains two components:

- The _query_ string, represented by the key `?`. If omitted, the _return value_ will be returned immediately.
- The _return value_, represented by the key `_`. If omitted, the _return value_ will be set to `NULL`.

Any other values will be ignored.

For example:

```json
{
    "options?": {
        "?": "/_telemetry/memory > 40960",
        "_": "--activate-memory-leaks"
    }
}
```

If the query `/_telemetry/memory > 40960` evaluates to `true`, the key _options_ will be set to "--activate-memory-leaks". Otherwise it will be set to `NULL`.

This is equivalent to the following code:

<div class="lang-content lang-rust">

```rust
let mem = needu64!(host.data_owned() => "/_telemetry/memory")?;
let options = if mem > 40960 {
    Some("--activate-memory-leaks")
} else {
    None
};
```
</div>
<div class="lang-content lang-c">

```c
void *data = host_data(host);
char *json_ptr = "/_telemetry/memory";
int retval = get_value_type(data, json_ptr);
void *mem = get_value(data, (enum DataType)retval, json_ptr);

if (mem > 40960) {
    char *options = "--activate-memory-leaks";
} else {
    char *options = NULL
}
```
</div>
<div class="lang-content lang-php">

```php
$mem = $host->data()['telemetry']['memory'];
if ($mem > 40960) {
    $options = "--activate-memory-leaks";
} else {
    $options = NULL;
}
```
</div>

### Collections

Collections are useful if you have multiple possible return values for a single condition. As we said before, they are just arrays of conditional expressions (objects). Each expression is evaluated in sequence from top to bottom. The first expression to evaluate to `true` wins.

For example:

```json
{
    "options?": [
        {
            "?": "/_telemetry/memory >= 40960",
            "_": "--activate-memory-leaks"
        },

        {
            "?": "/_telemetry/memory > 10240",
            "_": "--medium-mode"
        },

        {
            "_": "--econ-mode"
        }
    ]
}
```

If the host has 4GB memory or more (remembering that Intecture returns memory in _kb_), the value of `options` will be "--activate-memory-leaks". Otherwise, if the host has more than 1GB memory, the value will be "--medium-mode". Otherwise the value will be "--econ-mode".

Note that the final conditional expression lacks a query parameter, which means it will always return the _return value_. We can actually optimise this part of the data, remembering that anything that isn't an array or an object will be returned untouched:

```json
{
    "options?": [
        {
            "?": "/_telemetry/memory >= 40960",
            "_": "--activate-memory-leaks"
        },

        {
            "?": "/_telemetry/memory > 10240",
            "_": "--medium-mode"
        },

        "--econ-mode"
    ]
}
```

This is equivalent to the following code:

<div class="lang-content lang-rust">

```rust
let mem = needu64!(host.data_owned() => "/_telemetry/memory")?;
let options = if mem >= 40960 {
    "--activate-memory-leaks"
} else if mem > 10240 {
    "--medium-mode"
} else {
    "--econ-mode"
};
```
</div>
<div class="lang-content lang-c">

```c
void *data = host_data(host);
char *json_ptr = "/_telemetry/memory";
int retval = get_value_type(data, json_ptr);
void *mem = get_value(data, (enum DataType)retval, json_ptr);

if (mem >= 40960) {
    char *options = "--activate-memory-leaks";
} else if (mem > 10240) {
    char *options = "--medium-mode";
} else {
    char *options = "--econ-mode"
}
```
</div>
<div class="lang-content lang-php">

```php
$mem = $host->data()['telemetry']['memory'];
if ($mem >= 40960) {
    $options = "--activate-memory-leaks";
} else if ($mem > 10240) {
    $options = "--medium-mode"
} else {
    $options = "--econ-mode";
}
```
</div>

### Query string

Query strings contain the logic for determining whether or not a value should be returned. The syntax should look familiar to you as it's modelled on the conventions employed by most programming languages.

Queries contain 3 basic data types: pointers, strings and integers.

#### Pointers

JSON pointers are references to data values. They are **always** prefixed with a forward slash (`/`) and must not be encapsulated in quotes. If a pointer is invalid (points to nothing), `NULL` will be used as its value.

Pointers can only refer to data that they reference. For example, take these two data files:

**data/hosts/localhost.json**
```json
{
    "name": "Pete",
    "pkgs_to_install?": {
        "?": "/nginx/should_install = 1",
        "_": "nginx"
    },
    "_include": [
        "payload: nginx"
    ]
}
```

**nginx/data/main.json**
```json
{
    "nginx": {
        "should_install": 1
    },
    "hello?": {
        "?": "/name = Pete",
        "_": "Hello Pete!"
    },
    "am_i_localhost?": {
        "?": "/_telemetry/hostname = localhost",
        "_": "Yep!"
    }
}
```

Those data files will result in this merged data:

```json
{
    "name": "Pete",
    "pkgs_to_install": "nginx",
    "_include": [
        "payload: nginx"
    ],
    "nginx": {
        "should_install": 1
    },
    "hello": null,
    "am_i_localhost": "Yep!"
}
```

Note that `/hello` is null because the pointer `/name` doesn't exist in any data referenced by _nginx/data/main.json_. The one exception to this is Telemetry (`/_telemetry`), which is automatically referenced by each data file, and is thus accessible to everyone.

#### Strings

Strings are static text items that are optionally quoted with either single or double quotes. Quoting is recommended for strings containing spaces, which are otherwise considered delimiters.

String elements can also be escaped to negate any special meaning. For example, a leading forward slash on an unquoted string indicates the start of a JSON pointer. This special meaning can be negated by escaping it: `\/my_string`. Similarly, you can escape quotes and spaces to prevent them terminating a string:

```json
"?": "/bunny/catchphrase = 'What\'s up, doc?'"
```

#### Integers

Integers are numbers that are not encapsulated by quotes. 'Nuff said.

#### Grammar

Now that we know our data types, it's time to introduce our query grammar.

> Grammar are the rules and syntax that govern how a query can be written.

Firstly we have our comparison operators:

- `=` and `!=` Compare strings and pointers to strings
- `<` and `<=` Compare integers and pointers to integers
- `>` and `>=` Compare integers and pointers to integers

Next we have our logical operators:

- `&&` _this comparison_ **And** _that comparison_
- `||` _this comparison_ **Or** _that comparison_

For example:

```json
"?": "/my/str = 'abc' && 1024 < /_telemetry/memory || /_telemetry/cpu/cores > 4"
```

Queries are evaluated eagerly, which means that as soon as an outcome can be reached, the parser will stop and return a result. This has an effect on the above query. If `/my/str` equals "abc", and the host 2048kb memory and 8 cores, the query will return `false`. If you wanted the query to return `true` (i.e. _"/my/str equals 'abc' for a host that has memory less than 1024kb OR more than 4 cores"_), we need to introduce groups.

Groups are delimited by round brackets `()` and can be nested infinitely. A group is evaluated independently to return its own result, which is then compared with the rest of the query. This way you can't get stung by the parser's eager evaluation.

Let's rewrite our query using groups:

```json
"?": "/my/str = 'abc' && (1024 < /_telemetry/memory || /_telemetry/cpu/cores > 4)"
```

Not much has changed, but now the query returns `true`! Hooray.

## Telemetry

Telemetry data are the data collected by Intecture automatically when a [`Host` primitive](ch05-02-05-reference-api-host.html) connects to a managed host. Here is a full list of data collected:

#### CPU

`/_telemetry/cpu/...`

- `vendor` CPU vendor (e.g. "amd")
- `brand_string` Full name of the processor (e.g. Pentium(R) Dual-Core CPU E5300 @ 2.60GHz)
- `cores` Number of cores in CPU

#### Filesystem

`/_telemetry/fs/[]/...`

- `filesystem` Underlying device for the mount
- `mountpoint` The mount's file path
- `size` Capacity of the device in kilobytes
- `used` Number of kilobytes stored on device
- `available` Number of kilobytes available on device
- `capacity` Percentage used (as decimal)

#### Hostname

`/_telemetry/hostname`

The host's fully qualified hostname.

#### Memory

`/_telemetry/memory`

The capacity of the system's RAM, in bytes.

#### Network

`/_telemetry/net/[]/...`

- `interface` Name of the interface (e.g. "en1", or "eth1" for you Linux users)
- `mac` Hardware address of interface
- `inet/...` IPv4 address
    - `address` IP address
    - `netmask` Subnet mask
- `inet6/...` IPv6 address
    - `address` IP address
    - `prefixlen` Prefix length
    - `scopeid` Scope ID
- `status` Status of interface ("Active" _or_ "Inactive")
    - Note: This key may not exist if no information was available

#### Operating System

`/_telemetry/os`

- `arch` Architecture (e.g. "x86_64")
- `family` OS family ("debian", "redhat" or "unix")
- `platform` OS name (e.g. "freebsd", "centos" etc.)
- `version_str` Full version string (e.g. "11.0-RELEASE", "16.04 LTS" etc.)
- `version_maj` Major version integer
- `version_min` Minor version integer
- `version_patch` Patch version integer (defaults to _0_ if not available)
