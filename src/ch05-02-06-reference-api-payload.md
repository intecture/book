# Payload

The `Payload` primitive controls the execution of payloads within an Intecture project.

Currently, payloads are run in sequence as separate processes. The `Payload` primitive will look after executing the correct payload binary/interpreter, proxying the host connection and handling the result.

Each payload has a `payload.json` config file. See the [payload.json reference](ch05-05-02-reference-projects-payload.html) for full deets.

### Name format

Payloads are made up of one more binaries/code files that can be executed individually. For example, a payload might have separate `install` and `configure` actions which are placed in separate binaries (for compiled languages) or code files (for interpreted languages).

Payloads have a special format for identifying the correct payload and action you want to run. It goes something like this:

```
payload[::action]
```

Note that the `::action` is optional. If it is omitted, the [default binary/code file](ch05-05-reference-projects.html#Bootstrap%20files) will be executed.

### Example

<div class="lang-content lang-rust">

```rust
let payload = Payload::new("nginx::install").unwrap();
payload.run(&mut host, Some(vec!["--myoption", "opt-value"])).unwrap();
```
</div>
<div class="lang-content lang-c">

```c
Payload *payload = payload_new("nginx::install");
char *opts[] = {"--myoption", "opt-value"};
payload_run(payload, host, opts, sizeof opts / sizeof *opts);
```
</div>
<div class="lang-content lang-php">

```php
$payload = new Payload("nginx::install");
$payload->run($host, array("--myoption", "opt-value"));
```
</div>

<div class="lang-content lang-rust lang-php">

## Methods</div>
<div class="lang-content lang-c">

## Functions</div>

<div class="lang-content lang-rust">

#### `new(...)`</div>
<div class="lang-content lang-c">

#### `payload_new(...)`</div>
<div class="lang-content lang-php">

#### `__construct(...)`</div>

Creates a new `Payload` <span class="lang-content lang-rust lang-c">struct</span><span class="lang-content lang-php">object</span>.

<div class="lang-content lang-rust lang-php">

#### `build(...)`</div>
<div class="lang-content lang-c">

#### `payload_build(...)`</div>

Build the payload. This is only applicable for compiled languages. Running `build()` on an interpreted language payload will do nothing.

<div class="lang-content lang-rust lang-php">

#### `run(...)`</div>
<div class="lang-content lang-c">

#### `payload_run(...)`</div>

Execute the payload.
