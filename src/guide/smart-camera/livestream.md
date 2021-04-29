# Live stream

## JPEG stream

We know we could use a more elaborate stream like H.264 video encoding, and is therefore much lower bandwidth than the above JPEG methods.
It could also includes audio. The main drawbacks are:
- it does not have universal support in web browsers (it works best in Safari on either macOS or iOS),
- inevitable 10-second latency. *Not really an issue*.
- **CPU or GPU** intensive. That is the main drawback for our little raspberry pis!
