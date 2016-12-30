# Security

Given the current climate, security has taken a front seat in application design. Intecture is written in Rust, which is a strongly typed, compiled language with strong memory and type safety guarantees. This eliminates entire classes of vulnerabilities that have plagued high profile projects in recent history.

Intecture's components, as by now you are aware, are distributed across the network. They communicate with each other using sockets. More specifically, they use [ZeroMQ](https://zeromq.org), which is a socket programming API and wire protocol. ZeroMQ also provides authentication and encryption services via a child project, [CurveZMQ](https://curvezmq.org).

## CurveZMQ

CurveZMQ is an open source project that powers the public key authentication and cryptography technology built into ZeroMQ. We use it to secure all of our socket endpoints. CurveZMQ uses the Curve25519 elliptic curve, which you can read about in the documentation: [curvezmq.org/page:read-the-docs](http://curvezmq.org/page:read-the-docs).

To summarise, CurveZMQ protects Intecture's components by providing mutual authentication of both the sending and receiving party. It does this through public/private key pairs, the former of which are distributed to clients manually, or queried through the _Auth_ server.

## Auth server

You might be wondering, _"If ZMQ is securing itself, why do we need an Auth server?"_

Excellent question. The answer is simple - public key distribution. In order to communicate with a host, the user needs to know the host's public key so it can check that the host is not an imposter. The host also needs to know the user's public key for the same reason. Without an _Auth_ server, you would have to keep a local copy of every host's key. That might be thousands of keys, or more!

Equally, every host would need to keep a local copy of your user key. And what if a new user arrives? Every host in your infrastructure would need to be sent a copy of the new user's key. And if they leave? What if a user's private key is stolen and you need to remove the user?

As you can see, the issue soon spirals out of control. Fortunately the _Auth_ server saves us from this fate by providing a single source of truth. Users, via the _API_, can query the _Auth_ server for hosts' public keys. On the other end, the _Auth_ server provides a pub/sub service that _Agents_ subscribe to, to receive realtime updates on users' public keys. This means that adding and deleting users is effected near-instantly across the entire infrastructure.

For more information, check out the [Auth reference](ch05-03-reference-auth.html). There's even pictures!

## Responsible disclosure

Intecture is an open source project, which freely gives away it's IP. We can't yet fund a bug bounty programme, though if you're a supporter of Intecture and wish to responsibly disclose a vulnerability, we would seriously appreciate it.

Please email [se&#99;urity&#64;&#105;ntecture&#46;io](mailto&#58;&#115;e&#99;u&#114;%69&#116;y&#64;&#105;nt&#101;&#99;t&#117;re&#46;i&#111;).

You can encrypt your message using [our public key](/intecture-security-team.gpg.txt).
