# Component inventory

Every component the design defines, by atomic level. Read this and
`libs/ui/registry.json` before creating a component (see the
`design-to-component` skill). Add new components here in the same change
that creates them.

Status: **built** (in code, with test and story) · **designed** (in the
canvas, not built yet).

## Atoms (`libs/ui/atoms`)

Atoms wrap Gluestack primitives and read only tokens.

| Component     | Variants / notes                                                                                 | Status   |
| ------------- | ------------------------------------------------------------------------------------------------ | -------- |
| ThemeProvider | Root provider; wraps Gluestack's provider, light only                                            | built    |
| Button        | `default` (outline, border-input), `primary`, `danger`; label 14/600, 44 px high, radius control | designed |
| IconButton    | menu, back, add, close; 44 px target, 24 px icon; `selected` background for the open add menu    | designed |
| Badge         | `tag`, `count` (e.g. "1 / 4"), `add` (dashed primary border, "+ New tag")                        | designed |
| Icon          | 24 px, 2 px stroke: menu, back, add, close, room, item                                           | designed |
| Input         | Text field, 44 px high, border-input, radius control                                             | designed |
| Select        | Same box as Input                                                                                | designed |
| Text          | `label`, `caption`, `value`, plus the type scale                                                 | designed |
| Divider       | 1 px border colour                                                                               | designed |
| ProgressBar   | 8 px, fill track, primary bar (white on the worth card)                                          | designed |
| Photo         | Placeholder (fill) until an image is set; 52, 72, full-width sizes                               | designed |
| Scrim         | `strong` (drawer), `light` (add menu)                                                            | designed |
| MenuItem      | Text row (drawer, `active` state) and icon row (add menu), 48 px high                            | designed |
| Card          | Surface, 1 px border, radius card                                                                | designed |

## Molecules (`libs/ui/molecules`)

| Component       | Made of                                               | Status   |
| --------------- | ----------------------------------------------------- | -------- |
| FormField       | Text + Input/Select                                   | designed |
| FieldRow        | Two FormFields side by side                           | designed |
| DetailRow       | Text + Text, divider underneath                       | designed |
| StatBlock       | Value + label on a Card                               | designed |
| WorthFigure     | Label + display value, optional Badge (e.g. −39%)     | designed |
| SectionHeader   | h2 Text + Button                                      | designed |
| ItemRow         | Photo + name + subtitle + value                       | designed |
| TagGroup        | Badges + add Badge, wraps                             | designed |
| SegmentedChoice | Buttons, one selected (Condition)                     | designed |
| PhotoStrip      | Photos + "+ Photo" button                             | designed |
| RoomTile        | Photo + name + "N items · €X" + Edit Button on a Card | designed |
| AppBar          | Menu IconButton + title + add IconButton              | designed |

## Organisms (`libs/ui/organisms`)

| Component   | Made of                                                                    | Status   |
| ----------- | -------------------------------------------------------------------------- | -------- |
| WorthCard   | WorthFigure ×2 + Divider + ProgressBar, on primary                         | designed |
| TagsCard    | SectionHeader + TagGroup                                                   | designed |
| DetailsCard | DetailRows on a Card                                                       | designed |
| NavDrawer   | Brand text + MenuItems + Divider, over strong Scrim                        | designed |
| AddMenu     | MenuItems with icons on a Card (menu width, shadow-menu), over light Scrim | designed |
| ItemForm    | PhotoStrip + FormFields + SegmentedChoice + TagGroup + heir Select         | designed |
| RoomGrid    | RoomTiles in two columns                                                   | designed |

## Templates

The design also defines four templates (layout with named slots, no data).
Where they live in code is an open question; see [decisions.md](decisions.md).

| Template           | Slots                                                                             | Used by               |
| ------------------ | --------------------------------------------------------------------------------- | --------------------- |
| OverviewTemplate   | AppBar, WorthCard, StatBlocks ×2, TagsCard, ItemRow list                          | Dashboard             |
| CollectionTemplate | AppBar, grid or list of tiles/rows                                                | Rooms, All items      |
| DetailTemplate     | Photo carousel + Back/Edit, title + subtitle, price vs worth, DetailsCard, Delete | Item detail           |
| FormTemplate       | Cancel · Title · Save, PhotoStrip, form fields (scroll), Delete                   | Add/edit item or room |
