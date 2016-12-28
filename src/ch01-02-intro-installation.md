# Installation

As with any open source project, you can install Intecture by compiling it yourself, or you can download binary packages via the auto-installer. If you choose to compile Intecture yourself, checkout the `Makefile`s for each project, which will do much of the heavy lifting for you. Otherwise, read on!

> The rest of the chapter assumes that you will use the auto-installer. If you aren't confident in your ability to fill in the blanks, best avoid manual compilation.

## Auto-installer

To run the auto-installer, you can copy+paste the following line, exchanging `<component>` for one of `agent`, `api`, `auth` or `cli`:

```bash
curl -sSf https://get.intecture.io | sh -s -- <component>
```

#### Dependencies

If you aren't running as the _root_ user, the installer requires that you have `sudo` to install Intecture's libraries and binaries into the appropriate system folders.

The installer also depends on `pkg-config`, which may or may not be installed on your system. For FreeBSD, the installer uses `pkgconf` instead, as `pkg-config` has been deprecated.

## What goes where?

Intecture's components have 3 natural groupings:
- Components that run code; the _API_ and _CLI_
- A component that manages servers; the _Agent_, and
- A component that authorises communication between the two former groups; the _Auth_ server.

The **Agent** _must_ be running on every server you wish to manage with Intecture, as well as traversable over the network.

The **CLI** helps you drive your Intecture projects, which in turn consume the **API**. Hence these should go on the same box.

> Tip: If you're running a Rust project, you don't need to install the API as it's provided as a Cargo crate.

The **Auth** server can live anywhere, as long as it is traversable over the network. We would recommend a dedicated server as it needs to be available to both _Agents_ and _Projects_.

## System Requirements

Intecture has been tested on the following platforms:

**BSD**
- FreeBSD 10.2+

**Darwin**
- MacOS 10.11+ (Note: Agent support is limited and no Agent package is built for this platform. Recommended for dev box only.)

**Debian Linux**
- Debian 8+
- Ubuntu 14.04+

**RedHat Linux**
- CentOS 6+
- Fedora 24+

Intecture's API also supports multiple programming languages:
- Rust (tested on stable)
- C
- PHP 5 + 7
