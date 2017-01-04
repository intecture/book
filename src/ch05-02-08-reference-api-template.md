# Template

The `Template` primitive is a rendering engine for file templates. The resulting output can be passed to the `File` primitive to be uploaded to a managed host.

Intecture's templates are powered by a Rust-based implementation of the [Mustache specification](https://mustache.github.io).

### Example

<div class="lang-content lang-rust">

```rust
// Render the template
let template = Template::new("payloads/nginx/tpl/nginx.conf.tpl").unwrap();
let data = MapBuilder::new().insert_str("worker_processes", "4").build();
let rendered_file = template.render_data(&data).unwrap();

// Now upload it
let file = File::new(&mut host, "/usr/local/etc/nginx.conf").unwrap();
file.upload_file(&mut host, rendered_file, None).unwrap();
```
</div>
<div class="lang-content lang-c">

```c
// Render the template
Template *template = template_new("payloads/nginx/tpl/nginx.conf.tpl");
MapBuilder *builder = map_new();
map_insert_str(builder, "worker_processes", "4");
int fd = template_render_map(template, builder);

// Now upload it
File *file = file_new(host, "/usr/local/etc/nginx/nginx.conf");
file_upload_file(file, host, fd, NULL);
```
</div>
<div class="lang-content lang-php">

```php
// Render the template
$template = new Template("payloads/nginx/tpl/nginx.conf.tpl");
$fd = $template->render(array(
    "worker_processes" => 4
));

// Now upload it
$file = new File($host, "/usr/local/etc/nginx.conf");
$file->upload_file($host, $fd);
```
</div>

<div class="lang-content lang-rust lang-php">

## Methods</div>
<div class="lang-content lang-c">

## Functions</div>

<div class="lang-content lang-rust">

#### `new(...)`</div>
<div class="lang-content lang-c">

#### `template_new(...)`</div>
<div class="lang-content lang-php">

#### `__construct(...)`</div>

Creates a new `Template` <span class="lang-content lang-rust lang-c">struct</span><span class="lang-content lang-php">object</span>.

<div class="lang-content lang-rust">

#### `render(...)`

Render the template into a file, using data from a `RustcEncodable` structure.
</div>

<div class="lang-content lang-rust">

#### `render_data(...)`

Render the template into a file, using data from a `MapBuilder` or `VecBuilder` structure.
</div>

<div class="lang-content lang-php">

#### `render(...)`

Render the template into a file, using data from an associative array.
</div>

<div class="lang-content lang-c">

#### `template_render_map(...)`

Render the template into a file, using data from a `MapBuilder` structure.

#### `template_render_vec(...)`

Render the template into a file, using data from a `VecBuilder` structure.
</div>

<div class="lang-content lang-rust lang-c">

## MapBuilder

The `MapBuilder` is a hash map structure used for providing key/value pairs to a template.

<div class="lang-content lang-rust">

For usage information, [read the manual](http://nickel.rs/rust-mustache/mustache/builder/struct.MapBuilder.html).
</div>

<div class="lang-content lang-c">

#### `map_insert_str(...)`

Insert a string into the hash map.

#### `map_insert_bool(...)`

Insert a boolean into the hash map.

#### `map_insert_vec(...)`

Insert a vector into the hash map.

#### `map_insert_map(...)`

Insert a nested hash map.
</div>

## VecBuilder

The `VecBuilder` is a vector structure used for providing an array of values to a template.

<div class="lang-content lang-rust">

For usage information, [read the manual](http://nickel.rs/rust-mustache/mustache/builder/struct.VecBuilder.html).
</div>

<div class="lang-content lang-c">

#### `vec_push_str(...)`

Insert a string into the vector.

#### `vec_push_bool(...)`

Insert a boolean into the vector.

#### `vec_push_vec(...)`

Insert a nested vector.

#### `vec_push_map(...)`

Insert a hash map into the vector.
</div>

</div>
