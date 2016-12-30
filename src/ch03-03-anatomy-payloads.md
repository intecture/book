# Payloads

Payloads are collections of code and data that are dedicated to a specific purpose, such as installing and configuring a software package. They are also Intecture's way of providing reusable code that can be shared between projects. All of your configuration code should go in payloads.

Another advantage of payloads is that they are language-agnostic. That is, they can be written in different languages to each other, and to the project that's running them.

## Creating a payload

Using the _CLI_, creating a payload is easy, breezy. From the project root, run the following command, substituting `<name>` for the name of your payload, and `<lang>` for the programming language it's written in:

```bash
incli payload init <name> <lang>
```

This should create a new payload in `<project_root>/payloads/<name>`.

## Directory structure

Here's an overview of your new payload directory:

- `data/` Where your static data lives
- `src/` Where your code lives
- `tpl/` Where any templates go
- `payload.json` The configuration file for your payload [(see reference)](ch05-05-02-reference-projects-payload.html)

## Payload data

Payload data works in exactly the same fashion as project data, although it is used for a slightly different purpose. It goes without saying that payload data is specific to a payload, however for portability's sake, we would strongly advise that you do not put any project specific data in payload data files. Payloads are intended to be shared between projects and eventually through an open online repository. Therefore, anything specific to you; anything private, should be reserved for project data, unless you want it to be shared with the world.

What you should put into payloads are sensible default settings that can be overridden on a project-by-project basis. This allows other projects to reuse the same payload with only minimal tweaks to their project data.

Finally, make sure that you **namespace your payload**! Take the following example:

_Here's my top level data file:_

```json
{
    "_include": [
        "payload: nginx",
        "payload: squid"
    ]
}
```

_Here's my Nginx payload's main data file:_
```json
{
    "package_name": "nginx"
}
```

_And here's my Squid payload's main data file:_
```json
{
    "package_name": "squid"
}
```

_Given the laws of inheritence we covered in the previous section, the Squid payload will now attempt to install the package "nginx". Doh!_

_If only Squid had namespaced its payload data correctly..._

```json
{
    "squid": {
        "package_name": "squid"
    }
}
```

_Now, Nginx can't override that bad boy!_

Repeat after me: **name-space-your-pay-loads**. Excellent!

## Payload code

Your payload code is where the action is. As we read earlier, the _bootstrap_ (entry point) should just be kicking off your payloads. Payloads are the A-Team for getting stuff done. If you ever have the thought _"I'd like to automate that"_, follow it up with your best impression of Mr. T shouting _"Payload it, bitch!"._ Because you should payload it, bitch.

We won't cover connecting to a host, as we covered it in the [Code Briefing](ch02-code-briefing.html). Just remember that it's of the `connect_payload` variety. You can also check out the [API reference](ch05-02-reference-api.html) if you want to dive headfirst into the code. Just remember to always check the depth first.

Before we call it quits on payloads though, it's worth mentioning how to build your code when you've finished writing it. Interpreted language developers can flick to the next section now.

When you run Intecture, it will automatically compile any code it finds (provided it requires compiling). If you have a lot of uncompiled payloads though, this can take a long while! I'm looking at you `rustc`. In order to make your runs faster, you can take a compilation hit upfront by running:

```bash
incli payload build
```

This will loop through all your payloads and compile each one. It's considered good practice (and polite) to do this, as it'll identify any reaaally broken code with compiler explosions, saving your esteemed colleagues from the same fate.

You can also be specific by building just the payloads you feel like at the time:

```bash
incli payload build this_one and-this-one
```

Note that you must use the payload's directory name, rather than a stylised name you've used elsewhere.
