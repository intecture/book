# File

The `File` primitive allows you to upload, modify and delete files.

### Example

<div class="lang-content lang-rust">

```rust
let file = File::new(&mut host, "/path/to/destination_file").unwrap();
file.upload(&mut host, "/path/to/local_file", &[
    FileOptions::BackupExisting(".bk".into()),
    FileOptions::ChunkSize(2048),
]);
file.set_owner(&mut host, "MyUser", "MyGroup").unwrap();
file.set_mode(&mut host, 644).unwrap();
```
</div>
<div class="lang-content lang-c">

```c
File *file = file_new(host, "/path/to/destination_file");
FileOptions opts = { .backup_existing = ".bk", .chunk_size = 2048 };
file_upload(file, host, "/path/to/local_file", opts);
file_set_owner(file, host, "MyUser", "MyGroup");
file_set_mode(file, host, 644);
```
</div>
<div class="lang-content lang-php">

```php
$file = new File($host, "/path/to/destination_file");
$file->upload($host, "/path/to/local_file", array(
    File::OPT_BACKUP_EXISTING => ".bk",
    File::OPT_CHUNK_SIZE => 2048,
));
$file->set_owner($host, "MyUser", "MyGroup");
$file->set_mode($host, 644);
```
</div>

<div class="lang-content lang-rust lang-php">

## Methods</div>
<div class="lang-content lang-c">

## Functions</div>

<div class="lang-content lang-rust">

#### `new(...)`</div>
<div class="lang-content lang-c">

#### `file_new(...)`</div>
<div class="lang-content lang-php">

#### `__construct(...)`</div>

Creates a new `File` <span class="lang-content lang-rust lang-c">struct</span><span class="lang-content lang-php">object</span>.

<div class="lang-content lang-rust lang-php">

#### `exists(...)`</div>
<div class="lang-content lang-c">

#### `file_exists(...)`</div>

Check if the file exists.

<div class="lang-content lang-rust lang-php">

#### `upload(...)`</div>
<div class="lang-content lang-c">

#### `file_upload(...)`</div>

Uploads a local file to your managed host.

See [Options](#options) for controlling upload behaviour.

<div class="lang-content lang-rust lang-php">

#### `upload_file(...)`</div>
<div class="lang-content lang-c">

#### `file_upload_file(...)`</div>

Uploads a file resource to your managed host. This is usually used in conjunction with the [`Template` primitive](ch05-02-09-reference-api-template.html), which produces a file resource.

See [Options](#options) for controlling upload behaviour.

<div class="lang-content lang-rust lang-php">

#### `delete(...)`</div>
<div class="lang-content lang-c">

#### `file_delete(...)`</div>

Delete the file.

<div class="lang-content lang-rust lang-php">

#### `mv(...)`</div>
<div class="lang-content lang-c">

#### `file_mv(...)`</div>

Move the file to a new path.

<div class="lang-content lang-rust lang-php">

#### `copy(...)`</div>
<div class="lang-content lang-c">

#### `file_copy(...)`</div>

Copies the file to a new path.

<div class="lang-content lang-rust lang-php">

#### `get_owner(...)`</div>
<div class="lang-content lang-c">

#### `file_get_owner(...)`</div>

Returns the file's owner and group.

<div class="lang-content lang-rust lang-php">

#### `set_owner(...)`</div>
<div class="lang-content lang-c">

#### `file_set_owner(...)`</div>

Updates the file's owner and group.

<div class="lang-content lang-rust lang-php">

#### `get_mode(...)`</div>
<div class="lang-content lang-c">

#### `file_get_mode(...)`</div>

Returns the file's octal mode.

<div class="lang-content lang-rust lang-php">

#### `set_mode(...)`</div>
<div class="lang-content lang-c">

#### `file_set_mode(...)`</div>

Updates the file's octal mode.

## Options

<div class="lang-content lang-rust">

#### `FileOptions::BackupExisting`</div>
<div class="lang-content lang-c">

#### `FileOptions backup_existing`</div>
<div class="lang-content lang-php">

#### `File::OPT_BACKUP_EXISTING`</div>

If a file already exists at the specified path, backup that file with the specified suffix before moving the new file into place.

> If a file already exists at the backup path, it will be overwritten.

<div class="lang-content lang-rust">

#### `FileOptions::ChunkSize`</div>
<div class="lang-content lang-c">

#### `FileOptions chunk_size`</div>
<div class="lang-content lang-php">

#### `File::OPT_CHUNK_SIZE`</div>

When a file is uploaded, it is broken into chunks and transmitted in parallel. The default chunk size is 1024 bytes. You can override that here, though you shouldn't do this without good reason.
