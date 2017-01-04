# Package

The `Package` primitive gives you control over your host's package management system. Intecture supports a number of platform-specific package managers:

- For _Debian_-based systems, we support `Apt`
- For _RedHat_-based systems, we preference `Dnf` if available, or `Yum`
- For _FreeBSD_, we support `pkgng`, with support planned for `ports`
- For _MacOS_, we support `Homebrew`, with support planned for `MacPorts`

### Example

<div class="lang-content lang-rust">

```rust
// Let Intecture pick the correct package provider
let mut package = Package::new(&mut host, "nginx", None).unwrap();

// Or if you want to override it...
let mut package = Package::new(&mut host, "nginx", Some(Providers::Yum)).unwrap();

package.install(&mut host);
```
</div>
<div class="lang-content lang-c">

```c
// Let Intecture pick the correct package provider
Package *package = package_new(host, "nginx", (enum Providers)Default);

// Or if you want to override it...
Package *package = package_new(host, "nginx", (enum Providers)Yum);

package_install(host);
```
</div>
<div class="lang-content lang-php">

```php
// Let Intecture pick the correct package provider
$package = Package::new($host, "nginx");

// Or if you want to override it...
$package = Package::new($host, "nginx", Package::PROVIDER_YUM);

$package->install($host);
```
</div>

<div class="lang-content lang-rust lang-php">

## Methods</div>
<div class="lang-content lang-c">

## Functions</div>

<div class="lang-content lang-rust">

#### `new(...)`</div>
<div class="lang-content lang-c">

#### `package_new(...)`</div>
<div class="lang-content lang-php">

#### `__construct(...)`</div>

Creates a new `Package` <span class="lang-content lang-rust lang-c">struct</span><span class="lang-content lang-php">object</span>.

<div class="lang-content lang-rust lang-php">

#### `is_installed(...)`</div>
<div class="lang-content lang-c">

#### `package_is_installed(...)`</div>

Check if the package is already installed.

<div class="lang-content lang-rust lang-php">

#### `install(...)`</div>
<div class="lang-content lang-c">

#### `package_install(...)`</div>

Install the package.

<div class="lang-content lang-rust lang-php">

#### `uninstall(...)`</div>
<div class="lang-content lang-c">

#### `package_uninstall(...)`</div>

Remove the package.
