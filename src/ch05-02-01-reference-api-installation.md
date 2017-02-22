# Installation

## 1. Binary installer

The recommended way to install the _API_ is via the binary installer:

```bash
curl -sSf https://get.intecture.io | sh -s -- api
```

You can also use it for uninstallation via the `-u` flag:

```bash
curl -sSf https://get.intecture.io | sh -s -- -u api
```

## 2. Compile from Source

### Dependencies

Make sure you've got all these babies:

- zeromq >= 4.1
- czmq >= 4.0
- cmake
- gcc
- gnumake
- openssl
- pkgconfig
- zlib

### 2.a. Using the `Makefile`

The easiest way to build from source is to use the `Makefile`:

```bash
git clone https://github.com/intecture/api
cd api/
# For Linux
make && make install
# Or for Unix-like
gmake && gmake install
```

### 2.b. Full Manual Jacket

To earn your "CodeLegend" merit badge*, you must build the project from scratch.

**First**, compile it:

```bash
cargo build --release
```

**Second**, install the API library:

>Remember to replace `<libdir>` with your system lib directory (e.g. "/usr/local/lib"). Also note that the file extension is platform specific. Engage brain now!

```bash
install -m 0644 target/release/libinapi.so <libdir>
```

**C Support** can be enabled by installing the API's C headers:

>Remember to replace `<incdir>` with your system include directory (e.g. "/usr/local/include").

```bash
install -m 0644 bindings/c/inapi.h <incdir>
```

**PHP Support** can be enabled by installing the API's PHP binding. It's available for major versions 5 and 7. The instructions are the same for both:

```bash
cd bindings/php7
phpize
./configure
make && make install
```

**Job done!** When you've installed all the components, you'll need to configure them. Take a look at the [Installation section](ch01-02-intro-installation.html) in the Introduction for details.

---

\* Merit badge while stocks** last

** There's no stock
