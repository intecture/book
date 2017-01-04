# Service

The `Service` primitive is responsible for looking after daemons.

## Init services

Intecture supports a number of service managers (init systems):

- For many modern _Linux_ distros, we support `Systemd`
- For most _Linux_ distros, we support `SysV init`
- For _Ubuntu_, we support `Upstart`
- For _BSD_ distros, we support `BSD init`

### Example

<div class="lang-content lang-rust">

```rust
let runnable = ServiceRunnable::Service("nginx");
let service = Service::new_service(runnable, None);
service.action(&mut host, "start").unwrap();
```
</div>
<div class="lang-content lang-c">

```c
ServiceRunnable runnable = { .service = "nginx" };
Service *service = service_new_service(runnable, NULL, 0);
service_action(service, host, "start");
```
</div>
<div class="lang-content lang-php">

```php
$runnable = new ServiceRunnable("nginx", ServiceRunnable::SERVICE);
$service = new Service($runnable);
$service->action($host, "start");
```
</div>

## Command-only services

Some services don't provide `init` scripts. We can still use the `Service` primitive as an abstraction for these services by passing actions ("start", "stop" etc.) to the service's executable. We can even map these actions to individual executables if necessary.

> Note that the service executable **must** handle daemonising the service itself. If not, then starting the service will cause Intecture to hang while it waits for the executable to terminate.

### Example

<div class="lang-content lang-rust">

```rust
// Single executable
let runnable = ServiceRunnable::Command("/usr/local/bin/nginx");
let service = Service::new_service(runnable, None);

// Or, multiple executables
let mut runnables = HashMap::new();
runnables.insert("start", ServiceRunnable::Command("/usr/local/bin/nginx-start"));
runnables.insert("stop", ServiceRunnable::Command("/usr/local/bin/nginx-stop"));
let service = Service::new_map(runnables, None);

service.action(&mut host, "start").unwrap();
```
</div>
<div class="lang-content lang-c">

```c
// Single executable
ServiceRunnable runnable = { .command = "/usr/local/bin/nginx" };
Service *service = service_new_service(runnable, NULL, 0);

// Or, multiple executables
ServiceRunnable start_runnable = { .command = "/usr/local/bin/nginx-start" };
ServiceAction start_action = { .action = "start", .runnable = start_runnable };

ServiceRunnable stop_runnable = { .command = "/usr/local/bin/nginx-stop" };
ServiceAction stop_action = { .action = "stop", .runnable = stop_runnable };

ServiceAction actions[] = { start_action, stop_action };
Service *service = service_new_map(&actions, sizeof actions / sizeof *actions, NULL, 0);

service_action(service, host, "start");
```
</div>
<div class="lang-content lang-php">

```php
// Single executable
$runnable = new ServiceRunnable("/usr/local/bin/nginx", ServiceRunnable::COMMAND);
$service = new Service($runnable);

// Or, multiple executables
$runnables = array(
    'start' => new ServiceRunnable("/usr/local/bin/nginx-start", ServiceRunnable::COMMAND),
    'stop' => new ServiceRunnable("/usr/local/bin/nginx-stop", ServiceRunnable::COMMAND)
);
$service = new Service($runnables);

$service->action($host, "start");
```
</div>

## Mapped actions

Finally, we can create shortcuts for our actions by mapping an alias to the correct action. This is useful where you want to save users having to reproduce long argument strings, or where it isn't obvious what the action means.

### Example

<div class="lang-content lang-rust">

```rust
let runnable = ServiceRunnable::Command("/usr/local/bin/nginx");
let mut mapped = HashMap::new();
mapped.insert("start", "-c /usr/local/etc/nginx.conf");
mapped.insert("stop", "-s quit");
let service = Service::new_service(runnable, Some(mapped));
service.action(&mut host, "start").unwrap();
```
</div>
<div class="lang-content lang-c">

```c
ServiceRunnable runnable = { .command = "/usr/local/bin/nginx" };
ServiceMappedAction map_start = { .action = "start", .mapped_action = "-c /usr/local/etc/nginx.conf" };
ServiceMappedAction map_stop = { .action = "stop", .mapped_action = "-s quit" };
ServiceMappedAction mapped[] = { map_start, map_stop };
Service *service = service_new_service(runnable, &mapped, sizeof mapped / sizeof *mapped);
service_action(service, host, "start");
```
</div>
<div class="lang-content lang-php">

```php
$runnable = new ServiceRunnable("/usr/local/bin/nginx", ServiceRunnable::COMMAND);
$service = new Service($runnable, array(
    "start" => "-c /usr/local/etc/nginx.conf",
    "stop" => "-s quit"
));
$service->action($host, "start");
```
</div>

<div class="lang-content lang-rust lang-php">

## Methods</div>
<div class="lang-content lang-c">

## Functions</div>

<div class="lang-content lang-rust">

#### `new_service(...)`</div>
<div class="lang-content lang-c">

#### `service_new_service(...)`</div>
<div class="lang-content lang-php">

#### `__construct(...)`</div>

Creates a new `Service` <span class="lang-content lang-rust lang-c">struct</span><span class="lang-content lang-php">object</span> from <span class="lang-content lang-rust lang-c">a single</span><span class="lang-content lang-php">one or more</span> `ServiceRunnable` <span class="lang-content lang-rust lang-c">struct</span><span class="lang-content lang-php">objects</span>.

<div class="lang-content lang-rust">

#### `new_map(...)`</div>
<div class="lang-content lang-c">

#### `service_new_map(...)`</div>

<div class="lang-content lang-rust lang-c">

Creates a new `Service` struct from multiple `ServiceRunnable` structs, where each `ServiceRunnable` struct is mapped to an action.
</div>

<div class="lang-content lang-rust lang-php">

#### `action(...)`</div>
<div class="lang-content lang-c">

#### `service_action(...)`</div>

Executes an action for the service, e.g. _start_, _stop_ etc.
