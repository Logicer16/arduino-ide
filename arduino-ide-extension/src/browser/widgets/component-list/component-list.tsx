import * as React from '@theia/core/shared/react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import {
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized/dist/commonjs/CellMeasurer';
import type {
  ListRowProps,
  ListRowRenderer,
} from 'react-virtualized/dist/commonjs/List';
import List from 'react-virtualized/dist/commonjs/List';
import { ArduinoComponent } from '../../../common/protocol/arduino-component';
import { Installable } from '../../../common/protocol/installable';
import { ComponentListItem } from './component-list-item';
import { ListItemRenderer } from './list-item-renderer';

function sameAs<T>(left: T[], right: T[], key: (item: T) => string): boolean {
  if (left === right) {
    return true;
  }
  const leftLength = left.length;
  if (leftLength !== right.length) {
    return false;
  }
  for (let i = 0; i < leftLength; i++) {
    const leftKey = key(left[i]);
    const rightKey = key(right[i]);
    if (leftKey !== rightKey) {
      return false;
    }
  }
  return true;
}

export class ComponentList<T extends ArduinoComponent> extends React.Component<
  ComponentList.Props<T>
> {
  private readonly cache: CellMeasurerCache;
  private resizeAllFlag: boolean;
  private list: List | undefined;
  private mostRecentWidth: number | undefined;

  constructor(props: ComponentList.Props<T>) {
    super(props);
    this.cache = new CellMeasurerCache({
      defaultHeight: 300,
      fixedWidth: true,
    });
  }

  override render(): React.ReactNode {
    return (
      <AutoSizer>
        {({ width, height }) => {
          if (this.mostRecentWidth && this.mostRecentWidth !== width) {
            this.resizeAllFlag = true;
            setTimeout(() => this.clearAll(), 0);
          }
          this.mostRecentWidth = width;
          return (
            <List
              className={'items-container'}
              rowRenderer={this.createItem}
              height={height}
              width={width}
              rowCount={this.props.items.length}
              rowHeight={this.cache.rowHeight}
              deferredMeasurementCache={this.cache}
              ref={this.setListRef}
            />
          );
        }}
      </AutoSizer>
    );
  }

  override componentDidUpdate(prevProps: ComponentList.Props<T>): void {
    if (
      this.resizeAllFlag ||
      !sameAs(this.props.items, prevProps.items, this.props.itemLabel)
    ) {
      this.clearAll(true);
    }
  }

  private setListRef = (ref: List | null): void => {
    this.list = ref || undefined;
  };

  private clearAll(scrollToTop = false): void {
    this.resizeAllFlag = false;
    this.cache.clearAll();
    if (this.list) {
      this.list.recomputeRowHeights();
      if (scrollToTop) {
        this.list.scrollToPosition(0);
      }
    }
  }

  private clear(index: number): void {
    this.cache.clear(index, 0);
    this.list?.recomputeRowHeights(index);
    // Update the last item if the if the one before was updated
    if (index === this.props.items.length - 2) {
      this.cache.clear(index + 1, 0);
      this.list?.recomputeRowHeights(index + 1);
    }
  }

  private createItem: ListRowRenderer = ({
    index,
    parent,
    key,
    style,
  }: ListRowProps): React.ReactNode => {
    const item = this.props.items[index];
    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        <div style={style}>
          <ComponentListItem<T>
            key={this.props.itemLabel(item)}
            item={item}
            itemRenderer={this.props.itemRenderer}
            install={this.props.install}
            uninstall={this.props.uninstall}
            onFocusDidChange={() => this.clear(index)}
          />
        </div>
      </CellMeasurer>
    );
  };
}

export namespace ComponentList {
  export interface Props<T extends ArduinoComponent> {
    readonly items: T[];
    readonly itemLabel: (item: T) => string;
    readonly itemDeprecated: (item: T) => boolean;
    readonly itemRenderer: ListItemRenderer<T>;
    readonly install: (item: T, version?: Installable.Version) => Promise<void>;
    readonly uninstall: (item: T) => Promise<void>;
  }
}
