# Bean Catalog

Use `catalog.json` to control which coffees appear on the website.

- Set `"active": true` to show a bean on the homepage and the beans page.
- Set `"active": false` to keep the bean files but hide it from visitors.
- Add new beans by adding a new object with `code`, `name`, `image`, `detail`, and `active`.

Example:

```json
{
  "code": "C1009",
  "name": "New Coffee Name",
  "image": "IMG/Bean/C1009.png",
  "detail": "beans/C1009.txt",
  "active": true
}
```
