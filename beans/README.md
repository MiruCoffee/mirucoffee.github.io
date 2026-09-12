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

## Miru Coffee Customer Copy Rules

Use these rules whenever adding a new coffee, editing an existing coffee, or
reactivating an inactive coffee.

- Write for customers, not for suppliers or internal inventory records.
- Lead with cup experience: flavor, sweetness, acidity, body, finish, roast
  style, and who the coffee is good for.
- Keep origin details accurate and concrete: region, altitude, process, variety,
  producer, mill or washing station, and cup score when known.
- Include the bean code, origin, roast date, and score when the page or image
  format supports it.
- Mention organic source information only when it is listed by the bean source,
  using customer-safe wording such as `Organic Coffee Lot` or
  `Organic Source: Yes`.
- Do not describe Miru Coffee's roasted product as `USDA Organic`,
  `certified organic`, or any certification unless the roasted product
  certification is actually confirmed.
- Do not link customers to the green bean supplier site from the public website.
- Do not use supplier-facing or internal words such as `supplier`,
  `importer`, `green coffee`, `sourcing partner`, `materials`, `source
  confirmed`, `inventory management`, or `applications`.
- Avoid writing from an internal roaster point of view, such as `As roasters`
  or `we selected this lot`. Prefer direct product language.
- Keep the tone warm, clean, and trustworthy. No exaggerated claims such as
  `perfect`, `flawless`, or `best`.
- Inactive coffees should follow the same standard as active coffees so they are
  safe to publish later.

Before publishing or reactivating a coffee, scan the edited files for these
terms:

```sh
rg -n "supplier|USDA|green coffee|Organic Green|listed by|materials|certification|source confirmed|Public Supplier|TBD|raw bean|green importer|U\\.S\\.-based importer|certified organic|importer|perfect|flawless|applications|sourcing partner|inventory management|direct-trade|As roasters|expert cuppers|strict quality control"
```
