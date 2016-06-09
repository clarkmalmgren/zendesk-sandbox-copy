# Copy Zendesk Settings to a Sandbox
__WARNING: Use at your own risk.__

This will take programmatic actions on your zendesk account deleting and copying over
ticket fields and ticket forms. There are no "are you sure" dialogs after you start so
once it goes, it goes.

## Still Interested?

To run, clone this repository, and then execute the following commands. This assumes that
you already have node and npm installed.

```sh
$ npm install
$ npm install -g angular-cli
$ ng serve
```

Then open up chrome (only one I tested on) to [http://localhost:4200](http://localhost:4200).

MAKE SURE that you put in the correct production and sandbox account names. Don't flip them
or you are gonna have a bad time.
