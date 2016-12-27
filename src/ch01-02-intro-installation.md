# Installation

As with any open source project, you can install Intecture by compiling it yourself, or you can download binary packages via the auto-installer. If you choose to compile Intecture yourself, checkout the `Makefile`s for each project, which will do much of the heavy lifting for you. Otherwise, read on!

> The following chapters will also cover installation with practical examples, so there will be more opportunities to get your head around Intecture's structure as we go.

## Auto-installer

To run the auto-installer, we need only issue this command:

```bash
curl -sSf https://get.intecture.io | sh -s -- <component>
```

`<component>` can be one of: `agent`, `api`, `auth` or `cli`.

If you aren't running as the _root_ user, the installer requires that you have _sudo_ access to install Intecture's libraries and binaries into the appropriate system folders.

## What goes where?

Intecture's components have 3 natural groupings:
- Components that run code; the _API_ and _CLI_
- A component that manages servers; the _Agent_, and
- A component that authorises communication between the two former groups; the _Auth_ server.

The **Agent** _must_ be running on every server you wish to manage with Intecture, as well as traversable over the network.

The **CLI** helps you drive your Intecture projects, which in turn consume the **API**. Hence these should go on the same box.

> Tip: If you're running a Rust project, you don't need to install the API as it's provided as a Cargo crate.

The **Auth** server can live anywhere, as long as it is traversable over the network. We would recommend a dedicated server as it needs to be available to both _Agents_ and _Projects_.

## How it works

Intecture's auto-installer is a small shell script that downloads the correct Intecture binary package tarball for your platform. It then unpacks the tarball and runs the `installer.sh` script, the source for which you can find in the root directory of the project's repository. For example, the CLI project's `installer.sh` lives at [https://github.com/intecture/cli/blob/master/installer.sh]().

If you are concerned about the security implications of running a script directly from the interwebs, you can replicate the installer steps manually:

#### 1. Download the component's tarball

The format for the download URL is as follows:

`https://static.intecture.io/<component>/<os>/latest`

`<component>` can be one of: `agent`, `api`, `auth` or `cli`.

`<os>` can be one of: `centos`, `darwin`, `debian`, `fedora`, `freebsd` or `ubuntu`.

#### 2. Unpack it

If in doubt: `man tar`.

#### 3. Run `installer.sh`

Run the installer... Prrrdy easy!

`./installer.sh`

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
