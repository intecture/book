# Managed hosts

> The _Agent_ is not fully supported on MacOS and there is no binary package for this target. It is recommended not to use Intecture to manage MacOS until support for it improves.

Each managed host (that is, a server that Intecture manages) requires the _Agent_ component. This is the only installation requirement for your infrastructure.

There are two methods of installation for the _Agent_ component: _Bootstrapping_, which is the simplest and recommended option, and manual installation, which is not recommended unless there is a technical limitation.

## Bootstrapping

To bootstrap a host, you need to have SSH access to the server, as well as `sudo` permissions if you are not the _root_ user. The _CLI_ supports either password or private key authentication.

Run this from the root of your Intecture project:

```bash
incli host bootstrap <hostname> -u <username> -p <password> -i <private_key>
```

## Manual installation

If bootstrapping is not an option, it is possible to manually install the _Agent_ with a few extra steps.

### 1. Install the component

Firstly, let's install the _Agent_ by running this command on the managed server:

```bash
curl -sSf https://get.intecture.io | sh -s -- agent
```

### 2. Create a host certificate

Next, we need a new host certificate, which you can generate from the _CLI_ on your _Dev box_. Run this from the root of your Intecture project, replacing `<hostname>` with the hostname or IP address of your managed host:

```bash
incli host add <hostname>
```

Now you need to copy the certificate to the managed host:

```bash
vi [/usr/local]/etc/intecture/agent.crt
```

### 3. Start 'er up

...not forgetting to enable it at boot time!

For `systemd` users:

```bash
systemctl enable inagent
systemctl start inagent
```

Or for everyone else:

```bash
# RedHat
chkconfig inagent on
# Debian
update-rc.d inagent enable
# FreeBSD
echo 'inagent_enable="YES"' >> /etc/rc.conf

service inagent start
```
