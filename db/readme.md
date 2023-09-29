# If you aren't sure exactly what all this is about, read here first

## data.json

This is the file that dist.css is built from. Badges and avatars are based on user ID, more in template.css

## dist.css

This is the CSS code users import, here the data from data.json is used according to template.css.

## template.css

This is the file where the instruction on how to use data.json lies. If the (pseudo)CSS in this file says "Take the ID of the user and replace the avatar of them with the URL next to their name" this is how dist.css is built.

Example:

```css
.{ID} {
    display: none;
}
```

Would then build the dist.css in a way that would display: none, so hide, every avatar from a user that has the import to dist.css

of course this exact line wouldn't work because it would be to easy, thats why the selectors in this file are so long lol.
