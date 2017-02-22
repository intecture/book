# Installation

## 1. Binary installer

The recommended way to install the _Auth_ server is via the binary installer:

```bash
curl -sSf https://get.intecture.io | sh -s -- auth
```

You can also use it for uninstallation via the `-u` flag:

```bash
curl -sSf https://get.intecture.io | sh -s -- -u auth
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
git clone https://github.com/intecture/auth
cd auth/
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

**Second**, install the config file (`auth.json`) to Intecture's system directory:

>Remember to replace `<sysconfdir>` with your system config directory (e.g. "/usr/local/etc").

```bash
mkdir -p <sysconfdir>/intecture/certs
sed 's~{{sysconfdir}}~<sysconfdir>~' resources/auth.json.tpl > <sysconfdir>/intecture/auth.json
chmod 0644 <sysconfdir>/intecture/auth.json
```

**Third**, install the `inauth` and `inauth_cli` binaries:

>Remember to replace `<bindir>` with your system bin directory (e.g. "/usr/local/bin").

```bash
install -m 0755 target/release/inauth <bindir>/bin/
install -m 0755 target/release/inauth_cli <bindir>/bin/
```

**Fourth**, install the init script:

>Remember to replace `<os>` with your operating system slug and `<initdir>` with the directory where your init scripts live. Also note that the file permissions and name are platform specific. Engage brain now!

```bash
install -m 755 resources/init/<os> <initdir>/inauth
```

**Job done!** When you've installed all the components, you'll need to configure them. Take a look at the [Installation section](ch01-02-intro-installation.html) in the Introduction for details.

---

\* Merit badge while stocks** last

** There's no stock
