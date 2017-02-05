# contributing 

## developing

clone this repository, then

    npm install
    npm run watch

now you can edit js files in src/ and test/ - tests will automatically re-run


# notes

## muse setup (mac)

1. [download](http://developer.choosemuse.com/research-tools/getting-started) and run muse installer
2. the installer adds stuff to your .bashrc. if you use bash, skip this step. if you use zsh or whatever, copy the additions to your .bashrc into your relevant dotfile (e.g. .zshrc).
3. hold down power button on muse for 5 seconds, until LEDs flash in unison on and off. open Bluetooth pref panel, pair with the device. LEDs will continue to flash.
4. do `muse-io` on the command line. 

NOTE: Don’t worry about that “OSC error 61″ / “TCP connection failure”. It just means that nothing is receiving the messages that MuseIO is sending out. That’s what MuseLab will do when we start it.

if it eventually connects, you are good to go! close muse-io and forget all about it.



# todo

note -- do i need to do `kill -9 (pidof muse-io)` on exit?

not if i run `muse.disconnect()` on exit...?

development priorities here
