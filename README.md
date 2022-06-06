# currently fronting

A web app for displaying a PluralKit system's current public fronters.

The index automatically redirects to an example page, but folks can find their system or a friend's at `https://currently-fronting.obscurascripturae.com/system-id-here`. Just replace `system-id-here` with the system ID in question. Our page, for example, is available at https://currently-fronting.obscurascripturae.com/mdpgz.

# Privacy Policy

Requests are cached and automatically invalidated when data changes through [SWR](https://swr.vercel.app/). Initial API requests are made in the browser, directly to the PluralKit API. This app only accesses publicly available data on fronters.

# Terms of Service

This app is hosted on [Vercel](https://vercel.com/), so we're beholden to their service uptime guarantees. Other than that, the app _shouldn't_ break due to the way Vercel works, unless we bork something on a branch and it somehow makes it to `main`. All that said...

# Bug Reporting

If you encounter an issue with the app, please feel free to file a GitHub issue in this project or mention us (`pulchra mentis#1321`) in the PluralKit Discord server's `#community-resources-help` channel.
