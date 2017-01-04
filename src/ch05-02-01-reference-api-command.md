# Command

The `Command` primitive allows you to run shell scripts on your managed host.

### Interpreter

`Command` uses `/bin/sh` as its interpreter, so if we were to create this `Command`:

<div class="lang-content lang-rust">

```rust
let cmd = Command::new("whoami");
cmd.exec(&mut host).unwrap();
```
</div>
<div class="lang-content lang-c">

```c
Command *cmd = command_new("whoami");
command_exec(cmd, host);
```
</div>
<div class="lang-content lang-php">

```php
$cmd = new Command("whoami");
$cmd->exec($host);
```
</div>

it would be run like this on your managed host:

```bash
/bin/sh -c "whoami"
```

If you want to run commands specific to another interpreter, you must specify the interpreter in your command string, for example, `whoami` becomes `bash -c "whoami"`. It is your responsibility to ensure that the interpreter is installed on the host. This is pretty trivial using the [`Package` primitive](ch05-02-05-reference-api-package.html). Just saying...

> Note that `Command` is not idempotent, so you must ensure that this primitive is safe to run repeatedly without side effects.

<div class="lang-content lang-rust lang-php">

## Methods</div>
<div class="lang-content lang-c">

## Functions</div>

<div class="lang-content lang-rust">

#### `new(...)`</div>
<div class="lang-content lang-c">

#### `command_new(...)`</div>
<div class="lang-content lang-php">

#### `__construct(...)`</div>

Creates a new `Command` <span class="lang-content lang-rust lang-c">struct</span><span class="lang-content lang-php">object</span>.

<div class="lang-content lang-rust lang-php">

#### `exec(...)`
</div>
<div class="lang-content lang-c">

#### `command_exec(...)`
</div>

Runs the command on your managed host. This returns <span class="lang-content lang-rust lang-c">a struct</span><span class="lang-content lang-php">an associative array</span> containing the execution result.
