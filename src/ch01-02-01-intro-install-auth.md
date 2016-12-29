# Auth Server

The Auth server runs the Intecture _Auth_ component, which provides authentication and certificate storage for your projects and managed hosts. We recommend that the _Auth_ component is installed on a dedicated machine, though in practise it does not matter where it is installed, provided that it can communicate with projects and hosts across the network.

## 1. Install the component

Run this command on your new _Auth_ server:

```bash
curl -sSf https://get.intecture.io | sh -s -- auth
```

## 2. Create your first user

Now let's setup your first user. This must be done before the _Auth_ service starts, or the user won't be registered until it next restarts.

The following command will generate a new user certificate. This is your personal certificate and should be kept private and secure at all times.

```bash
inauth_cli user add pete
```

> My name is Pete, but yours probably isn't. Feel free to use your own name here!

Copy the certificate and save it somewhere secure. We'll need it for when we setup our _Dev box_.

## 3. Configure Auth service

If you plan on running the _Agent_ and _Auth_ services on the same server, you'll need to change the _Auth_ server's listen ports so they don't conflict with the _Agent_. Edit `auth.json` and set `api_port` to _7103_ and `update_port` to _7104_:

```bash
vi [/usr/local]/etc/intecture/auth.json
```

## 4. Start 'er up

...not forgetting to enable it at boot time!

For `systemd` users:

```bash
systemctl enable inauth
systemctl start inauth
```

Or for everyone else:

```bash
# RedHat
chkconfig inauth on
# Debian
update-rc.d inauth enable
# FreeBSD
echo 'inauth_enable="YES"' >> /etc/rc.conf

service inauth start
```
