# Screens and navigation

All screens are phone portrait, designed at 390×844, background `bg`,
screen gutter `space-5` (20).

## Navigation

- **Hamburger menu** (top-left IconButton) opens the NavDrawer: 290 wide,
  full height, white, over a strong scrim. Brand text "Homebase" in primary
  (22/700). Rows: Dashboard, Rooms, All items, Tags, Heirs, then a divider
  and Settings. The current screen's row uses the `selected` background with
  primary-dark bold text. No bottom tabs.
- **Add**: a "+" IconButton (primary icon) at the top-right of the app bar.
  Tapping it turns it into a close button (selected background, × icon)
  and opens the AddMenu below it: a 200-wide card with shadow-menu over a
  light scrim, with "Add room" (house icon) and "Add item" (box icon).
  See [decisions.md](decisions.md): the brief asked for a floating button
  bottom-right, the design puts it in the app bar.

## Designed screens

| Screen                | Template   | Contents                                                                                                                                                                                                                                                  |
| --------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard             | Overview   | WorthCard (total worth new, current worth after depreciation with −% badge and progress bar), StatBlocks (Items, Rooms), TagsCard (Edit tags, + New tag), "Recently added" ItemRows                                                                       |
| Dashboard · menu open | Overview   | Dashboard with NavDrawer open                                                                                                                                                                                                                             |
| Dashboard · add menu  | Overview   | Dashboard with AddMenu open                                                                                                                                                                                                                               |
| Rooms                 | Collection | AppBar "Rooms"; RoomGrid of RoomTiles (photo, name, "24 items · €4,150", Edit)                                                                                                                                                                            |
| Item detail           | Detail     | Full-width photo (230 high) with Back, Edit (primary) and "1 / 4" count badge; name (h1) and "Category · Room"; Paid vs Worth now card; DetailsCard (Brand / model, Quantity, Purchased "date · shop", Condition, Heir); tag badges; Delete item (danger) |
| Add / edit item       | Form       | Cancel · "Edit item" · Save; photo strip with "+ Photo"; Name; Brand / make + Model; Price (€) + Quantity; Purchase date + Purchased from; Category + Room selects; Condition segmented (New, Good, Fair, Poor); Tags; Heir select; Delete item           |

## Still to design

All items, Tags, Heirs, Add / edit room, Settings, and sign-in (Apple and
Google). They should reuse the existing templates and components. Ask
before building any of them.
