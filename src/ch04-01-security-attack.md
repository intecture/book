# Attack Surfaces

> If you think there are other issues  worth mentioning here, we'd really appreciate [a report](https://github.com/intecture/book/issues).

You might think that it's risky, or even irresponsible, to detail Intecture's vulnerabilities publicly. However we strongly believe that users can mount the best defence by bringing issues into the light, rather than by trying to obscure them in the shaddows. We also believe that ethically, you should be fully informed of the risks before deciding to use Intecture.

It's also worth mentioning that Intecture is _open source_. This means that any serious attackers will already know Intecture's attack surfaces by examining its source code. Best you do, too.

_Ok, deep breath..._

## 1. Your code

Your code is the single biggest attack surface, with unlimited vectors. This shouldn't be too surprising to you, as it has total control over your servers. However it's worth keeping in mind that you should have a security policy to protect your project data and dev boxes.

### Mitigation

Intecture doesn't rely on the secrecy of your code or data, nor does it require you to prevent unauthorised users attempting to run your project. Although these are all reasonable precautions to take.

Instead, Intecture secures its 'front door' through the user's private key. It is this key that authorises a request, either to the _Auth_ server or to an _Agent_. Unless an attacker has a valid private key that has been registered with the _Auth_ server, they will be unable to make requests and thus won't be able to make malicious changes to your infrastructure.

It should also go without saying that if you use a payload that you did not create, you should audit its code first. Otherwise you risk running a payload that could be a [_trojan horse_](https://en.wikipedia.org/wiki/Trojan_horse_\(computing\)).

## 2. Socket listeners

Both the _Agent_ and _Auth_ servers establish listeners on several sockets in order to receive incoming requests. You can confirm which ports Intecture is listening on by checking the [Agent](ch05-01-02-reference-agent-json.html) and [Auth](ch05-03-02-reference-auth-json.html) config files. By default they use `7101` + `7102` and `7103` + `7104` respectively.

### Mitigation

As previously mentioned, Intecture relies on ZeroMQ to secure these endpoints. We ensure that whenever we release a binary package, we also bundle the latest stable ZeroMQ version available at the time of packaging.

As a user, you should **keep your private keys secure**. Never share them with anyone, for any reason. It is also recommended that Intecture's services are firewalled. While they are capable of withstanding attack, it is good practice to isolate network services where internet access is not absolutely necessary.

## 3. Auth server

The _Auth_ server itself is another targer for attackers. On this server, the main attack vector is the certificate store, which by default is located at `<system_dir>/intecture/certs/`. Check your [Auth server config](ch05-03-02-reference-auth-json.html) to confirm.

There is also the Auth CLI (`inauth_cli`) which is used to manually add certificates to the store.

### Mitigation

The best way to prevent attackers from poisoning the certificate store is by preventing access to the machine running the _Auth_ service. Assuming you use network zoning, this server should be quite low in the stack. Also employing best practices for SSH and user management will stand you in good stead for fending off attacks.

For the users that have access to the machine, you should award `sudo` privileges carefully and selectively.

We recommend that you configure your certificate store with the octal permissions `0700` and set `root` as the store owner. This will prevent all users from reading/writing to the store's directory, except `root`. Note that the _Auth_ service must also run as `root` in this case to allow it to function properly.

Configuring the certificate store's directory permissions carefully will also prevent misuse of `inauth_cli`. The CLI will attempt to write to the certificate store, though if the user does not have write permission, the CLI cannot be used maliciously.

> Remember that the _Auth_ server only stores public keys. If an attacker is able to read certificates in the store, it will not help them gain access to those servers.
