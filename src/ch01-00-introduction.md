# Introduction

Welcome to Intecture, the systems management tool.

Ok, let's pause there for a tic. Firstly, why do people say "Welcome to \<blah\>" as their opening gambit? You may as well say "Welcome to your chair!" I haven't invited you to go anywhere. I suppose it's because people writing docs lack the necessary imaginat... Nevermind I answered my own question.

Secondly, I acknowledge that I'm taking liberties with the word "the" in the strapline -  _the systems management tool_. But I'm sure you'll agree that it sounds better than "Welcome to Intecture, _YASMT_".

Anyway, I digress. Intecture, as it says in the pretentious strapline, is _a_ systems management tool. This means that it helps you (the user) to configure your various systems, like web servers, databases, proxies, firewalls and such. Intecture supports several flavours of Linux, FreeBSD and MacOS, running on either virtual or physical hardware, and provides generic/cross-platform interfaces for managing the filesystem, packages and services on those systems.

### No thanks! My shell works just fine.

That's true. SSH + a terminal is a very simple, effective way to manage a server. But what happens when you have 10 servers? Or 100? Or a googolplex? _"Ok, no biggie. I'll just write a bash script and push it to all the servers."_ Yes, you could do that. But are your servers all homogenous, or do you have to write a script for different OSes? And don't forget the different versions of those different OSes. Are some of them running `systemd` and some of them `init`? How about package managers? Can you just run `yum update -y openssl-devel`, or is it `apt-get -y install libssl-dev`? Or both?

Yes, I am belabouring the point, but at some stage we all need to find better ways of dealing with the cost of systems growth. Especially when we want to do _hyper web scale_! Intecture is here to help address that cost.

### "Manage", how?

Ok, we've talked about managing servers, but what does that look like in practise? Well, Intecture fits into the loosely-defined category of Infrastructure as Code. To an end user, that means an API - we provide you with an API for your systems that automatically works cross-platform, so you don't have to. Who cares whether you're using `apt` or `pkg` or `dnf`?

To sweeten the deal, Intecture is also (to the best of our knowledge) the only systems management tool to provide an API in multiple programming languages. This means that you don't need to know Ruby, for example, in order to use Intecture.

If you need to justify it to management types, just say _"lower barriers to entry, buzzword, buzzword, leverage existing core competencies, buzzword"_. And don't forget the _buzzwords_! Managers love those.
