# Anatomy of a Project

Intecture Projects are the repositories for your code, data, certificates and config. Every interaction with Intecture, either through the _API_ or the _CLI_, will directly involve your project(s):
- When you run your code, you will invariably implement the _API_ to interact with your hosts
- The _CLI_ references your project when making requests, for example looking up _Auth_ server details, or to authenticate a request with your user certificate

Thus, when working with Intecture, changing to your project's root directory is normally your first step.

> You can create a new project using the _CLI_: `incli project init <project_name> <programming_lang>`

## Directory structure

When you create a new project, there are a few files/directories that will be created. Here are the highlights:
- `data/` Where your static data lives, e.g. host data, config for files/services [(see reference)](ch05-05-03-reference-projects-data.html)
- `payloads/` Payloads are units of purpose-specific code, e.g. Installing `Nginx` or configuring `PF`
- `src/` Global code that is executed on every Intecture run
- `project.json` The global configuration file for your project [(see reference)](ch05-05-01-reference-projects-json.html)

We'll explore each of these items in more detail in the following sections.

## FAQ

#### 1. Can an Intecture project be setup for multiple users?

Yes and no. At the moment, user management is an under-developed aspect of Intecture. Each project has a _single_ `user.crt`, which is your personal certificate. It should never be shared between users and thus, a project is single-user only.

However, each user is able to maintain their own clone of the project repository, assuming you use a Git server to push/pull changes. The onus is entirely on the user to make sure that changes are propagated to the rest of the team and that conflicting changes are not applied to the same servers. Intecture will blindly oblige each request, irrespective of the previous one.

And yes, this is an area we are looking to improve in the future.

#### 2. Is there any advantage to creating multiple projects?

No _*_.

Here are some perceived advantages of multiple projects:
- _"I can support multiple programming languages"_ - Payloads also support multiple programming languages and are not tied to the project's language. They also have the advantage of sharing project data and other payloads in the same project.
- _"I can separate projects into specific functions/security zones/..."_ - You're doing it wrong. You should use _Payloads_ to handle specific functions and _Data_ to customise a payload for a specific host. Separating projects by concern implies that you are not abstracting your code and/or data correctly. If you think there's a compelling argument against this, you should [get in touch](https://intecture.io/#Get%20in%20touch).

_*_ The only caveat to this is if you are maintaining different _Auth_ servers for different groups of managed hosts. This is one way to work around the current lack of user management, but it **is not future proof**.
