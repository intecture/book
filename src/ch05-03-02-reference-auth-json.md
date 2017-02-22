# auth.json

> The short hand _\<system_dir\>_ refers to your system's `etc/` directory. On Linux it is `/etc/`, and on MacOS and BSD it is `/usr/local/etc/`.

#### `server_cert`

_Default value: \<system_dir\>/intecture/auth.crt_

This is the _Auth_ server's private key and should be kept secure and confidential. It is the method by which Intecture guarantees that this _Auth_ server is known and authorised.

#### `cert_path`

_Default value: \<system_dir\>/intecture/certs/_

The path to the certificate store. **This directory must be kept secure with write access restricted to the directory owner.**

#### `api_port`

_Default value: 7101_

This is the port that the _Auth_ server exposes its API on, which is primarily used by the _API_ to retrieve host certificates. It can be anything you like, though we'd recommend the default option unless it conflicts with another service.

#### `update_port`

_Default value: 7102_

This is the port that the _Auth_ server publishes user certificate updates on, which is consumed by the _Agent_ to maintain local volatile caches of user public keys. It can be anything you like, though we'd recommend the default option unless it conflicts with another service.
