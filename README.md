# Text Analytics Dashboard

Note that the `front/` directory still contains traditional "back-end"
things to communicate with the NLP back-end.

## Setup

TODO: Recursive makefiles for setting up and starting
everything. Eventually Docker so that non-experts will have an easier
time.

### Backend

redis, celery

### Frontend

Sveltekit (svelte+polka+...)

## Notes

### User Interface

Material (by Google) looks nice and seems like a reasonable UI choice
(though I don't know much about UI). I am using [Svelte
Material](https://sveltematerialui.com/) for now, although I'm not
sure I like custom components for everything. Seems like most things
should just be a CSS file, and ideally I know how it all
works. Although maybe Material design specifies so much behavior that
we need custom components for everything anyway. 

An alternative is [Matter](https://github.com/finnhvman/matter), but I
don't think I have time to work with it, considering my lack of
knowledge of CSS.

