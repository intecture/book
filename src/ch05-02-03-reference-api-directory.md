# Directory

The `Directory` primitive allows you to create, modify and delete directories.

### Example

<div class="lang-content lang-rust">

```rust
let dir = Directory::new(&mut host, "/path/to/dir").unwrap();
dir.create(&mut host, Some(&[DirectoryOpts::DoRecursive])).unwrap();
dir.set_owner(&mut host, "MyUser", "MyGroup").unwrap();
dir.set_mode(&mut host, 755).unwrap();
```
</div>
<div class="lang-content lang-c">

```c
Directory *dir = directory_new(host, "/path/to/dir");
DirectoryOpts opts = { .do_recursive = true };
directory_create(dir, host, opts);
directory_set_owner(dir, host, "MyUser", "MyGroup");
directory_set_mode(dir, host, 755);
```
</div>
<div class="lang-content lang-php">

```php
$dir = new Directory($host, "/path/to/dir");
$dir->create($host, array(Directory::OPT_DO_RECURSIVE));
$dir->set_owner($host, "MyUser", "MyGroup");
$dir->set_mode($host, 755);
```
</div>

<div class="lang-content lang-rust lang-php">

## Methods</div>
<div class="lang-content lang-c">

## Functions</div>

<div class="lang-content lang-rust">

#### `new(...)`</div>
<div class="lang-content lang-c">

#### `directory_new(...)`</div>
<div class="lang-content lang-php">

#### `__construct(...)`</div>

Creates a new `Directory` <span class="lang-content lang-rust lang-c">struct</span><span class="lang-content lang-php">object</span>.

<div class="lang-content lang-rust lang-php">

#### `exists(...)`</div>
<div class="lang-content lang-c">

#### `directory_exists(...)`</div>

Check if the directory exists.

<div class="lang-content lang-rust lang-php">

#### `create(...)`</div>
<div class="lang-content lang-c">

#### `directory_create(...)`</div>

Create the directory. You can optionally create recursively - see [Options](#options).

<div class="lang-content lang-rust lang-php">

#### `delete(...)`</div>
<div class="lang-content lang-c">

#### `directory_delete(...)`</div>

Delete the directory. You can optionally delete recursively - see [Options](#options).

<div class="lang-content lang-rust lang-php">

#### `mv(...)`</div>
<div class="lang-content lang-c">

#### `directory_mv(...)`</div>

Move the directory to a new path.

<div class="lang-content lang-rust lang-php">

#### `get_owner(...)`</div>
<div class="lang-content lang-c">

#### `directory_get_owner(...)`</div>

Returns the directory's owner and group.

<div class="lang-content lang-rust lang-php">

#### `set_owner(...)`</div>
<div class="lang-content lang-c">

#### `directory_set_owner(...)`</div>

Updates the directory's owner and group.

<div class="lang-content lang-rust lang-php">

#### `get_mode(...)`</div>
<div class="lang-content lang-c">

#### `directory_get_mode(...)`</div>

Returns the directory's octal mode.

<div class="lang-content lang-rust lang-php">

#### `set_mode(...)`</div>
<div class="lang-content lang-c">

#### `directory_set_mode(...)`</div>

Updates the directory's octal mode.

## Options

<div class="lang-content lang-rust">

#### `DirectoryOpts::DoRecursive`</div>
<div class="lang-content lang-c">

#### `DirectoryOpts do_recursive`</div>
<div class="lang-content lang-php">

#### `Directory::OPT_DO_RECURSIVE`</div>

Create or delete the directory recursively.

Recursive deletion does _not_ follow symlinks.

**WARNING!** Deleting a directory recursively is the equivalent of `rm -rf`, so use with care.
