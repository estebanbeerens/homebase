# Design and product decisions

## Settled

| Date       | Decision                                                                                                                                                                               |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-11-16 | `tokens.json` is final and lives in `libs/design-tokens`.                                                                                                                              |
| 2026-11-16 | Atomic layers: atoms wrap Gluestack and read only tokens; molecules use atoms; organisms use molecules and atoms. New variants are props on an existing component, not new components. |
| 2026-11-16 | UI libraries never import features or data access. Organisms receive data through props; only features call data hooks.                                                                |
| 2026-11-16 | Features do not import other features. Shared logic goes in `libs/data-access`.                                                                                                        |
| 2026-11-16 | Navigation uses a hamburger drawer, no bottom tabs.                                                                                                                                    |
| 2026-11-16 | Platforms: iOS and Android. Web is planned later. Light mode only for now.                                                                                                             |
| 2026-11-16 | Storybook runs on-device (`@storybook/react-native`).                                                                                                                                  |
| 2026-11-16 | Sign-in uses Apple and Google.                                                                                                                                                         |
| 2026-11-16 | One currency per user (the design shows €).                                                                                                                                            |
| 2026-11-16 | Categories are a fixed list for now.                                                                                                                                                   |
| 2026-11-16 | Heir is a person record, with its own "Heirs" screen in the drawer.                                                                                                                    |
| 2026-11-16 | Photos: up to 4 per item, about 200 kB each after resizing and compression, plus a thumbnail for lists.                                                                                |
| 2026-11-16 | No wishlist for now.                                                                                                                                                                   |

## Open questions

1. **Add button placement.** The brief describes a floating "+" at the
   bottom-right. The design puts "+" in the app bar (top-right) and drops
   the AddMenu down from it. Which one wins?
2. **Templates layer.** The design defines four templates and suggests
   `libs/ui/templates`. The agreed layout has no templates library. Add
   `libs/ui/templates` (tag `type:ui-template`, depends on organisms and
   below), or put templates in the features?
3. **Condition values.** The design uses New, Good, Fair, Poor. The
   suggestion was new, used, worn out, broken. Proposal: New, Good, Fair,
   Poor, Broken (the design's four, plus Broken for items that are worth
   nothing).
4. **Depreciation.** It can be based on time, on condition, or both.
   Proposal for Phase 2: each category has a useful life in years
   (straight-line from the purchase date), and condition caps the value
   (New 100%, Good 80%, Fair 50%, Poor 25%, Broken 0%). Current worth is
   the lower of the two. To confirm.
5. **Category list.** Which categories make up the fixed list? The design
   shows Appliances and Electronics.
6. **App identifiers.** iOS bundle identifier and Android package name are
   still unset.
