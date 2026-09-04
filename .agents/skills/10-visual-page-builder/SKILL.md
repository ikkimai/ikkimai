---
name: visual-page-builder
description: Build and maintain a WordPress/Elementor-like visual page editor with selectable blocks, drag-and-drop positioning, inline editing and serializable page schemas.
---

# Visual Page Builder

## Goal
Treat page content as a structured tree of editable blocks instead of hard-coded page markup.

The builder should allow:
- selecting blocks
- dragging/reordering blocks
- nesting where supported
- inline text editing
- editing properties in a sidebar
- duplicating blocks
- deleting blocks
- hiding/showing blocks
- responsive properties
- undo/redo
- preview mode
- saving and restoring page state

## Architecture

Prefer this separation:

Page JSON
  -> Block tree
  -> Renderer
  -> Visual editor overlay

The renderer must be usable without the editor.

Example block:
```json
{
  "id": "hero-home",
  "type": "hero",
  "props": {
    "title": "Smart Business Summit 2026",
    "subtitle": "Negócios, inovação e conexões",
    "align": "center"
  }
}
```

## Block contract

Every editable block should have:
- stable unique `id`
- `type`
- serializable `props`
- optional `children`
- optional metadata

Example:
```ts
type PageBlock = {
  id: string;
  type: string;
  props: Record<string, unknown>;
  children?: PageBlock[];
};
```

## Registry

Use a central registry:

```ts
const blockRegistry = {
  hero: HeroBlock,
  section: SectionBlock,
  text: TextBlock,
  image: ImageBlock,
  button: ButtonBlock,
  columns: ColumnsBlock,
};
```

The registry should also define editable properties when practical.

## Selection

When the editor is active:
1. Hover shows the block boundary.
2. Click selects the nearest editable block.
3. Selected block gets a clear visual outline.
4. Selection exposes contextual actions:
   - move
   - duplicate
   - edit
   - delete
5. Escape clears selection or exits the current editing level.

Do not alter the production page appearance when editor mode is disabled.

## Drag and drop

Prefer an established drag-and-drop library already present in the project. If none exists, evaluate a lightweight library before implementing custom pointer mechanics.

Rules:
- drag should reorder siblings
- nested containers should define valid drop targets
- prevent invalid parent/child relationships
- preserve block IDs
- update only the page tree, not component source code
- support keyboard-accessible movement where feasible

## Property editing

The sidebar should edit serializable props.

Example:
```text
Text
Font size
Font weight
Color
Alignment
Margin
Padding
Width
Visibility
```

Do not bury builder-editable values in component-specific imperative state.

## Inline editing

Text blocks should support direct editing without requiring code changes.

Use the existing rich-text/editor library if one exists. If introducing one is necessary, keep the data model serializable and sanitized.

## Undo/redo

Treat page state as immutable snapshots or use a dedicated history mechanism.

Every meaningful user operation should become one history entry:
- move
- add
- delete
- duplicate
- property change

Avoid one history entry per keystroke unless the editor explicitly supports text-history grouping.

## Persistence

Store page state as structured JSON or a normalized equivalent.

Do not store arbitrary generated HTML as the primary source of truth.

Recommended flow:

Editor
 -> validate schema
 -> save draft
 -> persist
 -> publish
 -> renderer reads published state

Support draft/published separation if the application needs collaborative or production editing.

## AI compatibility

The AI may operate on the same page schema.

For example, a command such as:
"Coloque patrocinadores antes da programação e deixe o fundo azul"

should become a validated structured operation, conceptually:

```json
{
  "action": "update_page",
  "operations": [
    {
      "type": "move_block",
      "blockId": "sponsors",
      "before": "schedule"
    },
    {
      "type": "set_property",
      "blockId": "sponsors",
      "path": "background",
      "value": "#0B1121"
    }
  ]
}
```

The AI must not directly write arbitrary React/CSS for ordinary visual edits.

## Safety

Validate:
- block type
- block ID
- property path
- property type
- allowed values
- nesting rules

Never execute arbitrary JavaScript from page JSON.

Sanitize user-authored rich text and URLs.

## Cursor implementation behavior

When asked to create or modify the visual builder:
1. Inspect the existing page/component architecture.
2. Reuse the project's UI primitives.
3. Identify whether a block schema already exists.
4. Do not introduce a second page representation.
5. Build the smallest vertical slice first:
   - select
   - inspect properties
   - change property
   - save
6. Then add drag/drop, duplication, deletion and history.
7. Keep editor code separate from production rendering.
8. Add tests for serialization, block operations and invalid operations.

## Definition of done

A visual-builder feature is complete only when:
- page renders normally outside editor mode
- blocks can be identified deterministically
- edits update structured state
- state survives reload when persistence is implemented
- invalid operations are rejected
- existing responsive behavior is preserved
- no unrelated components are rewritten
