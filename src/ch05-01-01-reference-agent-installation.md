# Installation

## 1. Binary installer

The recommended way to install the _Agent_ is via the binary installer:

```bash
curl -sSf https://get.intecture.io | sh -s -- agent
```

You can also use it for uninstallation via the `-u` flag:

```bash
curl -sSf https://get.intecture.io | sh -s -- -u agent
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
git clone https://github.com/intecture/agent
cd agent/
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

**Second**, install the config file (`agent.json`) to Intecture's system directory:

>Remember to replace `<sysconfdir>` with your system config directory (e.g. "/usr/local/etc").

```bash
mkdir -p <sysconfdir>/intecture
sed 's~{{sysconfdir}}~<sysconfdir>~' resources/agent.json.tpl > <sysconfdir>/intecture/agent.json
chmod 0644 <sysconfdir>/intecture/agent.json
```

**Third**, install the `inagent` binary:

>Remember to replace `<bindir>` with your system bin directory (e.g. "/usr/local/bin").

```bash
install -m 0755 target/release/inagent <bindir>/bin/
```

**Fourth**, install the init script:

>Remember to replace `<os>` with your operating system slug and `<initdir>` with the directory where your init scripts live. Also note that the file permissions and name are platform specific. Engage brain now!

```bash
install -m 755 resources/init/<os> <initdir>/inagent
```

**Job done!** When you've installed all the components, you'll need to configure them. Take a look at the [Installation section](ch01-02-intro-installation.html) in the Introduction for details.

---

\* Merit badge while stocks** last

** There's no stock
