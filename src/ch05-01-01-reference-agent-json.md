# agent.json

> The short hand _\<system_dir\>_ refers to your system's `etc/` directory. On Linux it is `/etc/`, and on MacOS and BSD it is `/usr/local/etc/`.

#### `server_cert`

_Default value: \<system_dir\>/intecture/agent.crt_

This is the _Agent's_ private key and should be kept secure and confidential. It is the method by which Intecture guarantees that this _Agent_ is known and authorised.

#### `api_port`

_Default value: 7101_

This is the main port that the _API_ (i.e. your code) communicates with the _Agent_ on. It can be anything you like, though we'd recommend the default option unless it conflicts with another service.

#### `filexfer_port`

_Default value: 7102_

This is a dedicated file transfer port that the _API_ (i.e. your code) uses to upload files to the _Agent_. It can be anything you like, though we'd recommend the default option unless it conflicts with another service.

#### `filexfer_threads`

_Default value: 2_

The number of concurrent file chunks that can be sent/received by the _Agent_. In theory, the more threads you have available, the faster your upload will run. However in practice there should be no more threads than the number of CPU cores the machine has. Adding more threads than cores can actually reduce upload speed.

#### `auth_server`

_Default value: 127.0.0.1_

The IP address or hostname of the _Auth_ server.

#### `auth_update_port`

_Default value: 7104_

The _Auth_ server's `update_port`, which the _Agent_ subscribes to in order to receive updates on users' public keys.

#### `auth_cert`

_Default value: \<system_dir\>/intecture/auth.crt_public_

The _Auth_ server's public key, which the _Agent_ needs to authenticate it's connection to the _Auth_ server.
