# react-flex-dnd

**React drag and drop sort support flex layout and nested.**

This package using hooks, note that your React version is above 16.8 :)

Also not support mobile, but it's not time consuming, I am doing this.

![example](./assets/example.gif)

[Playground](https://asweallcan.github.io/react-flex-dnd), the example currently is pretty simple, **only show one level nested, but it can be infinite nested if you want**, I will enrich it after a period of time.

## Core characteristics

- Support any layout except grid
- High customization
- Clean and powerful api which is simple to get started with
- Element styles are not affected
- Easy nested

**If your demand is grid layout, I suggest [react-grid-layout](https://github.com/react-grid-layout/react-grid-layout).**

## Currently supported features

- Vertical lists
- Horizontal lists
- Row flex wrap
- Column flex wrap
- Auto scrolling
- Nested droppables and draggables

## Simple Example

```tsx
<DragDropPrivider rootId="app" ghostId="myGhost" onDragEnd={(result) => {
  const {from, to, draggableId} = result;

  // update your data
}}>
  <Droppable id="custom-droppable">
    {droppableProps => <div {...droppableProps}>
      {elements.map(element => {
        const {key, content} = element;

        return <Draggable id={key} belongsTo="custom-droppable">
          {draggableProps => <div {...draggableProps}>{content}</div>}
        </Draggable>
      })}
    <div>}
  </Droppable>
</DragDropPrivider>
```

## Usage

### DragDropProvider

Must wrap your app with it, it provides controllers for your draggables and droppables.

**rootId?: string**

If using React 17, it is required to identify React app root element.

**ghostId?: string**

html id property for ghost element.

**onDragEnd**

```typescript
onDragEnd: (params: {
  to: { index: number; droppableId: string };
  from: { index: number; droppableId: string };
  draggableId: string;
}) => void;
```

Here comes key part, onDragEnd can get sort result after interaction, `from` shows old place for the dragging item, but for attention, the index in the `to` is the new index with dragging item removed. Normally when drag end, you remove element first then insert dragging item to the new place.

### Draggable

