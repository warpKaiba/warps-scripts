# warps-scripts
Repo for me to dump misc user scripts into

## zoomer detected

![Zoomer detected screenshot](https://i.imgur.com/rAwEMq3.png)

Userscript that tries to detect people under 18 in your following list. Meant for people with NSFW accounts to use to more easily filter out any minors that might be following them. You have to be on your list of followers page. It will make every listed user that it detects have a red background.

This script does nothing but changes the background color of users, it does not block them for you.

NOTE: It's not perfect, and there WILL be false positives. You'll need to double-check yourself before blocking.
I opted for a more broad approach that would make more false positives, but should hopefully not miss any.

![False positives screenshot](https://i.imgur.com/hScoYQZ.png)

Example of 2 false positives. Users turned red because of the "10pm" and "17.20"


Here's an overly detailed explanation of what exactly it looks for, for anyone who cares.

First, it gets a user's bio. It removes any emojis and links (including @s and hashtags), then tries to remove any dates. Dates tended to be the most likely thing to trick the script with false positives, so that's the only thing I opted to take account for.
Then, it looks for the word "minor" by itself. I make sure it only looks for that word exactly, and not "minors" or any other word with "minor" in it. If it finds it, it makes the user a brighter red, since it's "more sure" that the user is a minor.
If it doesn't find that, it looks for an age. This is exactly what it looks for, using a regular expression:

(Non-number, or nothing) (The number 1) (Any number) (Non-number, or nothing)

If anything that matches this pattern is found and is less than 18, it turns the user red.
